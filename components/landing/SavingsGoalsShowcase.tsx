"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle, Award, Compass, Laptop, ShieldCheck } from "lucide-react";

const goals = [
  {
    title: "6-Month Emergency Fund",
    category: "Safety Cushion",
    icon: ShieldCheck,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    saved: 245000,
    target: 300000,
    percentage: 82,
    remaining: 55000,
    status: "On Track",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  },
  {
    title: "Annual Family Vacation",
    category: "Travel & Leisure",
    icon: Compass,
    iconColor: "text-[#00F0FF]",
    iconBg: "bg-[#00F0FF]/10 border-[#00F0FF]/20",
    saved: 112000,
    target: 200000,
    percentage: 56,
    remaining: 88000,
    status: "Steady Progress",
    badgeColor: "text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/25",
  },
  {
    title: "Next-Gen Workstation Laptop",
    category: "Productivity",
    icon: Laptop,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    saved: 85000,
    target: 90000,
    percentage: 94,
    remaining: 5000,
    status: "Nearly Complete",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/25",
  },
];

export function SavingsGoalsShowcase() {
  return (
    <section id="goals" className="relative py-20 bg-[#0D111C]/30 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">
            <Target className="w-3.5 h-3.5" />
            <span>SAVINGS GOALS & MILESTONES</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Build lasting financial resilience
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            Set deliberate target amounts for life priorities. Watch your progress grow month by month as disciplined habits turn into tangible milestones.
          </p>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {goals.map((goal, idx) => {
            const Icon = goal.icon;
            return (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="rounded-2xl glass-fintech p-6 border border-white/[0.08] hover:border-white/[0.15] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl border ${goal.iconBg} ${goal.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${goal.badgeColor}`}
                    >
                      {goal.status}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white mb-1">{goal.title}</h3>
                  <div className="text-xs text-slate-400 mb-5">{goal.category}</div>
                </div>

                <div className="space-y-3.5 pt-2 border-t border-white/[0.06]">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase">Saved So Far</div>
                      <div className="font-telemetry text-xl font-bold text-white mt-0.5">
                        ₹{goal.saved.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400 uppercase">Target</div>
                      <div className="font-telemetry text-sm font-semibold text-slate-300 mt-0.5">
                        ₹{goal.target.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#00F0FF] to-[#10B981]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${goal.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-telemetry font-bold text-white">{goal.percentage}% completed</span>
                    <span>₹{goal.remaining.toLocaleString("en-IN")} left</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
