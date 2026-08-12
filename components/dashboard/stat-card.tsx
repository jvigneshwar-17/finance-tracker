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
}

export function StatCard({
  icon: Icon,
  title,
  amount,
  trend,
  iconColor = "text-emerald-400",
  iconBg = "bg-emerald-500/10 border-emerald-500/20",
  isLoading = false,
}: StatCardProps) {
  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <div className="group relative p-5 rounded-2xl border border-border backdrop-blur-xl hover:border-border transition-all duration-300 hover:-translate-y-0.5" style={{ background: "var(--surface)" }}>
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-teal-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative space-y-3">
        {/* Top row: icon + trend */}
        <div className="flex items-center justify-between">
          <div className={cn("p-2.5 rounded-xl border", iconBg)}>
            <Icon className={cn("w-[18px] h-[18px]", iconColor)} />
          </div>

          <div
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold",
              trend.direction === "up"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
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
          <p className="text-xs text-muted-foreground font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground tracking-tight">{amount}</p>
        </div>

        {/* Bottom label */}
        <p className="text-[11px] text-muted-foreground/70">{trend.label}</p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="p-5 rounded-2xl border border-border backdrop-blur-xl space-y-3 animate-pulse" style={{ background: "var(--surface)" }}>
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl" style={{ background: "var(--skeleton)" }} />
        <div className="w-16 h-5 rounded-full" style={{ background: "var(--skeleton)" }} />
      </div>
      <div>
        <div className="w-20 h-3 rounded mb-2" style={{ background: "var(--skeleton)" }} />
        <div className="w-28 h-7 rounded" style={{ background: "var(--skeleton)" }} />
      </div>
      <div className="w-24 h-3 rounded" style={{ background: "var(--skeleton-soft)" }} />
    </div>
  );
}
