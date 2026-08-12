"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Receipt,
  Hash,
  Calendar,
  Sparkles,
} from "lucide-react";
import { useTransactions } from "@/hooks/use-transactions";
import { getCategoryConfig } from "@/lib/categories";
import { cn } from "@/lib/utils";

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

function formatAmount(n: number): string {
  return "₹" + Math.abs(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function SpendingInsights() {
  const { insights, statsLoading } = useTransactions();

  if (statsLoading) {
    return (
      <div className="p-5 rounded-2xl border border-border backdrop-blur-xl space-y-4" style={{ background: "var(--surface)" }}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded animate-pulse" style={{ background: "var(--skeleton)" }} />
          <div className="w-36 h-5 rounded animate-pulse" style={{ background: "var(--skeleton)" }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-border space-y-3 animate-pulse"
              style={{ background: "var(--surface-inner)" }}
            >
              <div className="w-8 h-8 rounded-lg" style={{ background: "var(--skeleton-soft)" }} />
              <div className="w-24 h-3 rounded" style={{ background: "var(--skeleton-soft)" }} />
              <div className="w-32 h-6 rounded" style={{ background: "var(--skeleton-soft)" }} />
              <div className="w-40 h-3 rounded" style={{ background: "var(--skeleton-soft)" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 1. Month Over Month Text & Icon
  let momTitle = "VS LAST MONTH";
  let momValue = "N/A";
  let momSubtitle = "No previous month data available";
  let MomIcon = TrendingUp;
  let momIconColor = "text-muted-foreground";
  let momIconBg = "bg-secondary/60 border-border";
  let momBadgeColor = "text-muted-foreground bg-secondary/80 border-border";

  if (insights.monthOverMonthDirection === "increase") {
    momValue = `+${insights.monthOverMonthPercentChange?.toFixed(1)}%`;
    momSubtitle = `Spent ${formatAmount(insights.monthOverMonthDifference)} more than last month`;
    MomIcon = TrendingUp;
    momIconColor = "text-red-400";
    momIconBg = "bg-red-500/10 border-red-500/20";
    momBadgeColor = "text-red-400 bg-red-500/10 border-red-500/20";
  } else if (insights.monthOverMonthDirection === "decrease") {
    momValue = `-${insights.monthOverMonthPercentChange?.toFixed(1)}%`;
    momSubtitle = `Spent ${formatAmount(insights.monthOverMonthDifference)} less than last month`;
    MomIcon = TrendingDown;
    momIconColor = "text-emerald-400";
    momIconBg = "bg-emerald-500/10 border-emerald-500/20";
    momBadgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  } else if (insights.monthOverMonthDirection === "same") {
    momValue = "0.0%";
    momSubtitle = "Equal spending compared to last month";
    momBadgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  }

  // 2. Largest Category Icon & Details
  const largestCatConfig = insights.largestCategory
    ? getCategoryConfig(insights.largestCategory.name)
    : null;
  const LargestCatIcon = largestCatConfig ? largestCatConfig.icon : Sparkles;

  // 3. Savings Card Text & Formatting
  let savingsValueText = formatAmount(insights.monthlySavings);
  let savingsSubtitle = `You saved ${formatAmount(insights.monthlySavings)} this month.`;
  let savingsBadgeColor = "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";

  if (insights.monthlySavings === 0) {
    savingsValueText = "₹0";
    savingsSubtitle = "You broke even this month.";
    savingsBadgeColor = "text-muted-foreground bg-secondary/80 border-border";
  } else if (insights.monthlySavings < 0) {
    // Do not display negative savings values directly (Math.abs format used)
    savingsValueText = formatAmount(insights.monthlySavings);
    savingsSubtitle = `Overspent by ${formatAmount(insights.monthlySavings)} this month.`;
    savingsBadgeColor = "text-red-400 bg-red-500/10 border-red-500/20";
  }

  // 6. Active Spending Days Text
  let activeDaysText = "No active spending days";
  if (insights.activeSpendingDays === 1) {
    activeDaysText = "Across 1 active spending day";
  } else if (insights.activeSpendingDays > 1) {
    activeDaysText = `Across ${insights.activeSpendingDays} active spending days`;
  }

  return (
    <div className="p-5 rounded-2xl border border-border backdrop-blur-xl space-y-4" style={{ background: "var(--surface)" }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Spending Insights
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Key financial takeaways for this month
          </p>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {/* Card 1: Month-over-Month Comparison */}
        <motion.div
          variants={item}
          className="group relative p-4 rounded-xl border border-border transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: "var(--surface-inner)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={cn("p-2 rounded-lg border", momIconBg)}>
              <MomIcon className={cn("w-4 h-4", momIconColor)} />
            </div>
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", momBadgeColor)}>
              {momTitle}
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-medium mb-0.5">Monthly Spending Change</p>
          <p className="text-xl font-bold text-foreground tracking-tight mb-1">{momValue}</p>
          <p className="text-[11px] text-muted-foreground/70">{momSubtitle}</p>
        </motion.div>

        {/* Card 2: Top Expense Category */}
        <motion.div
          variants={item}
          className="group relative p-4 rounded-xl border border-border transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: "var(--surface-inner)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={cn("p-2 rounded-lg border", largestCatConfig ? largestCatConfig.bgColor : "bg-teal-500/10", largestCatConfig ? `border-${largestCatConfig.iconColor.replace("text-", "")}/20` : "border-teal-500/20")}>
              <LargestCatIcon className={cn("w-4 h-4", largestCatConfig ? largestCatConfig.iconColor : "text-teal-400")} />
            </div>
            <span className="text-[10px] font-semibold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
              TOP CATEGORY
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-medium mb-0.5">Largest Expense Category</p>
          <p className="text-xl font-bold text-foreground tracking-tight mb-1 truncate">
            {insights.largestCategory ? insights.largestCategory.name : "None"}
          </p>
          <p className="text-[11px] text-muted-foreground/70">
            {insights.largestCategory
              ? `${formatAmount(insights.largestCategory.amount)} spent this month`
              : "No expenses recorded this month."}
          </p>
        </motion.div>

        {/* Card 3: Monthly Net Savings */}
        <motion.div
          variants={item}
          className="group relative p-4 rounded-xl border border-border transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: "var(--surface-inner)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <PiggyBank className="w-4 h-4 text-cyan-400" />
            </div>
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", savingsBadgeColor)}>
              NET SAVINGS
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-medium mb-0.5">Monthly Savings</p>
          <p className="text-xl font-bold text-foreground tracking-tight mb-1">
            {savingsValueText}
          </p>
          <p className="text-[11px] text-muted-foreground/70">{savingsSubtitle}</p>
        </motion.div>

        {/* Card 4: Highest Single Expense */}
        <motion.div
          variants={item}
          className="group relative p-4 rounded-xl border border-border transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: "var(--surface-inner)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Receipt className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-[10px] font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              PEAK EXPENSE
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-medium mb-0.5">Highest Single Expense</p>
          <p className="text-xl font-bold text-foreground tracking-tight mb-1">
            {insights.highestExpenseTx ? formatAmount(insights.highestExpenseTx.amount) : "₹0"}
          </p>
          <p className="text-[11px] text-muted-foreground/70 truncate">
            {insights.highestExpenseTx ? `"${insights.highestExpenseTx.title}"` : "No expense transactions."}
          </p>
        </motion.div>

        {/* Card 5: Total Transactions Count */}
        <motion.div
          variants={item}
          className="group relative p-4 rounded-xl border border-border transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: "var(--surface-inner)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Hash className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              ACTIVITY
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-medium mb-0.5">Total Transactions</p>
          <p className="text-xl font-bold text-foreground tracking-tight mb-1">
            {insights.totalMonthTransactions}
          </p>
          <p className="text-[11px] text-muted-foreground/70">
            {insights.totalMonthTransactions === 0 ? "No transactions recorded this month" : "Income & expense records this month"}
          </p>
        </motion.div>

        {/* Card 6: Average Spending Per Active Spending Day */}
        <motion.div
          variants={item}
          className="group relative p-4 rounded-xl border border-border transition-all duration-300 hover:-translate-y-0.5"
          style={{ background: "var(--surface-inner)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Calendar className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
              ACTIVE PACE
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-medium mb-0.5">Avg. Daily Spending</p>
          <p className="text-xl font-bold text-foreground tracking-tight mb-1">
            {formatAmount(insights.avgDailySpending)} <span className="text-xs font-normal text-muted-foreground">/ day</span>
          </p>
          <p className="text-[11px] text-muted-foreground/70">{activeDaysText}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
