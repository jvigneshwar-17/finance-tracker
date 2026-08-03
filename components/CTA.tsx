"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2, ShieldCheck } from "lucide-react";

export function CTA() {
  return (
    <section id="cta" className="relative py-20 lg:py-28 bg-[#090d16] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Full-width Glass Box Container */}
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/90 border border-slate-800/90 backdrop-blur-2xl shadow-2xl shadow-emerald-950/20 text-center">
          
          {/* Subtle background glow and floating gradient elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-emerald-500/15 via-teal-500/10 to-transparent blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-cyan-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs font-bold text-emerald-400 backdrop-blur-md shadow-lg shadow-emerald-500/10">
              <span>🚀 Start Today</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Ready to Take Control of <br className="hidden sm:inline" />
              <span className="gradient-text">Your Finances?</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              Join thousands of users using ExpenseFlow to track expenses, manage budgets, and make smarter financial decisions—all in one place.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950 hover:brightness-110 shadow-xl shadow-emerald-500/25 active:scale-[0.98] transition-all glow-emerald"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>

              <Link
                href="#demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-base font-medium text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 backdrop-blur-md transition-all shadow-md"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>View Live Demo</span>
              </Link>
            </div>

            {/* Three Trust Indicators Below Buttons */}
            <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Secure & Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No Credit Card Required</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
