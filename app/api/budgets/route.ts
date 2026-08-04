import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthFromCookies } from "@/lib/auth";
import { createBudgetSchema } from "@/lib/validations/budget";

// ─── GET /api/budgets — List user budgets ────────────────────────────

export async function GET() {
  try {
    const payload = await getAuthFromCookies();

    if (!payload) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    console.log("[DEBUG_GET_BUDGETS]", {
      dbExists: !!db,
      budgetExists: !!(db && db.budget),
      payload,
    });

    const budgets = await db.budget.findMany({
      where: { userId: payload.userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        category: true,
        amount: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ budgets }, { status: 200 });
  } catch (error) {
    console.error("[BUDGETS_LIST_ERROR]", error);
    const message = error instanceof Error ? error.message : "Failed to fetch budgets";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// ─── POST /api/budgets — Create budget ───────────────────────────────

export async function POST(request: Request) {
  try {
    const payload = await getAuthFromCookies();

    if (!payload) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
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

    console.log("[DEBUG_POST_BUDGET]", {
      dbExists: !!db,
      budgetExists: !!(db && db.budget),
      payload,
      body: { category, amount },
    });

    // Check for duplicate category budget using findFirst for robust querying
    const existing = await db.budget.findFirst({
      where: {
        userId: payload.userId,
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
        userId: payload.userId,
      },
      select: {
        id: true,
        category: true,
        amount: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      { message: "Budget created successfully", budget },
      { status: 201 }
    );
  } catch (error) {
    console.error("[BUDGET_CREATE_ERROR]", error);
    const message = error instanceof Error ? error.message : "Failed to create budget";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
