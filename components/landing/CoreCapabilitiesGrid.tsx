"use client";

import React from "react";
import { motion } from "framer-motion";
import { Receipt, Wallet, PieChart, Target, AlertTriangle, ArrowUpRight } from "lucide-react";

export function CoreCapabilitiesGrid() {
  return (
    <section id="features" className="relative py-20 md:py-28">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">
            <span>// CORE CAPABILITIES</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Engineered for daily financial clarity
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            All the essential tools you need to record transactions, maintain category limits, visualize cash flow, and build savings—all without third-party tracking.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Fast Transaction Tracking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="rounded-2xl glass-fintech p-6 lg:p-7 border border-white/[0.08] hover:border-[#00F0FF]/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[#00F0FF]">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Real-Time Ledger
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-400">Expense & Income</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">
                Effortless Transaction Logging
              </h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Record your daily spends and incomes in seconds. Organize each entry by category, date, and custom notes with zero friction.
              </p>
            </div>

            {/* Embedded Mini UI Preview */}
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3.5 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Blinkit Groceries</span>
                <span className="font-telemetry font-semibold text-slate-200">-₹1,420.00</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Apollo Pharmacy</span>
                <span className="font-telemetry font-semibold text-slate-200">-₹890.00</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-white/[0.04]">
                <span className="text-emerald-400 font-medium">Consulting Remittance</span>
                <span className="font-telemetry font-bold text-emerald-400">+₹32,500.00</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Adaptive Category Budgets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="rounded-2xl glass-fintech p-6 lg:p-7 border border-white/[0.08] hover:border-[#10B981]/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981]">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Live Limits
                  </span>
                </div>
                <span className="text-xs font-medium text-emerald-400">Adaptive Caps</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">
                Dynamic Category Budgets
              </h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Assign realistic spending limits to essential categories like Dining, Groceries, and Utilities. Get early visual warnings before you cross them.
              </p>
            </div>

            {/* Embedded Mini UI Preview */}
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3.5 space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Food & Dining</span>
                  <span className="font-telemetry text-amber-400 font-semibold">₹8,300 / ₹10,000 (83%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: "83%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Groceries</span>
                  <span className="font-telemetry text-teal-300 font-semibold">₹6,200 / ₹10,000 (62%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full bg-[#00F0FF] rounded-full" style={{ width: "62%" }} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Monthly Analytics & Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="rounded-2xl glass-fintech p-6 lg:p-7 border border-white/[0.08] hover:border-[#7928CA]/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#7928CA]/10 border border-[#7928CA]/20 text-[#c084fc]">
                    <PieChart className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Pattern Engine
                  </span>
                </div>
                <span className="text-xs font-medium text-purple-400">Cash Flow</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">
                Monthly Analytics & Trends
              </h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Spot spending spikes, evaluate month-over-month differences, and review clear category distributions that simplify your money management.
              </p>
            </div>

            {/* Embedded Mini UI Preview */}
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3.5 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-[11px] text-slate-400 uppercase">Top Category</div>
                <div className="text-sm font-bold text-white">Food & Dining</div>
                <div className="text-xs text-slate-400 font-telemetry">₹22,400 (38% of total)</div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-[11px] text-slate-400 uppercase">Monthly Shift</div>
                <div className="text-sm font-bold text-emerald-400">-12.4% vs Aug</div>
                <div className="text-xs text-slate-400">Spent ₹7,800 less</div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Dedicated Savings Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="rounded-2xl glass-fintech p-6 lg:p-7 border border-white/[0.08] hover:border-[#00F0FF]/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[#00F0FF]">
                    <Target className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Milestones
                  </span>
                </div>
                <span className="text-xs font-medium text-[#00F0FF]">Goal Progress</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">
                Dedicated Savings Goals
              </h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Whether creating an emergency cushion or saving for a gadget, define your target amount and celebrate every milestone along the way.
              </p>
            </div>

            {/* Embedded Mini UI Preview */}
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Emergency Corpus</span>
                <span className="font-telemetry text-emerald-400 font-bold">82%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00F0FF] to-[#10B981] rounded-full" style={{ width: "82%" }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-telemetry">
                <span>₹2,45,000 saved</span>
                <span>Target: ₹3,00,000</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
