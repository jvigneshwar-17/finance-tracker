"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Target,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { StatCard, SkeletonCard } from "@/components/dashboard/stat-card";
import { SpendingLineChart } from "@/components/dashboard/charts/spending-line-chart";
import { CategoryPieChart } from "@/components/dashboard/charts/category-pie-chart";
import { IncomeExpenseBarChart } from "@/components/dashboard/charts/income-expense-bar-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { QuickActions } from "@/components/dashboard/quick-actions";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
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

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="space-y-2 animate-pulse">
          <div className="w-64 h-8 rounded-lg bg-slate-800/80" />
          <div className="w-48 h-4 rounded bg-slate-800/60" />
        </div>

        {/* Stat cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Charts skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-[320px] rounded-2xl bg-slate-900/60 border border-slate-800/80 animate-pulse" />
          <div className="h-[320px] rounded-2xl bg-slate-900/60 border border-slate-800/80 animate-pulse" />
        </div>
      </div>
    );
  }

  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-[1400px]"
    >
      {/* Welcome Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {getGreeting()}, {firstName}! 👋
        </h1>
        <p className="text-sm text-slate-400 mt-1">{formatDate()}</p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
      >
        <StatCard
          icon={Wallet}
          title="Total Balance"
          amount="₹1,48,250"
          trend={{ value: "+12.4%", direction: "up", label: "vs last month" }}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10 border-emerald-500/20"
        />
        <StatCard
          icon={TrendingUp}
          title="Monthly Income"
          amount="₹45,000"
          trend={{ value: "+6.7%", direction: "up", label: "vs last month" }}
          iconColor="text-teal-400"
          iconBg="bg-teal-500/10 border-teal-500/20"
        />
        <StatCard
          icon={TrendingDown}
          title="Monthly Expenses"
          amount="₹18,450"
          trend={{ value: "-3.2%", direction: "down", label: "vs last month" }}
          iconColor="text-red-400"
          iconBg="bg-red-500/10 border-red-500/20"
        />
        <StatCard
          icon={PiggyBank}
          title="Savings"
          amount="₹26,550"
          trend={{ value: "+18.2%", direction: "up", label: "vs last month" }}
          iconColor="text-cyan-400"
          iconBg="bg-cyan-500/10 border-cyan-500/20"
        />
        <StatCard
          icon={Target}
          title="Budget Remaining"
          amount="₹6,550"
          trend={{ value: "73%", direction: "up", label: "budget used" }}
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

      {/* Recent Transactions */}
      <motion.div variants={item}>
        <RecentTransactions />
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <QuickActions />
      </motion.div>
    </motion.div>
  );
}
