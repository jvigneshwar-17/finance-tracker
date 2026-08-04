"use client";

import { Target } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { toast } from "sonner";

export default function GoalsPage() {
  return (
    <EmptyState
      icon={Target}
      title="No Goals Set"
      description="Set savings goals and track your progress. Whether it's a vacation, emergency fund, or a new gadget — start saving today."
      ctaLabel="Set a Goal"
      onCtaClick={() =>
        toast.info("Goals will be available in Sprint 4", {
          description: "This feature is coming soon!",
        })
      }
    />
  );
}
