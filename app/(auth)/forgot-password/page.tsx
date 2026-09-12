"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, Mail, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { AuthCard } from "@/components/auth/auth-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: ForgotPasswordInput) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Something went wrong");
        return;
      }

      setIsEmailSent(true);
      toast.success("Reset link sent! Check your email.");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      title={isEmailSent ? "Check your inbox" : "Forgot password?"}
      subtitle={
        isEmailSent
          ? "We've sent a reset link to your email address"
          : "Enter your email and we'll send you a secure reset link"
      }
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 font-medium transition-colors"
          style={{ color: "#00F0FF" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#3bf4ff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#00F0FF")}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to login
        </Link>
      }
    >
      <AnimatePresence mode="wait">
        {!isEmailSent ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="forgot-email" className="text-slate-300 text-xs font-semibold font-heading tracking-wide uppercase">
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(148,163,184,0.6)" }} />
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={cn("pl-10", errors.email && "border-red-500/50 focus:border-red-500/50")}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl text-sm font-bold font-heading flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 focus:outline-none"
              style={{
                background: isLoading ? "rgba(0,240,255,0.15)" : "linear-gradient(135deg, #00F0FF 0%, #3bf4ff 50%, #00b8c9 100%)",
                color: isLoading ? "#00F0FF" : "#07090E",
                boxShadow: isLoading ? "none" : "0 0 25px rgba(0,240,255,0.3)",
              }}
            >
              {isLoading ? (
                <>
                  <span
                    className="w-4 h-4 rounded-full border-2 animate-spin"
                    style={{ borderColor: "rgba(0,240,255,0.3)", borderTopColor: "#00F0FF" }}
                  />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 stroke-[2]" />
                  <span>Send Reset Link</span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center space-y-5 py-2"
          >
            {/* Animated success icon */}
            <div className="flex justify-center">
              <div
                className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(0,240,255,0.08)", border: "1px solid rgba(0,240,255,0.20)" }}
              >
                {/* Pulsing ring */}
                <div
                  className="absolute inset-0 rounded-2xl animate-ping"
                  style={{ background: "rgba(0,240,255,0.06)", animationDuration: "2s" }}
                />
                <CheckCircle2 className="w-8 h-8 relative z-10" style={{ color: "#00F0FF" }} />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-white font-heading">
                Email sent successfully
              </p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                If an account with that email exists, we&apos;ve sent a password
                reset link. Check your inbox and spam folder.
              </p>
            </div>

            {/* Instruction chips */}
            <div className="flex flex-col gap-2 text-left">
              {["Check your inbox", "Click the reset link", "Create a new password"].map((step, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-telemetry"
                    style={{ background: "rgba(0,240,255,0.12)", color: "#00F0FF" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-xs text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthCard>
  );
}
