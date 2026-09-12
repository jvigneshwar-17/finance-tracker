import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ExpenseFlow — Authentication",
  description: "Sign in or create an account to manage your expenses with ExpenseFlow.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 relative overflow-hidden"
      style={{ background: "#07090E" }}
    >
      {/* Primary cyan ambient orb — top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,240,255,0.06) 0%, transparent 65%)", filter: "blur(60px)" }}
      />
      {/* Violet accent — bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(121,40,202,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      {/* Subtle navy glow — top-left */}
      <div
        className="absolute top-0 left-0 w-[400px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,180,255,0.04) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
