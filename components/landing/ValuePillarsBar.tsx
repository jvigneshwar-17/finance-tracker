"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Wallet, PieChart, Target } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Privacy-First Tracking",
    description: "Manual entry ensures zero bank password requests, zero scrapers, and full privacy.",
    accent: "#00F0FF",
  },
  {
    icon: Wallet,
    title: "Category Budgets",
    description: "Set monthly caps per category and monitor your spent vs. remaining headroom in real time.",
    accent: "#10B981",
  },
  {
    icon: PieChart,
    title: "Visual Analytics",
    description: "Transform daily transactions into intuitive distribution graphs and spending trends.",
    accent: "#7928CA",
  },
  {
    icon: Target,
    title: "Savings Goals",
    description: "Define milestone funds with targets and deadlines to build financial resilience steadily.",
    accent: "#F59E0B",
  },
];

export function ValuePillarsBar() {
  return (
    <section className="relative py-8 border-y border-white/[0.06] bg-[#0D111C]/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="pt-4 sm:pt-0 sm:px-4 lg:px-6 first:pl-0 last:pr-0 group"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] group-hover:bg-white/[0.06] transition-colors shrink-0"
                    style={{ color: pillar.accent }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading text-sm font-semibold text-white group-hover:text-[#00F0FF] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
