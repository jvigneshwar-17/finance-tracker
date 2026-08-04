"use client";

import { BarChart3 } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";

export default function AnalyticsPage() {
  return (
    <EmptyState
      icon={BarChart3}
      title="No Analytics Data"
      description="Once you start recording transactions, you'll see detailed charts, spending patterns, and financial insights here."
      ctaLabel="Go to Dashboard"
      ctaHref="/dashboard"
    />
  );
}
