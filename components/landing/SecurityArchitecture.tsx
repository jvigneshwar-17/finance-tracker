"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, KeyRound, Clock, MailCheck, Cookie, Lock } from "lucide-react";

const securityFeatures = [
  {
    icon: KeyRound,
    title: "SHA-256 Token Hashing",
    description:
      "Password reset and email verification tokens are stored exclusively as cryptographic SHA-256 hashes. Raw tokens are never persisted in the database.",
    tag: "Cryptographic Protection",
  },
  {
    icon: Clock,
    title: "Production Rate Limiting",
    description:
      "Authentication and financial write endpoints are protected by sliding-window rate limiters to prevent brute-force attacks and abuse.",
    tag: "Brute-Force Defense",
  },
  {
    icon: MailCheck,
    title: "Mandatory Email Verification",
    description:
      "Accounts must verify email ownership before authentication is granted, protecting financial data from unauthorized or unverified access.",
    tag: "Identity Verification",
  },
  {
    icon: Cookie,
    title: "Secure HTTP-Only Cookies",
    description:
      "Session tokens are transmitted exclusively through secure, HTTP-only cookies with SameSite strict policies, neutralizing clientside token theft.",
    tag: "Session Guard",
  },
  {
    icon: Lock,
    title: "Bcrypt Password Hashing",
    description:
      "User credentials are salted and hashed using standard bcrypt algorithms with appropriate work factors before storage.",
    tag: "Credential Security",
  },
  {
    icon: Shield,
    title: "Single-Use Token Consumption",
    description:
      "Verification and reset tokens are invalidated immediately upon first use to eliminate replay vulnerabilities.",
    tag: "Replay Prevention",
  },
];

export function SecurityArchitecture() {
  return (
    <section id="security" className="relative py-20 bg-[#0D111C]/40 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/15 text-emerald-400 border border-emerald-500/25">
            <Shield className="w-3.5 h-3.5" />
            <span>APPLICATION SECURITY</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Built with layered application security
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            Every layer of ExpenseFlow—from credential hashing and token generation to session management and rate limiting—is engineered to protect your financial records.
          </p>
        </div>

        {/* Security Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="rounded-2xl glass-fintech p-6 border border-white/[0.08] hover:border-[#10B981]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 font-telemetry">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Statement */}
        <div className="mt-10 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center max-w-3xl mx-auto">
          <p className="text-xs text-slate-400">
            <span className="text-white font-semibold">Privacy Philosophy: </span>
            ExpenseFlow does not request your net-banking passwords, UPI MPIN, or SMS read permissions. You have complete ownership of your personal finance records.
          </p>
        </div>
      </div>
    </section>
  );
}
