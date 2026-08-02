"use client";

import React from "react";
import { UserPlus, PlusCircle, LineChart, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepItem {
  step: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  badgeBg: string;
}

const stepsList: StepItem[] = [
  {
    step: "01",
    title: "Create Your Account",
    description: "Sign up securely and personalize your finance dashboard.",
    icon: UserPlus,
    color: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    step: "02",
    title: "Add Your Expenses",
    description: "Record income and expenses with smart categories.",
    icon: PlusCircle,
    color: "text-teal-400",
    badgeBg: "bg-teal-500/10 border-teal-500/30 text-teal-400",
  },
  {
    step: "03",
    title: "View Insights",
    description: "Analyze spending, monitor budgets, and make smarter financial decisions.",
    icon: LineChart,
    color: "text-cyan-400",
    badgeBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
];

export function HowItWorks() {
  return (
    <section id="solutions" className="relative py-20 lg:py-28 bg-[#090d16] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-lg shadow-emerald-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple 3-Step Setup</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            How It <span className="gradient-text">Works</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Start tracking your finances in three simple steps.
          </p>
        </div>

        {/* 3 Connected Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative">
          {stepsList.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === stepsList.length - 1;

            return (
              <div key={item.step} className="relative flex flex-col">
                
                {/* Desktop Horizontal Connector Arrow (between items) */}
                {!isLast && (
                  <div className="hidden lg:flex absolute top-12 -right-4 z-20 translate-x-1/2 items-center justify-center text-slate-700">
                    <div className="flex items-center gap-1">
                      <div className="w-8 h-[2px] bg-gradient-to-r from-emerald-500/40 to-transparent" />
                      <ArrowRight className="w-4 h-4 text-emerald-500/60" />
                    </div>
                  </div>
                )}

                {/* Step Card */}
                <div
                  className={cn(
                    "group relative p-8 rounded-3xl h-full flex flex-col justify-between transition-all duration-300",
                    "bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl",
                    "hover:bg-slate-900/90 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10",
                    "hover:-translate-y-1.5"
                  )}
                >
                  {/* Subtle hover gradient aura */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div>
                    {/* Top Row: Step Number & Icon */}
                    <div className="flex items-center justify-between mb-8">
                      <span className={cn("text-xs font-bold px-3 py-1 rounded-full border shadow-sm", item.badgeBg)}>
                        STEP {item.step}
                      </span>
                      <div className={cn("p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 group-hover:border-slate-700 transition-colors", item.color)}>
                        <Icon className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    </div>

                    {/* Step Title & Description */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                      {item.description}
                    </p>
                  </div>

                  {/* Mobile Down Arrow Connector (between stacked items) */}
                  {!isLast && (
                    <div className="flex lg:hidden justify-center pt-6 -mb-3 text-emerald-500/50">
                      <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                        ↓
                      </div>
                    </div>
                  )}

                  {/* Card Footer Indicator */}
                  <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="group-hover:text-emerald-400 transition-colors">Ready in ~2 mins</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400 transition-colors" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
