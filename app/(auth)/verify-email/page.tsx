"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";
import { motion } from "framer-motion";

import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";

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

  return (
    <AuthCard
      title={
        state === "loading"
          ? "Verifying your email..."
          : state === "success"
          ? "Email verified!"
          : state === "no-token"
          ? "Check your email"
          : "Verification failed"
      }
      subtitle={
        state === "loading"
          ? "Please wait while we verify your email address"
          : state === "success"
          ? "Your email has been successfully verified"
          : state === "no-token"
          ? "Please click the verification link sent to your inbox to activate your account."
          : "We couldn't verify your email address"
      }
      footer={
        <Link
          href="/login"
          className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
        >
          Go to login
        </Link>
      }
    >
      <div className="flex flex-col items-center py-6 space-y-4">
        {state === "loading" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-14 h-14 rounded-2xl bg-slate-800/50 border border-slate-700 flex items-center justify-center"
          >
            <Loader2 className="w-7 h-7 text-emerald-400 animate-spin" />
          </motion.div>
        )}

        {state === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"
          >
            <CheckCircle2 className="w-7 h-7 text-emerald-400" />
          </motion.div>
        )}

        {state === "no-token" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"
          >
            <Mail className="w-7 h-7 text-emerald-400" />
          </motion.div>
        )}

        {state === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center"
          >
            <XCircle className="w-7 h-7 text-red-400" />
          </motion.div>
        )}

        {message && (
          <p className="text-sm text-slate-400 text-center">{message}</p>
        )}

        {state === "success" && (
          <Link href="/login">
            <Button size="default">Continue to login</Button>
          </Link>
        )}
      </div>
    </AuthCard>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <AuthCard
          title="Loading..."
          subtitle="Please wait"
          footer={null}
        >
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </AuthCard>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
