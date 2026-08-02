"use client";

import React from "react";
import { Star, Quote, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialItem {
  name: string;
  role: string;
  initials: string;
  rating: number;
  content: string;
  avatarBg: string;
  verified: boolean;
}

const testimonialsList: TestimonialItem[] = [
  {
    name: "Rahul K.",
    role: "Software Engineer",
    initials: "RK",
    rating: 5,
    content: "ExpenseFlow completely changed the way I track my monthly spending.",
    avatarBg: "bg-gradient-to-tr from-emerald-600 to-teal-400 text-slate-950 font-bold",
    verified: true,
  },
  {
    name: "Priya S.",
    role: "College Student",
    initials: "PS",
    rating: 5,
    content: "The clean interface helped me stay within my budget for the first time.",
    avatarBg: "bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-950 font-bold",
    verified: true,
  },
  {
    name: "Arjun M.",
    role: "Freelancer",
    initials: "AM",
    rating: 5,
    content: "The analytics dashboard makes understanding my expenses effortless.",
    avatarBg: "bg-gradient-to-tr from-cyan-500 to-emerald-400 text-slate-950 font-bold",
    verified: true,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 lg:py-28 bg-[#090d16] overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-lg shadow-emerald-500/10">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Community Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            What Our <span className="gradient-text">Users Say</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            See how ExpenseFlow helps people take control of their finances.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsList.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "group relative p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between",
                "bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl",
                "hover:bg-slate-900/90 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10",
                "hover:-translate-y-1.5 cursor-pointer"
              )}
            >
              {/* Subtle hover background aura */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Top Row: 5-Star Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-slate-800 group-hover:text-emerald-500/30 transition-colors" />
                </div>

                {/* Review Content */}
                <p className="text-base text-slate-200 leading-relaxed font-normal mb-8 italic group-hover:text-white transition-colors">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* User Avatar & Details */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-800/60">
                <div className={cn("w-11 h-11 rounded-full flex items-center justify-center text-sm shadow-md", item.avatarBg)}>
                  {item.initials}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white group-hover:text-emerald-300 transition-colors">
                    <span>{item.name}</span>
                    {item.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/20" />
                    )}
                  </div>
                  <div className="text-xs text-slate-400">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
