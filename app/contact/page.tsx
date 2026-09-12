import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { ContactForm } from "@/components/contact-form";
import {
  Mail,
  HelpCircle,
  ShieldCheck,
  Lock,
  MessageSquare,
  Clock,
  ArrowLeft,
  ChevronRight,
  Shield,
  FileText,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Support | ExpenseFlow",
  description:
    "Get in touch with the ExpenseFlow team. Support, security vulnerability disclosure, and privacy inquiries.",
};

const supportChannels = [
  {
    icon: HelpCircle,
    title: "General & Account Support",
    email: "support@expenseflow.app",
    tag: "Standard Support",
    responseSla: "Within 24-48 business hours",
    description:
      "Assistance with account access, email verification, transaction categorization, category budget setup, and general navigation questions.",
    color: "from-[#00F0FF]/15 to-cyan-500/5",
    iconColor: "text-[#00F0FF]",
    borderColor: "hover:border-[#00F0FF]/40",
  },
  {
    icon: ShieldCheck,
    title: "Security & Vulnerability Disclosure",
    email: "security@expenseflow.app",
    tag: "Urgent Priority",
    responseSla: "Initial response within 24 hours",
    description:
      "Responsible disclosure of application vulnerabilities, token handling anomalies, rate limiting bypasses, or potential session security issues.",
    color: "from-emerald-500/15 to-teal-500/5",
    iconColor: "text-emerald-400",
    borderColor: "hover:border-emerald-500/40",
  },
  {
    icon: Lock,
    title: "Privacy & Data Subject Inquiries",
    email: "privacy@expenseflow.app",
    tag: "Privacy Compliance",
    responseSla: "Within 48 business hours",
    description:
      "Requests for personal data access, data export copies, account deletion requests, or questions regarding our Privacy Policy.",
    color: "from-violet-500/15 to-purple-500/5",
    iconColor: "text-violet-400",
    borderColor: "hover:border-violet-500/40",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#00F0FF] selection:text-[#07090E] flex flex-col justify-between">
      {/* Sticky Header Navigation */}
      <Navbar />

      <main className="flex-1 relative overflow-hidden py-12 md:py-20">
        {/* Background Ambient Glows */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#00F0FF]/10 via-[#7928CA]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-5 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb & Return Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-[#00F0FF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF] rounded px-2 py-1 bg-white/[0.03] border border-white/[0.06]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Hero Header & Product Overview */}
          <div className="rounded-3xl glass-fintech p-8 md:p-12 border border-white/[0.08] mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent" />

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/25">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>EXPENSEFLOW COMMUNICATIONS</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Contact &amp; Support
              </h1>
              <p className="text-base text-slate-300 leading-relaxed">
                Whether you have questions about tracking expenses, want to report a technical issue, or need assistance with your account, our team is here to assist.
              </p>

              {/* Product Overview Capsule */}
              <div className="pt-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 leading-relaxed space-y-1.5">
                <div className="text-white font-semibold font-heading flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#00F0FF]" />
                  <span>About ExpenseFlow</span>
                </div>
                <p>
                  ExpenseFlow is a modern, privacy-first personal finance tracking application designed for individuals seeking clear visibility into their daily cash flow and monthly category budgets. Because ExpenseFlow relies on self-directed manual entries, we never ask for your bank credentials, UPI MPIN, or SMS access.
                </p>
              </div>
            </div>
          </div>

          {/* Categorized Support Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {supportChannels.map((chan) => {
              const Icon = chan.icon;
              return (
                <div
                  key={chan.title}
                  className={`rounded-2xl glass-fintech p-6 border border-white/[0.08] ${chan.borderColor} transition-all duration-200 flex flex-col justify-between space-y-4`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${chan.color} ${chan.iconColor} border border-white/[0.06]`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 font-telemetry px-2 py-0.5 rounded-md bg-white/[0.04]">
                        {chan.tag}
                      </span>
                    </div>

                    <h2 className="font-heading text-lg font-bold text-white">
                      {chan.title}
                    </h2>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {chan.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-telemetry">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{chan.responseSla}</span>
                    </div>

                    <div className="text-xs font-telemetry">
                      <a
                        href={`mailto:${chan.email}`}
                        className="text-[#00F0FF] hover:underline font-medium break-all flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span>{chan.email}</span>
                      </a>
                      <div className="text-[10px] text-amber-400/90 font-mono mt-0.5">
                        [PLACEHOLDER - UPDATE BEFORE PRODUCTION]
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Two-Column Section: Interactive Form + Security Guidelines */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
            {/* Left Column: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right Column: Security Reporting Guidelines & Quick Links */}
            <div className="lg:col-span-5 space-y-6">
              {/* Security Disclosure Guidelines Box */}
              <div className="rounded-2xl glass-fintech p-6 sm:p-7 border border-emerald-500/20">
                <div className="flex items-center gap-2.5 mb-4 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="font-heading text-base font-bold text-white">
                    Responsible Vulnerability Disclosure
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  We take the security of ExpenseFlow user records seriously. If you identify a potential security defect or authorization issue, we appreciate your responsible disclosure.
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-slate-300">
                    <strong className="text-white block mb-0.5">What to Include:</strong>
                    Clear reproduction steps, affected endpoints, and payload examples (without executing destructive attacks).
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-slate-300">
                    <strong className="text-white block mb-0.5">Ground Rules:</strong>
                    Do not attempt automated denial of service (DDoS), credential brute forcing, or accessing another user&apos;s records.
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-slate-300">
                    <strong className="text-white block mb-0.5">Direct Channel:</strong>
                    <span className="text-emerald-400 font-telemetry">security@expenseflow.app</span>
                    <span className="text-[10px] text-amber-400 block">[PLACEHOLDER - UPDATE BEFORE PRODUCTION]</span>
                  </div>
                </div>
              </div>

              {/* Privacy Inquiries Card */}
              <div className="rounded-2xl glass-fintech p-6 border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2 text-violet-400">
                  <Lock className="w-4 h-4" />
                  <h3 className="font-heading text-sm font-bold text-white">
                    Data Rights &amp; Deletion
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Need to exercise your right to access, export, or permanently delete your account data? Submit your request using the form or email our privacy desk directly.
                </p>
                <div className="pt-2">
                  <Link
                    href="/privacy#user-rights"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#00F0FF] hover:underline"
                  >
                    <span>Read Your Privacy Rights</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Quick Legal Links */}
              <div className="rounded-2xl glass-fintech p-5 border border-white/[0.08] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>Review Terms of Service</span>
                </div>
                <Link
                  href="/terms"
                  className="text-[#00F0FF] hover:underline font-medium inline-flex items-center gap-1"
                >
                  <span>Terms</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Self-Help Notice */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3 text-xs text-slate-400">
                <AlertCircle className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-300 font-medium">Looking for Instant Answers? </span>
                  Check out our frequently asked questions on the landing page for quick troubleshooting steps.
                  <div className="mt-1">
                    <Link href="/#faq" className="text-[#00F0FF] hover:underline">
                      Visit FAQ Section &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Institutional Footer */}
      <LandingFooter />
    </div>
  );
}
