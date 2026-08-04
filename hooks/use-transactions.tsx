"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { toast } from "sonner";
import { getCategoryHexColor } from "@/lib/categories";

// ─── Types ───────────────────────────────────────────────────────────

export interface Transaction {
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

export interface TransactionStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  monthlySavings: number;
}

export interface SpendingTrendPoint {
  month: string;
  spending: number;
}

export interface CategoryPiePoint {
  name: string;
  value: number;
  color: string;
}

export interface IncomeExpenseBarPoint {
  month: string;
  income: number;
  expenses: number;
}

export interface SpendingInsightsData {
  monthOverMonthPercentChange: number | null;
  monthOverMonthDifference: number;
  monthOverMonthDirection: "increase" | "decrease" | "same" | "no_prev_data";
  largestCategory: { name: string; amount: number } | null;
  monthlySavings: number;
  highestExpenseTx: { title: string; amount: number } | null;
  totalMonthTransactions: number;
  avgDailySpending: number;
  activeSpendingDays: number;
}

interface TransactionsContextValue {
  // State
  recent: Transaction[];
  recentLoading: boolean;
  stats: TransactionStats;
  statsLoading: boolean;
  spendingTrend: SpendingTrendPoint[];
  categoryBreakdown: CategoryPiePoint[];
  incomeVsExpense: IncomeExpenseBarPoint[];
  insights: SpendingInsightsData;
  // Mutators
  refreshRecent: () => void;
  refreshStats: () => void;
  refreshAll: () => void;
}

// ─── Context ─────────────────────────────────────────────────────────

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

// ─── Stats & Chart Calculators ───────────────────────────────────────

function calcStats(transactions: Transaction[]): TransactionStats {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  let totalIncome = 0;
  let totalExpense = 0;
  let monthlyIncome = 0;
  let monthlyExpense = 0;

  for (const tx of transactions) {
    const txDate = new Date(tx.date);
    const amount = Number(tx.amount) || 0;
    const isThisMonth =
      txDate.getFullYear() === currentYear && txDate.getMonth() === currentMonth;

    if (tx.type === "income") {
      totalIncome += amount;
      if (isThisMonth) monthlyIncome += amount;
    } else {
      totalExpense += amount;
      if (isThisMonth) monthlyExpense += amount;
    }
  }

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    monthlyIncome,
    monthlyExpense,
    monthlySavings: monthlyIncome - monthlyExpense,
  };
}

function calcSpendingTrend(transactions: Transaction[]): SpendingTrendPoint[] {
  const now = new Date();
  const monthKeys: string[] = [];
  const spendingMap = new Map<string, number>();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleDateString("en-US", { month: "short" });
    monthKeys.push(key);
    spendingMap.set(key, 0);
  }

  for (const tx of transactions) {
    if (tx.type !== "expense") continue;
    const d = new Date(tx.date);
    const key = d.toLocaleDateString("en-US", { month: "short" });
    if (spendingMap.has(key)) {
      spendingMap.set(key, (spendingMap.get(key) || 0) + Number(tx.amount));
    }
  }

  return monthKeys.map((key) => ({
    month: key,
    spending: spendingMap.get(key) || 0,
  }));
}

function calcCategoryPie(transactions: Transaction[]): CategoryPiePoint[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const categoryMap = new Map<string, number>();

  for (const tx of transactions) {
    if (tx.type !== "expense") continue;
    const txDate = new Date(tx.date);
    if (txDate.getFullYear() === currentYear && txDate.getMonth() === currentMonth) {
      categoryMap.set(tx.category, (categoryMap.get(tx.category) || 0) + Number(tx.amount));
    }
  }

  // Fallback to all-time expense categories if current month has no expenses
  if (categoryMap.size === 0) {
    for (const tx of transactions) {
      if (tx.type !== "expense") continue;
      categoryMap.set(tx.category, (categoryMap.get(tx.category) || 0) + Number(tx.amount));
    }
  }

  const result: CategoryPiePoint[] = [];
  categoryMap.forEach((val, cat) => {
    result.push({
      name: cat,
      value: val,
      color: getCategoryHexColor(cat),
    });
  });

  return result.sort((a, b) => b.value - a.value);
}

function calcIncomeExpense(transactions: Transaction[]): IncomeExpenseBarPoint[] {
  const now = new Date();
  const monthKeys: string[] = [];
  const incomeMap = new Map<string, number>();
  const expenseMap = new Map<string, number>();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleDateString("en-US", { month: "short" });
    monthKeys.push(key);
    incomeMap.set(key, 0);
    expenseMap.set(key, 0);
  }

  for (const tx of transactions) {
    const d = new Date(tx.date);
    const key = d.toLocaleDateString("en-US", { month: "short" });
    const amount = Number(tx.amount) || 0;
    if (monthKeys.includes(key)) {
      if (tx.type === "income") {
        incomeMap.set(key, (incomeMap.get(key) || 0) + amount);
      } else {
        expenseMap.set(key, (expenseMap.get(key) || 0) + amount);
      }
    }
  }

  return monthKeys.map((key) => ({
    month: key,
    income: incomeMap.get(key) || 0,
    expenses: expenseMap.get(key) || 0,
  }));
}

function calcSpendingInsights(
  transactions: Transaction[],
  monthlySavings: number
): SpendingInsightsData {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const prevYear = prevMonthDate.getFullYear();
  const prevMonth = prevMonthDate.getMonth();

  let currExpenseTotal = 0;
  let prevExpenseTotal = 0;
  let totalMonthTransactions = 0;
  let highestExpenseTx: { title: string; amount: number } | null = null;
  const categoryMap = new Map<string, number>();
  const activeDaysSet = new Set<string>();

  for (const tx of transactions) {
    const d = new Date(tx.date);
    const y = d.getFullYear();
    const m = d.getMonth();
    const amount = Number(tx.amount) || 0;

    const isCurrentMonth = y === currentYear && m === currentMonth;
    const isPrevMonth = y === prevYear && m === prevMonth;

    if (isCurrentMonth) {
      totalMonthTransactions++;
      if (tx.type === "expense") {
        currExpenseTotal += amount;
        categoryMap.set(tx.category, (categoryMap.get(tx.category) || 0) + amount);

        const dayKey = `${y}-${m}-${d.getDate()}`;
        activeDaysSet.add(dayKey);

        if (!highestExpenseTx || amount > highestExpenseTx.amount) {
          highestExpenseTx = { title: tx.title, amount };
        }
      }
    } else if (isPrevMonth) {
      if (tx.type === "expense") {
        prevExpenseTotal += amount;
      }
    }
  }

  let monthOverMonthPercentChange: number | null = null;
  let monthOverMonthDifference = 0;
  let monthOverMonthDirection: "increase" | "decrease" | "same" | "no_prev_data" = "no_prev_data";

  if (prevExpenseTotal > 0) {
    monthOverMonthDifference = currExpenseTotal - prevExpenseTotal;
    const diffPercent = (monthOverMonthDifference / prevExpenseTotal) * 100;
    monthOverMonthPercentChange = Math.abs(diffPercent);

    if (diffPercent > 0) monthOverMonthDirection = "increase";
    else if (diffPercent < 0) monthOverMonthDirection = "decrease";
    else monthOverMonthDirection = "same";
  }

  let largestCategory: { name: string; amount: number } | null = null;
  let maxCatAmount = 0;
  categoryMap.forEach((amount, name) => {
    if (amount > maxCatAmount) {
      maxCatAmount = amount;
      largestCategory = { name, amount };
    }
  });

  const activeSpendingDays = activeDaysSet.size;
  const avgDailySpending = activeSpendingDays > 0 ? Math.round(currExpenseTotal / activeSpendingDays) : 0;

  return {
    monthOverMonthPercentChange,
    monthOverMonthDifference: Math.abs(monthOverMonthDifference),
    monthOverMonthDirection,
    largestCategory,
    monthlySavings,
    highestExpenseTx,
    totalMonthTransactions,
    avgDailySpending,
    activeSpendingDays,
  };
}

// ─── Provider ────────────────────────────────────────────────────────

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
  const [recent, setRecent] = useState<Transaction[]>([]);
  const [recentLoading, setRecentLoading] = useState(true);
  const [stats, setStats] = useState<TransactionStats>({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
    monthlySavings: 0,
  });
  const [spendingTrend, setSpendingTrend] = useState<SpendingTrendPoint[]>([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState<CategoryPiePoint[]>([]);
  const [incomeVsExpense, setIncomeVsExpense] = useState<IncomeExpenseBarPoint[]>([]);
  const [insights, setInsights] = useState<SpendingInsightsData>({
    monthOverMonthPercentChange: null,
    monthOverMonthDifference: 0,
    monthOverMonthDirection: "no_prev_data",
    largestCategory: null,
    monthlySavings: 0,
    highestExpenseTx: null,
    totalMonthTransactions: 0,
    avgDailySpending: 0,
    activeSpendingDays: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  const recentVersion = useRef(0);
  const statsVersion = useRef(0);

  const refreshRecent = useCallback(() => {
    const version = ++recentVersion.current;

    async function load() {
      setRecentLoading(true);
      try {
        const res = await fetch("/api/transactions?limit=8&sort=date&order=desc", {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        if (version !== recentVersion.current) return;
        if (res.ok) {
          const data = await res.json();
          if (version === recentVersion.current) {
            setRecent(data.transactions);
          }
        }
      } catch {
        // silently fail — UI renders with empty state
      } finally {
        if (version === recentVersion.current) setRecentLoading(false);
      }
    }

    load();
  }, []);

  const refreshStats = useCallback(() => {
    const version = ++statsVersion.current;

    async function load() {
      setStatsLoading(true);
      try {
        const res = await fetch("/api/transactions?limit=1000&sort=date&order=desc", {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        if (version !== statsVersion.current) return;
        if (res.ok) {
          const data = await res.json();
          if (version === statsVersion.current) {
            const txs: Transaction[] = data.transactions || [];
            const calculatedStats = calcStats(txs);
            setStats(calculatedStats);
            setSpendingTrend(calcSpendingTrend(txs));
            setCategoryBreakdown(calcCategoryPie(txs));
            setIncomeVsExpense(calcIncomeExpense(txs));
            setInsights(calcSpendingInsights(txs, calculatedStats.monthlySavings));
          }
        }
      } catch {
        // silently fail
      } finally {
        if (version === statsVersion.current) setStatsLoading(false);
      }
    }

    load();
  }, []);

  const refreshAll = useCallback(() => {
    refreshRecent();
    refreshStats();
  }, [refreshRecent, refreshStats]);

  // Initial load
  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return (
    <TransactionsContext.Provider
      value={{
        recent,
        recentLoading,
        stats,
        statsLoading,
        spendingTrend,
        categoryBreakdown,
        incomeVsExpense,
        insights,
        refreshRecent,
        refreshStats,
        refreshAll,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────

export function useTransactions(): TransactionsContextValue {
  const ctx = useContext(TransactionsContext);
  if (!ctx) {
    throw new Error("useTransactions must be used within TransactionsProvider");
  }
  return ctx;
}

// ─── CRUD helpers ────────────────────────────────────────────────────

interface CreatePayload {
  title: string;
  amount: number;
  type: string;
  category: string;
  note?: string;
  date: string;
}

type UpdatePayload = Partial<CreatePayload>;

export async function apiCreateTransaction(
  payload: CreatePayload
): Promise<{ ok: true; transaction: Transaction } | { ok: false; error: string }> {
  try {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error ?? "Failed to create transaction" };
    return { ok: true, transaction: data.transaction };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}

export async function apiUpdateTransaction(
  id: string,
  payload: UpdatePayload
): Promise<{ ok: true; transaction: Transaction } | { ok: false; error: string }> {
  try {
    const res = await fetch(`/api/transactions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error ?? "Failed to update transaction" };
    return { ok: true, transaction: data.transaction };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}

export async function apiDeleteTransaction(
  id: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error ?? "Failed to delete transaction" };
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}

export function showApiError(msg: string) {
  toast.error(msg);
}
