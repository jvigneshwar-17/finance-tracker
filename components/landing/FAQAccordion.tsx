"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Does ExpenseFlow connect directly to my bank account?",
    answer:
      "No. ExpenseFlow is intentionally designed for manual tracking to preserve your complete privacy. We never ask for your net-banking credentials, debit card numbers, UPI MPIN, or SMS permissions. You remain in total control of what is recorded.",
  },
  {
    question: "What financial activities can I track?",
    answer:
      "ExpenseFlow allows you to record both daily expenses and income streams. Each transaction can be assigned a category (e.g., Food & Dining, Groceries, Utilities, Transport, Shopping), a specific date, and optional payment notes for easy searching later.",
  },
  {
    question: "How do category budgets work?",
    answer:
      "You can assign monthly spending limits to individual categories. As you record transactions, ExpenseFlow computes your spent percentage and remaining allowance in real time. If a category reaches 80% of its budget, an amber threshold alert notifies you before you exceed your limit.",
  },
  {
    question: "How are my authentication tokens and credentials protected?",
    answer:
      "Passwords are salted and hashed using standard bcrypt. Single-use verification and password reset tokens are stored as cryptographic SHA-256 hashes—raw tokens are never saved to the database. Additionally, our authentication and financial write endpoints are shielded by Upstash Redis sliding-window rate limiters.",
  },
  {
    question: "Is ExpenseFlow free to use?",
    answer:
      "Yes. The core personal finance tools—expense and income tracking, monthly category budgets, visual analytics breakdowns, and savings goals—are completely free to use without commercial advertising.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="relative py-20 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Everything you need to know
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Clear answers to common questions about tracking, privacy, budgets, and security.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl glass-fintech border border-white/[0.08] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/50"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-base sm:text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="p-1 rounded-lg bg-white/[0.04] text-slate-400 shrink-0"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/[0.04] pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
