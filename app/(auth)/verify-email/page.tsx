"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Mail, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { AuthCard } from "@/components/auth/auth-card";

type VerifyState = "loading" | "success" | "error" | "no-token";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, setState] = useState<VerifyState>(
    token ? "loading" : "no-token"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    async function verifyEmail() {
      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();

        if (!response.ok) {
          setState("error");
          setMessage(result.error || "Verification failed");
          return;
        }

        setState("success");
        setMessage(result.message || "Email verified successfully!");
      } catch {
        setState("error");
        setMessage("Network error. Please try again.");
      }
    }

    verifyEmail();
  }, [token]);

  const stateConfig: Record<VerifyState, {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    iconBg: string;
    iconBorder: string;
  }> = {
    loading: {
      title: "Verifying your email...",
      subtitle: "Please wait while we confirm your email address",
      iconBg: "rgba(0,240,255,0.06)",
      iconBorder: "rgba(0,240,255,0.15)",
      icon: (
        <span
          className="w-9 h-9 rounded-full border-2 animate-spin"
          style={{ borderColor: "rgba(0,240,255,0.2)", borderTopColor: "#00F0FF" }}
        />
      ),
    },
    success: {
      title: "Email verified!",
      subtitle: "Your email has been successfully confirmed",
      iconBg: "rgba(0,240,255,0.08)",
      iconBorder: "rgba(0,240,255,0.22)",
      icon: <CheckCircle2 className="w-9 h-9" style={{ color: "#00F0FF" }} />,
    },
    error: {
      title: "Verification failed",
      subtitle: "We couldn't verify your email address",
      iconBg: "rgba(239,68,68,0.08)",
      iconBorder: "rgba(239,68,68,0.20)",
      icon: <XCircle className="w-9 h-9 text-red-400" />,
    },
    "no-token": {
      title: "Check your email",
      subtitle: "Click the verification link sent to your inbox to activate your account",
      iconBg: "rgba(0,240,255,0.06)",
      iconBorder: "rgba(0,240,255,0.15)",
      icon: <Mail className="w-9 h-9" style={{ color: "#00F0FF" }} />,
    },
  };

  const config = stateConfig[state];

  return (
    <AuthCard
      title={config.title}
      subtitle={config.subtitle}
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 font-medium transition-colors"
          style={{ color: "#00F0FF" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#3bf4ff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#00F0FF")}
        >
          Go to login <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      }
    >
      <div className="flex flex-col items-center py-4 space-y-5">
        {/* State icon */}
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            initial={{ opacity: 0, scale: 0.85, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            {/* Ambient pulse for loading/success */}
            {(state === "loading" || state === "success" || state === "no-token") && (
              <div
                className="absolute inset-0 rounded-2xl animate-ping"
                style={{ background: "rgba(0,240,255,0.04)", animationDuration: "2.5s" }}
              />
            )}
            <div
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background: config.iconBg, border: `1px solid ${config.iconBorder}` }}
            >
              {config.icon}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Message */}
        {message && (
          <p className="text-sm text-slate-400 text-center max-w-xs leading-relaxed">
            {message}
          </p>
        )}

        {/* CTA on success */}
        {state === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl text-sm font-bold font-heading transition-all duration-200 active:scale-[0.98] focus:outline-none"
              style={{
                background: "linear-gradient(135deg, #00F0FF 0%, #3bf4ff 50%, #00b8c9 100%)",
                color: "#07090E",
                boxShadow: "0 0 25px rgba(0,240,255,0.3)",
              }}
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </motion.div>
        )}

        {/* Error CTA */}
        {state === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl text-sm font-bold font-heading transition-all duration-200 active:scale-[0.98] focus:outline-none"
              style={{
                background: "rgba(239,68,68,0.10)",
                color: "#f87171",
                border: "1px solid rgba(239,68,68,0.20)",
              }}
            >
              Return to Login
            </Link>
          </motion.div>
        )}
      </div>
    </AuthCard>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <AuthCard title="Loading..." subtitle="Please wait" footer={null}>
          <div className="flex items-center justify-center py-8">
            <span
              className="w-8 h-8 rounded-full border-2 animate-spin"
              style={{ borderColor: "rgba(0,240,255,0.2)", borderTopColor: "#00F0FF" }}
            />
          </div>
        </AuthCard>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
