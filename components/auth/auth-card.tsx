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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative rounded-2xl p-8 sm:p-10 glass-fintech overflow-hidden"
        style={{ boxShadow: "0 0 40px -8px rgba(0,240,255,0.10), 0 24px 64px -16px rgba(0,0,0,0.6)" }}
      >
        {/* Cyan ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[160px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,240,255,0.07) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        {/* Bottom-right violet accent */}
        <div
          className="absolute bottom-0 right-0 w-[200px] h-[200px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(121,40,202,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
        />

        <div className="relative z-10 space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 rounded-xl p-1"
              style={{ "--tw-ring-color": "rgba(0,240,255,0.4)" } as React.CSSProperties}
              aria-label="Go to ExpenseFlow home page"
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl text-[#07090E] font-bold shadow-lg group-hover:scale-105 transition-transform duration-200"
                style={{ background: "linear-gradient(135deg, #00F0FF 0%, #3bf4ff 50%, #00b8c9 100%)", boxShadow: "0 0 20px rgba(0,240,255,0.35)" }}
              >
                <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#00F0FF] transition-colors font-heading">
                ExpenseFlow
              </span>
            </Link>
          </div>

          {/* Badge + Title + Subtitle */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-heading tracking-widest uppercase border"
                style={{ background: "rgba(0,240,255,0.08)", color: "#00F0FF", borderColor: "rgba(0,240,255,0.20)" }}
              >
                SECURE ACCESS
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white font-heading">
              {title}
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">{subtitle}</p>
          </div>

          {/* Form Content */}
          <div>{children}</div>

          {/* Footer */}
          {footer && (
            <div className="pt-4 border-t text-center text-sm text-slate-400" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
