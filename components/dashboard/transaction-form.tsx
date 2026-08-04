"use client";

import React, { useId, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, getCategoryConfig } from "@/lib/categories";
import type { Transaction } from "@/hooks/use-transactions";

// ─── Dynamic Step Helper ──────────────────────────────────────────────

export function getDynamicStep(amount: number): number {
  if (isNaN(amount) || amount < 100) return 1;
  const magnitude = Math.floor(Math.log10(amount));
  return Math.pow(10, magnitude - 1);
}

// ─── Amount Input Component ───────────────────────────────────────────

interface AmountInputProps {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  error?: boolean;
}

function AmountInput({ id = "tx-amount", value, onChange, error }: AmountInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const numericAmount = parseFloat(value) || 0;
  const step = getDynamicStep(numericAmount);

  // Disable mouse wheel value modification while allowing container scroll
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (document.activeElement === el) {
        e.preventDefault();

        // Scroll nearest scrollable container
        let parent = el.parentElement;
        while (parent) {
          const style = window.getComputedStyle(parent);
          const overflowY = style.overflowY;
          if (
            (overflowY === "auto" || overflowY === "scroll") &&
            parent.scrollHeight > parent.clientHeight
          ) {
            parent.scrollTop += e.deltaY;
            break;
          }
          parent = parent.parentElement;
        }
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleIncrement = () => {
    const current = parseFloat(value) || 0;
    const currentStep = getDynamicStep(current);
    const nextVal = Math.round((current + currentStep) * 100) / 100;
    onChange(String(nextVal));
  };

  const handleDecrement = () => {
    const current = parseFloat(value) || 0;
    const currentStep = getDynamicStep(current);
    const nextVal = Math.max(0, Math.round((current - currentStep) * 100) / 100);
    onChange(String(nextVal));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      handleDecrement();
    }
  };

  return (
    <div className="relative mt-1.5 flex items-center">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold select-none pointer-events-none z-10">
        ₹
      </span>

      <Input
        id={id}
        ref={inputRef}
        type="number"
        step="any"
        min="0"
        placeholder="0.00"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          "pl-8 pr-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          error && "border-red-500/50 focus:border-red-500"
        )}
        aria-invalid={error}
      />

      {/* Custom Stepper Buttons */}
      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 z-10 bg-slate-900/90 rounded-lg p-0.5 border border-slate-800">
        <button
          type="button"
          onClick={handleDecrement}
          tabIndex={-1}
          title={`Decrease by ₹${step}`}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none disabled:opacity-30 disabled:pointer-events-none"
          disabled={numericAmount <= 0}
        >
          <Minus className="w-3 h-3" />
        </button>
        <div className="w-px h-3 bg-slate-800" />
        <button
          type="button"
          onClick={handleIncrement}
          tabIndex={-1}
          title={`Increase by ₹${step}`}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// ─── Client-side form schema ─────────────────────────────────────────
// Mirrors server schema but uses string for amount (converts on submit)

const formSchema = z.object({
  type: z.enum(["income", "expense"]),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Max 200 characters")
    .trim(),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Enter a valid positive amount"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  note: z.string().max(500, "Max 500 characters").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

// ─── Props ────────────────────────────────────────────────────────────

interface TransactionFormProps {
  mode: "create" | "edit";
  initialValues?: Partial<Transaction>;
  onSubmit: (values: FormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

// ─── Field error ─────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-400">{message}</p>;
}

// ─── Type Toggle ─────────────────────────────────────────────────────

function TypeToggle({
  value,
  onChange,
}: {
  value: "income" | "expense";
  onChange: (v: "income" | "expense") => void;
}) {
  const id = useId();
  return (
    <div className="flex rounded-xl border border-slate-800 bg-slate-900/80 p-1 gap-1" role="group" aria-label="Transaction type">
      {(["income", "expense"] as const).map((t) => (
        <button
          key={t}
          type="button"
          id={`${id}-${t}`}
          onClick={() => onChange(t)}
          aria-pressed={value === t}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-emerald-500/40",
            value === t
              ? t === "income"
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : "bg-red-500/15 text-red-400 border border-red-500/30"
              : "text-slate-500 hover:text-slate-300"
          )}
        >
          {t === "income" ? "💰 Income" : "💸 Expense"}
        </button>
      ))}
    </div>
  );
}

// ─── Category Picker ──────────────────────────────────────────────────

function CategoryPicker({
  value,
  onChange,
  type,
}: {
  value: string;
  onChange: (v: string) => void;
  type: "income" | "expense";
}) {
  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2 max-h-[160px] sm:max-h-[200px] overflow-y-auto p-1 rounded-xl border border-slate-800/60 bg-slate-900/30">
      {categories.map((cat) => {
        const cfg = getCategoryConfig(cat);
        const Icon = cfg.icon;
        const selected = value === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            aria-pressed={selected}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl border text-center transition-all duration-150",
              "focus:outline-none focus:ring-2 focus:ring-emerald-500/40",
              selected
                ? "border-emerald-500/50 bg-emerald-500/10"
                : "border-slate-800/60 bg-slate-900/40 hover:bg-slate-800/40 hover:border-slate-700"
            )}
          >
            <div className={cn("p-1 rounded-lg", cfg.bgColor, cfg.iconColor)}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <span className={cn("text-[10px] font-medium leading-tight truncate w-full", selected ? "text-emerald-400" : "text-slate-400")}>
              {cat}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────

export function TransactionForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
}: TransactionFormProps) {
  // Build default date string (today in local YYYY-MM-DD)
  const todayStr = new Date().toLocaleDateString("en-CA"); // returns YYYY-MM-DD

  // Parse initial date if editing
  const initDate = initialValues?.date
    ? new Date(initialValues.date).toLocaleDateString("en-CA")
    : todayStr;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: (initialValues?.type as "income" | "expense") ?? "expense",
      title: initialValues?.title ?? "",
      amount: initialValues?.amount?.toString() ?? "",
      category: initialValues?.category ?? "",
      date: initDate,
      note: initialValues?.note ?? "",
    },
  });

  const selectedType = watch("type");

  async function submit(values: FormValues) {
    await onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
      {/* Type toggle */}
      <div>
        <Label className="mb-2 block">Type</Label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <TypeToggle
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <FieldError message={errors.type?.message} />
      </div>

      {/* Title */}
      <div>
        <Label htmlFor="tx-title">Description *</Label>
        <Input
          id="tx-title"
          placeholder="e.g. Swiggy – Biryani House"
          className="mt-1.5"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "tx-title-err" : undefined}
          {...register("title")}
        />
        <FieldError message={errors.title?.message} />
      </div>

      {/* Amount */}
      <div>
        <Label htmlFor="tx-amount">Amount (₹) *</Label>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <AmountInput
              id="tx-amount"
              value={field.value}
              onChange={field.onChange}
              error={!!errors.amount}
            />
          )}
        />
        <FieldError message={errors.amount?.message} />
      </div>

      {/* Category */}
      <div>
        <Label className="mb-2 block">Category *</Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <CategoryPicker
              value={field.value}
              onChange={field.onChange}
              type={selectedType}
            />
          )}
        />
        <FieldError message={errors.category?.message} />
      </div>

      {/* Date */}
      <div>
        <Label htmlFor="tx-date">Date *</Label>
        <Input
          id="tx-date"
          type="date"
          className="mt-1.5"
          max={todayStr}
          aria-invalid={!!errors.date}
          {...register("date")}
        />
        <FieldError message={errors.date?.message} />
      </div>

      {/* Note */}
      <div>
        <Label htmlFor="tx-note">
          Note{" "}
          <span className="text-slate-600 font-normal">(optional)</span>
        </Label>
        <textarea
          id="tx-note"
          rows={2}
          placeholder="Any extra details…"
          className={cn(
            "mt-1.5 flex w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors duration-200 resize-none",
            "focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          {...register("note")}
        />
        <FieldError message={errors.note?.message} />
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-1 border-t border-slate-800/60">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {mode === "create" ? "Add Transaction" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

export type { FormValues as TransactionFormValues };
