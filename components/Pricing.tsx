"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingPlan {
  title: string;
  badge?: string;
  price: string;
  period?: string;
  description: string;
  recommended: boolean;
  features: string[];
  buttonText: string;
  buttonHref: string;
  disabled?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    title: "Free Plan",
    badge: "Recommended",
    price: "₹0",
    period: "forever",
    description: "Essential tools to take total control of your personal spending and budgets.",
    recommended: true,
    features: [
      "Unlimited expense tracking",
      "Budget planner",
      "Analytics dashboard",
      "Smart categories",
      "Responsive dashboard",
    ],
    buttonText: "Get Started Free",
    buttonHref: "/register",
    disabled: false,
  },
  {
    title: "Pro Plan",
    badge: "Coming Soon",
    price: "₹49",
    period: "/month",
    description: "Advanced AI insights, cloud sync, and export capabilities for power users.",
    recommended: false,
    features: [
      "Everything in Free",
      "Cloud Sync",
      "CSV & PDF Export",
      "AI Spending Insights",
      "Priority Support",
    ],
    buttonText: "Coming Soon",
    buttonHref: "#",
    disabled: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 lg:py-28 bg-[#090d16] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-lg shadow-emerald-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Plans</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Simple <span className="gradient-text">Pricing</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Start free. Upgrade when you need more.
          </p>
        </div>

        {/* 2 Pricing Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={cn(
                "relative p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between",
                plan.recommended
                  ? "bg-slate-900/90 border-2 border-emerald-500/60 shadow-2xl shadow-emerald-500/20 glow-emerald scale-[1.02]"
                  : "bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl hover:border-slate-700"
              )}
            >
              {/* Top Badge for Recommended Plan */}
              {plan.recommended && plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md">
                  ★ {plan.badge}
                </div>
              )}

              <div>
                {/* Header: Title & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
                  {!plan.recommended && plan.badge && (
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mb-6 line-clamp-2">{plan.description}</p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-slate-800/80">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">{plan.price}</span>
                  <span className="text-sm font-medium text-slate-400">{plan.period}</span>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Included Features</div>
                  <ul className="space-y-3 text-sm text-slate-300">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0",
                          plan.recommended ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"
                        )}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action CTA Button */}
              <div>
                {plan.disabled ? (
                  <button
                    disabled
                    className="w-full py-3.5 px-6 rounded-2xl text-sm font-semibold bg-slate-800/50 text-slate-500 border border-slate-800 cursor-not-allowed text-center"
                  >
                    {plan.buttonText}
                  </button>
                ) : (
                  <Link
                    href={plan.buttonHref}
                    className="group relative w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-bold bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/25 transition-all glow-emerald active:scale-[0.98]"
                  >
                    <span>{plan.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee footer */}
        <div className="mt-12 text-center flex items-center justify-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Free plan forever</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>No credit card required to start</span>
          </div>
        </div>

      </div>
    </section>
  );
}
