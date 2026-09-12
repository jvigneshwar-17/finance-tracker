import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import {
  FileCheck,
  AlertTriangle,
  Scale,
  ShieldAlert,
  UserCheck,
  ServerOff,
  Sparkles,
  Ban,
  HelpCircle,
  Mail,
  ArrowLeft,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | ExpenseFlow",
  description:
    "Terms of Service for ExpenseFlow. Review our user agreement, personal finance tracking tool limitations, and legal disclaimers.",
};

const termsSections = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "financial-disclaimer", label: "2. Disclaimer of Financial Advice" },
  { id: "account-responsibilities", label: "3. Account Responsibilities" },
  { id: "user-conduct", label: "4. User Conduct & Restrictions" },
  { id: "data-accuracy", label: "5. Data Accuracy & User Input" },
  { id: "intellectual-property", label: "6. Intellectual Property" },
  { id: "service-availability", label: "7. Service Availability & No Uptime Guarantees" },
  { id: "limitation-of-liability", label: "8. Limitation of Liability" },
  { id: "account-termination", label: "9. Account Termination & Suspension" },
  { id: "changes-to-terms", label: "10. Changes to These Terms" },
  { id: "governing-law", label: "11. Governing Law & Dispute Resolution" },
  { id: "contact-information", label: "12. Contact Information" },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#00F0FF] selection:text-[#07090E] flex flex-col justify-between">
      {/* Sticky Header Navigation */}
      <Navbar />

      <main className="flex-1 relative overflow-hidden py-12 md:py-20">
        {/* Background Ambient Glows */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#7928CA]/15 via-[#00F0FF]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-10 w-[400px] h-[400px] bg-[#00F0FF]/5 rounded-full blur-[160px] pointer-events-none" />

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

          {/* Header Banner */}
          <div className="rounded-3xl glass-fintech p-8 md:p-12 border border-white/[0.08] mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7928CA]/50 to-transparent" />

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/25">
                <Scale className="w-3.5 h-3.5" />
                <span>EXPENSEFLOW USER AGREEMENT</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Terms of Service
              </h1>
              <p className="text-base text-slate-300 leading-relaxed">
                Please review these Terms of Service carefully before accessing or using ExpenseFlow. These terms establish your legal rights, obligations, and important limitations regarding your use of our software.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-telemetry text-slate-400">
                <div>
                  <span className="text-slate-500">Effective Date: </span>
                  <span className="text-slate-200">January 1, 2026</span>
                </div>
                <div>
                  <span className="text-slate-500">Last Revised: </span>
                  <span className="text-slate-200">September 12, 2026</span>
                </div>
                <div>
                  <span className="text-slate-500">Status: </span>
                  <span className="text-slate-200">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Critical Statutory Callout Box */}
          <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-amber-500/[0.07] border border-amber-500/30 text-amber-100 flex flex-col sm:flex-row items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <div className="font-heading text-base font-bold text-amber-200 uppercase tracking-wide">
                Critical Financial Disclaimer
              </div>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                ExpenseFlow is a personal finance tracking tool and does not provide financial, investment, tax, or legal advice. All calculations, budget summaries, and graphs are generated solely from user-entered numbers for personal organizational purposes.
              </p>
            </div>
          </div>

          {/* Two-Column Grid: Table of Contents + Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Desktop Table of Contents Sidebar */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4" aria-label="Terms of Service Table of Contents">
              <div className="rounded-2xl glass-fintech p-6 border border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 font-heading mb-4 pb-3 border-b border-white/[0.06]">
                  <FileCheck className="w-4 h-4 text-[#00F0FF]" />
                  <span>Agreement Sections</span>
                </div>
                <nav className="space-y-1.5" aria-label="Table of Contents">
                  {termsSections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block text-xs py-1.5 px-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F0FF]"
                    >
                      {sec.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-2">
                  <div className="text-[11px] font-medium text-slate-400">
                    Legal Questions &amp; Notices
                  </div>
                  <div className="text-xs font-telemetry text-[#00F0FF] break-all">
                    legal@expenseflow.app <span className="text-[10px] text-amber-400">[PLACEHOLDER - UPDATE BEFORE PRODUCTION]</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Terms Content */}
            <div className="lg:col-span-8 space-y-10 text-slate-300 text-sm leading-relaxed">
              {/* 1. Acceptance of Terms */}
              <section id="acceptance" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF]">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    1. Acceptance of Terms
                  </h2>
                </div>
                <p className="mb-4">
                  By accessing, browsing, registering for, or using the ExpenseFlow application (&ldquo;Service&rdquo;), you enter into a legally binding agreement governed by these Terms of Service (&ldquo;Terms&rdquo;) and our Privacy Policy.
                </p>
                <p>
                  If you do not agree to these Terms in their entirety, you must discontinue your use of the Service immediately. If you are using ExpenseFlow on behalf of an entity or organization, you represent that you possess the requisite authority to bind that entity to these Terms.
                </p>
              </section>

              {/* 2. Disclaimer of Financial Advice */}
              <section id="financial-disclaimer" className="rounded-2xl bg-[#0F1422] p-6 sm:p-8 border border-amber-500/30 scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    2. Disclaimer of Financial Advice
                  </h2>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] mb-4 text-slate-200">
                  <p className="font-semibold text-white mb-2">
                    ExpenseFlow is a personal finance tracking tool and does not provide financial, investment, tax, or legal advice.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    The graphs, summary cards, category percentages, budget calculations, and net cash flow estimates presented in ExpenseFlow are computational aggregates based exclusively on numbers entered by you. They do not constitute financial planning, fiduciary guidance, tax preparation, portfolio management, or credit repair services.
                  </p>
                </div>
                <p className="text-xs text-slate-400">
                  You are solely responsible for evaluating your financial decisions and should consult a certified financial planner (CFP), certified public accountant (CPA), or licensed legal advisor for specific financial advice.
                </p>
              </section>

              {/* 3. Account Responsibilities */}
              <section id="account-responsibilities" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    3. Account Responsibilities
                  </h2>
                </div>
                <p className="mb-4">
                  To protect the security of your financial tracking records, you agree to:
                </p>
                <ul className="space-y-2 list-disc list-inside text-slate-300 ml-2">
                  <li>
                    <strong className="text-white">Accurate Registration Information:</strong> Provide an email address that you own and have continuous access to.
                  </li>
                  <li>
                    <strong className="text-white">Email Verification:</strong> Complete email verification before accessing authenticated tracking dashboards. Accounts with unverified email addresses will be restricted.
                  </li>
                  <li>
                    <strong className="text-white">Credential Confidentiality:</strong> Maintain a strong, unique password and safeguard your login credentials from third parties.
                  </li>
                  <li>
                    <strong className="text-white">Prompt Notification:</strong> Notify ExpenseFlow immediately via our security channel if you detect any unauthorized access or compromise of your account.
                  </li>
                </ul>
              </section>

              {/* 4. User Conduct */}
              <section id="user-conduct" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
                    <Ban className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    4. User Conduct &amp; Prohibited Activities
                  </h2>
                </div>
                <p className="mb-4">
                  You agree to use ExpenseFlow strictly for personal, lawful financial management. You shall NOT:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <strong className="text-white">1. Rate Limit Circumvention:</strong> Attempt to bypass, tamper with, or flood our sliding-window rate limiters, token validation guards, or authentication endpoints.
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <strong className="text-white">2. Automated Scraping &amp; Stress Attacks:</strong> Deploy automated bots, web spiders, or denial-of-service scripts against ExpenseFlow servers.
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <strong className="text-white">3. Unauthorized Security Probing:</strong> Perform intrusive vulnerability scans, fuzzing, or penetration testing against production systems without prior written authorization.
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <strong className="text-white">4. Impersonation &amp; Fraud:</strong> Register using credentials belonging to other individuals or submit fraudulent or malicious payloads.
                  </div>
                </div>
              </section>

              {/* 5. Data Accuracy */}
              <section id="data-accuracy" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    5. Data Accuracy &amp; User Input
                  </h2>
                </div>
                <p className="mb-3">
                  ExpenseFlow does not sync directly with banks or credit card providers. Consequently:
                </p>
                <ul className="space-y-2 list-disc list-inside text-slate-300 ml-2">
                  <li>
                    All computations (such as monthly net savings, category burn rates, and budget health) reflect exactly the figures you record.
                  </li>
                  <li>
                    ExpenseFlow is not liable for errors, omissions, or discrepancies arising from mistyped transaction amounts, wrong category assignments, or forgotten entries.
                  </li>
                  <li>
                    You remain exclusively responsible for verifying the accuracy of your records against your official bank or credit card statements.
                  </li>
                </ul>
              </section>

              {/* 6. Intellectual Property */}
              <section id="intellectual-property" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF]">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    6. Intellectual Property
                  </h2>
                </div>
                <p className="mb-3">
                  The ExpenseFlow name, logo, graphic design, user interface elements, source code, and underlying software algorithms are the intellectual property of ExpenseFlow and its licensors.
                </p>
                <p>
                  Subject to your compliance with these Terms, ExpenseFlow grants you a revocable, non-exclusive, non-transferable, limited personal license to access and use the application solely for your personal finance tracking needs. You may not duplicate, reverse engineer, decompile, resell, or distribute the application without explicit authorization.
                </p>
              </section>

              {/* 7. Service Availability */}
              <section id="service-availability" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
                    <ServerOff className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    7. Service Availability &amp; No Uptime Guarantees
                  </h2>
                </div>
                <p className="mb-3">
                  ExpenseFlow is provided on an <strong className="text-white">&ldquo;AS IS&rdquo;</strong> and <strong className="text-white">&ldquo;AS AVAILABLE&rdquo;</strong> basis without warranties of any kind, whether express or implied.
                </p>
                <ul className="space-y-2 list-disc list-inside text-slate-300 ml-2">
                  <li>
                    <strong className="text-white">No Uptime Guarantee:</strong> We make no express or implied representation that the Service will be uninterrupted, error-free, completely bug-free, or continuously available.
                  </li>
                  <li>
                    <strong className="text-white">Maintenance Windows:</strong> The Service may be temporarily paused for software updates, infrastructure maintenance, security patching, or emergency repairs.
                  </li>
                  <li>
                    <strong className="text-white">Backups:</strong> While we employ industry-standard database management practices, you are encouraged to periodically review and keep independent records of your critical financial information.
                  </li>
                </ul>
              </section>

              {/* 8. Limitation of Liability */}
              <section id="limitation-of-liability" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    8. Limitation of Liability
                  </h2>
                </div>
                <p className="mb-4">
                  To the maximum extent permitted by applicable law, in no event shall ExpenseFlow, its maintainers, developers, or affiliates be liable for:
                </p>
                <ul className="space-y-2 list-disc list-inside text-slate-300 ml-2 text-xs">
                  <li>Any indirect, incidental, special, consequential, or punitive damages.</li>
                  <li>Any financial loss, lost profits, lost savings, overdraft charges, late fees, tax penalties, or investment losses arising out of your use or inability to use the Service.</li>
                  <li>Any unauthorized access to, alteration of, or loss of your transactions or data caused by user credential compromise.</li>
                  <li>Any total liability exceeding the greater of fifty United States Dollars ($50.00 USD) or the actual amount paid by you, if any, to ExpenseFlow during the twelve (12) months preceding the claim.</li>
                </ul>
              </section>

              {/* 9. Account Termination */}
              <section id="account-termination" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
                    <Ban className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    9. Account Termination &amp; Suspension
                  </h2>
                </div>
                <p className="mb-3">
                  <strong className="text-white">By You:</strong> You may cease using ExpenseFlow at any time and may request complete deletion of your account and records by submitting an inquiry via our contact page.
                </p>
                <p>
                  <strong className="text-white">By ExpenseFlow:</strong> We reserve the right to suspend, disable, or terminate your access to the Service immediately and without prior notice if you violate these Terms, engage in abusive automation, circumvent security controls, or engage in unlawful conduct.
                </p>
              </section>

              {/* 10. Changes to Terms */}
              <section id="changes-to-terms" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    10. Changes to These Terms
                  </h2>
                </div>
                <p className="mb-3">
                  We reserve the right to revise or update these Terms as the application evolves or to comply with statutory requirements. 
                </p>
                <p>
                  Any updates will be indicated by updating the &ldquo;Last Revised&rdquo; timestamp at the top of this page. Your continued use of ExpenseFlow following the publication of updated Terms constitutes your acceptance of the revised agreement.
                </p>
              </section>

              {/* 11. Governing Law */}
              <section id="governing-law" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    11. Governing Law &amp; Dispute Resolution
                  </h2>
                </div>
                <p className="mb-3">
                  These Terms shall be governed by and construed in accordance with standard commercial contract laws, without giving effect to any principles of conflicts of law.
                </p>
                <p>
                  Prior to initiating any formal legal claim, you agree to make a good-faith effort to resolve any dispute or inquiry informally by contacting our legal counsel at <span className="text-[#00F0FF] font-telemetry">legal@expenseflow.app [PLACEHOLDER - UPDATE BEFORE PRODUCTION]</span>.
                </p>
              </section>

              {/* 12. Contact Information */}
              <section id="contact-information" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-[#00F0FF]/25 scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-[#00F0FF]/15 text-[#00F0FF]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    12. Contact Information
                  </h2>
                </div>
                <p className="mb-4">
                  For legal inquiries, formal notices, or questions regarding these Terms of Service, please reach out through our official channels:
                </p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2 text-xs">
                  <div className="text-white font-semibold">ExpenseFlow Legal &amp; Compliance</div>
                  <div className="text-slate-400">
                    Email:{" "}
                    <span className="text-[#00F0FF] font-telemetry">
                      legal@expenseflow.app <span className="text-amber-400 text-[11px]">[PLACEHOLDER - UPDATE BEFORE PRODUCTION]</span>
                    </span>
                  </div>
                  <div className="text-slate-400">
                    Support Inquiries:{" "}
                    <Link href="/contact" className="text-[#00F0FF] hover:underline">
                      ExpenseFlow Contact Page
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Institutional Footer */}
      <LandingFooter />
    </div>
  );
}
