"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Groceries", value: 5400, color: "#10b981" },
  { name: "Food & Dining", value: 3800, color: "#14b8a6" },
  { name: "Transport", value: 2900, color: "#06b6d4" },
  { name: "Bills & Utilities", value: 3200, color: "#0ea5e9" },
  { name: "Entertainment", value: 1800, color: "#8b5cf6" },
  { name: "Medical", value: 1350, color: "#f59e0b" },
];

const TOTAL = data.reduce((sum, item) => sum + item.value, 0);

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) {
  if (active && payload && payload.length) {
    const entry = payload[0];
    const percent = ((entry.value / TOTAL) * 100).toFixed(1);
    return (
      <div className="bg-slate-900/95 border border-slate-700 rounded-xl px-3 py-2 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.payload.color }} />
          <p className="text-[11px] text-slate-300 font-medium">{entry.name}</p>
        </div>
        <p className="text-sm font-bold text-white mt-0.5">
          ₹{entry.value.toLocaleString("en-IN")} ({percent}%)
        </p>
      </div>
    );
  }
  return null;
}

export function CategoryPieChart() {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Expense Categories</h3>
          <p className="text-xs text-slate-500 mt-0.5">This month&apos;s breakdown</p>
        </div>
      </div>

      <div className="h-[200px] relative">
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
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-[10px] text-slate-500 font-medium">Total</p>
            <p className="text-lg font-bold text-white">₹{(TOTAL / 1000).toFixed(1)}k</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-[11px] text-slate-400 truncate">{item.name}</span>
            <span className="text-[11px] text-slate-500 font-medium ml-auto">
              {((item.value / TOTAL) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
