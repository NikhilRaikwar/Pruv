"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Reveal, Logo } from "@/components/ui";

export default function ConsentPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function continueToCamera() {
    if (!consent || loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/proofs/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trialSlug: params.slug, consent }),
      });
      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.error ?? "Could not start proof");
        return;
      }

      router.push(data.next);
    } catch {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="min-h-screen pb-24 pt-6 px-4 sm:px-6 bg-[#FAF8F5]">
      {/* Top Floating Capsule Navbar */}
      <header className="max-w-[580px] mx-auto mb-12 sm:mb-16">
        <div className="bg-white/95 backdrop-blur-md border border-[#E9E4DC] shadow-[0_4px_24px_rgba(0,0,0,0.05)] rounded-full px-5 py-2.5 flex items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>

          <nav className="flex items-center gap-6 text-[13.5px] font-medium text-[#52525B]">
            <Link href="/#how" className="hover:text-[#18181B] transition-colors">
              How it works
            </Link>
            <Link href="/#demo" className="hover:text-[#18181B] transition-colors">
              Demo
            </Link>
          </nav>

          <Link
            href="/start"
            className="bg-[#5B4FE8] hover:bg-[#4E42DC] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(91,79,232,0.28)] transition-all"
          >
            Start a Proof Review
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[620px] mx-auto">
        {/* Heading */}
        <Reveal className="text-center mb-8 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.035em] text-[#18181B]">
            Before we scan.
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#71717A] mt-3">
            A quick consent step before your first baseline.
          </p>
        </Reveal>

        {/* Consent Card */}
        <Reveal delay={0.05}>
          <div className="bg-white rounded-[28px] sm:rounded-[34px] p-7 sm:p-10 shadow-[0_12px_45px_rgba(0,0,0,0.04)] border border-[#EBE7E0]">
            {/* Visual Illustration Header */}
            <div className="relative py-4 sm:py-6 flex items-center justify-center">
              {/* Decorative Sparkles */}
              <span className="absolute left-10 top-2 text-[#C4B5FD] text-lg select-none">✦</span>
              <span className="absolute right-10 top-2 text-[#BAE6FD] text-lg select-none">✦</span>
              <span className="absolute left-14 bottom-2 text-[#DDD6FE] text-base select-none">✦</span>
              <span className="absolute right-14 bottom-2 text-[#BAE6FD] text-base select-none">✦</span>

              <div className="flex items-center justify-center gap-2 sm:gap-4 w-full max-w-[420px]">
                {/* Left: Shield Bubble */}
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#F5F2FF] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#EDE8FC]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11.5 14.5 16 9.5" />
                  </svg>
                </div>

                {/* Left Connector */}
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-[#CBD5E1] tracking-widest text-xs font-mono select-none">
                    ······
                  </span>
                </div>

                {/* Center: Face Line Art */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="96"
                    height="96"
                    viewBox="0 0 100 100"
                    fill="none"
                    className="w-full h-full text-[#374151]"
                  >
                    {/* Hair Bun */}
                    <circle cx="50" cy="20" r="9" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M44 26c2-2 10-2 12 0" stroke="currentColor" strokeWidth="1.4" />
                    
                    {/* Hair Contour */}
                    <path
                      d="M28 48c0-18 10-26 22-26s22 8 22 26"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    
                    {/* Face Shape */}
                    <path
                      d="M32 45v10c0 12 8 22 18 22s18-10 18-22V45"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />

                    {/* Ears */}
                    <path d="M32 50c-2.5 0-4 2-4 5s1.5 5 4 5" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M68 50c2.5 0 4 2 4 5s-1.5 5-4 5" stroke="currentColor" strokeWidth="1.4" />

                    {/* Hair Parting / Bangs */}
                    <path
                      d="M32 42c6 6 12 8 18 3 6 5 12 3 18-3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />

                    {/* Eyebrows */}
                    <path d="M39 52c2-2 5-2 7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M54 52c2-2 5-2 7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Closed Serene Eyes */}
                    <path d="M39 58c2 2 5 2 7 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M54 58c2 2 5 2 7 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />

                    {/* Nose tip */}
                    <path d="M49 63c0 2 2 3 2 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />

                    {/* Gentle Smile */}
                    <path d="M45 70c2 2 8 2 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Neck */}
                    <path d="M44 77v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M56 77v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Right Connector */}
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-[#CBD5E1] tracking-widest text-xs font-mono select-none">
                    ······
                  </span>
                </div>

                {/* Right: Scan Bubble */}
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#F0F9FF] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#E0F2FE]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M4 16v3a1 1 0 0 0 1 1h3M16 20h3a1 1 0 0 0 1-1v-3" />
                    <circle cx="9" cy="10" r="0.75" fill="currentColor" />
                    <circle cx="15" cy="10" r="0.75" fill="currentColor" />
                    <path d="M9.5 14.5c.8.8 2.2.8 3 0" />
                    <path d="M12 10.5v1.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Information Blocks */}
            <div className="mt-6 text-center space-y-5">
              <p className="text-[15px] sm:text-base text-[#18181B] leading-relaxed max-w-[460px] mx-auto font-medium">
                Your face image will be processed by Perfect Corp. through{" "}
                <strong className="text-[#5B4FE8] font-bold">YouCam Skin AI</strong> for skin analysis.
              </p>

              <div className="w-full border-b border-[#F0EDF6]" />

              <p className="text-[13.5px] sm:text-[14px] text-[#52525B] leading-relaxed max-w-[460px] mx-auto">
                Pruv stores the structured measurement results needed for your trial. Pruv does not permanently store your raw camera capture in its database.
              </p>

              <div className="w-full border-b border-[#F0EDF6]" />
            </div>

            {/* Consent Checkbox */}
            <div className="mt-7 flex flex-col items-center">
              <label className="inline-flex items-center gap-3 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-5 h-5 rounded-md border-[#D4D4D8] text-[#5B4FE8] focus:ring-[#5B4FE8] focus:ring-offset-1 cursor-pointer transition-all"
                />
                <span className="text-sm font-semibold text-[#18181B] group-hover:text-[#5B4FE8] transition-colors">
                  I consent to continue.
                </span>
              </label>

              {error && (
                <p className="mt-3 text-xs font-semibold text-red-600">
                  {error}
                </p>
              )}

              {/* Continue to Camera Button */}
              <button
                type="button"
                disabled={!consent || loading}
                onClick={continueToCamera}
                className="w-full max-w-[340px] mt-6 py-3.5 px-6 rounded-xl bg-[#5B4FE8] hover:bg-[#4E42DC] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#5B4FE8] text-white font-bold text-sm sm:text-base shadow-[0_6px_20px_rgba(91,79,232,0.32)] transition-all flex items-center justify-center text-center cursor-pointer"
              >
                {loading ? "Preparing camera..." : "Continue to Camera"}
              </button>

              <p className="text-xs text-[#71717A] mt-3 font-normal">
                No signup required.
              </p>
            </div>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
