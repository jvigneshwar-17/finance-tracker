"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Plus,
  Minus,
  Wallet,
  Target,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────

interface QuickAction {
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  iconBg: string;
  disabled?: boolean;
  badge?: string;
  actionKey?: "addIncome" | "addExpense" | "createBudget" | "setGoal" | "export";
}

const actions: QuickAction[] = [
  {
    label: "Add Income",
    description: "Record a new credit",
    icon: Plus,
    color: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    actionKey: "addIncome",
  },
  {
    label: "Add Expense",
    description: "Record daily spending",
    icon: Minus,
    color: "text-rose-400",
    iconBg: "bg-rose-500/10 border-rose-500/20",
    actionKey: "addExpense",
  },
  {
    label: "Create Budget",
    description: "Set monthly limits",
    icon: Wallet,
    color: "text-[#00F0FF]",
    iconBg: "bg-[#00F0FF]/10 border-[#00F0FF]/25",
    actionKey: "createBudget",
  },
  {
    label: "Set Goal",
    description: "Create savings target",
    icon: Target,
    color: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    actionKey: "setGoal",
  },
  {
    label: "Export Data",
    description: "Download statements",
    icon: Download,
    color: "text-slate-400",
    iconBg: "bg-white/[0.04] border-white/[0.06]",
    disabled: true,
    badge: "Upcoming",
    actionKey: "export",
  },
];

// ─── Props ────────────────────────────────────────────────────────────

interface QuickActionsProps {
  onAddIncome?: () => void;
  onAddExpense?: () => void;
}

export function QuickActions({ onAddIncome, onAddExpense }: QuickActionsProps) {
  const router = useRouter();

  function handleAction(action: QuickAction) {
    switch (action.actionKey) {
      case "addIncome":
        onAddIncome?.();
        break;
      case "addExpense":
        onAddExpense?.();
        break;
      case "createBudget":
        router.push("/dashboard/budgets");
        break;
      case "setGoal":
        toast.info("🎯 Savings Goals feature is in development.");
        break;
      case "export":
        toast.info("📤 Export to PDF/CSV will be available in an upcoming release.");
        break;
    }
  }

  return (
    <div className="p-5 sm:p-6 rounded-2xl glass-fintech border border-white/[0.08] relative overflow-hidden">
      {/* Top subtle glare */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mb-4">
        <h3 className="text-sm font-bold text-white font-heading tracking-wide">Quick Actions</h3>
        <p className="text-xs text-slate-400 mt-0.5">Instant shortcuts for frequent operations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => handleAction(action)}
              className={cn(
                "group relative flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all duration-200 text-center cursor-pointer",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/50",
                "hover:-translate-y-0.5 active:scale-[0.98]",
                action.disabled
                  ? "border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] opacity-65 cursor-not-allowed"
                  : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] hover:shadow-md hover:shadow-black/40"
              )}
              disabled={action.disabled}
              aria-label={action.label}
            >
              {action.badge && (
                <span className="absolute -top-2 right-2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-black/60 text-slate-400 border border-white/[0.1] rounded-full font-telemetry">
                  {action.badge}
                </span>
              )}

              <div className={cn("p-2.5 rounded-xl border transition-transform duration-200 group-hover:scale-105", action.iconBg)}>
                <Icon className={cn("w-4.5 h-4.5", action.color)} />
              </div>

              <div>
                <p className="text-xs font-bold text-white font-heading">{action.label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
