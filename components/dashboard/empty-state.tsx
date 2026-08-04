"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  compact?: boolean;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  onCtaClick,
  compact = false,
  className,
}: EmptyStateProps) {
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "w-full h-full flex flex-col items-center justify-center text-center p-4",
          className
        )}
      >
        <div className="relative mb-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center">
            <Icon className="w-5 h-5 text-slate-400" />
          </div>
        </div>
        <p className="text-xs font-semibold text-slate-300 mb-0.5">{title}</p>
        <p className="text-[11px] text-slate-500 max-w-[220px] leading-tight">
          {description}
        </p>
        {ctaLabel && (ctaHref || onCtaClick) && (
          <div className="mt-3">
            {ctaHref ? (
              <Link href={ctaHref}>
                <Button size="sm" variant="outline" className="h-7 text-xs px-3">
                  {ctaLabel}
                </Button>
              </Link>
            ) : (
              <Button size="sm" variant="outline" className="h-7 text-xs px-3" onClick={onCtaClick}>
                {ctaLabel}
              </Button>
            )}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 sm:py-24 px-4",
        className
      )}
    >
      {/* Decorative icon area */}
      <div className="relative mb-6">
        {/* Background glow */}
        <div className="absolute inset-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl" />

        <div className="relative w-20 h-20 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-center">
          <Icon className="w-8 h-8 text-slate-500" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>

      {/* Description */}
      <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
        {description}
      </p>

      {/* CTA */}
      {ctaLabel && (ctaHref || onCtaClick) && (
        ctaHref ? (
          <Link href={ctaHref}>
            <Button size="default">{ctaLabel}</Button>
          </Link>
        ) : (
          <Button size="default" onClick={onCtaClick}>
            {ctaLabel}
          </Button>
        )
      )}

      {/* Decorative dots */}
      <div className="flex items-center gap-1.5 mt-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              i === 1 ? "bg-emerald-500/40" : "bg-slate-700"
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}
