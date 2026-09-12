"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="relative min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#00F0FF] selection:text-[#07090E] overflow-x-hidden">
      {/* Ambient background glows for fintech depth */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[350px] bg-gradient-to-br from-[#00F0FF]/5 via-[#7928CA]/8 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-[450px] h-[450px] bg-emerald-500/[0.03] rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          "md:ml-[256px]",
          isCollapsed && "md:ml-[68px]"
        )}
      >
        <TopNav />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 md:py-8 overflow-x-hidden relative">
          {children}
        </main>
      </div>
    </div>
  );
}
