"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ShoppingCart,
  Utensils,
  Car,
  Zap,
  Heart,
  Film,
  Fuel,
  Briefcase,
  ArrowRight,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

interface Transaction {
  id: string;
  title: string;
  category: string;
  emoji: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  icon: React.ElementType;
  iconColor: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "t1",
    title: "Vegetables from Sabzi Mandi",
    category: "Groceries",
    emoji: "🥦",
    amount: 320,
    type: "expense",
    date: "Today, 6:15 PM",
    icon: ShoppingCart,
    iconColor: "bg-emerald-500/10 text-emerald-400",
  },
  {
    id: "t2",
    title: "Salary - TCS Ltd",
    category: "Income",
    emoji: "💰",
    amount: 45000,
    type: "income",
    date: "Today, 9:00 AM",
    icon: Briefcase,
    iconColor: "bg-emerald-500/10 text-emerald-400",
  },
  {
    id: "t3",
    title: "Swiggy - Biryani House",
    category: "Food & Dining",
    emoji: "🍕",
    amount: 450,
    type: "expense",
    date: "Yesterday, 1:30 PM",
    icon: Utensils,
    iconColor: "bg-teal-500/10 text-teal-400",
  },
  {
    id: "t4",
    title: "Uber Ride to Office",
    category: "Transport",
    emoji: "🚕",
    amount: 185,
    type: "expense",
    date: "Yesterday, 8:45 AM",
    icon: Car,
    iconColor: "bg-cyan-500/10 text-cyan-400",
  },
  {
    id: "t5",
    title: "HP Petrol Pump",
    category: "Fuel",
    emoji: "⛽",
    amount: 2500,
    type: "expense",
    date: "2 Aug, 6:00 PM",
    icon: Fuel,
    iconColor: "bg-orange-500/10 text-orange-400",
  },
  {
    id: "t6",
    title: "Apollo Pharmacy",
    category: "Medical",
    emoji: "🏥",
    amount: 780,
    type: "expense",
    date: "1 Aug, 11:00 AM",
    icon: Heart,
    iconColor: "bg-red-500/10 text-red-400",
  },
  {
    id: "t7",
    title: "Netflix Subscription",
    category: "Entertainment",
    emoji: "🎬",
    amount: 649,
    type: "expense",
    date: "1 Aug, 12:00 AM",
    icon: Film,
    iconColor: "bg-purple-500/10 text-purple-400",
  },
  {
    id: "t8",
    title: "Electricity Bill - BESCOM",
    category: "Bills & Utilities",
    emoji: "⚡",
    amount: 1250,
    type: "expense",
    date: "31 Jul, 3:00 PM",
    icon: Zap,
    iconColor: "bg-yellow-500/10 text-yellow-400",
  },
];

export function RecentTransactions() {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Recent Transactions</h3>
          <p className="text-xs text-slate-500 mt-0.5">{mockTransactions.length} transactions this week</p>
        </div>
        <Link
          href="/dashboard/transactions"
          className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="space-y-1.5">
        {mockTransactions.map((tx) => {
          const Icon = tx.icon;
          return (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/40 transition-colors group/tx cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={cn("p-2 rounded-xl shrink-0 border border-transparent", tx.iconColor)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white truncate">{tx.title}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-slate-500">{tx.category}</span>
                    <span className="text-slate-700">•</span>
                    <span className="text-[11px] text-slate-500">{tx.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-3">
                <div className="text-right">
                  <p className={cn(
                    "text-sm font-semibold",
                    tx.type === "income" ? "text-emerald-400" : "text-white"
                  )}>
                    {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className={cn(
                  "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider",
                  tx.type === "income"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                )}>
                  {tx.type === "income" ? (
                    <ArrowDownLeft className="w-3 h-3" />
                  ) : (
                    <ArrowUpRight className="w-3 h-3" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
