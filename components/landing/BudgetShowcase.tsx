"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, AlertTriangle, Utensils, ShoppingCart, Film, Zap, CheckCircle2 } from "lucide-react";

const budgetItems = [
  {
    category: "Food & Dining",
    icon: Utensils,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    spent: 8300,
    limit: 10000,
    percentage: 83,
    isWarning: true,
    warningText: "83% spent • ₹1,700 remaining for 19 days",
  },
  {
    category: "Groceries",
    icon: ShoppingCart,
    iconColor: "text-[#00F0FF]",
    iconBg: "bg-[#00F0FF]/10 border-[#00F0FF]/20",
    spent: 6200,
    limit: 10000,
    percentage: 62,
    isWarning: false,
    warningText: "62% spent • Healthy pace (₹3,800 left)",
  },
  {
    category: "Bills & Utilities",
    icon: Zap,
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-500/10 border-yellow-500/20",
    spent: 7400,
    limit: 10000,
    percentage: 74,
    isWarning: false,
    warningText: "74% spent • Predictable recurring expenses",
  },
  {
    category: "Entertainment & Leisure",
    icon: Film,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    spent: 2650,
    limit: 5000,
    percentage: 53,
    isWarning: false,
    warningText: "53% spent • Well under allowance",
  },
];

export function BudgetShowcase() {
  return (
    <section id="budgets" className="relative py-20 bg-[#0D111C]/30 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Budget Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <div className="rounded-2xl glass-fintech p-5 sm:p-6 border border-white/[0.08] shadow-xl shadow-black/60 space-y-4">
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06]">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Budget Limits</div>
                  <div className="text-sm font-bold text-white mt-0.5">Active Monthly Allocations</div>
                </div>
                <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>1 Threshold Alert</span>
                </div>
              </div>

              {/* Budget Progress Bars */}
              <div className="space-y-3.5">
                {budgetItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.category}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.08 }}
                      className={`p-3.5 rounded-xl border transition-all ${
                        item.isWarning
                          ? "bg-amber-500/[0.03] border-amber-500/25"
                          : "bg-white/[0.02] border-white/[0.04] hover:border-white/[0.08]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-lg border ${item.iconBg} ${item.iconColor}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-white">{item.category}</span>
                            {item.isWarning && (
                              <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                80% Cap Warning
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-telemetry text-xs font-bold text-slate-200">
                            ₹{item.spent.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-slate-400"> / ₹{item.limit.toLocaleString("en-IN")}</span>
                        </div>
                      </div>

                      {/* Progress Bar Track */}
                      <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            item.isWarning
                              ? "bg-gradient-to-r from-amber-400 to-[#F59E0B]"
                              : "bg-gradient-to-r from-[#00F0FF] to-[#10B981]"
                          }`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 * idx }}
                        />
                      </div>

                      <div className="flex items-center justify-between mt-2 text-[11px]">
                        <span className={item.isWarning ? "text-amber-300/90 font-medium" : "text-slate-400"}>
                          {item.warningText}
                        </span>
                        <span className="font-telemetry font-semibold text-slate-300">{item.percentage}%</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between">
                <span>Total monthly budget headroom: ₹10,450 remaining</span>
                <span className="text-[#00F0FF]">Proactive insights active</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-6 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F59E0B]/10 text-amber-300 border border-amber-500/25">
              <Wallet className="w-3.5 h-3.5 text-amber-400" />
              <span>CATEGORY BUDGET MANAGEMENT</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              See your limits <span className="gradient-text-cyan-violet">before you cross them</span>.
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Budgets shouldn't be restrictive spreadsheets. Assign flexible caps to specific categories and watch real-time progress indicators so you can make informed decisions before running out of funds.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-amber-500/10 text-amber-400 mt-1 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">80% Proactive Threshold Alert</div>
                  <div className="text-xs text-slate-400">Receive visual amber indicators well before you deplete your category allowance.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#10B981]/10 text-emerald-400 mt-1 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Remaining Daily Burn Calculation</div>
                  <div className="text-xs text-slate-400">Know exactly how much safe spending allowance you have left per day of the month.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] mt-1 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Fast Category Editing</div>
                  <div className="text-xs text-slate-400">Modify or adjust category allocations anytime as your monthly priorities evolve.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
