"use client";

import { Wallet } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { toast } from "sonner";

export default function BudgetsPage() {
  return (
    <EmptyState
      icon={Wallet}
      title="No Budgets Created"
      description="Set monthly budgets to keep your spending on track. Create categories and limits to manage your finances better."
      ctaLabel="Create Budget"
      onCtaClick={() =>
        toast.info("Budgets will be available in Sprint 4", {
          description: "This feature is coming soon!",
        })
      }
    />
  );
}
