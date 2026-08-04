import type { Metadata } from "next";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard — ExpenseFlow",
  description: "Manage your expenses, budgets, and financial insights.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100">
      <SidebarProvider>
        <DashboardShell>{children}</DashboardShell>
      </SidebarProvider>
    </div>
  );
}
