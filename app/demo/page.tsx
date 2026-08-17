"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/ui";

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
    <div className="min-h-screen bg-[#FAF8F5] text-[#18181B] flex flex-col justify-between font-sans antialiased">
      <div>
        {/* Top Navbar */}
        <header className="border-b border-[#ECE7DE] bg-white/70 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Logo />
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-[13.5px] font-medium text-[#52525B]">
              <Link href="/how" className="hover:text-[#18181B] transition-colors">
                How it works
              </Link>
              <Link href="/demo" className="text-[#5B4FE8] font-bold">
                Demo
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/start"
                className="bg-[#5B4FE8] hover:bg-[#4E42DC] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(91,79,232,0.25)] transition-all"
              >
                Start Review
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-[1040px] mx-auto px-4 sm:px-6 pt-12 pb-20">
          {/* Header Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.035em] text-[#18181B]">
              Try Pruv Demo
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-[#71717A] mt-3">
              Experience a complete Proof Review in under 60 seconds.
            </p>
          </div>

          <div className="space-y-6 mb-10">
            {/* Card 1: See a Finished Proof Review */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE7DE] shadow-[0_4px_24px_rgba(0,0,0,0.02)] grid grid-cols-1 md:grid-cols-[1fr_360px] gap-8 items-center">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F5F2FF] text-[#5B4FE8] flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-[#18181B] tracking-tight mb-2">
                  See a Finished Proof Review
                </h2>
                <p className="text-sm text-[#71717A] mb-6 leading-relaxed max-w-[340px]">
                  Explore a real demo trial with baseline and follow-up results captured earlier.
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

              {/* Mini Preview Receipt Card */}
              <div className="bg-[#FAF9F7] rounded-2xl p-5 border border-[#ECE8E1] shadow-xs text-xs">
                <div className="flex items-center gap-3 pb-3 border-b border-[#ECE8E1]">
                  <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-white border border-[#E5E0D8] flex-shrink-0">
                    <Image src="/serum_bottle_review.jpg" alt="Serum" fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#18181B] text-xs">Niacinamide 10% Serum</h3>
                    <p className="text-[10.5px] text-[#71717A]">21-day trial • Demo</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[#F59E0B] text-xs">★★★★★</span>
                      <span className="font-mono text-[10px] font-bold text-[#18181B]">4.5/5</span>
                    </div>
                  </div>
                </div>

                <p className="font-serif italic text-[11.5px] text-[#18181B] my-3 leading-relaxed">
                  &ldquo;Skin felt calmer by the end of week two.&rdquo;
                </p>

                <div className="pt-2 border-t border-[#ECE8E1]">
                  <span className="text-[9px] font-bold text-[#A1A1AA] uppercase tracking-wider block mb-2">
                    MEASURED CHANGE (YouCam Skin AI)
                  </span>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#18181B] flex items-center gap-1">
                        <span className="text-[#EA580C]">🟠</span> Redness score
                      </span>
                      <span className="font-mono text-[#71717A]">71.2 &rarr; 79.8</span>
                      <span className="font-mono font-bold text-[#EA580C]">+8.6</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#18181B] flex items-center gap-1">
                        <span className="text-[#EAB308]">🟡</span> Radiance score
                      </span>
                      <span className="font-mono text-[#71717A]">68.7 &rarr; 72.0</span>
                      <span className="font-mono font-bold text-[#EAB308]">+3.3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#18181B] flex items-center gap-1">
                        <span className="text-[#0284C7]">🔴</span> Texture score
                      </span>
                      <span className="font-mono text-[#71717A]">67.4 &rarr; 68.1</span>
                      <span className="font-mono font-bold text-[#0284C7]">+0.7</span>
                    </div>
                  </div>

                  <p className="text-[9.5px] text-[#A1A1AA] text-center mt-3">
                    🪄 Measured with YouCam Skin AI 🪄
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Try a Live Skin Scan */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE7DE] shadow-[0_4px_24px_rgba(0,0,0,0.02)] grid grid-cols-1 md:grid-cols-[1fr_360px] gap-8 items-center">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F5F2FF] text-[#5B4FE8] flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-[#18181B] tracking-tight mb-2">
                  Try a Live Skin Scan
                </h2>
                <p className="text-sm text-[#71717A] mb-6 leading-relaxed max-w-[340px]">
                  Run a real YouCam Skin AI scan on yourself in real-time.
                </p>

                <Link
                  href="/start"
                  className="inline-flex items-center justify-center py-3.5 px-6 rounded-2xl bg-white hover:bg-[#FAF9F7] active:scale-[0.98] text-[#18181B] border border-[#ECE7DE] font-bold text-sm shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all cursor-pointer"
                >
                  Start Live Scan
                </Link>
              </div>

              {/* Camera Frame Viewfinder Mockup */}
              <div className="bg-[#F7F4FF] rounded-3xl p-6 sm:p-7 border border-[#E9E4FC] flex flex-col items-center justify-center text-center shadow-xs">
                <div className="w-44 h-48 sm:w-48 sm:h-52 border-2 border-dashed border-[#C4B7FA] rounded-[32px] flex flex-col items-center justify-center relative mb-4 bg-white/40">
                  {/* Oval Face Guide */}
                  <div className="w-24 h-32 sm:w-28 sm:h-36 border-[2.5px] border-[#5B4FE8] rounded-[50%/60%] flex items-center justify-center shadow-xs">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#5B4FE8]" />
                  </div>
                </div>

                <p className="text-xs text-[#52525B] max-w-[240px] leading-relaxed mb-4 font-medium">
                  Position your face in the frame and we&apos;ll handle the rest.
                </p>

                {/* 3 Action Buttons */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white text-base flex items-center justify-center shadow-xs border border-[#ECE7DE] text-[#52525B]">
                    🖼️
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#5B4FE8] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(91,79,232,0.35)]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-white text-base flex items-center justify-center shadow-xs border border-[#ECE7DE] text-[#EA580C]">
                    ⚡
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Highlight Strip (Purple Tinted Box) */}
          <div className="mb-8 bg-[#F6F2FF] rounded-3xl p-6 sm:p-7 border border-[#E6DEFC] shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Item 1 */}
              <div className="flex flex-col items-start">
                <div className="w-9 h-9 rounded-xl bg-white text-[#5B4FE8] shadow-xs flex items-center justify-center mb-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
                    <line x1="9" y1="22" x2="15" y2="22" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-[#5B4FE8] mb-0.5">
                  YouCam Skin AI v2.1
                </h3>
                <p className="text-[11.5px] text-[#6B7280]">
                  Industry-leading analysis
                </p>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-start">
                <div className="w-9 h-9 rounded-xl bg-white text-[#5B4FE8] shadow-xs flex items-center justify-center mb-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-[#5B4FE8] mb-0.5">
                  No Signup
                </h3>
                <p className="text-[11.5px] text-[#6B7280]">
                  100% anonymous
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-start">
                <div className="w-9 h-9 rounded-xl bg-white text-[#5B4FE8] shadow-xs flex items-center justify-center mb-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-[#5B4FE8] mb-0.5">
                  Privacy First
                </h3>
                <p className="text-[11.5px] text-[#6B7280]">
                  Your data, your control
                </p>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col items-start">
                <div className="w-9 h-9 rounded-xl bg-white text-[#5B4FE8] shadow-xs flex items-center justify-center mb-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-[#5B4FE8] mb-0.5">
                  Real Results
                </h3>
                <p className="text-[11.5px] text-[#6B7280]">
                  Measured, not guessed
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Tagline */}
          <div className="text-center text-xs text-[#71717A] font-medium flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full border border-[#71717A] inline-block" />
            Built with YouCam Skin AI • No signup required
          </div>
        </main>
      </div>

      {/* Standard Bottom Footer */}
      <footer className="border-t border-[#ECE7DE] bg-[#FAF8F5] py-8">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-6 text-[13px] font-medium text-[#71717A]">
            <Link href="/how" className="hover:text-[#18181B] transition-colors">How it works</Link>
            <Link href="/demo" className="text-[#18181B] font-bold">Demo</Link>
            <Link href="/privacy" className="hover:text-[#18181B] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#18181B] transition-colors">Terms</Link>
            <Link href="https://github.com/NikhilRaikwar/Pruv" target="_blank" rel="noopener noreferrer" className="hover:text-[#18181B] inline-flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
