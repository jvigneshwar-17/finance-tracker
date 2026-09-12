"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BarChart3 } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { useTransactions } from "@/hooks/use-transactions";
import type { IncomeExpenseBarPoint } from "@/hooks/use-transactions";

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-fintech border border-white/[0.12] rounded-xl px-3.5 py-2.5 shadow-2xl shadow-black/80 backdrop-blur-2xl space-y-1">
        <p className="text-[11px] text-slate-400 font-medium font-heading">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[11px] text-slate-300 capitalize">{entry.name}:</span>
            <span className="text-xs font-bold text-white font-telemetry tnum">
              ₹{entry.value.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function CustomLegend({ payload }: { payload?: Array<{ value: string; color: string }> }) {
  if (!payload) return null;
  return (
    <div className="flex items-center justify-center gap-6 mt-3">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-xs text-slate-300 font-medium capitalize font-heading">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export function IncomeExpenseBarChart({ data: propData }: { data?: IncomeExpenseBarPoint[] }) {
  const { incomeVsExpense, statsLoading } = useTransactions();
  const data = propData ?? incomeVsExpense;

  const totalIncome = data.reduce((sum, d) => sum + d.income, 0);
  const totalExpenses = data.reduce((sum, d) => sum + d.expenses, 0);
  const netSaved = totalIncome - totalExpenses;
  const hasData = totalIncome > 0 || totalExpenses > 0;

  return (
    <div className="p-5 sm:p-6 rounded-2xl glass-fintech border border-white/[0.08] relative overflow-hidden">
      {/* Top subtle glare */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />

      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-white font-heading tracking-wide">Income vs Expenses</h3>
          <p className="text-xs text-slate-400 mt-0.5">Monthly cash flow comparison</p>
        </div>
        {hasData && (
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-telemetry ${
              netSaved >= 0
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/25"
            }`}
          >
            {netSaved >= 0 ? `+₹${netSaved.toLocaleString("en-IN")} net saved` : `-₹${Math.abs(netSaved).toLocaleString("en-IN")} deficit`}
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
            icon={BarChart3}
            title="No Monthly Activity Data"
            description="Record income and expenses to view comparisons"
            compact
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barGap={6}>
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
              <Legend content={<CustomLegend />} />
              <Bar
                dataKey="income"
                fill="#00F0FF"
                radius={[6, 6, 0, 0]}
                maxBarSize={28}
              />
              <Bar
                dataKey="expenses"
                fill="#f43f5e"
                radius={[6, 6, 0, 0]}
                maxBarSize={28}
                opacity={0.85}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
