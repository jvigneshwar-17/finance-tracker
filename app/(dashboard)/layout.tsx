import type { Metadata } from "next";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { TransactionsProvider } from "@/hooks/use-transactions";

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
    <div className="min-h-screen bg-background text-foreground">
      <SidebarProvider>
        <TransactionsProvider>
          <DashboardShell>{children}</DashboardShell>
        </TransactionsProvider>
      </SidebarProvider>
    </div>
  );
}
