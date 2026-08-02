"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative rounded-3xl p-8 sm:p-10 bg-slate-900/70 border border-slate-800/80 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-emerald-500/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-xl p-1"
              aria-label="Go to ExpenseFlow home page"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-200">
                <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                ExpenseFlow
              </span>
            </Link>
          </div>

          {/* Title & Subtitle */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {title}
            </h1>
            <p className="text-sm text-slate-400">{subtitle}</p>
          </div>

          {/* Form Content */}
          <div>{children}</div>

          {/* Footer */}
          {footer && (
            <div className="pt-4 border-t border-slate-800/60 text-center text-sm text-slate-400">
              {footer}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
