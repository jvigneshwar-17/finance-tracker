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
      <div className="bg-slate-900/95 border border-slate-700 rounded-xl px-3 py-2 shadow-xl backdrop-blur-xl">
        <p className="text-[11px] text-slate-400 font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[11px] text-slate-400 capitalize">{entry.name}:</span>
            <span className="text-xs font-bold text-white">
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
    <div className="flex items-center justify-center gap-4 mt-2">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: entry.color }} />
          <span className="text-[11px] text-slate-400 capitalize">{entry.value}</span>
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
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Income vs Expenses</h3>
          <p className="text-xs text-slate-500 mt-0.5">Monthly comparison</p>
        </div>
        {hasData && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {netSaved >= 0 ? `+₹${netSaved.toLocaleString("en-IN")} saved` : `-₹${Math.abs(netSaved).toLocaleString("en-IN")} deficit`}
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
            <p className="text-xs text-slate-400 font-medium mb-1">No monthly activity data</p>
            <p className="text-[11px] text-slate-500">Record income and expenses to view comparisons</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barGap={4}>
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
              <Legend content={<CustomLegend />} />
              <Bar
                dataKey="income"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
              />
              <Bar
                dataKey="expenses"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
                opacity={0.7}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
