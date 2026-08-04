import { z } from "zod";
import { EXPENSE_CATEGORIES } from "@/lib/categories";

// ─── Create Budget Schema ───────────────────────────────────────────

export const createBudgetSchema = z.object({
  category: z
    .string()
    .refine((val) => (EXPENSE_CATEGORIES as readonly string[]).includes(val), {
      message: "Invalid expense category",
    }),
  amount: z.coerce
    .number({ message: "Amount must be a number" })
    .positive("Amount must be greater than zero")
    .max(100_000_000, "Amount is too large"),
});

export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;

// ─── Update Budget Schema ───────────────────────────────────────────

export const updateBudgetSchema = z.object({
  amount: z.coerce
    .number({ message: "Amount must be a number" })
    .positive("Amount must be greater than zero")
    .max(100_000_000, "Amount is too large"),
});

export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;
