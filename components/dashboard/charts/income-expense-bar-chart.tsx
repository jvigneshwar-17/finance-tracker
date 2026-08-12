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
      <div className="border border-border rounded-xl px-3 py-2 shadow-xl backdrop-blur-xl" style={{ background: "var(--tooltip-bg)" }}>
        <p className="text-[11px] text-muted-foreground font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[11px] text-muted-foreground capitalize">{entry.name}:</span>
            <span className="text-xs font-bold text-foreground">
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
          <span className="text-[11px] text-muted-foreground capitalize">{entry.value}</span>
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
    <div className="p-5 rounded-2xl border border-border backdrop-blur-xl" style={{ background: "var(--surface)" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Income vs Expenses</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Monthly comparison</p>
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
            <div className="w-full h-40 animate-pulse rounded-xl" style={{ background: "var(--skeleton)" }} />
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
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
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
