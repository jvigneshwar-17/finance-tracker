import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  InMemorySlidingWindowLimiter,
  getClientIp,
  normalizeEmail,
  rateLimitResponse,
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
  resetPasswordLimiter,
  verifyEmailLimiter,
  transactionsWriteLimiter,
  budgetsWriteLimiter,
} from "../lib/ratelimit.ts";

describe("Production-Grade Rate Limiting", () => {
  describe("InMemorySlidingWindowLimiter", () => {
    test("permits requests within configured limit", async () => {
      const limiter = new InMemorySlidingWindowLimiter(3, 60000);
      const id = "test-client-1";

      const r1 = await limiter.limit(id);
      assert.equal(r1.success, true);
      assert.equal(r1.remaining, 2);

      const r2 = await limiter.limit(id);
      assert.equal(r2.success, true);
      assert.equal(r2.remaining, 1);

      const r3 = await limiter.limit(id);
      assert.equal(r3.success, true);
      assert.equal(r3.remaining, 0);
    });

    test("blocks requests exceeding configured limit with positive retryAfter", async () => {
      const limiter = new InMemorySlidingWindowLimiter(2, 60000);
      const id = "test-client-blocked";

      await limiter.limit(id);
      await limiter.limit(id);

      const blocked = await limiter.limit(id);
      assert.equal(blocked.success, false);
      assert.equal(blocked.remaining, 0);
      assert.ok(blocked.retryAfter > 0);
      assert.ok(blocked.reset > Date.now());
    });

    test("tracks limits independently for different identifiers", async () => {
      const limiter = new InMemorySlidingWindowLimiter(1, 60000);

      const clientA = await limiter.limit("client-a");
      const clientB = await limiter.limit("client-b");

      assert.equal(clientA.success, true);
      assert.equal(clientB.success, true);

      const clientABlocked = await limiter.limit("client-a");
      assert.equal(clientABlocked.success, false);
    });
  });

  describe("Helper Functions", () => {
    test("normalizeEmail strips whitespace and lowercases", () => {
      assert.equal(normalizeEmail("  User.Name@Example.COM  "), "user.name@example.com");
      assert.equal(normalizeEmail("ADMIN@DOMAIN.ORG"), "admin@domain.org");
    });

    test("getClientIp extracts from headers", () => {
      const reqWithForwarded = new Request("http://localhost", {
        headers: { "x-forwarded-for": "203.0.113.195, 70.41.3.18" },
      });
      assert.equal(getClientIp(reqWithForwarded), "203.0.113.195");

      const reqWithRealIp = new Request("http://localhost", {
        headers: { "x-real-ip": "198.51.100.42" },
      });
      assert.equal(getClientIp(reqWithRealIp), "198.51.100.42");

      const reqFallback = new Request("http://localhost");
      assert.equal(getClientIp(reqFallback), "127.0.0.1");
    });

    test("rateLimitResponse returns HTTP 429 with Retry-After and rate limit headers", async () => {
      const response = rateLimitResponse({
        success: false,
        limit: 5,
        remaining: 0,
        reset: Date.now() + 60000,
        retryAfter: 60,
      });

      assert.equal(response.status, 429);
      assert.equal(response.headers.get("Retry-After"), "60");
      assert.equal(response.headers.get("X-RateLimit-Limit"), "5");
      assert.equal(response.headers.get("X-RateLimit-Remaining"), "0");
      assert.ok(response.headers.get("X-RateLimit-Reset"));

      const data = await response.json();
      assert.equal(data.code, "RATE_LIMIT_EXCEEDED");
      assert.equal(data.retryAfter, 60);
    });
  });

  describe("Configured Limits & Scopes", () => {
    test("login rate limiter limits per IP + email", async () => {
      const ip = "192.0.2.1";
      const email = "user@test.com";
      const key = `${ip}:${normalizeEmail(email)}`;

      loginLimiter.fallback.reset();

      // Limit is 5
      for (let i = 0; i < 5; i++) {
        const res = await loginLimiter.check(key);
        assert.equal(res.success, true);
      }

      const blocked = await loginLimiter.check(key);
      assert.equal(blocked.success, false);
      assert.ok(blocked.retryAfter > 0);

      // Different email on same IP is not blocked
      const differentEmail = await loginLimiter.check(`${ip}:other@test.com`);
      assert.equal(differentEmail.success, true);
    });

    test("registration rate limiter enforces 5/hour per IP", async () => {
      const ip = "192.0.2.2";

      registerLimiter.fallback.reset();

      for (let i = 0; i < 5; i++) {
        const res = await registerLimiter.check(ip);
        assert.equal(res.success, true);
      }

      const blocked = await registerLimiter.check(ip);
      assert.equal(blocked.success, false);
      assert.equal(blocked.limit, 5);
    });

    test("forgot password limits to 3 per IP + email", async () => {
      const key = "192.0.2.3:forgot@test.com";
      forgotPasswordLimiter.fallback.reset();

      for (let i = 0; i < 3; i++) {
        const res = await forgotPasswordLimiter.check(key);
        assert.equal(res.success, true);
      }

      const blocked = await forgotPasswordLimiter.check(key);
      assert.equal(blocked.success, false);
      assert.equal(blocked.limit, 3);
    });

    test("reset password limits to 5 per IP", async () => {
      const ip = "192.0.2.4";
      resetPasswordLimiter.fallback.reset();

      for (let i = 0; i < 5; i++) {
        const res = await resetPasswordLimiter.check(ip);
        assert.equal(res.success, true);
      }

      const blocked = await resetPasswordLimiter.check(ip);
      assert.equal(blocked.success, false);
      assert.equal(blocked.limit, 5);
    });

    test("verify email limits to 10 per IP", async () => {
      const ip = "192.0.2.5";
      verifyEmailLimiter.fallback.reset();

      for (let i = 0; i < 10; i++) {
        const res = await verifyEmailLimiter.check(ip);
        assert.equal(res.success, true);
      }

      const blocked = await verifyEmailLimiter.check(ip);
      assert.equal(blocked.success, false);
      assert.equal(blocked.limit, 10);
    });

    test("transactions write limiter enforces 60 writes per user", async () => {
      const userId = "user-finance-1";
      transactionsWriteLimiter.fallback.reset();

      for (let i = 0; i < 60; i++) {
        const res = await transactionsWriteLimiter.check(userId);
        assert.equal(res.success, true);
      }

      const blocked = await transactionsWriteLimiter.check(userId);
      assert.equal(blocked.success, false);
      assert.equal(blocked.limit, 60);

      // Different user is not blocked
      const otherUser = await transactionsWriteLimiter.check("user-finance-2");
      assert.equal(otherUser.success, true);
    });

    test("budgets write limiter enforces 30 writes per user", async () => {
      const userId = "user-budget-1";
      budgetsWriteLimiter.fallback.reset();

      for (let i = 0; i < 30; i++) {
        const res = await budgetsWriteLimiter.check(userId);
        assert.equal(res.success, true);
      }

      const blocked = await budgetsWriteLimiter.check(userId);
      assert.equal(blocked.success, false);
      assert.equal(blocked.limit, 30);
    });
  });

  describe("Security Invariants", () => {
    test("rate limiting is never silently disabled in dev/test", async () => {
      // In dev/test without Redis, requests ARE throttled once limit is exceeded
      const limiter = new InMemorySlidingWindowLimiter(1, 60000);
      const res1 = await limiter.limit("check-never-disabled");
      assert.equal(res1.success, true);

      const res2 = await limiter.limit("check-never-disabled");
      assert.equal(res2.success, false);
      assert.ok(res2.retryAfter > 0);
    });
  });
});
