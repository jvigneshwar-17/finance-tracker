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
    <div className="space-y-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-xl animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl" style={{ background: "var(--skeleton)" }} />
            <div>
              <div className="w-32 h-3.5 rounded mb-1.5" style={{ background: "var(--skeleton)" }} />
              <div className="w-24 h-2.5 rounded" style={{ background: "var(--skeleton-soft)" }} />
            </div>
          </div>
          <div className="w-16 h-4 rounded" style={{ background: "var(--skeleton)" }} />
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
      description="Add your first transaction to get started."
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
    <div className="p-5 rounded-2xl border border-border backdrop-blur-xl" style={{ background: "var(--surface)" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Recent Transactions</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isLoading ? "Loading..." : `${count} recent transaction${count !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Link
          href="/dashboard/transactions"
          className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors group"
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
        <div className="space-y-1.5">
          {transactions.map((tx) => {
            const catConfig = getCategoryConfig(tx.category);
            const Icon = catConfig.icon;

            return (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/40 transition-colors group/tx cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={cn("p-2 rounded-xl shrink-0 border border-transparent", catConfig.bgColor, catConfig.iconColor)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground truncate">{tx.title}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-muted-foreground">{tx.category}</span>
                      <span className="text-muted-foreground/40">•</span>
                      <span className="text-[11px] text-muted-foreground">{formatTransactionDate(tx.date)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <div className="text-right">
                    <p className={cn(
                      "text-sm font-semibold",
                      tx.type === "income" ? "text-emerald-400" : "text-foreground"
                    )}>
                      {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className={cn(
                    "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider",
                    tx.type === "income"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  )}>
                    {tx.type === "income" ? (
                      <ArrowDownLeft className="w-3 h-3" />
                    ) : (
                      <ArrowUpRight className="w-3 h-3" />
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
