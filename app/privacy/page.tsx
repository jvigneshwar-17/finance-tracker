import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import {
  Shield,
  Lock,
  EyeOff,
  Database,
  KeyRound,
  FileText,
  Cookie,
  Mail,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | ExpenseFlow",
  description:
    "Learn how ExpenseFlow protects your personal financial records. Privacy-first architecture, zero bank logins, and no data monetization.",
};

const sections = [
  { id: "introduction", label: "1. Introduction & Philosophy" },
  { id: "information-we-collect", label: "2. Information We Collect" },
  { id: "account-information", label: "3. Account Information" },
  { id: "transaction-budget-data", label: "4. Transaction & Budget Data" },
  { id: "authentication-data", label: "5. Authentication & Security Data" },
  { id: "cookies-session", label: "6. Cookies & Session Storage" },
  { id: "how-we-use-information", label: "7. How Information Is Used" },
  { id: "data-security", label: "8. Data Security Architecture" },
  { id: "user-rights", label: "9. Your Rights & Data Controls" },
  { id: "data-retention", label: "10. Data Retention & Deletion" },
  { id: "third-party-services", label: "11. Third-Party Service Providers" },
  { id: "what-we-never-do", label: "12. What We Never Do" },
  { id: "policy-updates", label: "13. Updates to This Policy" },
  { id: "contact-information", label: "14. Contact Information" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#00F0FF] selection:text-[#07090E] flex flex-col justify-between">
      {/* Sticky Header Navigation */}
      <Navbar />

      <main className="flex-1 relative overflow-hidden py-12 md:py-20">
        {/* Background Ambient Glows */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#00F0FF]/10 via-[#7928CA]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

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
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent" />
            
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/25">
                <Shield className="w-3.5 h-3.5" />
                <span>EXPENSEFLOW LEGAL DISCLOSURE</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Privacy Policy
              </h1>
              <p className="text-base text-slate-300 leading-relaxed">
                ExpenseFlow is engineered with a strict privacy-first philosophy. We believe your personal spending habits are private to you. This policy outlines how your data is collected, stored, protected, and controlled.
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
                  <span className="text-slate-500">Version: </span>
                  <span className="text-slate-200">1.2 (Direct Tracking)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column Grid: Table of Contents + Policy Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Desktop Table of Contents Sidebar */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4" aria-label="Privacy Policy Table of Contents">
              <div className="rounded-2xl glass-fintech p-6 border border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 font-heading mb-4 pb-3 border-b border-white/[0.06]">
                  <FileText className="w-4 h-4 text-[#00F0FF]" />
                  <span>Document Sections</span>
                </div>
                <nav className="space-y-1.5" aria-label="Table of Contents">
                  {sections.map((sec) => (
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
                    Privacy Inquiries Contact
                  </div>
                  <div className="text-xs font-telemetry text-[#00F0FF] break-all">
                    privacy@expenseflow.app <span className="text-[10px] text-amber-400">[PLACEHOLDER - UPDATE BEFORE PRODUCTION]</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Policy Content Articles */}
            <div className="lg:col-span-8 space-y-10 text-slate-300 text-sm leading-relaxed">
              {/* 1. Introduction & Philosophy */}
              <section id="introduction" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    1. Introduction &amp; Privacy Philosophy
                  </h2>
                </div>
                <p className="mb-4">
                  ExpenseFlow (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is an independent, self-directed personal finance tracking application. Our primary goal is to help individuals track their daily transactions, create category budgets, and analyze personal financial trends without sacrificing personal privacy.
                </p>
                <p>
                  Unlike traditional financial software, ExpenseFlow does not harvest or aggregate bank account credentials, does not monitor third-party financial transactions via automated screen scraping, does not run AI algorithms across your transactions, and does not sell or monetize personal financial information. Your financial records belong solely to you.
                </p>
              </section>

              {/* 2. Information We Collect */}
              <section id="information-we-collect" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    2. Information We Collect
                  </h2>
                </div>
                <p className="mb-4">
                  We collect information strictly necessary to provide the ExpenseFlow personal finance service. We do not gather extraneous telemetry, tracking identifiers, or device fingerprints. Information collected falls into the specific categories below.
                </p>
              </section>

              {/* 3. Account Information */}
              <section id="account-information" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF]">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    3. Account Information
                  </h2>
                </div>
                <p className="mb-4">
                  When you register for an account on ExpenseFlow, you provide:
                </p>
                <ul className="space-y-2 list-disc list-inside text-slate-300 ml-2">
                  <li>
                    <strong className="text-white">Email Address:</strong> Used exclusively as your unique account identifier, for essential transactional notices (such as mandatory email verification links and password recovery requests).
                  </li>
                  <li>
                    <strong className="text-white">Password:</strong> Stored strictly in cryptographic salted and hashed format using standard bcrypt algorithms. Plaintext passwords never touch persistent storage or logs.
                  </li>
                  <li>
                    <strong className="text-white">Display Name (Optional):</strong> Used solely for personalized display within your private dashboard.
                  </li>
                  <li>
                    <strong className="text-white">Email Verification Status:</strong> A boolean flag indicating whether email ownership has been confirmed via our single-use verification protocol.
                  </li>
                </ul>
              </section>

              {/* 4. Transaction and Budget Data */}
              <section id="transaction-budget-data" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    4. Transaction &amp; Budget Data
                  </h2>
                </div>
                <p className="mb-4">
                  All transaction and budget data within ExpenseFlow is created directly and manually by you. This includes:
                </p>
                <ul className="space-y-2 list-disc list-inside text-slate-300 ml-2">
                  <li>
                    <strong className="text-white">Transactions:</strong> Monetary amount, transaction type (income or expense), user-selected category (such as Housing, Food, Transportation, Utilities, Entertainment, or Custom), transaction date, and optional description notes.
                  </li>
                  <li>
                    <strong className="text-white">Budgets:</strong> Monthly spending limits assigned by you to specific spending categories.
                  </li>
                  <li>
                    <strong className="text-white">Savings Goals:</strong> Target savings amounts, deadlines, and allocated progress balances.
                  </li>
                </ul>
                <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400">
                  <span className="text-[#00F0FF] font-semibold">Important Distinction: </span>
                  Because you enter this data manually, ExpenseFlow does not access your live bank statements, bank API accounts, credit card portals, or credit bureau histories.
                </div>
              </section>

              {/* 5. Authentication Data */}
              <section id="authentication-data" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    5. Authentication &amp; Security Data
                  </h2>
                </div>
                <p className="mb-4">
                  To safeguard your account and defend against automated attacks, we maintain the following security records:
                </p>
                <ul className="space-y-2 list-disc list-inside text-slate-300 ml-2">
                  <li>
                    <strong className="text-white">Cryptographic Token Hashes:</strong> Password reset and email verification tokens are stored exclusively as 64-character SHA-256 cryptographic hashes. Raw token strings are transmitted only in one-time verification links and are never saved in the database.
                  </li>
                  <li>
                    <strong className="text-white">Single-Use Consumption:</strong> Security tokens are automatically cleared and rendered permanently invalid immediately upon first use.
                  </li>
                  <li>
                    <strong className="text-white">IP Addresses &amp; Rate Limiting:</strong> Request IP addresses are processed in memory and via sliding-window limiters to detect and block brute-force password guessing, credential stuffing, and API abuse.
                  </li>
                </ul>
              </section>

              {/* 6. Cookies and Session Usage */}
              <section id="cookies-session" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Cookie className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    6. Cookies &amp; Session Usage
                  </h2>
                </div>
                <p className="mb-4">
                  ExpenseFlow uses cookies strictly for essential authentication and session integrity:
                </p>
                <div className="overflow-x-auto my-4">
                  <table className="w-full text-xs text-left border-collapse border border-white/[0.08] rounded-xl overflow-hidden">
                    <thead className="bg-white/[0.04] text-white font-heading">
                      <tr>
                        <th className="p-3 border-b border-white/[0.08]">Cookie Name</th>
                        <th className="p-3 border-b border-white/[0.08]">Type</th>
                        <th className="p-3 border-b border-white/[0.08]">Purpose</th>
                        <th className="p-3 border-b border-white/[0.08]">Security Attributes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06] text-slate-300 font-telemetry">
                      <tr>
                        <td className="p-3 text-[#00F0FF]">auth-token</td>
                        <td className="p-3">Strictly Necessary</td>
                        <td className="p-3 font-sans">Contains encrypted JWT session token to keep you securely signed in.</td>
                        <td className="p-3">HttpOnly, Secure, SameSite=Strict</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-slate-400">expenseflow-theme</td>
                        <td className="p-3">Functional</td>
                        <td className="p-3 font-sans">Stores your preferred UI appearance (Dark/Light).</td>
                        <td className="p-3">Client localStorage</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400">
                  We do NOT set marketing cookies, third-party behavioral pixels, cross-site trackers, or commercial analytics beacons.
                </p>
              </section>

              {/* 7. How Information Is Used */}
              <section id="how-we-use-information" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    7. How Information Is Used
                  </h2>
                </div>
                <p className="mb-3">
                  We process the minimal data collected strictly for the following operational purposes:
                </p>
                <ul className="space-y-2 list-disc list-inside text-slate-300 ml-2">
                  <li>To provide and maintain the ExpenseFlow application.</li>
                  <li>To aggregate and compute category spending totals, budget balances, and monthly cash flow metrics.</li>
                  <li>To authenticate your identity, prevent unauthorized access, and protect your account against brute-force attacks.</li>
                  <li>To send required transactional communications, including email verification requests and password reset instructions.</li>
                  <li>To diagnose system errors, investigate technical disruptions, and enforce our Terms of Service.</li>
                </ul>
              </section>

              {/* 8. Data Security Architecture */}
              <section id="data-security" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    8. Data Security Architecture
                  </h2>
                </div>
                <p className="mb-4">
                  We implement multi-layered technical security controls to safeguard your personal records against unauthorized access, destruction, or interception:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-xs font-bold text-white font-heading mb-1">Encrypted In Transit</div>
                    <p className="text-xs text-slate-400">
                      All network communication is transmitted exclusively via Transport Layer Security (TLS/HTTPS).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-xs font-bold text-white font-heading mb-1">Bcrypt Hash Isolation</div>
                    <p className="text-xs text-slate-400">
                      User passwords are salted and hashed using standard bcrypt work factors prior to database insertion.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-xs font-bold text-white font-heading mb-1">SHA-256 Token Protection</div>
                    <p className="text-xs text-slate-400">
                      Verification and recovery tokens are hashed using SHA-256; raw secrets are never persisted in the database.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-xs font-bold text-white font-heading mb-1">Sliding-Window Rate Limiting</div>
                    <p className="text-xs text-slate-400">
                      Authentication and financial write endpoints are shielded against automated brute-force attempts.
                    </p>
                  </div>
                </div>
              </section>

              {/* 9. User Rights */}
              <section id="user-rights" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    9. Your Rights &amp; Data Controls
                  </h2>
                </div>
                <p className="mb-4">
                  You retain full ownership of your personal financial records and may exercise the following rights at any time:
                </p>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Right of Access:</strong> You can review your complete transaction history, budget allocations, and profile details directly within your dashboard.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Right to Rectification:</strong> You can modify or correct any transaction, budget target, or account name instantly via the user interface.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Right to Deletion:</strong> You may delete individual transactions or categories at will. You may also request the complete deletion of your account and associated database records by contacting our privacy team.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Right to Data Portability:</strong> You may request an export of your recorded transaction data in standard structured formats.
                    </div>
                  </li>
                </ul>
              </section>

              {/* 10. Data Retention */}
              <section id="data-retention" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    10. Data Retention &amp; Deletion
                  </h2>
                </div>
                <p className="mb-3">
                  We retain your personal data only for as long as your account remains open and in good standing. 
                </p>
                <ul className="space-y-2 list-disc list-inside text-slate-300 ml-2">
                  <li>
                    <strong className="text-white">Active Accounts:</strong> Transaction and budget records remain accessible until you choose to delete them.
                  </li>
                  <li>
                    <strong className="text-white">Authentication Tokens:</strong> Password reset tokens expire within 1 hour; email verification tokens expire within 24 hours. Once consumed or expired, tokens are removed.
                  </li>
                  <li>
                    <strong className="text-white">Account Termination:</strong> Upon validated account deletion, your user records, transaction records, budget targets, and goal histories are permanently purged from our active database.
                  </li>
                </ul>
              </section>

              {/* 11. Third Party Services */}
              <section id="third-party-services" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <EyeOff className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    11. Third-Party Service Providers
                  </h2>
                </div>
                <p className="mb-4">
                  ExpenseFlow works with a minimal footprint of infrastructure vendors strictly necessary to host and deliver the web service:
                </p>
                <ul className="space-y-2 list-disc list-inside text-slate-300 ml-2">
                  <li>
                    <strong className="text-white">Database &amp; Hosting Infrastructure:</strong> Managed cloud database and server compute providers that execute the application and store encrypted database tables.
                  </li>
                  <li>
                    <strong className="text-white">Transactional Email Delivery:</strong> Standard Simple Mail Transfer Protocol (SMTP) services used exclusively to transmit verification emails and password reset links.
                  </li>
                </ul>
                <p className="mt-4 text-xs text-slate-400">
                  We do not permit any third-party infrastructure vendor to use your data for marketing, advertising, machine learning training, or commercial distribution.
                </p>
              </section>

              {/* 12. What We Never Do */}
              <section id="what-we-never-do" className="rounded-2xl bg-gradient-to-br from-[#07090E] via-red-950/10 to-amber-950/10 p-6 sm:p-8 border border-amber-500/25 scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    12. What We Never Do
                  </h2>
                </div>
                <p className="text-sm text-slate-300 mb-4">
                  To eliminate any ambiguity regarding how ExpenseFlow operates, we make the following explicit commitments:
                </p>
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-amber-400 font-bold">✕</span>
                    <span className="text-slate-300">
                      <strong className="text-white">NO Bank Account Integrations:</strong> We do not connect to bank accounts, do not read bank SMS notifications, and do not request online banking credentials, card numbers, or UPI MPINs.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-amber-400 font-bold">✕</span>
                    <span className="text-slate-300">
                      <strong className="text-white">NO Credit Bureau Access:</strong> We do not pull, report, or access credit bureau scores, credit files, or loan histories.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-amber-400 font-bold">✕</span>
                    <span className="text-slate-300">
                      <strong className="text-white">NO Artificial Intelligence Processing:</strong> We do not feed your transactions into external AI models, machine learning datasets, or generative language models.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-amber-400 font-bold">✕</span>
                    <span className="text-slate-300">
                      <strong className="text-white">NO Financial Advisory Services:</strong> ExpenseFlow is a recording and budgeting tool. It does not provide fiduciary, tax, investment, or financial advisory recommendations.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-amber-400 font-bold">✕</span>
                    <span className="text-slate-300">
                      <strong className="text-white">NO Selling User Data:</strong> We do not sell, license, rent, or trade your personal or financial data to advertisers, data brokers, or commercial third parties under any circumstances.
                    </span>
                  </div>
                </div>
              </section>

              {/* 13. Policy Updates */}
              <section id="policy-updates" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-white/[0.08] scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    13. Updates to This Policy
                  </h2>
                </div>
                <p className="mb-3">
                  We may periodically update this Privacy Policy to reflect improvements to our application architecture, legal standards, or operational procedures.
                </p>
                <p>
                  Any updates will be posted directly to this page with an updated &ldquo;Last Revised&rdquo; timestamp. Where updates meaningfully alter how we handle your existing records, we will provide conspicuous notice via our website or via email to registered users.
                </p>
              </section>

              {/* 14. Contact Information */}
              <section id="contact-information" className="rounded-2xl glass-fintech p-6 sm:p-8 border border-[#00F0FF]/25 scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-[#00F0FF]/15 text-[#00F0FF]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                    14. Contact Information
                  </h2>
                </div>
                <p className="mb-4">
                  If you have questions, concerns, or requests regarding this Privacy Policy, your personal data, or our privacy practices, please contact our designated privacy officer:
                </p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2 text-xs">
                  <div className="text-white font-semibold">ExpenseFlow Privacy Operations</div>
                  <div className="text-slate-400">
                    Email:{" "}
                    <span className="text-[#00F0FF] font-telemetry">
                      privacy@expenseflow.app <span className="text-amber-400 text-[11px]">[PLACEHOLDER - UPDATE BEFORE PRODUCTION]</span>
                    </span>
                  </div>
                  <div className="text-slate-400">
                    Inquiry Form:{" "}
                    <Link href="/contact" className="text-[#00F0FF] hover:underline">
                      ExpenseFlow Contact &amp; Support Page
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
