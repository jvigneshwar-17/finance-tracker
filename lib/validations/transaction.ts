import { z } from "zod";
import { CATEGORY_NAMES } from "@/lib/categories";

// ─── Create Transaction Schema ──────────────────────────────────────

export const createTransactionSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim(),
  amount: z
    .number({ message: "Amount must be a number" })
    .positive("Amount must be greater than zero")
    .max(100_000_000, "Amount is too large"),
  type: z.enum(["income", "expense"], {
    message: "Type must be 'income' or 'expense'",
  }),
  category: z
    .string()
    .refine((val) => CATEGORY_NAMES.includes(val), {
      message: "Invalid category",
    }),
  note: z
    .string()
    .max(500, "Note must be less than 500 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  date: z
    .string()
    .datetime({ message: "Date must be a valid ISO date string" })
    .or(z.string().date("Date must be a valid date string")),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

// ─── Update Transaction Schema ──────────────────────────────────────

export const updateTransactionSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim()
    .optional(),
  amount: z
    .number({ message: "Amount must be a number" })
    .positive("Amount must be greater than zero")
    .max(100_000_000, "Amount is too large")
    .optional(),
  type: z
    .enum(["income", "expense"], {
      message: "Type must be 'income' or 'expense'",
    })
    .optional(),
  category: z
    .string()
    .refine((val) => CATEGORY_NAMES.includes(val), {
      message: "Invalid category",
    })
    .optional(),
  note: z
    .string()
    .max(500, "Note must be less than 500 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  date: z
    .string()
    .datetime({ message: "Date must be a valid ISO date string" })
    .or(z.string().date("Date must be a valid date string"))
    .optional(),
});

export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;

// ─── Transaction Query Schema ───────────────────────────────────────

export const transactionQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(1000).default(10),
  type: z.enum(["income", "expense"]).optional(),
  category: z.string().optional(),
  dateFrom: z
    .string()
    .datetime()
    .or(z.string().date())
    .optional(),
  dateTo: z
    .string()
    .datetime()
    .or(z.string().date())
    .optional(),
  search: z.string().max(200).optional(),
  sort: z.enum(["date", "amount", "title", "createdAt"]).default("date"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type TransactionQueryInput = z.infer<typeof transactionQuerySchema>;
