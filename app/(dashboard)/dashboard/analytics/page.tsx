"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  BarChart3,
} from "lucide-react";
import { useTransactions } from "@/hooks/use-transactions";
import { StatCard, SkeletonCard } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { CategoryPieChart } from "@/components/dashboard/charts/category-pie-chart";
import { IncomeExpenseBarChart } from "@/components/dashboard/charts/income-expense-bar-chart";
import { SpendingInsights } from "@/components/dashboard/spending-insights";
import { getCategoryConfig } from "@/lib/categories";
import { cn } from "@/lib/utils";

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

function getCurrentMonthLabel(): string {
  return new Date().toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

// ─── Category Card ───────────────────────────────────────────────────

interface CategoryCardProps {
  name: string;
  amount: number;
  percentage: number;
  rank: number;
}

function CategoryCard({ name, amount, percentage, rank }: CategoryCardProps) {
  const config = getCategoryConfig(name);
  const Icon = config.icon;

  return (
    <motion.div
      variants={item}
      className="group relative p-4 rounded-2xl border border-border backdrop-blur-xl hover:border-border transition-all duration-300 hover:-translate-y-0.5"
      style={{ background: "var(--surface)" }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-teal-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative">
        {/* Top row: icon + rank badge */}
        <div className="flex items-center justify-between mb-3">
          <div className={cn("p-2.5 rounded-xl border", config.bgColor, `border-${config.iconColor.replace("text-", "")}/20`)}>
            <Icon className={cn("w-[18px] h-[18px]", config.iconColor)} />
          </div>
          <span className="text-[11px] font-semibold text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded-full border border-border">
            #{rank}
          </span>
        </div>

        {/* Category name */}
        <p className="text-xs text-muted-foreground font-medium mb-1">{name}</p>

        {/* Amount */}
        <p className="text-xl font-bold text-foreground tracking-tight mb-3">
          {formatAmount(amount)}
        </p>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">
              {percentage.toFixed(1)}% of expenses
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary/80 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: config.colorHex }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(percentage, 100)}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}



// ─── Page ────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const { stats, statsLoading, categoryBreakdown } = useTransactions();

  const savingsRate =
    stats.monthlyIncome > 0
      ? ((stats.monthlySavings / stats.monthlyIncome) * 100)
      : 0;

  const savingsRateDisplay = statsLoading
    ? "—"
    : `${savingsRate >= 0 ? "" : ""}${savingsRate.toFixed(1)}%`;

  // Filter categories that belong to the current month
  // categoryBreakdown from the context is already current-month and sorted desc
  const totalCategoryExpense = categoryBreakdown.reduce((sum, c) => sum + c.value, 0);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-[1400px]"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Analytics 📊
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Financial overview for {getCurrentMonthLabel()}
        </p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <StatCard
              icon={TrendingUp}
              title="Total Income"
              amount={formatAmount(stats.monthlyIncome)}
              trend={{
                value: "This month",
                direction: "up",
                label: "all income sources",
              }}
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10 border-emerald-500/20"
            />
            <StatCard
              icon={TrendingDown}
              title="Total Expense"
              amount={formatAmount(stats.monthlyExpense)}
              trend={{
                value: "This month",
                direction: "down",
                label: "all spending",
              }}
              iconColor="text-red-400"
              iconBg="bg-red-500/10 border-red-500/20"
            />
            <StatCard
              icon={Wallet}
              title="Current Balance"
              amount={formatAmount(stats.monthlySavings)}
              trend={{
                value: "This month",
                direction: stats.monthlySavings >= 0 ? "up" : "down",
                label: "income − expenses",
              }}
              iconColor="text-teal-400"
              iconBg="bg-teal-500/10 border-teal-500/20"
            />
            <StatCard
              icon={PiggyBank}
              title="Savings Rate"
              amount={savingsRateDisplay}
              trend={{
                value: "This month",
                direction: savingsRate >= 0 ? "up" : "down",
                label: stats.monthlyIncome > 0
                  ? "of income saved"
                  : "no income recorded",
              }}
              iconColor="text-[#06b6d4]"
              iconBg="bg-cyan-500/10 border-cyan-500/20"
            />
          </>
        )}
      </motion.div>

      {/* Spending Insights Section */}
      <motion.div variants={item}>
        <SpendingInsights />
      </motion.div>

      {/* Expense Category Pie Chart */}
      <motion.div variants={item}>
        <CategoryPieChart data={categoryBreakdown} />
      </motion.div>

      {/* Monthly Income vs Expenses Bar Chart */}
      <motion.div variants={item}>
        <IncomeExpenseBarChart />
      </motion.div>

      {/* Expenses by Category Section */}
      <motion.div variants={item}>
        <div className="p-5 rounded-2xl border border-border backdrop-blur-xl" style={{ background: "var(--surface)" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Expenses by Category
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {getCurrentMonthLabel()} • Sorted by highest spend
              </p>
            </div>
            {totalCategoryExpense > 0 && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-sm font-bold text-foreground">
                  {formatAmount(totalCategoryExpense)}
                </p>
              </div>
            )}
          </div>

          {statsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-border space-y-3 animate-pulse"
                  style={{ background: "var(--surface-inner)" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl" style={{ background: "var(--skeleton-soft)" }} />
                    <div className="w-8 h-5 rounded-full" style={{ background: "var(--skeleton-soft)" }} />
                  </div>
                  <div className="w-20 h-3 rounded" style={{ background: "var(--skeleton-soft)" }} />
                  <div className="w-24 h-6 rounded" style={{ background: "var(--skeleton-soft)" }} />
                  <div className="w-full h-1.5 rounded-full" style={{ background: "var(--skeleton-soft)" }} />
                </div>
              ))}
            </div>
          ) : categoryBreakdown.length === 0 ? (
            <EmptyState
              icon={BarChart3}
              title="No Expenses This Month"
              description="Start recording expenses to see your category breakdown here."
              compact
              className="py-12"
            />
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
            >
              {categoryBreakdown.map((cat, index) => (
                <CategoryCard
                  key={cat.name}
                  name={cat.name}
                  amount={cat.value}
                  percentage={
                    totalCategoryExpense > 0
                      ? (cat.value / totalCategoryExpense) * 100
                      : 0
                  }
                  rank={index + 1}
                />
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
