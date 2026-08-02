import { Navbar } from "@/components/navbar";
import { ArrowRight, ShieldCheck, Zap, LineChart, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Container / Hero Showcase */}
      <main className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Hero Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-lg shadow-emerald-500/10">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Next-Gen Personal & Business Finance Platform
          </div>
        </div>

        {/* Hero Title & Subheading */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Master Your Wealth With <br className="hidden sm:inline" />
            <span className="gradient-text">Real-Time Intelligence</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed font-normal max-w-2xl mx-auto">
            Automate budget tracking, forecast cashflows, and optimize your portfolio with AI-driven analytics designed for high performers.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-base font-semibold bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950 hover:brightness-110 shadow-xl shadow-emerald-500/20 active:scale-[0.98] transition-all glow-emerald"
            >
              Start Free 14-Day Trial
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Link>
            <Link
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-base font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 backdrop-blur-md transition-colors"
            >
              Watch Demo
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 text-xs text-slate-400">
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block h-7 w-7 rounded-full bg-emerald-600 ring-2 ring-slate-950 flex items-center justify-center text-[10px] font-bold text-white">JD</div>
              <div className="inline-block h-7 w-7 rounded-full bg-teal-600 ring-2 ring-slate-950 flex items-center justify-center text-[10px] font-bold text-white">SK</div>
              <div className="inline-block h-7 w-7 rounded-full bg-cyan-600 ring-2 ring-slate-950 flex items-center justify-center text-[10px] font-bold text-white">AR</div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="font-semibold text-slate-200 ml-1">4.9/5</span>
              <span>from over 12,000+ active investors</span>
            </div>
          </div>
        </div>

        {/* Feature Preview Cards Section (for scroll testing) */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-xl hover:border-emerald-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <LineChart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Automated Tracking</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Connect over 10,000+ banks globally to sync transactions, categorizations, and balances instantly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-xl hover:border-emerald-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Smart AI Budgeting</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Predict future monthly expenditures and receive proactive alerts before exceeding budget thresholds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-xl hover:border-emerald-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Institutional Security</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              SOC-2 Type II certified with end-to-end read-only bank tokens and AES 256 encryption.
            </p>
          </div>
        </div>

        {/* Extra Height for sticky navbar scroll testing */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-900/40 border border-slate-800/40 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Scroll down to test sticky navigation blur bar</h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm">
            Notice how the Navbar stays fixed at the top with a subtle backdrop blur effect, dark gradient shadow, and sleek logo responsiveness.
          </p>
          <div className="h-96 flex items-center justify-center text-slate-600 text-sm font-mono border border-dashed border-slate-800 rounded-2xl">
            [ Additional Page Content Area ]
          </div>
        </div>
      </main>
    </div>
  );
}
