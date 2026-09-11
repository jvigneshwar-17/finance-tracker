import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { TransactionsProvider } from "@/hooks/use-transactions";
import { requireVerifiedAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard — ExpenseFlow",
  description: "Manage your expenses, budgets, and financial insights.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await requireVerifiedAuth();
  if (!auth.success) {
    if (auth.status === 403) {
      redirect("/verify-email");
    }
    redirect("/login");
  }

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
