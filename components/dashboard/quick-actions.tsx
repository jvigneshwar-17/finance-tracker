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
    description: "Record a new income",
    icon: Plus,
    color: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    actionKey: "addIncome",
  },
  {
    label: "Add Expense",
    description: "Record a new expense",
    icon: Minus,
    color: "text-red-400",
    iconBg: "bg-red-500/10 border-red-500/20",
    actionKey: "addExpense",
  },
  {
    label: "Create Budget",
    description: "Set a monthly budget",
    icon: Wallet,
    color: "text-teal-400",
    iconBg: "bg-teal-500/10 border-teal-500/20",
    actionKey: "createBudget",
  },
  {
    label: "Set Goal",
    description: "Create a savings goal",
    icon: Target,
    color: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    actionKey: "setGoal",
  },
  {
    label: "Export Data",
    description: "Download your data",
    icon: Download,
    color: "text-slate-500",
    iconBg: "bg-slate-800/80 border-slate-700",
    disabled: true,
    badge: "Coming Soon",
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
        toast.info("🎯 Savings Goals are coming soon.");
        break;
      case "export":
        toast.info("📤 Export to PDF/CSV will be available in an upcoming sprint.");
        break;
    }
  }

  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white">Quick Actions</h3>
        <p className="text-xs text-slate-500 mt-0.5">Shortcuts to common tasks</p>
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
                "focus:outline-none focus:ring-2 focus:ring-emerald-500/40",
                "hover:-translate-y-0.5 active:scale-[0.98]",
                action.disabled
                  ? "border-slate-800/50 bg-slate-900/30 hover:bg-slate-800/40 hover:border-slate-700 opacity-80"
                  : "border-slate-800/60 bg-slate-900/40 hover:bg-slate-800/60 hover:border-slate-700"
              )}
              aria-label={action.label}
            >
              {action.badge && (
                <span className="absolute -top-2 right-2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700 rounded-full">
                  {action.badge}
                </span>
              )}

              <div className={cn("p-2.5 rounded-xl border", action.iconBg)}>
                <Icon className={cn("w-5 h-5", action.color)} />
              </div>

              <div>
                <p className="text-xs font-semibold text-white">{action.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
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
