"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  amount: string;
  trend: {
    value: string;
    direction: "up" | "down";
    label: string;
  };
  iconColor?: string;
  iconBg?: string;
  isLoading?: boolean;
  highlight?: boolean;
}

export function StatCard({
  icon: Icon,
  title,
  amount,
  trend,
  iconColor = "text-[#00F0FF]",
  iconBg = "bg-[#00F0FF]/10 border-[#00F0FF]/20",
  isLoading = false,
  highlight = false,
}: StatCardProps) {
  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <div
      className={cn(
        "group relative p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 overflow-hidden",
        highlight
          ? "glass-fintech-elevated border-[#00F0FF]/30 shadow-lg shadow-[#00F0FF]/10"
          : "glass-fintech border-white/[0.08] hover:border-white/[0.15]"
      )}
    >
      {/* Subtle top glare line */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-px",
          highlight
            ? "bg-gradient-to-r from-transparent via-[#00F0FF]/60 to-transparent"
            : "bg-gradient-to-r from-transparent via-white/15 to-transparent"
        )}
      />

      {/* Hover ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/[0.03] via-transparent to-[#7928CA]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative space-y-3">
        {/* Top row: icon + trend pill */}
        <div className="flex items-center justify-between">
          <div className={cn("p-2.5 rounded-xl border shrink-0", iconBg)}>
            <Icon className={cn("w-4 h-4", iconColor)} />
          </div>

          <div
            className={cn(
              "flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold font-telemetry",
              trend.direction === "up"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            )}
          >
            {trend.direction === "up" ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{trend.value}</span>
          </div>
        </div>

        {/* Title + Amount */}
        <div>
          <p className="text-xs text-slate-400 font-medium font-heading uppercase tracking-wider mb-1">
            {title}
          </p>
          <p
            className={cn(
              "text-2xl font-bold tracking-tight font-telemetry tnum",
              highlight ? "text-white drop-shadow-[0_0_12px_rgba(0,240,255,0.25)]" : "text-white"
            )}
          >
            {amount}
          </p>
        </div>

        {/* Bottom context label */}
        <p className="text-[11px] text-slate-500 font-sans">{trend.label}</p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="p-5 rounded-2xl glass-fintech border border-white/[0.06] space-y-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-xl bg-white/[0.06]" />
        <div className="w-16 h-5 rounded-full bg-white/[0.05]" />
      </div>
      <div>
        <div className="w-20 h-3 rounded bg-white/[0.05] mb-2" />
        <div className="w-28 h-7 rounded bg-white/[0.08]" />
      </div>
      <div className="w-24 h-2.5 rounded bg-white/[0.04]" />
    </div>
  );
}
