"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Is ExpenseFlow free?",
    answer: "Yes. The Free plan includes all essential expense tracking features.",
  },
  {
    question: "Can I export my data?",
    answer: "Yes. Export options are available, with advanced exports in the Pro plan.",
  },
  {
    question: "Is my financial data secure?",
    answer: "Yes. Your data is encrypted and protected using industry-standard security practices.",
  },
  {
    question: "Can I use ExpenseFlow on mobile?",
    answer: "Yes. The application is fully responsive and works on phones, tablets, and desktops.",
  },
  {
    question: "Will more features be added?",
    answer: "Absolutely. Cloud sync, AI insights, recurring transactions, and more are planned.",
  },
];

export function FAQ() {
  // Allow toggling open items (first item open by default for great UX)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 lg:py-28 bg-[#090d16] overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-lg shadow-emerald-500/10">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Everything you need to know about ExpenseFlow.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={cn(
                  "rounded-2xl transition-all duration-200 overflow-hidden",
                  "bg-slate-900/60 border backdrop-blur-xl",
                  isOpen
                    ? "border-emerald-500/50 bg-slate-900/90 shadow-xl shadow-emerald-500/5"
                    : "border-slate-800/80 hover:border-slate-700"
                )}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-emerald-500/40 rounded-2xl group"
                  aria-expanded={isOpen}
                >
                  <span className={cn(
                    "text-base sm:text-lg font-semibold transition-colors pr-4",
                    isOpen ? "text-emerald-300" : "text-slate-200 group-hover:text-white"
                  )}>
                    {item.question}
                  </span>
                  <div className={cn(
                    "p-1.5 rounded-xl transition-all duration-200 shrink-0",
                    isOpen ? "bg-emerald-500/10 text-emerald-400 rotate-180" : "bg-slate-800 text-slate-400"
                  )}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated Accordion Content */}
                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-slate-300 leading-relaxed pt-1 border-t border-slate-800/50 animate-in fade-in slide-in-from-top-1 duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
