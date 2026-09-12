"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Target,
  Plus,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useTransactions } from "@/hooks/use-transactions";
import { StatCard, SkeletonCard } from "@/components/dashboard/stat-card";
import { SpendingLineChart } from "@/components/dashboard/charts/spending-line-chart";
import { CategoryPieChart } from "@/components/dashboard/charts/category-pie-chart";
import { IncomeExpenseBarChart } from "@/components/dashboard/charts/income-expense-bar-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { AddTransactionDialog } from "@/components/dashboard/transaction-dialogs";
import { Button } from "@/components/ui/button";

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

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatAmount(n: number): string {
  return "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const { recent, recentLoading, stats, statsLoading, refreshAll } =
    useTransactions();
  const [addOpen, setAddOpen] = useState(false);
  const [addType, setAddType] = useState<"income" | "expense">("expense");

  function handleOpenAdd(type: "income" | "expense" = "expense") {
    setAddType(type);
    setAddOpen(true);
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2 animate-pulse">
          <div className="w-64 h-8 rounded-xl bg-white/[0.06]" />
          <div className="w-48 h-4 rounded bg-white/[0.04]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-[320px] rounded-2xl border border-white/[0.06] glass-fintech animate-pulse" />
          <div className="h-[320px] rounded-2xl border border-white/[0.06] glass-fintech animate-pulse" />
        </div>
      </div>
    );
  }

  const firstName = user?.name?.split(" ")[0] || "there";

  // Format stat card amounts strictly from existing live data
  const balance = statsLoading ? "—" : formatAmount(stats.balance);
  const monthlyIncome = statsLoading ? "—" : formatAmount(stats.monthlyIncome);
  const monthlyExpense = statsLoading ? "—" : formatAmount(stats.monthlyExpense);
  const monthlySavings = statsLoading ? "—" : formatAmount(stats.monthlySavings);

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8 max-w-[1440px] mx-auto"
      >
        {/* Welcome Header & Quick Add CTA */}
        <motion.div
          variants={item}
          className="flex items-start justify-between gap-4 flex-wrap pb-2 border-b border-white/[0.04]"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/25 font-heading">
                <ShieldCheck className="w-3 h-3" />
                <span>ACTIVE SESSION</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-heading">
              {getGreeting()}, <span className="gradient-text">{firstName}</span>!
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-telemetry">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{formatDate()}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              onClick={() => handleOpenAdd("expense")}
              size="sm"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-heading bg-[#00F0FF] text-[#07090E] hover:bg-[#3bf4ff] active:scale-[0.98] transition-all shadow-md shadow-[#00F0FF]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
              aria-label="Add transaction"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Transaction</span>
            </Button>
          </div>
        </motion.div>

        {/* Primary Cash Flow Stat Cards */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          <StatCard
            icon={Wallet}
            title="Net Balance"
            amount={balance}
            trend={{ value: "All time", direction: "up", label: "income − expense" }}
            iconColor="text-[#00F0FF]"
            iconBg="bg-[#00F0FF]/10 border-[#00F0FF]/25"
            highlight={true}
          />
          <StatCard
            icon={TrendingUp}
            title="Monthly Income"
            amount={monthlyIncome}
            trend={{ value: "This month", direction: "up", label: "total credited" }}
            iconColor="text-emerald-400"
            iconBg="bg-emerald-500/10 border-emerald-500/20"
          />
          <StatCard
            icon={TrendingDown}
            title="Monthly Expenses"
            amount={monthlyExpense}
            trend={{ value: "This month", direction: "down", label: "total debited" }}
            iconColor="text-rose-400"
            iconBg="bg-rose-500/10 border-rose-500/20"
          />
          <StatCard
            icon={PiggyBank}
            title="Monthly Savings"
            amount={monthlySavings}
            trend={{ value: "This month", direction: "up", label: "net cash retained" }}
            iconColor="text-cyan-400"
            iconBg="bg-cyan-500/10 border-cyan-500/20"
          />
          <StatCard
            icon={Target}
            title="Total Expenses"
            amount={statsLoading ? "—" : formatAmount(stats.totalExpense)}
            trend={{ value: "All time", direction: "down", label: "cumulative spending" }}
            iconColor="text-violet-400"
            iconBg="bg-violet-500/10 border-violet-500/20"
          />
        </motion.div>

        {/* Analytics Charts Row 1: Monthly Spending + Expense Categories */}
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpendingLineChart />
          <CategoryPieChart />
        </motion.div>

        {/* Analytics Charts Row 2: Income vs Expenses Full Width */}
        <motion.div variants={item}>
          <IncomeExpenseBarChart />
        </motion.div>

        {/* Recent Transactions Section */}
        <motion.div variants={item}>
          <RecentTransactions
            transactions={recent}
            isLoading={recentLoading}
            onAdd={() => handleOpenAdd("expense")}
          />
        </motion.div>

        {/* Quick Actions Shortcuts */}
        <motion.div variants={item}>
          <QuickActions
            onAddIncome={() => handleOpenAdd("income")}
            onAddExpense={() => handleOpenAdd("expense")}
          />
        </motion.div>
      </motion.div>

      {/* Add Transaction Dialog (Kept strictly intact) */}
      <AddTransactionDialog
        open={addOpen}
        defaultType={addType}
        onClose={() => setAddOpen(false)}
        onSuccess={refreshAll}
      />
    </>
  );
}
