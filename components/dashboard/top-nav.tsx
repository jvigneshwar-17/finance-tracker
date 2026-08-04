"use client";

import React, { useState, useRef, useEffect } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

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
  const [isDark, setIsDark] = useState(true);
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
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/70 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <nav className="hidden sm:flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
            <Link
              href="/dashboard"
              className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            {currentPage !== "Dashboard" && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-slate-200 font-medium">{currentPage}</span>
              </>
            )}
          </nav>

          {/* Mobile page title */}
          <h1 className="sm:hidden text-base font-semibold text-white truncate">{currentPage}</h1>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search transactions, budgets..."
              className={cn(
                "w-full pl-10 pr-4 py-2 rounded-xl text-sm",
                "bg-slate-900/60 border border-white/[0.06] text-slate-200",
                "placeholder:text-slate-500",
                "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/30",
                "transition-all duration-200"
              )}
              aria-label="Search"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden xl:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-800 border border-slate-700 rounded">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile search */}
          <button
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/70 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            aria-label="Search"
          >
            <Search className="w-[18px] h-[18px]" />
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/70 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
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
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/70 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              aria-label="Notifications"
              aria-expanded={isNotifOpen}
              aria-haspopup="true"
            >
              <Bell className="w-[18px] h-[18px]" />
              {/* Unread dot */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#090d16]" />
            </button>

            {/* Notifications dropdown */}
            {isNotifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-slate-900/98 border border-slate-800/80 backdrop-blur-2xl shadow-2xl shadow-black/80 p-1 animate-in fade-in slide-in-from-top-2 duration-200" role="menu">
                <div className="px-4 py-3 border-b border-slate-800/60">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  <p className="text-xs text-slate-500 mt-0.5">You have 3 unread notifications</p>
                </div>
                <div className="py-1 max-h-64 overflow-y-auto sidebar-scrollbar">
                  {[
                    { title: "Budget alert", desc: "Food & Groceries budget is at 85%", time: "2 min ago", unread: true },
                    { title: "New income recorded", desc: "Salary credited ₹45,000", time: "1 hour ago", unread: true },
                    { title: "Goal milestone", desc: "You're 50% to your vacation goal!", time: "3 hours ago", unread: true },
                    { title: "Weekly summary", desc: "Your spending report is ready", time: "1 day ago", unread: false },
                  ].map((notif, i) => (
                    <div
                      key={i}
                      className={cn(
                        "px-4 py-3 hover:bg-slate-800/60 transition-colors cursor-pointer rounded-xl mx-1",
                        notif.unread && "bg-emerald-500/[0.03]"
                      )}
                      role="menuitem"
                    >
                      <div className="flex items-start gap-3">
                        {notif.unread && (
                          <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        )}
                        <div className={cn(!notif.unread && "ml-5")}>
                          <p className="text-xs font-semibold text-white">{notif.title}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{notif.desc}</p>
                          <p className="text-[10px] text-slate-500 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-slate-800/60">
                  <button className="w-full text-center text-xs text-emerald-400 hover:text-emerald-300 font-medium py-1 transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-slate-800/80 mx-1" />

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              aria-label="User menu"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0">
                {userInitials}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-medium text-white leading-tight truncate max-w-[120px]">
                  {user?.name || "Loading..."}
                </p>
                <p className="text-[10px] text-slate-500 leading-tight truncate max-w-[120px]">
                  {user?.email || ""}
                </p>
              </div>
            </button>

            {/* Profile dropdown menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-slate-900/98 border border-slate-800/80 backdrop-blur-2xl shadow-2xl shadow-black/80 p-1 animate-in fade-in slide-in-from-top-2 duration-200" role="menu">
                {/* User info header */}
                <div className="px-4 py-3 border-b border-slate-800/60">
                  <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{user?.email}</p>
                </div>

                <div className="py-1">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors rounded-xl mx-1"
                    role="menuitem"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors rounded-xl mx-1"
                    role="menuitem"
                  >
                    <Settings className="w-4 h-4 text-slate-500" />
                    <span>Settings</span>
                  </Link>
                </div>

                <div className="border-t border-slate-800/60 pt-1">
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
