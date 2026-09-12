import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireVerifiedAuth } from "@/lib/auth";
import { createBudgetSchema } from "@/lib/validations/budget";
import { budgetsWriteLimiter, rateLimitResponse } from "@/lib/ratelimit";

// ─── GET /api/budgets — List user budgets ────────────────────────────

export async function GET() {
  try {
    const auth = await requireVerifiedAuth();

    if (!auth.success) {
      return NextResponse.json(
        { error: auth.error, ...(auth.code && { code: auth.code }) },
        { status: auth.status }
      );
    }

    const budgets = await db.budget.findMany({
      where: { userId: auth.userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        category: true,
        amount: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const serializedBudgets = budgets.map((b) => ({
      ...b,
      amount: Number(b.amount),
    }));

    return NextResponse.json({ budgets: serializedBudgets }, { status: 200 });
  } catch (error) {
    console.error("[BUDGETS_LIST_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// ─── POST /api/budgets — Create budget ───────────────────────────────

export async function POST(request: Request) {
  try {
    const auth = await requireVerifiedAuth();

    if (!auth.success) {
      return NextResponse.json(
        { error: auth.error, ...(auth.code && { code: auth.code }) },
        { status: auth.status }
      );
    }

    // Rate limiting: 30 writes / 1 min per authenticated user
    const rateLimit = await budgetsWriteLimiter.check(auth.userId);
    if (!rateLimit.success) {
      return rateLimitResponse(rateLimit);
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("[BUDGET_CREATE_PARSE_ERROR]", parseError);
      return NextResponse.json(
        { error: "Invalid JSON request body" },
        { status: 400 }
      );
    }

    const result = createBudgetSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0]?.[0] || "Validation failed";
      return NextResponse.json(
        { error: firstError, details: errors },
        { status: 400 }
      );
    }

    const { category, amount } = result.data;

    // Check for duplicate category budget using findFirst for robust querying
    const existing = await db.budget.findFirst({
      where: {
        userId: auth.userId,
        category,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: `A budget for "${category}" already exists. Edit it instead.` },
        { status: 409 }
      );
    }

    const budget = await db.budget.create({
      data: {
        category,
        amount,
        userId: auth.userId,
      },
      select: {
        id: true,
        category: true,
        amount: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const serializedBudget = {
      ...budget,
      amount: Number(budget.amount),
    };

    return NextResponse.json(
      { message: "Budget created successfully", budget: serializedBudget },
      { status: 201 }
    );
  } catch (error) {
    console.error("[BUDGET_CREATE_ERROR]", error);
    if ((error as { code?: string })?.code === "P2002") {
      return NextResponse.json(
        { error: "A budget for this category already exists. Edit it instead." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
