import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  hashPassword,
  generateSecureToken,
  hashToken,
} from "@/lib/auth";
import { signUpSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const result = signUpSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Check for existing user
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const emailVerificationToken = generateSecureToken();
    const emailVerificationTokenHash = hashToken(emailVerificationToken);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerificationTokenHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        currency: true,
        country: true,
        timezone: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    // Email integration point — send verification email here
    // NOTE: Token is intentionally NOT logged to prevent exposure in production logs
    console.info(`[EMAIL VERIFICATION] Verification email requested for ${email}`);

    return NextResponse.json(
      {
        message:
          "Account created successfully. Please check your email to verify your account before logging in.",
        user,
        requiresVerification: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
