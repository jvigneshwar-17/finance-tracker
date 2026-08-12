"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { PieChart as PieIcon } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { useTransactions } from "@/hooks/use-transactions";
import type { CategoryPiePoint } from "@/hooks/use-transactions";

function CustomTooltip({
  active,
  payload,
  total,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string } }>;
  total: number;
}) {
  if (active && payload && payload.length) {
    const entry = payload[0];
    const percent = total > 0 ? ((entry.value / total) * 100).toFixed(1) : "0";
    return (
      <div className="border border-border rounded-xl px-3 py-2 shadow-xl backdrop-blur-xl" style={{ background: "var(--tooltip-bg)" }}>
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.payload.color }}
          />
          <p className="text-[11px] text-foreground/70 font-medium">{entry.name}</p>
        </div>
        <p className="text-sm font-bold text-foreground mt-0.5">
          ₹{entry.value.toLocaleString("en-IN")} ({percent}%)
        </p>
      </div>
    );
  }
  return null;
}

export function CategoryPieChart({ data: propData }: { data?: CategoryPiePoint[] }) {
  const { categoryBreakdown, statsLoading } = useTransactions();
  const data = propData ?? categoryBreakdown;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const hasData = total > 0;

  return (
    <div className="p-5 rounded-2xl border border-border backdrop-blur-xl flex flex-col justify-between" style={{ background: "var(--surface)" }}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Expense Categories</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Category breakdown</p>
          </div>
        </div>

        <div className="h-[200px] relative">
          {statsLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 rounded-full animate-pulse" style={{ background: "var(--skeleton)" }} />
            </div>
          ) : !hasData ? (
            <EmptyState
              icon={PieIcon}
              title="No Category Data"
              description="Record expenses with categories to see breakdown"
              compact
            />
          ) : (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip total={total} />} />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground font-medium">Total</p>
                  <p className="text-lg font-bold text-foreground">
                    ₹{total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {hasData && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
          {data.slice(0, 6).map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[11px] text-muted-foreground truncate">{item.name}</span>
              <span className="text-[11px] text-muted-foreground/70 font-medium ml-auto">
                {total > 0 ? ((item.value / total) * 100).toFixed(0) : "0"}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
