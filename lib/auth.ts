import { hash, compare } from "bcryptjs";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { verifyToken, type JwtPayload } from "./jwt";

export { generateToken, verifyToken, type JwtPayload } from "./jwt";

const SALT_ROUNDS = 12;
const COOKIE_NAME = "auth-token";

// ─── Password Hashing ───────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}

// ─── Cookie Management ───────────────────────────────────────────────

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getAuthFromCookies(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  return verifyToken(token);
}

export type VerifiedAuthResult =
  | { success: true; userId: string; email: string }
  | { success: false; status: 401 | 403; error: string; code?: string };

/**
 * Validates session token and checks email verification status directly against
 * the database (JWT contains only identity information).
 */
export async function requireVerifiedAuth(): Promise<VerifiedAuthResult> {
  const payload = await getAuthFromCookies();
  if (!payload) {
    return { success: false, status: 401, error: "Not authenticated" };
  }

  const user = await db.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, emailVerified: true },
  });

  if (!user) {
    return { success: false, status: 401, error: "User not found" };
  }

  if (!user.emailVerified) {
    return {
      success: false,
      status: 403,
      error: "Please verify your email address before accessing this resource.",
      code: "EMAIL_VERIFICATION_REQUIRED",
    };
  }

  return { success: true, userId: user.id, email: user.email };
}

// ─── Token Generation & Hashing for Reset / Verification ─────────────

export { generateSecureToken, hashToken } from "./tokens";
