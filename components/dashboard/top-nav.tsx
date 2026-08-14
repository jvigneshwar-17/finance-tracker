"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronRight,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import { useTransactions } from "@/hooks/use-transactions";
import { toast } from "sonner";

interface DynamicNotification {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  link: string;
}

interface BudgetRecord {
  id: string;
  category: string;
  amount: number;
}

function formatRelativeTime(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

function formatAmount(n: number): string {
  return "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/transactions": "Transactions",
  "/dashboard/budgets": "Budgets",
  "/dashboard/analytics": "Analytics",
  "/dashboard/goals": "Goals",
  "/dashboard/settings": "Settings",
};

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { setMobileOpen } = useSidebar();
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { recent, categoryBreakdown } = useTransactions();
  const [budgets, setBudgets] = useState<BudgetRecord[]>([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const currentPage = breadcrumbMap[pathname] || "Dashboard";

  const userInitials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  // Fetch user budgets to compute actual category budget usage
  useEffect(() => {
    let isMounted = true;
    async function loadBudgets() {
      try {
        const res = await fetch("/api/budgets", {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setBudgets(data.budgets || []);
        }
      } catch {
        // silently ignore
      }
    }
    loadBudgets();
    return () => {
      isMounted = false;
    };
  }, [isNotifOpen]);

  // Generate dynamic contextual notifications from real user data
  const notifications = useMemo<DynamicNotification[]>(() => {
    const list: DynamicNotification[] = [];

    // 1. Budget Alerts (High Priority)
    for (const b of budgets) {
      const spent = categoryBreakdown.find((c) => c.name === b.category)?.value || 0;
      const pct = b.amount > 0 ? (spent / b.amount) * 100 : 0;

      if (pct >= 100) {
        list.push({
          id: `budget-over-${b.id}`,
          title: "Over budget",
          desc: `${b.category} is at ${pct.toFixed(0)}% (${formatAmount(spent)} of ${formatAmount(b.amount)})`,
          time: "This month",
          unread: true,
          link: "/dashboard/budgets",
        });
      } else if (pct >= 80) {
        list.push({
          id: `budget-warn-${b.id}`,
          title: "Budget alert",
          desc: `${b.category} budget is at ${pct.toFixed(0)}% (${formatAmount(spent)} of ${formatAmount(b.amount)})`,
          time: "This month",
          unread: true,
          link: "/dashboard/budgets",
        });
      }
    }

    // 2. Recent Transactions (Activity)
    const recentTxList = (recent || []).slice(0, 3);
    for (const tx of recentTxList) {
      if (tx.type === "income") {
        list.push({
          id: `tx-${tx.id}`,
          title: "New income recorded",
          desc: `${tx.title} — credited ${formatAmount(tx.amount)}`,
          time: formatRelativeTime(tx.date || tx.createdAt),
          unread: false,
          link: "/dashboard/transactions",
        });
      } else {
        list.push({
          id: `tx-${tx.id}`,
          title: "Recent expense",
          desc: `${tx.title} — ${formatAmount(tx.amount)} (${tx.category})`,
          time: formatRelativeTime(tx.date || tx.createdAt),
          unread: false,
          link: "/dashboard/transactions",
        });
      }
    }

    return list;
  }, [budgets, categoryBreakdown, recent]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdowns on Escape
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
        setIsNotifOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    <header
      className={cn(
        "sticky top-0 z-30 w-full",
        "glass-nav py-3 px-4 sm:px-6"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left Section: Hamburger + Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <nav className="hidden sm:flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground/70 transition-colors flex items-center gap-1"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            {currentPage !== "Dashboard" && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
                <span className="text-foreground/80 font-medium">{currentPage}</span>
              </>
            )}
          </nav>

          {/* Mobile page title */}
          <h1 className="sm:hidden text-base font-semibold text-foreground truncate">{currentPage}</h1>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions, budgets..."
              className={cn(
                "w-full pl-10 pr-4 py-2 rounded-xl text-sm",
                "bg-secondary/60 border border-border text-foreground",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/30",
                "transition-all duration-200"
              )}
              aria-label="Search"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden xl:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground bg-secondary border border-border rounded">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile search */}
          <button
            className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            aria-label="Search"
          >
            <Search className="w-[18px] h-[18px]" />
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
              }}
              className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              aria-label="Notifications"
              aria-expanded={isNotifOpen}
              aria-haspopup="true"
            >
              <Bell className="w-[18px] h-[18px]" />
              {/* Unread dot - only if there are unread notifications */}
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-background" />
              )}
            </button>

            {/* Notifications dropdown */}
            {isNotifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-border backdrop-blur-2xl shadow-2xl shadow-black/40 p-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50" style={{ background: "var(--dropdown-bg)" }} role="menu">
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {unreadCount > 0
                      ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                      : notifications.length > 0
                      ? "Recent activity & alerts"
                      : "No new notifications"}
                  </p>
                </div>
                {notifications.length === 0 ? (
                  <div className="py-8 px-4 text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
                    <p className="text-xs font-semibold text-foreground">You&apos;re all caught up</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">No new notifications</p>
                  </div>
                ) : (
                  <div className="py-1 max-h-64 overflow-y-auto sidebar-scrollbar">
                    {notifications.map((notif) => (
                      <Link
                        key={notif.id}
                        href={notif.link}
                        onClick={() => setIsNotifOpen(false)}
                        className={cn(
                          "block px-4 py-3 hover:bg-secondary/60 transition-colors cursor-pointer rounded-xl mx-1",
                          notif.unread && "bg-emerald-500/[0.03]"
                        )}
                        role="menuitem"
                      >
                        <div className="flex items-start gap-3">
                          {notif.unread && (
                            <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          )}
                          <div className={cn(!notif.unread && "ml-5")}>
                            <p className="text-xs font-semibold text-foreground">{notif.title}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">{notif.desc}</p>
                            <p className="text-[10px] text-muted-foreground/70 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                <div className="px-4 py-2 border-t border-border">
                  <Link
                    href="/dashboard/transactions"
                    onClick={() => setIsNotifOpen(false)}
                    className="block w-full text-center text-xs text-emerald-400 hover:text-emerald-300 font-medium py-1 transition-colors"
                  >
                    View all activity
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-border mx-1" />

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-secondary/60 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              aria-label="User menu"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0">
                {userInitials}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-medium text-foreground leading-tight truncate max-w-[120px]">
                  {user?.name || "Loading..."}
                </p>
                <p className="text-[10px] text-muted-foreground leading-tight truncate max-w-[120px]">
                  {user?.email || ""}
                </p>
              </div>
            </button>

            {/* Profile dropdown menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-border backdrop-blur-2xl shadow-2xl shadow-black/40 p-1 animate-in fade-in slide-in-from-top-2 duration-200" style={{ background: "var(--dropdown-bg)" }} role="menu">
                {/* User info header */}
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{user?.email}</p>
                </div>

                <div className="py-1">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors rounded-xl mx-1"
                    role="menuitem"
                  >
                    <User className="w-4 h-4 text-muted-foreground/70" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors rounded-xl mx-1"
                    role="menuitem"
                  >
                    <Settings className="w-4 h-4 text-muted-foreground/70" />
                    <span>Settings</span>
                  </Link>
                </div>

                <div className="border-t border-border pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors rounded-xl mx-1"
                    role="menuitem"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
