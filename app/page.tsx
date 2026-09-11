import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ValuePillarsBar } from "@/components/landing/ValuePillarsBar";
import { CoreCapabilitiesGrid } from "@/components/landing/CoreCapabilitiesGrid";
import { ExpenseShowcase } from "@/components/landing/ExpenseShowcase";
import { BudgetShowcase } from "@/components/landing/BudgetShowcase";
import { AnalyticsShowcase } from "@/components/landing/AnalyticsShowcase";
import { SavingsGoalsShowcase } from "@/components/landing/SavingsGoalsShowcase";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { SecurityArchitecture } from "@/components/landing/SecurityArchitecture";
import { FAQAccordion } from "@/components/landing/FAQAccordion";
import { BottomCTA } from "@/components/landing/BottomCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#00F0FF] selection:text-[#07090E] flex flex-col justify-between overflow-x-hidden">
      {/* 1. Sticky Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Product Value Pillars */}
        <ValuePillarsBar />

        {/* 4. Core Capabilities (2x2 Grid) */}
        <CoreCapabilitiesGrid />

        {/* 5. Expense Tracking Showcase */}
        <ExpenseShowcase />

        {/* 6. Budget Management Showcase */}
        <BudgetShowcase />

        {/* 7. Analytics & Cash Flow Showcase */}
        <AnalyticsShowcase />

        {/* 8. Savings Goals Showcase */}
        <SavingsGoalsShowcase />

        {/* 9. How ExpenseFlow Works */}
        <HowItWorksSection />

        {/* 10. Security Architecture */}
        <SecurityArchitecture />

        {/* 11. FAQ Accordion */}
        <FAQAccordion />

        {/* 12. Final Call to Action */}
        <BottomCTA />
      </main>

      {/* 13. Institutional Footer */}
      <LandingFooter />
    </div>
  );
}
