"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getCategoryConfig } from "@/lib/categories";
import {
  ArrowRight,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
} from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";

// ─── Types ──────────────────────────────────────────────────────────

export interface TransactionData {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  note: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface RecentTransactionsProps {
  transactions?: TransactionData[];
  isLoading?: boolean;
  onAdd?: () => void;
}

// ─── Date Formatter ─────────────────────────────────────────────────

function formatTransactionDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const txDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (txDate.getTime() === today.getTime()) {
    return `Today, ${date.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true })}`;
  }
  if (txDate.getTime() === yesterday.getTime()) {
    return `Yesterday, ${date.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true })}`;
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

// ─── Loading Skeleton ───────────────────────────────────────────────

function TransactionSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/[0.06]" />
            <div>
              <div className="w-32 h-3.5 rounded bg-white/[0.05] mb-1.5" />
              <div className="w-24 h-2.5 rounded bg-white/[0.03]" />
            </div>
          </div>
          <div className="w-16 h-4 rounded bg-white/[0.06]" />
        </div>
      ))}
    </div>
  );
}

// ─── Empty State ────────────────────────────────────────────────────

function TransactionsEmpty({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={ArrowLeftRight}
      title="No Transactions Yet"
      description="Add your first transaction to view your real-time cash flow."
      ctaLabel="+ Add Transaction"
      onCtaClick={onAdd}
      compact
    />
  );
}

// ─── Main Component ─────────────────────────────────────────────────

export function RecentTransactions({ transactions, isLoading, onAdd }: RecentTransactionsProps) {
  const hasData = transactions && transactions.length > 0;
  const count = transactions?.length ?? 0;

  return (
    <div className="p-5 sm:p-6 rounded-2xl glass-fintech border border-white/[0.08] relative overflow-hidden">
      {/* Top subtle glare */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-white font-heading tracking-wide">Recent Transactions</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {isLoading ? "Loading records..." : `${count} recorded entry${count !== 1 ? "ies" : ""}`}
          </p>
        </div>
        <Link
          href="/dashboard/transactions"
          className="flex items-center gap-1.5 text-xs text-[#00F0FF] hover:text-[#3bf4ff] font-semibold transition-colors group focus:outline-none focus-visible:underline"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {isLoading ? (
        <TransactionSkeleton />
      ) : !hasData ? (
        <TransactionsEmpty onAdd={onAdd} />
      ) : (
        <div className="space-y-2">
          {transactions.map((tx) => {
            const catConfig = getCategoryConfig(tx.category);
            const Icon = catConfig.icon;
            const isIncome = tx.type === "income";

            return (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.08] transition-all group/tx"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={cn("p-2 rounded-xl shrink-0 border border-white/[0.06]", catConfig.bgColor, catConfig.iconColor)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-white truncate font-heading group-hover/tx:text-[#00F0FF] transition-colors">
                        {tx.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-slate-400">{tx.category}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[11px] text-slate-400 font-telemetry">{formatTransactionDate(tx.date)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 ml-3">
                  <div className="text-right">
                    <p
                      className={cn(
                        "text-xs sm:text-sm font-bold font-telemetry tnum",
                        isIncome ? "text-emerald-400" : "text-white"
                      )}
                    >
                      {isIncome ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "p-1 rounded-md text-[10px] font-bold border",
                      isIncome
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    )}
                  >
                    {isIncome ? (
                      <ArrowDownLeft className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
