"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Reveal, ProductNav } from "@/components/ui";

export default function DemoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleStartDemo() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/demo/start", { method: "POST" });
      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError("Could not initialize demo session.");
        return;
      }

      router.push(data.next);
    } catch {
      setLoading(false);
      setError("An unexpected error occurred.");
    }
  }

  return (
    <div className="min-h-screen pb-24 pt-6 px-4 sm:px-6 bg-[#FAF8F5]">
      {/* Top Floating Capsule Navbar */}
      <ProductNav />

      {/* Main Content */}
      <main className="max-w-[760px] mx-auto">
        {/* Title */}
        <Reveal className="text-center mb-8 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.035em] text-[#18181B]">
            See Pruv in 60 seconds.
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#71717A] mt-3">
            Try the product flow or explore a finished measured review.
          </p>
        </Reveal>

        <div className="space-y-6">
          {/* Card 1: Explore a Complete Proof Review */}
          <Reveal delay={0.05}>
            <div className="bg-white rounded-[28px] sm:rounded-[34px] p-6 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.04)] border border-[#EBE7E0] grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 items-center">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#F4F1FC] text-[#5B4FE8] flex items-center justify-center mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <polyline points="9 15 11 17 15 13" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-[#18181B] tracking-tight">
                  Explore a Complete<br />Proof Review
                </h2>
                <p className="text-sm text-[#71717A] mt-2.5 mb-6 leading-relaxed max-w-[280px]">
                  A demo trial with real baseline and follow-up captured earlier.
                </p>

                {error && (
                  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-700 font-semibold">
                    {error}
                  </div>
                )}

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleStartDemo}
                  className="py-3.5 px-6 rounded-xl bg-[#5B4FE8] hover:bg-[#4E42DC] active:scale-[0.98] disabled:opacity-50 text-white font-bold text-sm shadow-[0_4px_14px_rgba(91,79,232,0.28)] transition-all flex items-center justify-center cursor-pointer"
                >
                  {loading ? "Starting Demo..." : "Open Demo Review"}
                </button>
              </div>

              {/* Mini Preview Card */}
              <div className="bg-[#FAF9F7] rounded-2xl p-4 border border-[#ECE8E1] shadow-sm text-xs">
                <div className="flex items-center gap-3 pb-3 border-b border-[#ECE8E1]">
                  <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-white border border-[#E5E0D8] flex-shrink-0">
                    <Image src="/serum_bottle_review.jpg" alt="Serum" fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#18181B] text-xs">Niacinamide 10% Serum</h3>
                    <p className="text-[10px] text-[#71717A]">21-day trial</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[#F59E0B] text-xs">★★★★☆</span>
                      <span className="font-mono text-[10px] font-bold text-[#18181B]">4.5/5</span>
                    </div>
                  </div>
                </div>

                <p className="font-serif italic text-[11px] text-[#18181B] my-2.5">
                  &ldquo;Skin felt calmer by the end of week two.&rdquo;
                </p>

                <div className="pt-2 border-t border-[#ECE8E1]">
                  <span className="text-[9px] font-bold text-[#A1A1AA] uppercase tracking-wider block mb-1.5">
                    MEASURED CHANGE (YOUCAM SKIN AI + FOLLOW-UP)
                  </span>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10.5px]">
                      <span className="font-bold text-[#18181B]">☀️ Redness score</span>
                      <span className="font-mono text-[#71717A]">71.2 &rarr; 79.8</span>
                      <span className="font-mono font-bold text-[#EA580C]">+8.6</span>
                    </div>
                    <div className="flex items-center justify-between text-[10.5px]">
                      <span className="font-bold text-[#18181B]">🌟 Radiance score</span>
                      <span className="font-mono text-[#71717A]">60.7 &rarr; 72.0</span>
                      <span className="font-mono font-bold text-[#EAB308]">+5.3</span>
                    </div>
                    <div className="flex items-center justify-between text-[10.5px]">
                      <span className="font-bold text-[#18181B]">✨ Texture score</span>
                      <span className="font-mono text-[#71717A]">67.4 &rarr; 68.1</span>
                      <span className="font-mono font-bold text-[#0284C7]">+0.7</span>
                    </div>
                  </div>

                  <p className="text-[9px] text-[#A1A1AA] text-center mt-2.5">
                    Measured with YouCam Skin AI 🪄
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Try a Live Skin Scan */}
          <Reveal delay={0.1}>
            <div className="bg-white rounded-[28px] sm:rounded-[34px] p-6 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.04)] border border-[#EBE7E0] grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 items-center">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#F4F1FC] text-[#5B4FE8] flex items-center justify-center mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-[#18181B] tracking-tight">
                  Try a Live<br />Skin Scan
                </h2>
                <p className="text-sm text-[#71717A] mt-2.5 mb-6 leading-relaxed max-w-[280px]">
                  Run a real YouCam Skin AI scan on yourself.
                </p>

                <Link
                  href="/start"
                  className="py-3.5 px-6 rounded-xl border border-[#EBE7E0] bg-white hover:bg-[#FAF9F6] active:scale-[0.98] text-[#18181B] font-bold text-sm shadow-sm transition-all inline-flex items-center justify-center text-center"
                >
                  Start Live Scan
                </Link>
              </div>

              {/* Viewfinder Graphic Preview */}
              <div className="bg-[#F6F4FE] rounded-2xl p-6 border border-[#ECE8FB] flex flex-col items-center justify-center text-center relative overflow-hidden">
                {/* HUD Corner Brackets */}
                <div className="w-36 h-40 border-2 border-dashed border-[#5B4FE8]/40 rounded-3xl relative flex items-center justify-center my-2">
                  <div className="w-20 h-24 rounded-full border-2 border-[#5B4FE8] flex flex-col items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5B4FE8] mb-1" />
                    <div className="w-6 h-1 rounded-full bg-[#5B4FE8]/30" />
                  </div>
                </div>

                <p className="text-[11px] font-medium text-[#52525B] mt-2">
                  Position your face in the frame<br />and we&apos;ll handle the rest.
                </p>

                {/* Shutter pill */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-6 h-6 rounded-lg bg-white border border-[#E0DAF5] flex items-center justify-center text-xs">
                    🖼️
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#5B4FE8] text-white flex items-center justify-center shadow-md">
                    📷
                  </div>
                  <div className="w-6 h-6 rounded-lg bg-white border border-[#E0DAF5] flex items-center justify-center text-xs">
                    ⚡
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Footer */}
        <p className="text-xs text-[#71717A] text-center mt-8 flex items-center justify-center gap-1.5 font-normal">
          <span>🛡</span> Built with YouCam Skin AI &bull; No signup required
        </p>
      </main>
    </div>
  );
}
