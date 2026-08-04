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

interface QuickAction {
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  iconBg: string;
  disabled?: boolean;
  badge?: string;
}

const actions: QuickAction[] = [
  {
    label: "Add Income",
    description: "Record a new income",
    icon: Plus,
    color: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    label: "Add Expense",
    description: "Record a new expense",
    icon: Minus,
    color: "text-red-400",
    iconBg: "bg-red-500/10 border-red-500/20",
  },
  {
    label: "Create Budget",
    description: "Set a monthly budget",
    icon: Wallet,
    color: "text-teal-400",
    iconBg: "bg-teal-500/10 border-teal-500/20",
  },
  {
    label: "Set Goal",
    description: "Create a savings goal",
    icon: Target,
    color: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    label: "Export Data",
    description: "Download your data",
    icon: Download,
    color: "text-slate-500",
    iconBg: "bg-slate-800/80 border-slate-700",
    disabled: true,
    badge: "Coming Soon",
  },
];

export function QuickActions() {
  function handleAction(action: QuickAction) {
    if (action.disabled) return;
    toast.info(`${action.label} will be available in Sprint 4`, {
      description: "This feature is coming soon!",
    });
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
              disabled={action.disabled}
              className={cn(
                "group relative flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all duration-200 text-center",
                "focus:outline-none focus:ring-2 focus:ring-emerald-500/40",
                action.disabled
                  ? "border-slate-800/40 bg-slate-900/30 cursor-not-allowed opacity-50"
                  : "border-slate-800/60 bg-slate-900/40 hover:bg-slate-800/60 hover:border-slate-700 hover:-translate-y-0.5 active:scale-[0.98]"
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
                <p className="text-[10px] text-slate-500 mt-0.5">{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
