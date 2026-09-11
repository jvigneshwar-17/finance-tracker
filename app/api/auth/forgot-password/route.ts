import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateSecureToken, hashToken } from "@/lib/auth";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import {
  getClientIp,
  normalizeEmail,
  forgotPasswordLimiter,
  rateLimitResponse,
} from "@/lib/ratelimit";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const result = forgotPasswordSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Rate limiting: 3 requests / 15 min per IP + normalized email
    const clientIp = getClientIp(request);
    const normalized = normalizeEmail(email);
    const rateLimit = await forgotPasswordLimiter.check(`${clientIp}:${normalized}`);
    if (!rateLimit.success) {
      return rateLimitResponse(rateLimit);
    }

    // Find user (don't reveal whether user exists)
    const user = await db.user.findUnique({
      where: { email },
    });

    if (user) {
      // Generate reset token with 1 hour expiry
      const resetToken = generateSecureToken();
      const resetTokenHash = hashToken(resetToken);
      const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await db.user.update({
        where: { id: user.id },
        data: {
          passwordResetTokenHash: resetTokenHash,
          passwordResetExpires: resetExpires,
        },
      });

      // Email integration point — send password reset email here
      // NOTE: Token is intentionally NOT logged to prevent exposure in production logs
      console.info(`[PASSWORD RESET] Reset email requested for ${email}`);
    }

    // Always return success to prevent email enumeration
    return NextResponse.json(
      {
        message:
          "If an account with that email exists, we sent a password reset link.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[FORGOT_PASSWORD_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
