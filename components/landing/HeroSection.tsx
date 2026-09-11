"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Lock, CheckCircle2 } from "lucide-react";
import { HeroPreviewCard } from "./HeroPreviewCard";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#00F0FF]/10 via-[#7928CA]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Value Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
              <span className="text-xs font-semibold text-slate-200 tracking-wide">
                Personal Finance • Privacy First
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-xs text-[#00F0FF] font-medium flex items-center gap-1">
                <Lock className="w-3 h-3" /> No bank credentials required
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Master your daily expenses with{" "}
              <span className="gradient-text-cyan-violet">effortless clarity</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              The intuitive personal finance companion built for modern spending. Track daily transactions, control category budgets, understand spending patterns, and build lasting savings habits—with zero bank credentials needed.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold bg-[#00F0FF] text-[#07090E] hover:bg-[#3bf4ff] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-[#00F0FF]/25 font-heading"
              >
                <span>Start Free Tracking</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-base font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-200"
              >
                <span>Explore Features</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>100% Free Core Tools</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>No Bank Account Logins</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Zero Ads & Tracking</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Product Preview Mockup */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <HeroPreviewCard />
          </div>
        </div>
      </div>
    </section>
  );
}
