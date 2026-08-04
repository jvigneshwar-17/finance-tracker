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
  return "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
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
          <div className="w-64 h-8 rounded-lg bg-slate-800/80" />
          <div className="w-48 h-4 rounded bg-slate-800/60" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-[320px] rounded-2xl bg-slate-900/60 border border-slate-800/80 animate-pulse" />
          <div className="h-[320px] rounded-2xl bg-slate-900/60 border border-slate-800/80 animate-pulse" />
        </div>
      </div>
    );
  }

  const firstName = user?.name?.split(" ")[0] || "there";

  // Format stat card amounts from live data
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
        className="space-y-6 max-w-[1400px]"
      >
        {/* Welcome Header */}
        <motion.div
          variants={item}
          className="flex items-start justify-between gap-4 flex-wrap"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {getGreeting()}, {firstName}! 👋
            </h1>
            <p className="text-sm text-slate-400 mt-1">{formatDate()}</p>
          </div>
          <Button
            onClick={() => handleOpenAdd("expense")}
            size="sm"
            className="shrink-0"
            aria-label="Add transaction"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </Button>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          <StatCard
            icon={Wallet}
            title="Net Balance"
            amount={balance}
            trend={{ value: "All time", direction: "up", label: "income − expense" }}
            iconColor="text-emerald-400"
            iconBg="bg-emerald-500/10 border-emerald-500/20"
          />
          <StatCard
            icon={TrendingUp}
            title="Monthly Income"
            amount={monthlyIncome}
            trend={{ value: "This month", direction: "up", label: "total income" }}
            iconColor="text-teal-400"
            iconBg="bg-teal-500/10 border-teal-500/20"
          />
          <StatCard
            icon={TrendingDown}
            title="Monthly Expenses"
            amount={monthlyExpense}
            trend={{ value: "This month", direction: "down", label: "total expenses" }}
            iconColor="text-red-400"
            iconBg="bg-red-500/10 border-red-500/20"
          />
          <StatCard
            icon={PiggyBank}
            title="Monthly Savings"
            amount={monthlySavings}
            trend={{ value: "This month", direction: "up", label: "income − expenses" }}
            iconColor="text-[#06b6d4]"
            iconBg="bg-cyan-500/10 border-cyan-500/20"
          />
          <StatCard
            icon={Target}
            title="Total Expenses"
            amount={statsLoading ? "—" : formatAmount(stats.totalExpense)}
            trend={{ value: "All time", direction: "down", label: "total spent" }}
            iconColor="text-purple-400"
            iconBg="bg-purple-500/10 border-purple-500/20"
          />
        </motion.div>

        {/* Analytics Charts */}
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SpendingLineChart />
          <CategoryPieChart />
        </motion.div>

        <motion.div variants={item}>
          <IncomeExpenseBarChart />
        </motion.div>

        {/* Recent Transactions — Live Data */}
        <motion.div variants={item}>
          <RecentTransactions
            transactions={recent}
            isLoading={recentLoading}
            onAdd={() => handleOpenAdd("expense")}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item}>
          <QuickActions
            onAddIncome={() => handleOpenAdd("income")}
            onAddExpense={() => handleOpenAdd("expense")}
          />
        </motion.div>
      </motion.div>

      {/* Add Transaction Dialog */}
      <AddTransactionDialog
        open={addOpen}
        defaultType={addType}
        onClose={() => setAddOpen(false)}
        onSuccess={refreshAll}
      />
    </>
  );
}
