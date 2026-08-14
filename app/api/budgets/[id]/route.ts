import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthFromCookies } from "@/lib/auth";
import { updateBudgetSchema } from "@/lib/validations/budget";

// ─── PATCH /api/budgets/[id] — Update budget ────────────────────────

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getAuthFromCookies();

    if (!payload) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Check ownership
    const existing = await db.budget.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!existing || existing.userId !== payload.userId) {
      return NextResponse.json(
        { error: "Budget not found" },
        { status: 404 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("[BUDGET_UPDATE_PARSE_ERROR]", parseError);
      return NextResponse.json(
        { error: "Invalid JSON request body" },
        { status: 400 }
      );
    }

    const result = updateBudgetSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0]?.[0] || "Validation failed";
      return NextResponse.json(
        { error: firstError, details: errors },
        { status: 400 }
      );
    }

    const budget = await db.budget.update({
      where: { id },
      data: { amount: result.data.amount },
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
      { message: "Budget updated successfully", budget: serializedBudget },
      { status: 200 }
    );
  } catch (error) {
    console.error("[BUDGET_UPDATE_ERROR]", error);
    const message = error instanceof Error ? error.message : "Failed to update budget";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// ─── DELETE /api/budgets/[id] — Delete budget ────────────────────────

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getAuthFromCookies();

    if (!payload) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Check ownership
    const existing = await db.budget.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!existing || existing.userId !== payload.userId) {
      return NextResponse.json(
        { error: "Budget not found" },
        { status: 404 }
      );
    }

    await db.budget.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Budget deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[BUDGET_DELETE_ERROR]", error);
    const message = error instanceof Error ? error.message : "Failed to delete budget";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
