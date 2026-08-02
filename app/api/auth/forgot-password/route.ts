import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateSecureToken } from "@/lib/auth";
import { forgotPasswordSchema } from "@/lib/validations/auth";

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

    // Find user (don't reveal whether user exists)
    const user = await db.user.findUnique({
      where: { email },
    });

    if (user) {
      // Generate reset token with 1 hour expiry
      const resetToken = generateSecureToken();
      const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await db.user.update({
        where: { id: user.id },
        data: {
          passwordResetToken: resetToken,
          passwordResetExpires: resetExpires,
        },
      });

      // Log reset URL (email integration point)
      const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
      console.log(`[PASSWORD RESET] URL for ${email}: ${resetUrl}`);
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
