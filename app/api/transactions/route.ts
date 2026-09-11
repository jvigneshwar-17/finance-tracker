import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireVerifiedAuth } from "@/lib/auth";
import {
  createTransactionSchema,
  transactionQuerySchema,
} from "@/lib/validations/transaction";
import { transactionsWriteLimiter, rateLimitResponse } from "@/lib/ratelimit";

// ─── GET /api/transactions — List transactions ──────────────────────

export async function GET(request: NextRequest) {
  try {
    const auth = await requireVerifiedAuth();

    if (!auth.success) {
      return NextResponse.json(
        { error: auth.error, ...(auth.code && { code: auth.code }) },
        { status: auth.status }
      );
    }

    // Parse query parameters
    const { searchParams } = request.nextUrl;
    const queryResult = transactionQuerySchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      type: searchParams.get("type") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      dateFrom: searchParams.get("dateFrom") ?? undefined,
      dateTo: searchParams.get("dateTo") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
      order: searchParams.get("order") ?? undefined,
    });

    if (!queryResult.success) {
      const errors = queryResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Invalid query parameters", details: errors },
        { status: 400 }
      );
    }

    const { page, limit, type, category, dateFrom, dateTo, search, sort, order } =
      queryResult.data;

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {
      userId: auth.userId,
    };

    if (type) {
      where.type = type;
    }

    if (category) {
      where.category = category;
    }

    if (dateFrom || dateTo) {
      where.date = {};
      if (dateFrom) {
        where.date.gte = new Date(dateFrom);
      }
      if (dateTo) {
        where.date.lte = new Date(dateTo);
      }
    }

    if (search) {
      where.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    // Build orderBy
    const orderBy: Record<string, string> = {
      [sort]: order,
    };

    // Execute query with pagination
    const skip = (page - 1) * limit;

    const [transactions, total] = await Promise.all([
      db.transaction.findMany({
        where,
        orderBy,
        skip,
        take: limit,
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
      }),
      db.transaction.count({ where }),
    ]);

    const serializedTransactions = transactions.map((tx) => ({
      ...tx,
      amount: Number(tx.amount),
    }));

    return NextResponse.json(
      {
        transactions: serializedTransactions,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[TRANSACTIONS_LIST_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// ─── POST /api/transactions — Create transaction ────────────────────

export async function POST(request: Request) {
  try {
    const auth = await requireVerifiedAuth();

    if (!auth.success) {
      return NextResponse.json(
        { error: auth.error, ...(auth.code && { code: auth.code }) },
        { status: auth.status }
      );
    }

    // Rate limiting: 60 writes / 1 min per authenticated user
    const rateLimit = await transactionsWriteLimiter.check(auth.userId);
    if (!rateLimit.success) {
      return rateLimitResponse(rateLimit);
    }

    const body = await request.json();

    // Validate input
    const result = createTransactionSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const { title, amount, type, category, note, date } = result.data;

    const transaction = await db.transaction.create({
      data: {
        title,
        amount,
        type,
        category,
        note: note || null,
        date: new Date(date),
        userId: auth.userId,
      },
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

    const serializedTransaction = {
      ...transaction,
      amount: Number(transaction.amount),
    };

    return NextResponse.json(
      { message: "Transaction created successfully", transaction: serializedTransaction },
      { status: 201 }
    );
  } catch (error) {
    console.error("[TRANSACTION_CREATE_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
