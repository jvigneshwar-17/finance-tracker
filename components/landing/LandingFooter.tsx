"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#07090E] py-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/50 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#7928CA] text-[#07090E] font-bold group-hover:scale-105 transition-transform">
                <TrendingUp className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-heading text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                ExpenseFlow
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              A privacy-first personal finance application for tracking daily expenses, managing category budgets, visualizing cash flow, and achieving savings goals—with zero bank credentials required.
            </p>
          </div>

          {/* Product Navigation */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-white font-heading">
              Product
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#features" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF]">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#budgets" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF]">
                  Category Budgets
                </Link>
              </li>
              <li>
                <Link href="/#analytics" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF]">
                  Visual Analytics
                </Link>
              </li>
              <li>
                <Link href="/#goals" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF]">
                  Savings Goals
                </Link>
              </li>
              <li>
                <Link href="/#security" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF]">
                  Security Architecture
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF]">
                  FAQ
                </Link>
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
                <Link href="/login" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF]">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF]">
                  Create Free Account
                </Link>
              </li>
              <li>
                <Link href="/forgot-password" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF]">
                  Password Recovery
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-white font-heading">
              Legal & Support
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF]">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/#security" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF]">
                  Security Overview
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Quick Legal Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ExpenseFlow. Built for personal financial discipline.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-400">
            <Link href="/privacy" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:underline">
              Privacy Policy
            </Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link href="/terms" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:underline">
              Terms of Service
            </Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link href="/contact" className="hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:underline">
              Contact
            </Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>Privacy-First • No Bank Logins</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
