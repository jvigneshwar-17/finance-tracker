"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, User, Mail, Sparkles } from "lucide-react";

import { AuthCard } from "@/components/auth/auth-card";
import { PasswordInput } from "@/components/auth/password-input";
import { PasswordStrength } from "@/components/auth/password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpSchema, type SignUpInput } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  async function onSubmit(data: SignUpInput) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Something went wrong");
        return;
      }

      toast.success(
        result.message || "Account created successfully! You can now log in."
      );
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start tracking your finances in seconds — free forever"
      footer={
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold transition-colors"
            style={{ color: "#00F0FF" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#3bf4ff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#00F0FF")}
          >
            Log in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="signup-name" className="text-slate-300 text-xs font-semibold font-heading tracking-wide uppercase">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(148,163,184,0.6)" }} />
            <Input
              id="signup-name"
              placeholder="John Doe"
              autoComplete="name"
              className={cn("pl-10", errors.name && "border-red-500/50 focus:border-red-500/50")}
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="signup-email" className="text-slate-300 text-xs font-semibold font-heading tracking-wide uppercase">
            Email address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(148,163,184,0.6)" }} />
            <Input
              id="signup-email"
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

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="signup-password" className="text-slate-300 text-xs font-semibold font-heading tracking-wide uppercase">
            Password
          </Label>
          <PasswordInput
            id="signup-password"
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
          <Label htmlFor="signup-confirm" className="text-slate-300 text-xs font-semibold font-heading tracking-wide uppercase">
            Confirm Password
          </Label>
          <PasswordInput
            id="signup-confirm"
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
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 stroke-[2]" />
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>

        {/* Terms micro-copy */}
        <p className="text-center text-[11px] text-slate-500 leading-relaxed">
          By creating an account you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-2 hover:text-slate-400 transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-slate-400 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
