"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  CreditCard,
  ShoppingCart,
  Utensils,
  Zap,
  Car,
  ArrowDownLeft,
  CheckCircle2,
  PieChart as PieChartIcon,
  BarChart3,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section id="hero" className="relative pt-8 pb-20 lg:pt-14 lg:pb-28 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-teal-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Hero Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-lg shadow-emerald-500/10">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Smart AI Expense Tracking & Budgeting</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Take Control of Your <br className="hidden sm:inline" />
              <span className="gradient-text">Money.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Track expenses, manage budgets, visualize spending, and build better financial habits—all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-base font-semibold bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950 hover:brightness-110 shadow-xl shadow-emerald-500/20 active:scale-[0.98] transition-all glow-emerald"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>

              <Link
                href="#demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-base font-medium text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 backdrop-blur-md transition-all shadow-md"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Live Demo</span>
              </Link>
            </div>

            {/* Feature Highlights / Trust Badges */}
            <div className="pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>256-bit Bank Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Instant Auto-Sync</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Dashboard Mockup */}
          <div className="lg:col-span-6 relative">
            
            {/* Subtle Backdrop Glow Behind Card Container */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-transparent blur-2xl opacity-70" />

            {/* Main Glass Dashboard Card */}
            <div className="relative p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-2xl shadow-black/80 space-y-5">
              
              {/* Top Row: Balance Card & Monthly Expense Chart */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                {/* 1. BALANCE CARD */}
                <div className="sm:col-span-5 p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                  
                  <div>
                    <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                      <span className="font-medium">Total Balance</span>
                      <CreditCard className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      ₹48,250.00
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <ArrowDownLeft className="w-3.5 h-3.5" />
                      <span>+12.4%</span>
                    </div>
                    <span className="text-slate-500 text-[11px]">vs last month</span>
                  </div>
                </div>

                {/* 2. MONTHLY EXPENSE CHART */}
                <div className="sm:col-span-7 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-semibold text-slate-200">Monthly Spending</span>
                    </div>
                    <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Avg ₹18.5k/mo
                    </span>
                  </div>

                  {/* Visual Bar Chart Mockup */}
                  <div className="flex items-end justify-between gap-2 h-24 pt-4 px-1">
                    {[
                      { month: "Jan", height: "65%", val: "₹16.5k" },
                      { month: "Feb", height: "45%", val: "₹14.2k" },
                      { month: "Mar", height: "85%", val: "₹22.8k", active: true },
                      { month: "Apr", height: "55%", val: "₹17.5k" },
                      { month: "May", height: "70%", val: "₹19.4k" },
                      { month: "Jun", height: "50%", val: "₹15.8k" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <div
                          style={{ height: item.height }}
                          className={cn(
                            "w-full rounded-t-lg transition-all duration-300 relative group-hover:brightness-125",
                            item.active
                              ? "bg-gradient-to-t from-emerald-500 to-teal-400 shadow-md shadow-emerald-500/30"
                              : "bg-slate-800 hover:bg-slate-700"
                          )}
                        />
                        <span className="text-[10px] text-slate-500 font-medium">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle Row: Recent Transactions & Category Pie Chart */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                {/* 3. RECENT TRANSACTIONS */}
                <div className="sm:col-span-7 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-200">Recent Transactions</span>
                    <span className="text-[11px] text-emerald-400 hover:underline cursor-pointer">View all</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      {
                        name: "D-Mart Supermarket",
                        category: "Groceries",
                        amount: "-₹2,450",
                        time: "Today, 4:15 PM",
                        icon: ShoppingCart,
                        color: "bg-emerald-500/10 text-emerald-400",
                      },
                      {
                        name: "Swiggy Order",
                        category: "Food & Dining",
                        amount: "-₹450",
                        time: "Today, 1:20 PM",
                        icon: Utensils,
                        color: "bg-teal-500/10 text-teal-400",
                      },
                      {
                        name: "Electricity Bill (BESCOM)",
                        category: "Household Bills",
                        amount: "-₹1,250",
                        time: "Yesterday",
                        icon: Zap,
                        color: "bg-cyan-500/10 text-cyan-400",
                      },
                      {
                        name: "Petrol Pump",
                        category: "Transport",
                        amount: "-₹799",
                        time: "2 days ago",
                        icon: Car,
                        color: "bg-emerald-500/10 text-emerald-400",
                      },
                    ].map((tx, i) => {
                      const TxIcon = tx.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/50 hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg shrink-0", tx.color)}>
                              <TxIcon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-white truncate">{tx.name}</div>
                              <div className="text-[10px] text-slate-400">{tx.category} • {tx.time}</div>
                            </div>
                          </div>
                          <div className="text-xs font-bold text-slate-200 shrink-0 ml-2">{tx.amount}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. CATEGORY PIE CHART */}
                <div className="sm:col-span-5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-200">Category Breakdown</span>
                    <PieChartIcon className="w-4 h-4 text-emerald-400" />
                  </div>

                  {/* Circular Pie Chart Ring Visual */}
                  <div className="flex items-center justify-center py-2">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        {/* Segment 1: Bills & Housing 40% */}
                        <path
                          className="text-emerald-500 stroke-current"
                          strokeWidth="4.5"
                          strokeDasharray="40, 100"
                          strokeDashoffset="0"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Segment 2: Food & Groceries 30% */}
                        <path
                          className="text-teal-400 stroke-current"
                          strokeWidth="4.5"
                          strokeDasharray="30, 100"
                          strokeDashoffset="-40"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Segment 3: Transport 20% */}
                        <path
                          className="text-cyan-500 stroke-current"
                          strokeWidth="4.5"
                          strokeDasharray="20, 100"
                          strokeDashoffset="-70"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] text-slate-400">Total</span>
                        <span className="text-xs font-bold text-white">₹18,450</span>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-slate-400 pt-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Bills 40%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-teal-400" />
                      <span>Food 30%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-cyan-500" />
                      <span>Transport 20%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-slate-700" />
                      <span>Shopping 10%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: 4. BUDGET PROGRESS */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-slate-200">Food & Groceries Monthly Budget</span>
                  </div>
                  <div className="text-xs font-bold text-white">
                    <span className="text-emerald-400">₹4,500.00</span> / <span className="text-slate-400">₹6,000.00</span>
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="relative w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 shadow-sm shadow-emerald-500/40"
                    style={{ width: "75%" }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                  <span>75% spent</span>
                  <span className="text-emerald-400 font-medium">₹1,500.00 remaining</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
