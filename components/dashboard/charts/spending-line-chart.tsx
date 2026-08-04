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
      <div className="bg-slate-900/95 border border-slate-700 rounded-xl px-3 py-2 shadow-xl backdrop-blur-xl">
        <p className="text-[11px] text-slate-400 font-medium">{label}</p>
        <p className="text-sm font-bold text-white">
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
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Monthly Spending</h3>
          <p className="text-xs text-slate-500 mt-0.5">Last 6 months trend</p>
        </div>
        {hasData && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Avg ₹{avgSpending.toLocaleString("en-IN")}
          </div>
        )}
      </div>

      <div className="h-[220px] sm:h-[260px] relative">
        {statsLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full h-40 bg-slate-800/40 animate-pulse rounded-xl" />
          </div>
        ) : !hasData ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <p className="text-xs text-slate-400 font-medium mb-1">No spending data</p>
            <p className="text-[11px] text-slate-500">Record expenses to see monthly trends</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#64748b" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickFormatter={(value: number) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="spending"
                stroke="#10b981"
                strokeWidth={2.5}
                fill="url(#spendingGradient)"
                dot={{ r: 3, fill: "#10b981", stroke: "#0a0f1a", strokeWidth: 2 }}
                activeDot={{ r: 5, fill: "#10b981", stroke: "#0a0f1a", strokeWidth: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
