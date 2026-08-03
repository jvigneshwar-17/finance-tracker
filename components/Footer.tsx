"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, Mail, Heart } from "lucide-react";

// Custom SVG Icons for Brand Logos
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-[#060911] text-slate-400 pt-16 pb-12 border-t border-slate-800/80 overflow-hidden">
      {/* Subtle Ambient Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          
          {/* Left Column: Brand & Description */}
          <div className="lg:col-span-4 space-y-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-xl"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
                <TrendingUp className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                ExpenseFlow
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Smart expense tracking for modern individuals. Track, analyze, and improve your financial habits.
            </p>
          </div>

          {/* Center Column 1: Product Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Product</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
                { label: "Roadmap", href: "#roadmap" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-emerald-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Column 2: Company Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "About", href: "#about" },
                { label: "Contact", href: "#contact" },
                { label: "Privacy Policy", href: "#privacy" },
                { label: "Terms of Service", href: "#terms" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-emerald-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Connect & Social Icons */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Connect</h4>
            <div className="flex items-center gap-3">
              {[
                { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
                { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
                { icon: Mail, href: "mailto:hello@expenseflow.app", label: "Email" },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-emerald-500/40 hover:bg-slate-800 transition-all duration-200 hover:scale-110 shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Divider Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 ExpenseFlow. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 inline mx-0.5" />
            <span>using Next.js, TypeScript, Tailwind CSS and shadcn/ui.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
