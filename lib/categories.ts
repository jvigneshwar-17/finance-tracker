import {
  ShoppingCart,
  Utensils,
  Car,
  Zap,
  Heart,
  Film,
  Fuel,
  Briefcase,
  GraduationCap,
  Home,
  ShoppingBag,
  TrendingUp,
  Laptop,
  MoreHorizontal,
} from "lucide-react";
import type { ElementType } from "react";

// ─── Category Configuration ─────────────────────────────────────────

export interface CategoryConfig {
  label: string;
  icon: ElementType;
  iconColor: string;
  bgColor: string;
  colorHex: string;
}

export const TRANSACTION_CATEGORIES: Record<string, CategoryConfig> = {
  "Groceries": {
    label: "Groceries",
    icon: ShoppingCart,
    iconColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    colorHex: "#10b981",
  },
  "Food & Dining": {
    label: "Food & Dining",
    icon: Utensils,
    iconColor: "text-teal-400",
    bgColor: "bg-teal-500/10",
    colorHex: "#14b8a6",
  },
  "Transport": {
    label: "Transport",
    icon: Car,
    iconColor: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    colorHex: "#06b6d4",
  },
  "Fuel": {
    label: "Fuel",
    icon: Fuel,
    iconColor: "text-orange-400",
    bgColor: "bg-orange-500/10",
    colorHex: "#f97316",
  },
  "Bills & Utilities": {
    label: "Bills & Utilities",
    icon: Zap,
    iconColor: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    colorHex: "#eab308",
  },
  "Entertainment": {
    label: "Entertainment",
    icon: Film,
    iconColor: "text-purple-400",
    bgColor: "bg-purple-500/10",
    colorHex: "#a855f7",
  },
  "Medical": {
    label: "Medical",
    icon: Heart,
    iconColor: "text-red-400",
    bgColor: "bg-red-500/10",
    colorHex: "#ef4444",
  },
  "Shopping": {
    label: "Shopping",
    icon: ShoppingBag,
    iconColor: "text-pink-400",
    bgColor: "bg-pink-500/10",
    colorHex: "#ec4899",
  },
  "Education": {
    label: "Education",
    icon: GraduationCap,
    iconColor: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    colorHex: "#6366f1",
  },
  "Rent": {
    label: "Rent",
    icon: Home,
    iconColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
    colorHex: "#f59e0b",
  },
  "Salary": {
    label: "Salary",
    icon: Briefcase,
    iconColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    colorHex: "#10b981",
  },
  "Freelance": {
    label: "Freelance",
    icon: Laptop,
    iconColor: "text-teal-400",
    bgColor: "bg-teal-500/10",
    colorHex: "#14b8a6",
  },
  "Investment": {
    label: "Investment",
    icon: TrendingUp,
    iconColor: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    colorHex: "#06b6d4",
  },
  "Other": {
    label: "Other",
    icon: MoreHorizontal,
    iconColor: "text-slate-400",
    bgColor: "bg-slate-500/10",
    colorHex: "#94a3b8",
  },
};

export const CATEGORY_NAMES = Object.keys(TRANSACTION_CATEGORIES);

export const EXPENSE_CATEGORIES = [
  "Groceries",
  "Food & Dining",
  "Transport",
  "Fuel",
  "Bills & Utilities",
  "Entertainment",
  "Medical",
  "Shopping",
  "Education",
  "Rent",
  "Other",
] as const;

export const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Investment",
  "Other",
] as const;

export function getCategoryConfig(category: string): CategoryConfig {
  return (
    TRANSACTION_CATEGORIES[category] ?? TRANSACTION_CATEGORIES["Other"]
  );
}

export function getCategoryHexColor(category: string): string {
  return getCategoryConfig(category).colorHex;
}
