"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Plus,
  Pencil,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { useTransactions } from "@/hooks/use-transactions";
import { getCategoryConfig, EXPENSE_CATEGORIES } from "@/lib/categories";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Dialog, ConfirmDialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────

interface Budget {
  id: string;
  category: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Animation Variants ──────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

function formatAmount(n: number): string {
  return "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

// ─── Budget Card ─────────────────────────────────────────────────────

interface BudgetCardProps {
  budget: Budget;
  spent: number;
  onEdit: (budget: Budget) => void;
  onDelete: (budget: Budget) => void;
}

function BudgetCard({ budget, spent, onEdit, onDelete }: BudgetCardProps) {
  const config = getCategoryConfig(budget.category);
  const Icon = config.icon;
  const remaining = budget.amount - spent;
  const isOverBudget = spent > budget.amount;
  const percentage = budget.amount > 0 ? Math.min((spent / budget.amount) * 100, 100) : 0;
  const actualPercentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;

  return (
    <motion.div
      variants={item}
      className={cn(
        "group relative p-5 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5",
        isOverBudget
          ? "bg-red-950/40 border border-red-500/30 hover:border-red-500/50"
          : "bg-slate-900/60 border border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700/80"
      )}
    >
      {/* Hover glow */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
          isOverBudget
            ? "bg-gradient-to-br from-red-500/[0.05] via-transparent to-red-500/[0.05]"
            : "bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-teal-500/[0.03]"
        )}
      />

      <div className="relative space-y-4">
        {/* Header: icon + category + actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("p-2.5 rounded-xl border", config.bgColor, `border-${config.iconColor.replace("text-", "")}/20`)}>
              <Icon className={cn("w-[18px] h-[18px]", config.iconColor)} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{budget.category}</p>
              <p className="text-[11px] text-slate-500">Monthly budget</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(budget)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label={`Edit ${budget.category} budget`}
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(budget)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              aria-label={`Delete ${budget.category} budget`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Stats: Budget / Spent / Remaining */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-[11px] text-slate-500 mb-0.5">Budget</p>
            <p className="text-sm font-bold text-white">{formatAmount(budget.amount)}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-500 mb-0.5">Spent</p>
            <p className={cn("text-sm font-bold", isOverBudget ? "text-red-400" : "text-white")}>
              {formatAmount(spent)}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-slate-500 mb-0.5">Remaining</p>
            <p className={cn("text-sm font-bold", isOverBudget ? "text-red-400" : "text-emerald-400")}>
              {isOverBudget ? `-${formatAmount(Math.abs(remaining))}` : formatAmount(remaining)}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className={cn("text-[11px] font-medium", isOverBudget ? "text-red-400" : "text-slate-500")}>
              {actualPercentage.toFixed(0)}% used
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-800/80 overflow-hidden">
            <motion.div
              className={cn("h-full rounded-full", isOverBudget ? "bg-red-500" : "bg-emerald-500")}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </div>

        {/* Over Budget Warning */}
        {isOverBudget && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <p className="text-[11px] font-medium text-red-400">
              Over budget by {formatAmount(Math.abs(remaining))}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Create / Edit Budget Form ───────────────────────────────────────

interface BudgetFormProps {
  mode: "create" | "edit";
  initialCategory?: string;
  initialAmount?: string;
  existingCategories: string[];
  onSubmit: (category: string, amount: number) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

function BudgetForm({
  mode,
  initialCategory = "",
  initialAmount = "",
  existingCategories,
  onSubmit,
  onCancel,
  isSubmitting,
}: BudgetFormProps) {
  const [category, setCategory] = useState(initialCategory);
  const [amount, setAmount] = useState(initialAmount);
  const [error, setError] = useState("");

  // Categories not already budgeted (for create mode)
  const availableCategories = EXPENSE_CATEGORIES.filter(
    (c) => !existingCategories.includes(c) || c === initialCategory
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (mode === "create" && !category) {
      setError("Please select a category");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid amount greater than zero");
      return;
    }

    onSubmit(category, parsedAmount);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Category selector (create mode only) */}
      {mode === "create" && (
        <div className="space-y-2">
          <Label htmlFor="budget-category">Category</Label>
          {availableCategories.length === 0 ? (
            <p className="text-xs text-slate-500">All categories already have budgets.</p>
          ) : (
            <select
              id="budget-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50"
            >
              <option value="" className="bg-slate-900">Select category…</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900">
                  {cat}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {mode === "edit" && (
        <div className="space-y-2">
          <Label>Category</Label>
          <p className="text-sm text-white font-medium">{initialCategory}</p>
        </div>
      )}

      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="budget-amount">Monthly Budget (₹)</Label>
        <Input
          id="budget-amount"
          type="number"
          min="1"
          step="any"
          placeholder="e.g. 5000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          autoFocus={mode === "edit"}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-400 font-medium">{error}</p>
      )}

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-1">
        <Button type="button" variant="outline" size="sm" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" size="sm" isLoading={isSubmitting}>
          {mode === "create" ? "Create Budget" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

// ─── Page ────────────────────────────────────────────────────────────

export default function BudgetsPage() {
  const { categoryBreakdown, statsLoading } = useTransactions();

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dialog state
  const [createOpen, setCreateOpen] = useState(false);
  const [editBudget, setEditBudget] = useState<Budget | null>(null);
  const [deleteBudget, setDeleteBudget] = useState<Budget | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Build a map from category → spent this month (from existing hook data)
  const spentByCategory = new Map<string, number>();
  for (const cat of categoryBreakdown) {
    spentByCategory.set(cat.name, cat.value);
  }

  const existingCategories = budgets.map((b) => b.category);

  // ─── Fetch budgets ─────────────────────────────────────────────────

  const fetchBudgets = useCallback(async () => {
    try {
      const res = await fetch("/api/budgets", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        setBudgets(data.budgets ?? []);
      }
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  // ─── Create Budget ─────────────────────────────────────────────────

  async function handleCreate(category: string, amount: number) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, amount }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to create budget");
        return;
      }
      toast.success("Budget created!", {
        description: `${category} — ${formatAmount(amount)}/month`,
      });
      setCreateOpen(false);
      fetchBudgets();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // ─── Edit Budget ───────────────────────────────────────────────────

  async function handleEdit(category: string, amount: number) {
    if (!editBudget) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/budgets/${editBudget.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to update budget");
        return;
      }
      toast.success("Budget updated!", {
        description: `${category} — ${formatAmount(amount)}/month`,
      });
      setEditBudget(null);
      fetchBudgets();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // ─── Delete Budget ─────────────────────────────────────────────────

  async function handleDelete() {
    if (!deleteBudget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/budgets/${deleteBudget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to delete budget");
        return;
      }
      toast.success("Budget deleted");
      setDeleteBudget(null);
      fetchBudgets();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  // ─── Loading State ─────────────────────────────────────────────────

  if (isLoading || statsLoading) {
    return (
      <div className="space-y-6 max-w-[1400px]">
        <div className="space-y-2 animate-pulse">
          <div className="w-48 h-8 rounded-lg bg-slate-800/80" />
          <div className="w-64 h-4 rounded bg-slate-800/60" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800/80" />
                <div className="space-y-1.5">
                  <div className="w-24 h-4 rounded bg-slate-800/80" />
                  <div className="w-16 h-3 rounded bg-slate-800/60" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="space-y-1">
                    <div className="w-12 h-3 rounded bg-slate-800/60" />
                    <div className="w-16 h-4 rounded bg-slate-800/80" />
                  </div>
                ))}
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800/80" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── Empty State ───────────────────────────────────────────────────

  if (budgets.length === 0) {
    return (
      <>
        <EmptyState
          icon={Wallet}
          title="No Budgets Created"
          description="Set monthly budgets to keep your spending on track. Create category limits to manage your finances better."
          ctaLabel="Create Budget"
          onCtaClick={() => setCreateOpen(true)}
        />

        {/* Create Dialog */}
        <Dialog
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          title="Create Budget"
          description="Set a monthly spending limit for a category"
          maxWidth="max-w-md"
        >
          <BudgetForm
            mode="create"
            existingCategories={existingCategories}
            onSubmit={handleCreate}
            onCancel={() => setCreateOpen(false)}
            isSubmitting={isSubmitting}
          />
        </Dialog>
      </>
    );
  }

  // ─── Main UI ───────────────────────────────────────────────────────

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6 max-w-[1400px]"
      >
        {/* Header */}
        <motion.div variants={item} className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Budgets 💰
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Track your monthly spending limits
            </p>
          </div>
          <Button size="sm" onClick={() => setCreateOpen(true)} aria-label="Create budget">
            <Plus className="w-4 h-4" />
            Create Budget
          </Button>
        </motion.div>

        {/* Budget Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {budgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                spent={spentByCategory.get(budget.category) ?? 0}
                onEdit={setEditBudget}
                onDelete={setDeleteBudget}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Create Budget Dialog */}
      <Dialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create Budget"
        description="Set a monthly spending limit for a category"
        maxWidth="max-w-md"
      >
        <BudgetForm
          key={createOpen ? "create" : "closed"}
          mode="create"
          existingCategories={existingCategories}
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Dialog>

      {/* Edit Budget Dialog */}
      <Dialog
        open={!!editBudget}
        onClose={() => setEditBudget(null)}
        title="Edit Budget"
        description="Update the monthly spending limit"
        maxWidth="max-w-md"
      >
        {editBudget && (
          <BudgetForm
            key={editBudget.id}
            mode="edit"
            initialCategory={editBudget.category}
            initialAmount={String(editBudget.amount)}
            existingCategories={existingCategories}
            onSubmit={handleEdit}
            onCancel={() => setEditBudget(null)}
            isSubmitting={isSubmitting}
          />
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deleteBudget}
        onClose={() => setDeleteBudget(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Budget"
        description={
          deleteBudget
            ? `Are you sure you want to delete the "${deleteBudget.category}" budget? This action cannot be undone.`
            : "Are you sure you want to delete this budget?"
        }
        confirmLabel="Delete"
      />
    </>
  );
}
