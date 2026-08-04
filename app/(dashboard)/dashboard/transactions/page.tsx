"use client";

import { ArrowLeftRight } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { toast } from "sonner";

export default function TransactionsPage() {
  return (
    <EmptyState
      icon={ArrowLeftRight}
      title="No Transactions Yet"
      description="Start tracking your income and expenses. Add your first transaction to see your financial activity here."
      ctaLabel="Add Transaction"
      onCtaClick={() =>
        toast.info("Add Transaction will be available in Sprint 4", {
          description: "This feature is coming soon!",
        })
      }
    />
  );
}
