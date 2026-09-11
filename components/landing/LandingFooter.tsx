"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#07090E] py-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#7928CA] text-[#07090E] font-bold">
                <TrendingUp className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-heading text-lg font-bold text-white">ExpenseFlow</span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              A privacy-first personal finance application for tracking daily expenses, managing category budgets, visualizing cash flow, and achieving savings goals.
            </p>
          </div>

          {/* Product Navigation */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-white font-heading">
              Product
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-[#00F0FF] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#budgets" className="hover:text-[#00F0FF] transition-colors">
                  Category Budgets
                </a>
              </li>
              <li>
                <a href="#analytics" className="hover:text-[#00F0FF] transition-colors">
                  Visual Analytics
                </a>
              </li>
              <li>
                <a href="#goals" className="hover:text-[#00F0FF] transition-colors">
                  Savings Goals
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-[#00F0FF] transition-colors">
                  Security Architecture
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#00F0FF] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Account Access */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-white font-heading">
              Account
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/login" className="hover:text-[#00F0FF] transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-[#00F0FF] transition-colors">
                  Create Free Account
                </Link>
              </li>
              <li>
                <Link href="/forgot-password" className="hover:text-[#00F0FF] transition-colors">
                  Password Recovery
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ExpenseFlow. Built for personal financial discipline.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>Privacy-First • No Bank Logins</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
