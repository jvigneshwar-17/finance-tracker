"use client";

import React from "react";
import { motion } from "framer-motion";
import { Utensils, ShoppingCart, Zap, TrendingUp, Shield, Sparkles } from "lucide-react";

export function HeroPreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="relative rounded-2xl glass-fintech-elevated p-5 md:p-6 shadow-2xl shadow-black/80 max-w-lg w-full mx-auto"
    >
      {/* Ambient background bloom */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#7928CA]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header Bar */}
      <div className="relative flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
            Sample Dashboard
          </span>
          <span className="text-xs text-slate-400 font-medium">September 2026</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          <Shield className="w-3 h-3" />
          <span>Local & Private</span>
        </div>
      </div>

      {/* Top Metric Cards: Budget Ring & Net Cash Flow */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {/* Monthly Budget Ring */}
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3.5">
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="4"
              />
              <motion.circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="113.1"
                initial={{ strokeDashoffset: 113.1 }}
                animate={{ strokeDashoffset: 113.1 * (1 - 0.68) }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-telemetry text-xs font-bold text-white">68%</span>
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Monthly Budget</div>
            <div className="font-telemetry text-base font-bold text-white mt-0.5">₹58,400</div>
            <div className="text-[11px] text-slate-400">of ₹85,000 limit</div>
          </div>
        </div>

        {/* Net Balance & Savings */}
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Net Balance</span>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +28%
            </span>
          </div>
          <div className="font-telemetry text-xl font-bold text-white mt-1">₹81,120</div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#00F0FF]" />
            <span>+₹22,720 saved this month</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions Stream */}
      <div className="relative space-y-2">
        <div className="flex items-center justify-between px-1 text-xs text-slate-400 font-medium">
          <span>Recent Activity</span>
          <span className="text-[11px] text-[#00F0FF]">Categorized</span>
        </div>

        <div className="space-y-2">
          {/* Item 1 */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-300">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Swiggy Gourmet</div>
                <div className="text-[11px] text-slate-400">Food & Dining • Today</div>
              </div>
            </div>
            <span className="font-telemetry text-xs font-semibold text-slate-200">-₹840.00</span>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-300">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Blinkit Essentials</div>
                <div className="text-[11px] text-slate-400">Groceries • Yesterday</div>
              </div>
            </div>
            <span className="font-telemetry text-xs font-semibold text-slate-200">-₹1,240.00</span>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center text-yellow-300">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Tata Power Bill</div>
                <div className="text-[11px] text-slate-400">Utilities • 10 Sep</div>
              </div>
            </div>
            <span className="font-telemetry text-xs font-semibold text-slate-200">-₹2,450.00</span>
          </div>

          {/* Item 4 */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 hover:bg-emerald-500/[0.08] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-emerald-200">Monthly Salary</div>
                <div className="text-[11px] text-emerald-400/80">Income • 01 Sep</div>
              </div>
            </div>
            <span className="font-telemetry text-xs font-bold text-emerald-400">+₹1,15,000.00</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
