"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <input
            type="checkbox"
            ref={ref}
            id={checkboxId}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "h-4.5 w-4.5 rounded-md border border-slate-700 bg-slate-900/80 cursor-pointer transition-all duration-200",
              "peer-checked:bg-emerald-500 peer-checked:border-emerald-500",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-950",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              "flex items-center justify-center",
              className
            )}
            onClick={() => {
              const input = document.getElementById(
                checkboxId
              ) as HTMLInputElement;
              if (input && !input.disabled) {
                input.click();
              }
            }}
          >
            <Check className="w-3 h-3 text-slate-950 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none hidden" />
          </div>
          <Check className="absolute inset-0 m-auto w-3 h-3 text-slate-950 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className="text-sm text-slate-400 cursor-pointer select-none hover:text-slate-300 transition-colors"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
