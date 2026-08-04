"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <>
      <Sidebar />
      <div
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          "md:ml-[256px]",
          isCollapsed && "md:ml-[68px]"
        )}
      >
        <TopNav />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </>
  );
}
