"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Mail, Shield, HelpCircle, Lock, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  department: "support" | "security" | "privacy" | "feedback";
  subject: string;
  message: string;
}

const departmentEmails = {
  support: "support@expenseflow.app",
  security: "security@expenseflow.app",
  privacy: "privacy@expenseflow.app",
  feedback: "feedback@expenseflow.app",
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    department: "support",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean client validation and submission state without modifying backend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Inquiry received! Our team will review your message promptly.");
    }, 600);
  };

  const currentEmail = departmentEmails[formData.department];

  return (
    <div className="rounded-3xl glass-fintech p-6 sm:p-10 border border-white/[0.08] relative overflow-hidden">
      {/* Decorative top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent" />

      {isSubmitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-white">Thank You for Reaching Out</h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Your message has been logged for our{" "}
            <span className="text-[#00F0FF] capitalize font-medium">{formData.department}</span> department.
            We will respond to <strong className="text-white">{formData.email}</strong> within our standard turnaround window.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  department: "support",
                  subject: "",
                  message: "",
                });
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
          <div className="border-b border-white/[0.06] pb-4">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Send an Inquiry
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select your inquiry topic below to direct your message to the appropriate channel.
            </p>
          </div>

          {/* Department Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-heading">
              Inquiry Department
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: "support", label: "General Support", icon: HelpCircle, desc: "Accounts, features, bugs" },
                { id: "security", label: "Security Disclosure", icon: Shield, desc: "Vulnerabilities, token issues" },
                { id: "privacy", label: "Privacy & Data Rights", icon: Lock, desc: "Export, deletion requests" },
                { id: "feedback", label: "Product Feedback", icon: MessageSquare, desc: "Suggestions, usability" },
              ].map((dept) => {
                const Icon = dept.icon;
                const isSelected = formData.department === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, department: dept.id as FormData["department"] })}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "bg-[#00F0FF]/10 border-[#00F0FF]/50 text-white"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? "bg-[#00F0FF]/20 text-[#00F0FF]" : "bg-white/[0.05] text-slate-400"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-heading">{dept.label}</div>
                      <div className="text-[11px] text-slate-400 leading-tight">{dept.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300">
                Full Name <span className="text-[#00F0FF]">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Alex Morgan"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300">
                Email Address <span className="text-[#00F0FF]">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all"
              />
            </div>
          </div>

          {/* Subject Field */}
          <div className="space-y-1.5">
            <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-300">
              Subject Line <span className="text-[#00F0FF]">*</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Brief summary of your inquiry..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all"
            />
          </div>

          {/* Message Field */}
          <div className="space-y-1.5">
            <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300">
              Message Details <span className="text-[#00F0FF]">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Provide specific details about your question, security report, or data inquiry..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all resize-y min-h-[110px]"
            />
          </div>

          {/* Direct Email Link & Placeholder Notice */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>Direct mail destination: </span>
              <a
                href={`mailto:${currentEmail}?subject=${encodeURIComponent(formData.subject || "ExpenseFlow Inquiry")}`}
                className="text-[#00F0FF] font-telemetry hover:underline break-all"
              >
                {currentEmail}
              </a>
            </div>
            <div className="text-[11px] text-amber-400/90 font-mono">
              [PLACEHOLDER - UPDATE BEFORE PRODUCTION]
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-heading text-sm font-bold bg-[#00F0FF] text-[#07090E] hover:bg-[#3bf4ff] active:scale-[0.99] transition-all shadow-lg shadow-[#00F0FF]/20 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00F0FF]"
          >
            {isSubmitting ? (
              <span>Sending Inquiry...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
