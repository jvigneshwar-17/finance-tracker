"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, KeyRound, AlertTriangle } from "lucide-react";
import { z } from "zod";

import { AuthCard } from "@/components/auth/auth-card";
import { PasswordInput } from "@/components/auth/password-input";
import { PasswordStrength } from "@/components/auth/password-strength";
import { Label } from "@/components/ui/label";

const resetFormSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetFormInput = z.infer<typeof resetFormSchema>;

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetFormInput>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  async function onSubmit(data: ResetFormInput) {
    if (!token) {
      toast.error("Invalid reset link. Please request a new one.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Something went wrong");
        return;
      }

      toast.success("Password reset successfully!");
      router.push("/login");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!token) {
    return (
      <AuthCard
        title="Invalid reset link"
        subtitle="This password reset link is invalid or has expired"
        footer={
          <Link
            href="/forgot-password"
            className="font-semibold transition-colors"
            style={{ color: "#00F0FF" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#3bf4ff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#00F0FF")}
          >
            Request a new link →
          </Link>
        }
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.20)" }}
          >
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-sm text-slate-400 text-center leading-relaxed max-w-xs">
            This link may have expired or already been used. Please request a
            fresh password reset link.
          </p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Create a strong new password for your account"
      footer={
        <Link
          href="/login"
          className="font-medium transition-colors"
          style={{ color: "#00F0FF" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#3bf4ff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#00F0FF")}
        >
          Back to login
        </Link>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="reset-password" className="text-slate-300 text-xs font-semibold font-heading tracking-wide uppercase">
            New Password
          </Label>
          <PasswordInput
            id="reset-password"
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <PasswordStrength password={passwordValue || ""} />
          {errors.password && (
            <p className="text-xs text-red-400">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="reset-confirm" className="text-slate-300 text-xs font-semibold font-heading tracking-wide uppercase">
            Confirm Password
          </Label>
          <PasswordInput
            id="reset-confirm"
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
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
              <span>Resetting...</span>
            </>
          ) : (
            <>
              <KeyRound className="w-4 h-4 stroke-[2]" />
              <span>Reset Password</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthCard title="Loading..." subtitle="Please wait">
          <div className="flex items-center justify-center py-8">
            <span
              className="w-8 h-8 rounded-full border-2 animate-spin"
              style={{ borderColor: "rgba(0,240,255,0.2)", borderTopColor: "#00F0FF" }}
            />
          </div>
        </AuthCard>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
