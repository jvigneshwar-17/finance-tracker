"use client";

import React from "react";
import { motion } from "framer-motion";
import { PieChart, TrendingDown, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";

const categoryBreakdown = [
  { name: "Food & Dining", amount: 22400, percent: 38, color: "#14b8a6" },
  { name: "Bills & Utilities", amount: 14200, percent: 24, color: "#eab308" },
  { name: "Shopping", amount: 9500, percent: 16, color: "#ec4899" },
  { name: "Transport", amount: 6800, percent: 12, color: "#06b6d4" },
  { name: "Entertainment", amount: 5500, percent: 10, color: "#a855f7" },
];

const monthlyTrendBars = [
  { month: "Apr", income: 95000, expense: 62000 },
  { month: "May", income: 95000, expense: 58000 },
  { month: "Jun", income: 105000, expense: 64000 },
  { month: "Jul", income: 110000, expense: 71000 },
  { month: "Aug", income: 110000, expense: 66000 },
  { month: "Sep", income: 115000, expense: 58400 },
];

export function AnalyticsShowcase() {
  const maxBarValue = 120000;

  return (
    <section id="analytics" className="relative py-20 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#7928CA]/15 text-[#c084fc] border border-[#7928CA]/30">
            <PieChart className="w-3.5 h-3.5" />
            <span>VISUAL SPENDING ANALYTICS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Transform transactions into actionable clarity
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            Review your month-over-month cash flow, evaluate category distributions, and discover spending patterns without complex accounting.
          </p>
        </div>

        {/* Analytics Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Chart: Income vs Expense Monthly Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-2xl glass-fintech p-6 border border-white/[0.08] shadow-xl shadow-black/60 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Cash Flow History</div>
                <h3 className="font-heading text-lg font-bold text-white mt-0.5">6-Month Income vs. Expense</h3>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-emerald-400" />
                  <span className="text-slate-300">Income</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#00F0FF]" />
                  <span className="text-slate-300">Expenses</span>
                </div>
              </div>
            </div>

            {/* Bar Chart Visualization */}
            <div className="pt-2">
              <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 px-2">
                {monthlyTrendBars.map((bar, idx) => {
                  const incomeHeight = (bar.income / maxBarValue) * 100;
                  const expenseHeight = (bar.expense / maxBarValue) * 100;
                  const isCurrent = idx === monthlyTrendBars.length - 1;

                  return (
                    <div key={bar.month} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-full pb-2">
                        {/* Income Bar */}
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${incomeHeight}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.08 }}
                          className="w-3 sm:w-5 bg-emerald-500/80 rounded-t group-hover:bg-emerald-400 transition-colors relative"
                          title={`Income: ₹${bar.income.toLocaleString("en-IN")}`}
                        />
                        {/* Expense Bar */}
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${expenseHeight}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.08 + 0.04 }}
                          className={`w-3 sm:w-5 rounded-t transition-colors relative ${
                            isCurrent ? "bg-[#00F0FF]" : "bg-cyan-500/60 group-hover:bg-cyan-400"
                          }`}
                          title={`Expense: ₹${bar.expense.toLocaleString("en-IN")}`}
                        />
                      </div>
                      <span
                        className={`text-xs font-telemetry ${
                          isCurrent ? "font-bold text-[#00F0FF]" : "text-slate-400"
                        }`}
                      >
                        {bar.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-white/[0.06]">
              <div className="p-3 rounded-xl bg-white/[0.02]">
                <div className="text-[11px] text-slate-400 uppercase">Avg Monthly Savings</div>
                <div className="font-telemetry text-base font-bold text-emerald-400 mt-0.5">₹47,200</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02]">
                <div className="text-[11px] text-slate-400 uppercase">Current Month Outflow</div>
                <div className="font-telemetry text-base font-bold text-slate-200 mt-0.5">₹58,400</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] col-span-2 sm:col-span-1">
                <div className="text-[11px] text-slate-400 uppercase">Savings Rate</div>
                <div className="font-telemetry text-base font-bold text-[#00F0FF] mt-0.5">49.2%</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Category Distribution Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 rounded-2xl glass-fintech p-6 border border-white/[0.08] shadow-xl shadow-black/60 space-y-4"
          >
            <div className="pb-3 border-b border-white/[0.06]">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Category Mix</div>
              <h3 className="font-heading text-lg font-bold text-white mt-0.5">Current Month Distribution</h3>
            </div>

            {/* Category Bars */}
            <div className="space-y-3 pt-1">
              {categoryBreakdown.map((cat, idx) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{cat.name}</span>
                    <span className="font-telemetry font-semibold text-slate-200">
                      ₹{cat.amount.toLocaleString("en-IN")}{" "}
                      <span className="text-slate-400 font-normal">({cat.percent}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cat.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.08 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Insight Box */}
            <div className="p-3.5 rounded-xl bg-[#7928CA]/10 border border-[#7928CA]/20 text-xs space-y-1 mt-4">
              <div className="font-semibold text-purple-300 flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>Month-Over-Month Insight</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Dining spends dropped by 12% compared to last month, preserving ₹3,800 in discretionary cash flow.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
