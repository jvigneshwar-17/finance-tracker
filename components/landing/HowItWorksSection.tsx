"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Wallet, LineChart, CheckCircle } from "lucide-react";

const steps = [
  {
    stepNumber: "01",
    icon: UserPlus,
    title: "Create your secure account",
    description:
      "Sign up in less than 60 seconds with your email and password. Verify your address and set up your preferred starting categories.",
    highlight: "Zero bank credentials requested",
  },
  {
    stepNumber: "02",
    icon: Wallet,
    title: "Track your expenses & budgets",
    description:
      "Log your daily transactions with simple categories and optional notes. Assign monthly caps to keep dining, utilities, and shopping in check.",
    highlight: "Real-time spent vs. remaining headroom",
  },
  {
    stepNumber: "03",
    icon: LineChart,
    title: "Review analytics & improve habits",
    description:
      "Review visual cash flow trends, examine category breakdowns, and watch your dedicated savings targets advance consistently over time.",
    highlight: "Actionable clarity without spreadsheet clutter",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative py-20 md:py-28 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">
            <span>// SIMPLE 3-STEP WORKFLOW</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            How ExpenseFlow works
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            A frictionless, privacy-focused path to taking full control of your daily personal finances.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-0.5 -translate-y-6 bg-gradient-to-r from-[#00F0FF]/20 via-[#7928CA]/30 to-[#10B981]/20 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="rounded-2xl glass-fintech p-6 border border-white/[0.08] hover:border-white/[0.15] transition-all flex flex-col justify-between relative group"
                >
                  <div>
                    {/* Top step badge & icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#00F0FF] group-hover:scale-110 group-hover:border-[#00F0FF]/40 transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-telemetry text-2xl font-extrabold text-slate-400 group-hover:text-[#00F0FF] transition-colors">
                        {step.stepNumber}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-white mb-2.5">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-medium text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{step.highlight}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
