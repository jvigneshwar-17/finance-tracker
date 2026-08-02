"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
}

interface StrengthResult {
  score: number;
  label: string;
  color: string;
  bgColor: string;
}

function calculateStrength(password: string): StrengthResult {
  if (!password) {
    return { score: 0, label: "", color: "", bgColor: "" };
  }

  let score = 0;

  // Length checks
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;

  // Character variety
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  // Map to 4-point scale
  if (score <= 2) {
    return {
      score: 1,
      label: "Weak",
      color: "text-red-400",
      bgColor: "bg-red-500",
    };
  }
  if (score <= 3) {
    return {
      score: 2,
      label: "Fair",
      color: "text-amber-400",
      bgColor: "bg-amber-500",
    };
  }
  if (score <= 4) {
    return {
      score: 3,
      label: "Good",
      color: "text-blue-400",
      bgColor: "bg-blue-500",
    };
  }
  return {
    score: 4,
    label: "Strong",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500",
  };
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = useMemo(() => calculateStrength(password), [password]);

  if (!password) return null;

  return (
    <div className="space-y-1.5 pt-1">
      {/* Strength Bar */}
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-300",
              level <= strength.score
                ? strength.bgColor
                : "bg-slate-800"
            )}
          />
        ))}
      </div>

      {/* Strength Label */}
      <p className={cn("text-xs font-medium transition-colors", strength.color)}>
        {strength.label}
      </p>
    </div>
  );
}
