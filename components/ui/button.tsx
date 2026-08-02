import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default:
        "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950 font-semibold hover:brightness-110 shadow-lg shadow-emerald-500/20 glow-emerald",
      outline:
        "border border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800/80 hover:text-white hover:border-slate-600",
      ghost:
        "bg-transparent text-slate-300 hover:bg-slate-800/60 hover:text-white",
      destructive:
        "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
    };

    const sizes = {
      default: "h-11 px-6 py-2.5 text-sm",
      sm: "h-9 px-4 py-2 text-xs",
      lg: "h-12 px-8 py-3 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 active:scale-[0.98]",
          "focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2 focus:ring-offset-slate-950",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
