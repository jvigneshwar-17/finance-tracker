"use client";

import { Settings } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";

export default function SettingsPage() {
  return (
    <EmptyState
      icon={Settings}
      title="Settings"
      description="Account settings, notification preferences, and app customization will be available here soon."
      ctaLabel="Go to Dashboard"
      ctaHref="/dashboard"
    />
  );
}
