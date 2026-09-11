"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";

export function BottomCTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#00F0FF]/15 via-[#7928CA]/20 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl glass-fintech-elevated p-8 sm:p-12 text-center border border-[#00F0FF]/25 shadow-2xl shadow-black/80 relative overflow-hidden"
        >
          {/* Subtle top glare */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/25 mb-6">
            <Shield className="w-3.5 h-3.5" />
            <span>START TRACKING TODAY</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Take control of your <span className="gradient-text-cyan-violet">daily spending</span>.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mt-4 mb-8 leading-relaxed">
            Track expenses, manage budgets, understand your spending, and work toward your savings goals—with complete personal privacy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold bg-[#00F0FF] text-[#07090E] hover:bg-[#3bf4ff] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#00F0FF]/25 font-heading"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-base font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-200"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
              <span>Free to Use</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Privacy-First Architecture</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>No Bank Logins Required</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
