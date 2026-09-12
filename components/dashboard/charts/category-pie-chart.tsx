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
      <div className="glass-fintech border border-white/[0.12] rounded-xl px-3.5 py-2.5 shadow-2xl shadow-black/80 backdrop-blur-2xl">
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.payload.color }}
          />
          <p className="text-[11px] text-slate-300 font-medium font-heading">{entry.name}</p>
        </div>
        <p className="text-sm font-bold text-white font-telemetry tnum mt-0.5">
          ₹{entry.value.toLocaleString("en-IN")}{" "}
          <span className="text-[#00F0FF] text-xs font-normal">({percent}%)</span>
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
    <div className="p-5 sm:p-6 rounded-2xl glass-fintech border border-white/[0.08] flex flex-col justify-between relative overflow-hidden">
      {/* Top subtle glare */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7928CA]/30 to-transparent" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white font-heading tracking-wide">Expense Categories</h3>
            <p className="text-xs text-slate-400 mt-0.5">Category distribution</p>
          </div>
        </div>

        <div className="h-[200px] relative">
          {statsLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 rounded-full animate-pulse bg-white/[0.04]" />
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
                  <p className="text-[10px] text-slate-400 font-medium uppercase font-heading tracking-wider">Total</p>
                  <p className="text-base sm:text-lg font-bold text-white font-telemetry tnum">
                    ₹{total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {hasData && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 pt-3 border-t border-white/[0.06]">
          {data.slice(0, 6).map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[11px] text-slate-300 truncate font-sans">{item.name}</span>
              <span className="text-[11px] text-slate-400 font-telemetry tnum ml-auto">
                {total > 0 ? ((item.value / total) * 100).toFixed(0) : "0"}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
