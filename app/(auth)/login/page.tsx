"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";

import { AuthCard } from "@/components/auth/auth-card";
import { PasswordInput } from "@/components/auth/password-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginInput) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 403 && result.code === "EMAIL_VERIFICATION_REQUIRED") {
          toast.error(result.error || "Please verify your email before logging in.");
          router.push("/verify-email");
          return;
        }
        toast.error(result.error || "Invalid credentials");
        return;
      }

      toast.success("Welcome back!");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to your ExpenseFlow account to continue"
      footer={
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold transition-colors"
            style={{ color: "#00F0FF" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#3bf4ff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#00F0FF")}
          >
            Sign up free
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="login-email" className="text-slate-300 text-xs font-semibold font-heading tracking-wide uppercase">
            Email address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(148,163,184,0.6)" }} />
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className={cn(
                "pl-10",
                errors.email && "border-red-500/50 focus:border-red-500/50"
              )}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password" className="text-slate-300 text-xs font-semibold font-heading tracking-wide uppercase">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium transition-colors"
              style={{ color: "#00F0FF" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#3bf4ff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#00F0FF")}
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="login-password"
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-400">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <Checkbox id="remember" label="Remember me" />
          <span
            className="inline-flex items-center gap-1 text-[10px] font-semibold font-heading tracking-wide px-2 py-0.5 rounded-full border"
            style={{ color: "rgba(0,240,255,0.7)", borderColor: "rgba(0,240,255,0.15)", background: "rgba(0,240,255,0.05)" }}
          >
            <ShieldCheck className="w-3 h-3" />
            256-bit encrypted
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl text-sm font-bold font-heading flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 focus:outline-none focus-visible:ring-2"
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
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Log In</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>
    </AuthCard>
  );
}
