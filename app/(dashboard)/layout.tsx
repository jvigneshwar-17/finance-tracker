import type { Metadata } from "next";

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
      {children}
    </div>
  );
}
