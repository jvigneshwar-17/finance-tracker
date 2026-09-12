"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  BarChart3,
  Target,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { toast } from "sonner";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transactions", href: "/dashboard/transactions", icon: ArrowLeftRight },
  { label: "Budgets", href: "/dashboard/budgets", icon: Wallet },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Goals", href: "/dashboard/goals", icon: Target },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed, toggle } = useSidebar();

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#07090E]/95 backdrop-blur-2xl">
      {/* Brand Logo Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/[0.06]">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/50 rounded-xl p-1 -m-1"
          onClick={onNavigate}
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#00F0FF] via-[#00D4E0] to-[#7928CA] text-[#07090E] font-bold shadow-md shadow-[#00F0FF]/20 shrink-0 group-hover:scale-105 transition-transform duration-200">
            <TrendingUp className="w-4.5 h-4.5 stroke-[2.5]" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#00F0FF] rounded-full animate-ping opacity-75" />
          </div>
          {!isCollapsed && (
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-[#00F0FF] transition-colors whitespace-nowrap">
                ExpenseFlow
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
            </div>
          )}
        </Link>

        {/* Desktop collapse toggle */}
        <button
          onClick={toggle}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/50"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronsRight className="w-4 h-4" />
          ) : (
            <ChevronsLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Section */}
      <nav
        className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto sidebar-scrollbar"
        role="navigation"
        aria-label="Dashboard navigation"
      >
        {!isCollapsed && (
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-heading">
            Application
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/50",
                isActive
                  ? "bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/25 shadow-sm shadow-[#00F0FF]/10 font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/[0.04]",
                isCollapsed && "justify-center px-2"
              )}
              aria-current={isActive ? "page" : undefined}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "w-[18px] h-[18px] shrink-0 transition-colors",
                  isActive
                    ? "text-[#00F0FF]"
                    : "text-slate-400 group-hover:text-white"
                )}
              />
              {!isCollapsed && (
                <span className="truncate font-sans">{item.label}</span>
              )}

              {/* Cyan active indicator pill */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#00F0FF] shadow-sm shadow-[#00F0FF]/80" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Action Footer */}
      <div className="px-3 py-4 border-t border-white/[0.06]">
        <button
          onClick={handleLogout}
          className={cn(
            "group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
            "text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40",
            isCollapsed && "justify-center px-2"
          )}
          title={isCollapsed ? "Logout" : undefined}
          aria-label="Logout"
        >
          <LogOut className="w-[18px] h-[18px] shrink-0 text-slate-400 group-hover:text-rose-400 transition-colors" />
          {!isCollapsed && <span className="font-sans">Sign Out</span>}
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { isCollapsed, isMobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed top-0 left-0 h-screen z-40",
          "border-r border-white/[0.06] shadow-xl shadow-black/50",
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[68px]" : "w-[256px]"
        )}
        aria-label="Main sidebar"
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay + Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 h-screen w-[280px] z-50 md:hidden border-r border-white/[0.08] shadow-2xl shadow-black/80"
              aria-label="Mobile navigation"
            >
              {/* Close button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]/50 z-10"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5 text-[#00F0FF]" />
              </button>

              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
