"use client";

import Link from "next/link";
import Image from "next/image";
import { Reveal, ProductNav } from "@/components/ui";

export default function StartTrialPage() {
  const concerns = [
    {
      id: "redness",
      label: "Redness",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeDasharray="1 3" />
        </svg>
      ),
    },
    {
      id: "acne",
      label: "Acne",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="7" r="1.8" />
          <circle cx="7" cy="12" r="1.8" />
          <circle cx="17" cy="12" r="1.8" />
          <circle cx="12" cy="17" r="1.8" />
          <circle cx="8.5" cy="8.5" r="1.2" opacity="0.6" />
          <circle cx="15.5" cy="8.5" r="1.2" opacity="0.6" />
          <circle cx="8.5" cy="15.5" r="1.2" opacity="0.6" />
          <circle cx="15.5" cy="15.5" r="1.2" opacity="0.6" />
        </svg>
      ),
    },
    {
      id: "texture",
      label: "Texture",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M4 8c2.5-2 5.5-2 8 0s5.5 2 8 0" />
          <path d="M4 12c2.5-2 5.5-2 8 0s5.5 2 8 0" />
          <path d="M4 16c2.5-2 5.5-2 8 0s5.5 2 8 0" />
        </svg>
      ),
    },
    {
      id: "pores",
      label: "Pores",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="12" cy="8" r="1.5" />
          <circle cx="16" cy="8" r="1.5" />
          <circle cx="8" cy="12" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="16" cy="12" r="1.5" />
          <circle cx="8" cy="16" r="1.5" />
          <circle cx="12" cy="16" r="1.5" />
          <circle cx="16" cy="16" r="1.5" />
        </svg>
      ),
    },
    {
      id: "radiance",
      label: "Radiance",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen pb-24 pt-6 px-4 sm:px-6 bg-[#FAF8F5]">
      {/* Top Floating Capsule Navbar */}
      <ProductNav />

      {/* Main Content Area */}
      <main className="max-w-[700px] mx-auto">
        {/* Headline */}
        <Reveal className="text-center mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.035em] text-[#18181B]">
            What are you testing?
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#71717A] mt-3">
            Start with one product and one clear trial.
          </p>
        </Reveal>

        {/* Product & Concerns Card */}
        <Reveal delay={0.05}>
          <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#EBE7E0] grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-6 sm:gap-8 items-stretch">
            {/* Left Column: Product Image */}
            <div className="relative w-full aspect-[4/5] sm:h-[410px] rounded-2xl overflow-hidden bg-[#F4F1EC] border border-[#ECE8E1] shadow-inner">
              <Image
                src="/serum_bottle_review.jpg"
                alt="Niacinamide 10% Serum"
                fill
                priority
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Right Column: Info & Concerns */}
            <div className="flex flex-col justify-between py-1 sm:py-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#18181B]">
                  Niacinamide 10% Serum
                </h2>
                
                {/* Demo Product & 21-Day Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mt-2.5 rounded-lg bg-[#F4F1FC] text-[#5B4FE8] text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B4FE8]" />
                  Demo product &middot; 21-day trial
                </div>

                <p className="text-xs text-[#71717A] mt-3 leading-relaxed">
                  For this hackathon demo, Pruv starts with one sample skincare product so you can experience the full flow instantly.
                </p>

                <div className="mt-5 mb-2.5">
                  <span className="text-xs font-semibold text-[#71717A]">
                    Target concerns
                  </span>
                </div>

                {/* Target concerns list */}
                <div className="flex flex-col gap-2">
                  {concerns.map((concern) => (
                    <div
                      key={concern.id}
                      className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl border border-[#F0EDF6] bg-white/60 hover:bg-[#FAF9FD] transition-all"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#F5F2FF] text-[#5B4FE8] flex items-center justify-center flex-shrink-0">
                        {concern.icon}
                      </div>
                      <span className="text-sm font-semibold text-[#18181B]">
                        {concern.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Product-Agnostic Engine Note */}
        <Reveal delay={0.08}>
          <div className="bg-[#FAF8FF] border border-[#E9E4FC] rounded-2xl p-4 sm:p-5 mt-6 mb-6 flex items-start gap-3.5 text-left shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-white text-[#5B4FE8] shadow-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
              ✦
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#18181B]">
                Pruv is product-agnostic.
              </h3>
              <p className="text-xs text-[#52525B] mt-1 leading-relaxed">
                The same baseline &rarr; follow-up &rarr; Proof Review workflow can be used for serums, moisturizers, acne treatments, sunscreens, and other skincare products.
              </p>
            </div>
          </div>
        </Reveal>

        {/* CTA Button Section */}
        <Reveal delay={0.1} className="mt-4 mb-10 text-center flex flex-col items-center">
          <p className="text-xs font-medium text-[#71717A] mb-3">
            No account required.
          </p>

          <Link
            href="/p/niacinamide21/start"
            className="w-full max-w-[280px] sm:max-w-[300px] py-3.5 px-6 rounded-xl bg-[#5B4FE8] hover:bg-[#4E42DC] active:scale-[0.98] text-white font-bold text-base shadow-[0_6px_20px_rgba(91,79,232,0.32)] transition-all flex items-center justify-center text-center"
          >
            Start Demo Trial
          </Link>

          <div className="mt-3.5 text-xs text-[#71717A] font-medium flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A1A1AA]" />
            Use my own product &mdash; Coming next
          </div>

          <div className="text-xs text-[#71717A] mt-2 flex items-center justify-center gap-1.5 font-normal">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#71717A]">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Takes under a minute to begin.
          </div>
        </Reveal>

        {/* How Pruv Works Card */}
        <Reveal delay={0.15}>
          <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#EBE7E0] text-center">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181B]">
              How Pruv works
            </h3>
            <p className="text-xs sm:text-sm text-[#71717A] mt-1 mb-8">
              Three simple steps to a proven result.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-2">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-6 h-6 rounded-full bg-[#5B4FE8] text-white text-xs font-bold flex items-center justify-center mb-3 shadow-sm">
                  1
                </div>
                
                <div className="w-14 h-14 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] mb-3 shadow-sm">
                  {/* Face scan icon */}
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M4 16v3a1 1 0 0 0 1 1h3M16 20h3a1 1 0 0 0 1-1v-3" />
                    <circle cx="9" cy="10" r="0.75" fill="currentColor" />
                    <circle cx="15" cy="10" r="0.75" fill="currentColor" />
                    <path d="M9.5 14.5c.8.8 2.2.8 3 0" />
                    <path d="M12 10.5v1.5" />
                  </svg>
                </div>

                <div className="font-bold text-sm text-[#18181B]">
                  Baseline scan
                </div>
                <p className="text-xs text-[#71717A] mt-1 max-w-[150px]">
                  Capture your starting point.
                </p>
              </div>

              {/* Dotted Arrow 1 */}
              <div className="hidden md:flex items-center text-[#CBD5E1] tracking-widest text-xs px-2 select-none">
                ··········&gt;
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-6 h-6 rounded-full bg-[#5B4FE8] text-white text-xs font-bold flex items-center justify-center mb-3 shadow-sm">
                  2
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] mb-3 shadow-sm">
                  {/* Serum dropper bottle icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 2h4M12 2v3M9 5h6v3H9z" />
                    <rect x="7" y="8" width="10" height="13" rx="2" />
                    <path d="M7 14h10" strokeDasharray="2 2" fill="#BAE6FD" fillOpacity="0.4" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                  </svg>
                </div>

                <div className="font-bold text-sm text-[#18181B]">
                  Use product
                </div>
                <p className="text-xs text-[#71717A] mt-1 max-w-[150px]">
                  Use it normally during the trial.
                </p>
              </div>

              {/* Dotted Arrow 2 */}
              <div className="hidden md:flex items-center text-[#CBD5E1] tracking-widest text-xs px-2 select-none">
                ··········&gt;
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-6 h-6 rounded-full bg-[#5B4FE8] text-white text-xs font-bold flex items-center justify-center mb-3 shadow-sm">
                  3
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] mb-3 relative shadow-sm">
                  {/* Face scan with check badge */}
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M4 16v3a1 1 0 0 0 1 1h3M16 20h3a1 1 0 0 0 1-1v-3" />
                    <circle cx="9" cy="10" r="0.75" fill="currentColor" />
                    <circle cx="15" cy="10" r="0.75" fill="currentColor" />
                    <path d="M9.5 14.5c.8.8 2.2.8 3 0" />
                    <path d="M12 10.5v1.5" />
                  </svg>
                  <div className="w-4 h-4 rounded-full bg-[#0284C7] text-white text-[9px] font-bold flex items-center justify-center absolute -bottom-1 -right-1 shadow-sm">
                    ✓
                  </div>
                </div>

                <div className="font-bold text-sm text-[#18181B]">
                  Review with proof
                </div>
                <p className="text-xs text-[#71717A] mt-1 max-w-[150px]">
                  See what changed with clear evidence.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
