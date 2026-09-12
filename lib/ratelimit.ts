import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter: number;
  failClosed?: boolean;
}

/**
 * In-memory sliding window implementation for development and testing
 * when Redis credentials are not present. Ensures rate limiting is NEVER
 * silently disabled.
 */
export class InMemorySlidingWindowLimiter {
  private windowMs: number;
  private maxRequests: number;
  private hits: Map<string, number[]> = new Map();

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async limit(identifier: string): Promise<RateLimitResult> {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    let timestamps = this.hits.get(identifier) || [];
    timestamps = timestamps.filter((t) => t > windowStart);

    if (timestamps.length >= this.maxRequests) {
      const oldestInWindow = timestamps[0];
      const resetTime = oldestInWindow + this.windowMs;
      const retryAfter = Math.max(1, Math.ceil((resetTime - now) / 1000));

      return {
        success: false,
        limit: this.maxRequests,
        remaining: 0,
        reset: resetTime,
        retryAfter,
      };
    }

    timestamps.push(now);
    this.hits.set(identifier, timestamps);

    const resetTime = now + this.windowMs;
    const retryAfter = Math.max(1, Math.ceil(this.windowMs / 1000));

    return {
      success: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - timestamps.length,
      reset: resetTime,
      retryAfter,
    };
  }

  reset(): void {
    this.hits.clear();
  }
}

// Check Redis credentials
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const isRedisConfigured = Boolean(redisUrl && redisToken);
const isProduction = process.env.NODE_ENV === "production";

let redisClient: Redis | null = null;
if (isRedisConfigured) {
  redisClient = new Redis({
    url: redisUrl,
    token: redisToken,
  });
}

function createLimiter(
  maxRequests: number,
  windowDuration: "1m" | "15m" | "1 h",
  windowMs: number,
  prefix: string
) {
  const fallback = new InMemorySlidingWindowLimiter(maxRequests, windowMs);

  let upstashLimiter: Ratelimit | null = null;
  if (redisClient) {
    upstashLimiter = new Ratelimit({
      redis: redisClient,
      limiter: Ratelimit.slidingWindow(maxRequests, windowDuration),
      prefix: `ratelimit:${prefix}`,
    });
  }

  return {
    async check(identifier: string): Promise<RateLimitResult> {
      // ─── Fail-Closed Check in Production ───────────────────────────
      // If running in production and Redis credentials are missing, fail closed immediately.
      // Do NOT silently disable rate limiting.
      if (!isRedisConfigured && isProduction) {
        console.error(
          `[SECURITY_FATAL] Missing Upstash Redis configuration in production for ${prefix}. Request blocked (fail-closed).`
        );
        return {
          success: false,
          limit: maxRequests,
          remaining: 0,
          reset: Date.now() + 60_000,
          retryAfter: 60,
          failClosed: true,
        };
      }

      if (upstashLimiter) {
        try {
          const result = await upstashLimiter.limit(identifier);
          const now = Date.now();
          const retryAfter = Math.max(
            1,
            Math.ceil((result.reset - now) / 1000)
          );

          return {
            success: result.success,
            limit: result.limit,
            remaining: result.remaining,
            reset: result.reset,
            retryAfter,
          };
        } catch (error) {
          console.error(
            `[RATELIMIT_ERROR] Upstash Redis error for ${prefix}:`,
            error
          );
          if (isProduction) {
            // Fail closed in production on Redis communication error
            return {
              success: false,
              limit: maxRequests,
              remaining: 0,
              reset: Date.now() + 60_000,
              retryAfter: 60,
              failClosed: true,
            };
          }
          // In development/test, fallback to in-memory limiter
          return fallback.limit(identifier);
        }
      }

      // In development/test environments without Redis, active in-memory limiter applies
      return fallback.limit(identifier);
    },
    fallback,
  };
}

// ─── Pre-configured Limiters ─────────────────────────────────────────

// 1. Login: 5 attempts per 15 minutes per IP + normalized email
export const loginLimiter = createLimiter(
  5,
  "15m",
  15 * 60 * 1000,
  "login"
);

// 2. Registration: 5 requests per 1 hour per IP
export const registerLimiter = createLimiter(
  5,
  "1 h",
  60 * 60 * 1000,
  "register"
);

// 3. Forgot Password: 3 requests per 15 minutes per IP + normalized email
export const forgotPasswordLimiter = createLimiter(
  3,
  "15m",
  15 * 60 * 1000,
  "forgot-password"
);

// 4. Reset Password: 5 attempts per 15 minutes per IP
export const resetPasswordLimiter = createLimiter(
  5,
  "15m",
  15 * 60 * 1000,
  "reset-password"
);

// 5. Verify Email: 10 attempts per 15 minutes per IP
export const verifyEmailLimiter = createLimiter(
  10,
  "15m",
  15 * 60 * 1000,
  "verify-email"
);

// 6. Transactions Write: 60 operations per 1 minute per authenticated user
export const transactionsWriteLimiter = createLimiter(
  60,
  "1m",
  60 * 1000,
  "transactions"
);

// 7. Budgets Write: 30 operations per 1 minute per authenticated user
export const budgetsWriteLimiter = createLimiter(
  30,
  "1m",
  60 * 1000,
  "budgets"
);

// ─── Helpers ─────────────────────────────────────────────────────────

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function getClientIp(request: Request): string {
  const vercelIp = request.headers.get("x-vercel-ip");
  if (vercelIp) {
    return vercelIp.trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "127.0.0.1";
}

/**
 * Creates standard HTTP 429 response with Retry-After and X-RateLimit-* headers
 */
export function rateLimitResponse(result: RateLimitResult): Response {
  const message = result.failClosed
    ? "Security configuration error: rate limiting service unavailable. Request blocked."
    : `Too many requests. Please try again in ${result.retryAfter} seconds.`;

  const code = result.failClosed ? "RATE_LIMIT_UNAVAILABLE" : "RATE_LIMIT_EXCEEDED";

  return Response.json(
    {
      error: message,
      code,
      retryAfter: result.retryAfter,
    },
    {
      status: 429,
      headers: {
        "Retry-After": result.retryAfter.toString(),
        "X-RateLimit-Limit": result.limit.toString(),
        "X-RateLimit-Remaining": result.remaining.toString(),
        "X-RateLimit-Reset": result.reset.toString(),
      },
    }
  );
}
