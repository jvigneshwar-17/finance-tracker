"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  /** Maximum width class — defaults to max-w-lg */
  maxWidth?: string;
}

// ─── Dialog Component ─────────────────────────────────────────────────

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  className,
  maxWidth = "max-w-lg",
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Trap focus inside dialog
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable[0]?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            <motion.div
              key="panel"
              ref={panelRef}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className={cn(
                "relative w-full max-h-[calc(100vh-2rem)] sm:max-h-[85vh] flex flex-col rounded-2xl bg-slate-950 border border-slate-800/80 shadow-2xl shadow-black/50 overflow-hidden",
                maxWidth,
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glass header gradient */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

              {/* Header */}
              <div className="shrink-0 flex items-start justify-between px-5 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-slate-800/60">
                <div>
                  <h2
                    id="dialog-title"
                    className="text-base font-semibold text-white"
                  >
                    {title}
                  </h2>
                  {description && (
                    <p className="text-xs text-slate-500 mt-0.5">{description}</p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  isLoading?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Delete",
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} title={title} maxWidth="max-w-sm">
      <div className="space-y-4">
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
        <div className="flex gap-3 justify-end pt-1">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-slate-300 rounded-xl border border-slate-700 bg-transparent hover:bg-slate-800/60 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading && (
              <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {confirmLabel}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
