"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  currency: string;
  emailVerified: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          router.push("/login");
          return;
        }
        const data = await response.json();
        setUser(data.user);
      } catch {
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          <p className="text-sm text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20">
              <TrendingUp className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              ExpenseFlow
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* User Initials Avatar */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-sm font-bold text-emerald-400">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2) || "?"}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Welcome back, {user?.name?.split(" ")[0]}!
            </h1>
            <p className="text-slate-400 mt-2">
              Here&apos;s your financial overview. Start tracking your expenses.
            </p>
          </div>

          {/* Placeholder Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                label: "Total Balance",
                value: "₹48,250.00",
                change: "+12.4%",
              },
              {
                label: "This Month",
                value: "₹18,450.00",
                change: "-3.2%",
              },
              {
                label: "Budget Used",
                value: "75%",
                change: "₹1,500 left",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl space-y-2"
              >
                <p className="text-sm text-slate-400">{card.label}</p>
                <p className="text-2xl font-bold text-white">{card.value}</p>
                <p className="text-xs text-emerald-400 font-medium">
                  {card.change}
                </p>
              </div>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/60 border-dashed text-center space-y-3">
            <p className="text-lg font-semibold text-slate-300">
              Full dashboard coming in Sprint 3.2 🚀
            </p>
            <p className="text-sm text-slate-500">
              Transaction history, charts, budget management, and more.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
