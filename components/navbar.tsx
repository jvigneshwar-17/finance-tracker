"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TrendingUp, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Budgets", href: "#budgets" },
  { label: "Analytics", href: "#analytics" },
  { label: "Goals", href: "#goals" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "glass-nav py-3 shadow-xl shadow-black/40"
          : "bg-[#07090E]/60 backdrop-blur-md border-b border-white/[0.04] py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/60 rounded-xl p-1"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#00F0FF] via-[#00D4E0] to-[#7928CA] text-[#07090E] font-bold shadow-md shadow-[#00F0FF]/20 group-hover:scale-105 transition-transform duration-200">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#00F0FF] rounded-full animate-ping opacity-75" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-[#00F0FF] transition-colors">
                ExpenseFlow
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/40"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center gap-2 px-4.5 py-2 rounded-xl text-sm font-semibold bg-[#00F0FF] text-[#07090E] hover:bg-[#3bf4ff] active:scale-[0.98] transition-all duration-200 shadow-md shadow-[#00F0FF]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00F0FF]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/50 transition-colors"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#00F0FF]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#07090E]/95 backdrop-blur-2xl px-4 pt-4 pb-6 mt-3 shadow-2xl animate-in fade-in duration-200">
          <nav className="flex flex-col gap-1 mb-5" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.05] border border-white/[0.08] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-[#00F0FF] text-[#07090E] shadow-lg shadow-[#00F0FF]/20 active:scale-[0.98] transition-transform"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
