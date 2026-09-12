import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  verifyPassword,
  generateToken,
  setAuthCookie,
} from "@/lib/auth";
import { loginSchema } from "@/lib/validations/auth";
import {
  getClientIp,
  normalizeEmail,
  loginLimiter,
  rateLimitResponse,
} from "@/lib/ratelimit";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Rate limiting: 5 attempts / 15 min per IP + normalized email
    const clientIp = getClientIp(request);
    const normalized = normalizeEmail(email);
    const rateLimit = await loginLimiter.check(`${clientIp}:${normalized}`);
    if (!rateLimit.success) {
      return rateLimitResponse(rateLimit);
    }

    // Find user
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Prevent timing-based user enumeration via dummy bcrypt hash verification
      await verifyPassword(
        password,
        "$2b$12$QP0s6dg7JJgcUfnU5Ur0/OgoZ5dEddQwSJJyt6dynm7Usf3/pmx9i"
      );
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT and set cookie
    const token = await generateToken({ userId: user.id, email: user.email });
    await setAuthCookie(token);

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "Login successful", user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
