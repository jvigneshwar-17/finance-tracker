"use client";

import React from "react";
import {
  Receipt,
  Target,
  BarChart3,
  Tags,
  PiggyBank,
  FileSpreadsheet,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
  badge?: string;
  color: string;
  iconBg: string;
}

const featuresList: FeatureItem[] = [
  {
    icon: Receipt,
    title: "Expense Tracking",
    description: "Record every expense instantly.",
    color: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Target,
    title: "Budget Planning",
    description: "Set monthly budgets and monitor progress.",
    color: "text-teal-400",
    iconBg: "bg-teal-500/10 border-teal-500/20",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Interactive charts and spending insights.",
    color: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: Tags,
    title: "Smart Categories",
    description: "Organize transactions automatically.",
    badge: "Auto-AI",
    color: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: PiggyBank,
    title: "Financial Goals",
    description: "Track savings and personal goals.",
    color: "text-teal-400",
    iconBg: "bg-teal-500/10 border-teal-500/20",
  },
  {
    icon: FileSpreadsheet,
    title: "Export Reports",
    description: "Export your data to CSV or PDF.",
    color: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-20 lg:py-28 bg-[#090d16] overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-lg shadow-emerald-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Everything You Need to <br className="hidden sm:inline" />
            <span className="gradient-text">Manage Your Finances</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Powerful tools to track spending, plan budgets, and understand your financial habits.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuresList.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={cn(
                  "group relative p-6 sm:p-8 rounded-3xl transition-all duration-300",
                  "bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl",
                  "hover:bg-slate-900/90 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10",
                  "hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                )}
              >
                {/* Glow aura on card hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={cn("p-3.5 rounded-2xl border transition-transform duration-300 group-hover:scale-110", feature.iconBg, feature.color)}>
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    {feature.badge ? (
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {feature.badge}
                      </span>
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-emerald-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Border Accent Line */}
                <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 group-hover:text-emerald-400 font-medium transition-colors">
                  <span>Learn more</span>
                  <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
