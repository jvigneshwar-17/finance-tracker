"use client";

import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { LineChart as LineChartIcon } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { useTransactions } from "@/hooks/use-transactions";
import type { SpendingTrendPoint } from "@/hooks/use-transactions";

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-fintech border border-white/[0.12] rounded-xl px-3.5 py-2.5 shadow-2xl shadow-black/80 backdrop-blur-2xl">
        <p className="text-[11px] text-slate-400 font-medium font-heading">{label}</p>
        <p className="text-sm font-bold text-[#00F0FF] font-telemetry tnum mt-0.5">
          ₹{payload[0].value.toLocaleString("en-IN")}
        </p>
      </div>
    );
  }
  return null;
}

export function SpendingLineChart({ data: propData }: { data?: SpendingTrendPoint[] }) {
  const { spendingTrend, statsLoading } = useTransactions();
  const data = propData ?? spendingTrend;

  const totalSpending = data.reduce((sum, d) => sum + d.spending, 0);
  const hasData = totalSpending > 0;
  const avgSpending = hasData ? Math.round(totalSpending / (data.length || 1)) : 0;

  return (
    <div className="p-5 sm:p-6 rounded-2xl glass-fintech border border-white/[0.08] relative overflow-hidden">
      {/* Top subtle glare */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />

      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-white font-heading tracking-wide">Monthly Spending</h3>
          <p className="text-xs text-slate-400 mt-0.5">Last 6 months trend</p>
        </div>
        {hasData && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-telemetry bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/25">
            Avg ₹{avgSpending.toLocaleString("en-IN")}
          </div>
        )}
      </div>

      <div className="h-[220px] sm:h-[260px] relative">
        {statsLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full h-40 animate-pulse rounded-xl bg-white/[0.04]" />
          </div>
        ) : !hasData ? (
          <EmptyState
            icon={LineChartIcon}
            title="No Spending Data"
            description="Record expenses to see monthly trends"
            compact
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#00F0FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "rgba(148, 163, 184, 0.8)", fontFamily: "var(--font-jetbrains-mono)" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "rgba(148, 163, 184, 0.8)", fontFamily: "var(--font-jetbrains-mono)" }}
                tickFormatter={(value: number) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="spending"
                stroke="#00F0FF"
                strokeWidth={2.5}
                fill="url(#spendingGradient)"
                dot={{ r: 3, fill: "#00F0FF", stroke: "#07090E", strokeWidth: 2 }}
                activeDot={{ r: 5, fill: "#00F0FF", stroke: "#07090E", strokeWidth: 2.5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
