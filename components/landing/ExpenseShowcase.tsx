"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Receipt, 
  Utensils, 
  Car, 
  Zap, 
  ShoppingBag, 
  TrendingUp, 
  PlusCircle, 
  Check, 
  Calendar 
} from "lucide-react";

const sampleTransactions = [
  {
    title: "Swiggy Food Delivery",
    category: "Food & Dining",
    icon: Utensils,
    iconColor: "text-teal-400",
    iconBg: "bg-teal-500/10 border-teal-500/20",
    date: "11 Sep 2026",
    amount: "-₹620.00",
    isIncome: false,
    note: "Dinner with team",
  },
  {
    title: "Tata Power Mumbai",
    category: "Bills & Utilities",
    icon: Zap,
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-500/10 border-yellow-500/20",
    date: "10 Sep 2026",
    amount: "-₹2,840.00",
    isIncome: false,
    note: "August electricity cycle",
  },
  {
    title: "Uber Office Commute",
    category: "Transport",
    icon: Car,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    date: "09 Sep 2026",
    amount: "-₹480.00",
    isIncome: false,
    note: "Airport cab",
  },
  {
    title: "Client Retainer Payout",
    category: "Income",
    icon: TrendingUp,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    date: "05 Sep 2026",
    amount: "+₹45,000.00",
    isIncome: true,
    note: "Direct bank transfer",
  },
  {
    title: "Uniqlo Wardrobe Essentials",
    category: "Shopping",
    icon: ShoppingBag,
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/10 border-pink-500/20",
    date: "02 Sep 2026",
    amount: "-₹3,990.00",
    isIncome: false,
    note: "Winter wear",
  },
];

export function ExpenseShowcase() {
  return (
    <section className="relative py-20 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Descriptive Editorial Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">
              <Receipt className="w-3.5 h-3.5" />
              <span>TRANSACTION LEDGER</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Know where every <span className="gradient-text-cyan-violet">single rupee</span> goes.
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Recording transactions shouldn't feel like a chore. ExpenseFlow provides clean, immediate categorization with custom payment notes, exact dates, and instant balance feedback.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] mt-1 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Detailed Metadata & Tags</div>
                  <div className="text-xs text-slate-400">Add payment notes, merchant tags, and dates for effortless search later.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] mt-1 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Bilingual Income & Expense Tracking</div>
                  <div className="text-xs text-slate-400">Monitor side earnings, salaries, and daily outflows in one unified ledger.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] mt-1 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Zero Cloud Scraping</div>
                  <div className="text-xs text-slate-400">You control every entry manually. No bank scraping, no credential harvesting.</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Fidelity Ledger Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl glass-fintech p-5 sm:p-6 border border-white/[0.08] shadow-xl shadow-black/60">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Recent Transactions</div>
                  <div className="text-sm font-bold text-white mt-0.5">September 2026 Statement</div>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.06]">
                  <Calendar className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>Filtered: All</span>
                </div>
              </div>

              {/* Transaction List */}
              <div className="space-y-2.5">
                {sampleTransactions.map((tx, idx) => {
                  const Icon = tx.icon;
                  return (
                    <motion.div
                      key={tx.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.06 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.08] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl border ${tx.iconBg} ${tx.iconColor} shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{tx.title}</div>
                          <div className="text-xs text-slate-400 flex items-center gap-1.5">
                            <span>{tx.category}</span>
                            <span>•</span>
                            <span className="italic text-slate-400">{tx.note}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`font-telemetry text-sm font-bold ${
                            tx.isIncome ? "text-emerald-400" : "text-slate-200"
                          }`}
                        >
                          {tx.amount}
                        </div>
                        <div className="text-[11px] text-slate-400">{tx.date}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span>Displaying 5 of 42 transactions</span>
                <span className="text-[#00F0FF] font-medium">Categorized with Indian Rupee (₹) standards</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
