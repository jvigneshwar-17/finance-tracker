"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeftRight,
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";
import {
  AddTransactionDialog,
  EditTransactionDialog,
  DeleteTransactionDialog,
} from "@/components/dashboard/transaction-dialogs";
import { getCategoryConfig } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/use-transactions";
import type { Transaction } from "@/hooks/use-transactions";

// ─── Types ────────────────────────────────────────────────────────────

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Skeleton ─────────────────────────────────────────────────────────

function TransactionListSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 rounded-xl animate-pulse"
          style={{ background: "var(--surface-inner)" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl" style={{ background: "var(--skeleton)" }} />
            <div>
              <div className="w-36 h-3.5 rounded mb-1.5" style={{ background: "var(--skeleton)" }} />
              <div className="w-24 h-2.5 rounded" style={{ background: "var(--skeleton-soft)" }} />
            </div>
          </div>
          <div className="w-20 h-4 rounded" style={{ background: "var(--skeleton)" }} />
        </div>
      ))}
    </div>
  );
}

// ─── Row Action Menu ──────────────────────────────────────────────────

interface RowActionsProps {
  tx: Transaction;
  onEdit: (tx: Transaction) => void;
  onDelete: (tx: Transaction) => void;
}

function RowActions({ tx, onEdit, onDelete }: RowActionsProps) {
  const [open, setOpen] = useState(false);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      const target = e.target as Element;
      if (!target.closest(`[data-actions="${tx.id}"]`)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, tx.id]);

  return (
    <div className="relative" data-actions={tx.id}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className={cn(
          "p-1.5 rounded-lg text-muted-foreground transition-colors",
          "hover:text-foreground hover:bg-secondary/60",
          "focus:outline-none focus:ring-2 focus:ring-emerald-500/40",
          "opacity-0 group-hover:opacity-100 focus:opacity-100"
        )}
        aria-label="Transaction actions"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-8 z-20 min-w-[120px] rounded-xl border border-border bg-card shadow-xl shadow-black/20 overflow-hidden animate-in"
        >
          <button
            role="menuitem"
            onClick={(e) => { e.stopPropagation(); setOpen(false); onEdit(tx); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-foreground/70 hover:bg-secondary/60 hover:text-foreground transition-colors"
          >
            <Pencil className="w-3.5 h-3.5 text-emerald-400" />
            Edit
          </button>
          <button
            role="menuitem"
            onClick={(e) => { e.stopPropagation(); setOpen(false); onDelete(tx); }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────

export default function TransactionsPage() {
  const { refreshAll } = useTransactions();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Dialog state
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Transaction | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Transaction | null>(null);

  // Fetch transactions
  useEffect(() => {
    let cancelled = false;

    async function loadTransactions() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/transactions?page=${page}&limit=10&sort=date&order=desc`,
          { cache: "no-store", headers: { "Cache-Control": "no-cache" } }
        );
        if (cancelled) return;
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            setTransactions(data.transactions);
            setPagination(data.pagination);
          }
        } else {
          if (!cancelled) toast.error("Failed to load transactions");
        }
      } catch {
        if (!cancelled) toast.error("Network error");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadTransactions();
    return () => { cancelled = true; };
  }, [page]);

  // Refresh after any mutation
  function refresh() {
    refreshAll();
    setIsLoading(true);
    let cancelled = false;
    async function reload() {
      try {
        const res = await fetch(
          `/api/transactions?page=${page}&limit=10&sort=date&order=desc`,
          { cache: "no-store", headers: { "Cache-Control": "no-cache" } }
        );
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (!cancelled) {
          setTransactions(data.transactions);
          setPagination(data.pagination);
        }
      } catch {
        // silent
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    reload();
    return () => { cancelled = true; };
  }

  function refreshAndReset() {
    refreshAll();
    setPage(1);
    setIsLoading(true);
    let cancelled = false;
    async function reload() {
      try {
        const res = await fetch(
          `/api/transactions?page=1&limit=10&sort=date&order=desc`,
          { cache: "no-store", headers: { "Cache-Control": "no-cache" } }
        );
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (!cancelled) {
          setTransactions(data.transactions);
          setPagination(data.pagination);
        }
      } catch {
        // silent
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    reload();
    return () => { cancelled = true; };
  }

  // Empty state
  if (!isLoading && transactions.length === 0 && page === 1) {
    return (
      <>
        <EmptyState
          icon={ArrowLeftRight}
          title="No Transactions Yet"
          description="Start tracking your income and expenses. Add your first transaction to see your financial activity here."
          ctaLabel="Add Transaction"
          onCtaClick={() => setAddOpen(true)}
        />
        <AddTransactionDialog
          open={addOpen}
          onClose={() => setAddOpen(false)}
          onSuccess={refreshAndReset}
        />
      </>
    );
  }

  return (
    <>
      <div className="space-y-6 max-w-[1000px]">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              Transactions
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {pagination
                ? `${pagination.total} total transaction${pagination.total !== 1 ? "s" : ""}`
                : "Loading…"}
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setAddOpen(true)}
            aria-label="Add transaction"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </Button>
        </div>

        {/* Transaction List */}
        {isLoading ? (
          <TransactionListSkeleton />
        ) : (
          <div className="space-y-2">
            {transactions.map((tx) => {
              const catConfig = getCategoryConfig(tx.category);
              const Icon = catConfig.icon;

              return (
                <div
                  key={tx.id}
                  className="group relative flex items-center justify-between p-4 rounded-xl border border-border hover:bg-secondary/40 hover:border-border transition-all"
                  style={{ background: "var(--surface-inner)" }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        "p-2.5 rounded-xl shrink-0",
                        catConfig.bgColor,
                        catConfig.iconColor
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-medium text-foreground truncate block">
                        {tx.title}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-muted-foreground">
                          {tx.category}
                        </span>
                        <span className="text-muted-foreground/40">•</span>
                        <span className="text-[11px] text-muted-foreground">
                          {formatDate(tx.date)}
                        </span>
                        {tx.note && (
                          <>
                            <span className="text-muted-foreground/40">•</span>
                            <span className="text-[11px] text-muted-foreground/60 truncate max-w-[120px]">
                              {tx.note}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        tx.type === "income"
                          ? "text-emerald-400"
                          : "text-foreground"
                      )}
                    >
                      {tx.type === "income" ? "+" : "-"}₹
                      {tx.amount.toLocaleString("en-IN")}
                    </p>
                    <div
                      className={cn(
                        "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider",
                        tx.type === "income"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      )}
                    >
                      {tx.type === "income" ? (
                        <ArrowDownLeft className="w-3 h-3" />
                      ) : (
                        <ArrowUpRight className="w-3 h-3" />
                      )}
                    </div>

                    {/* Row actions */}
                    <RowActions
                      tx={tx}
                      onEdit={setEditTarget}
                      onDelete={setDeleteTarget}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={page >= pagination.totalPages}
                className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <AddTransactionDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={refreshAndReset}
      />
      <EditTransactionDialog
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        onSuccess={refresh}
        transaction={editTarget}
      />
      <DeleteTransactionDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onSuccess={refresh}
        transaction={deleteTarget}
      />
    </>
  );
}
