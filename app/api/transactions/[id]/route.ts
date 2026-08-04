import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthFromCookies } from "@/lib/auth";
import { updateTransactionSchema } from "@/lib/validations/transaction";

// ─── GET /api/transactions/[id] — Get single transaction ────────────

export async function GET(
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

    const transaction = await db.transaction.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        amount: true,
        type: true,
        category: true,
        note: true,
        date: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
    });

    if (!transaction || transaction.userId !== payload.userId) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId: _, ...transactionData } = transaction;

    return NextResponse.json({ transaction: transactionData }, { status: 200 });
  } catch (error) {
    console.error("[TRANSACTION_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// ─── PATCH /api/transactions/[id] — Update transaction ──────────────

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
    const existing = await db.transaction.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!existing || existing.userId !== payload.userId) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Validate input
    const result = updateTransactionSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Build update data
    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.amount !== undefined) updateData.amount = data.amount;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.note !== undefined) updateData.note = data.note || null;
    if (data.date !== undefined) updateData.date = new Date(data.date);

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    const transaction = await db.transaction.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        title: true,
        amount: true,
        type: true,
        category: true,
        note: true,
        date: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      { message: "Transaction updated successfully", transaction },
      { status: 200 }
    );
  } catch (error) {
    console.error("[TRANSACTION_UPDATE_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// ─── DELETE /api/transactions/[id] — Delete transaction ─────────────

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
    const existing = await db.transaction.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!existing || existing.userId !== payload.userId) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    await db.transaction.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[TRANSACTION_DELETE_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
