"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Menu, 
  X, 
  ArrowRight, 
  ChevronDown, 
  Sparkles,
  PieChart,
  ShieldCheck,
  Zap,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string; description: string; icon: React.ElementType }[];
}

const navLinks: NavLink[] = [
  {
    label: "Features",
    href: "#features",
    hasDropdown: true,
    dropdownItems: [
      { label: "Expense Analytics", href: "#analytics", description: "Real-time AI-powered expense insights", icon: PieChart },
      { label: "Smart Budgeting", href: "#budgeting", description: "Automated budget limits & alerts", icon: Zap },
      { label: "Card Management", href: "#cards", description: "Track all credit & debit accounts", icon: CreditCard },
      { label: "Security & Audit", href: "#security", description: "Bank-grade 256-bit encryption", icon: ShieldCheck },
    ]
  },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "glass-nav shadow-2xl shadow-emerald-950/10 py-3"
          : "bg-slate-950/40 backdrop-blur-md border-b border-white/5 py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Branding */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-xl p-1"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-200">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping opacity-75" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  FinPulse
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="w-2.5 h-2.5" /> AI v2.4
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    "text-slate-300 hover:text-white hover:bg-slate-800/60",
                    activeDropdown === link.label && "text-white bg-slate-800/80"
                  )}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-slate-400 transition-transform duration-200",
                        activeDropdown === link.label && "rotate-180 text-emerald-400"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {link.hasDropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-80 p-2 rounded-2xl bg-slate-900/95 border border-slate-800/80 backdrop-blur-2xl shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="grid gap-1">
                      {link.dropdownItems?.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/80 transition-colors group/item"
                          >
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover/item:bg-emerald-500 group-hover/item:text-slate-950 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-white group-hover/item:text-emerald-300 transition-colors">
                                {item.label}
                              </div>
                              <p className="text-xs text-slate-400 line-clamp-1">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              Log In
            </Link>

            <Link
              href="/register"
              className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950 hover:brightness-110 active:scale-95 transition-all duration-200 shadow-lg shadow-emerald-500/25 glow-emerald"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-emerald-400" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl px-4 pt-4 pb-6 mt-3 shadow-2xl animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-1 mb-6">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  <span>{link.label}</span>
                </Link>
                {link.hasDropdown && (
                  <div className="pl-4 pr-2 py-1 space-y-1">
                    {link.dropdownItems?.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-emerald-400 hover:bg-slate-900 transition-colors"
                      >
                        <item.icon className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-transform"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
