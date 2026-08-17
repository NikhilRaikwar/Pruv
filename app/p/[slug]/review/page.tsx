"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Reveal, Logo } from "@/components/ui";

const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Great",
  5: "Excellent",
};

export default function ReviewPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const [rating, setRating] = useState<number>(4);
  const [wouldBuyAgain, setWouldBuyAgain] = useState<boolean | null>(true);
  const [reviewText, setReviewText] = useState<string>("Skin felt calmer by the end of week two.");
  const [observationalConsent, setObservationalConsent] = useState<boolean>(true);
  const [largestChange, setLargestChange] = useState<{ concern: string; delta: number }>({
    concern: "Redness",
    delta: 8.6,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load trial & comparison metrics if available
  useEffect(() => {
    async function loadMetrics() {
      try {
        const response = await fetch("/api/proof-receipts");
        const data = await response.json();
        if (response.ok && data.receipt?.metric_summary) {
          const metrics = data.receipt.metric_summary as Array<{
            concern: string;
            uiDelta?: number | null;
          }>;
          if (metrics && metrics.length > 0) {
            // Find max absolute delta
            const sorted = [...metrics].sort(
              (a, b) => Math.abs(b.uiDelta ?? 0) - Math.abs(a.uiDelta ?? 0)
            );
            if (sorted[0] && sorted[0].uiDelta !== undefined && sorted[0].uiDelta !== null) {
              setLargestChange({
                concern: sorted[0].concern.charAt(0).toUpperCase() + sorted[0].concern.slice(1),
                delta: sorted[0].uiDelta,
              });
            }
          }
        }
      } catch (err) {
        console.warn("Could not load receipt metrics:", err);
      }
    }

    loadMetrics();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!observationalConsent) {
      setError("Please confirm the observational review acknowledgment.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          wouldBuyAgain,
          reviewText: reviewText.trim(),
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.error ?? "Could not save review");
        return;
      }

      router.push(data.next);
    } catch {
      setLoading(false);
      setError("An unexpected error occurred while saving your review.");
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
            <Link href="/demo" className="hover:text-[#18181B] transition-colors">
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

      {/* Main Content Area */}
      <main className="max-w-[560px] mx-auto">
        {/* Title */}
        <Reveal className="text-center mb-8 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.035em] text-[#18181B]">
            Now add your experience.
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#71717A] mt-3">
            Turn your measured trial into a real product review.
          </p>
        </Reveal>

        {/* Form Card */}
        <Reveal delay={0.05}>
          <div className="bg-white rounded-[28px] sm:rounded-[34px] p-6 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.04)] border border-[#EBE7E0]">
            {/* Top Product Summary Row */}
            <div className="flex items-center gap-5 pb-6 border-b border-[#F0EDF6]">
              {/* Product Photo */}
              <div className="relative w-24 h-28 sm:w-26 sm:h-30 rounded-2xl overflow-hidden bg-[#F4F1EC] border border-[#ECE8E1] flex-shrink-0 shadow-inner">
                <Image
                  src="/serum_bottle_review.jpg"
                  alt="Niacinamide 10% Serum"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181B] truncate">
                  Niacinamide 10% Serum
                </h2>

                {/* 21-day trial completed badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mt-2 mb-3 rounded-lg bg-[#F4F1FC] text-[#5B4FE8] text-xs font-semibold">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="16 9 10 15 7 12" />
                  </svg>
                  21-day trial completed
                </div>

                {/* Divider */}
                <div className="w-full border-t border-[#F0EDF6] mb-3" />

                {/* Trend item */}
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#F5F2FF] text-[#5B4FE8] flex items-center justify-center flex-shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                  </div>
                  <p className="text-xs text-[#71717A]">
                    Largest observed change:{" "}
                    <strong className="text-[#18181B] font-bold">{largestChange.concern} </strong>
                    <span className="text-[#EA580C] font-extrabold font-mono">
                      {largestChange.delta > 0 ? `+${largestChange.delta.toFixed(1)}` : largestChange.delta.toFixed(1)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 pt-6">
              {/* Question 1: Rating */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-6 h-6 rounded-full bg-[#5B4FE8] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </div>
                  <h3 className="text-base font-bold text-[#18181B]">
                    How would you rate it?
                  </h3>
                </div>

                <div className="flex flex-col items-center justify-center py-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none transition-transform hover:scale-115 cursor-pointer"
                      >
                        {star <= rating ? (
                          <span className="text-4xl sm:text-5xl text-[#F59E0B] select-none">
                            ★
                          </span>
                        ) : (
                          <span className="text-4xl sm:text-5xl text-[#D4D4D8] select-none">
                            ☆
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs font-semibold text-[#71717A] mt-2">
                    {RATING_LABELS[rating] ?? "Great"}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full border-t border-[#F0EDF6]" />

              {/* Question 2: Would Buy Again */}
              <div>
                <div className="flex items-center gap-2.5 mb-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#5B4FE8] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </div>
                  <h3 className="text-base font-bold text-[#18181B]">
                    Would you buy it again?
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: true, label: "Yes" },
                    { value: false, label: "No" },
                    { value: null, label: "Not sure" },
                  ].map((option) => {
                    const isSelected = wouldBuyAgain === option.value;
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => setWouldBuyAgain(option.value)}
                        className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isSelected
                            ? "border-[#5B4FE8] bg-[#F4F1FC] text-[#5B4FE8] shadow-sm"
                            : "border-[#EBE7E0] bg-white text-[#18181B] hover:bg-[#FAF9F6]"
                        }`}
                      >
                        {isSelected && option.value === true && (
                          <div className="w-4 h-4 rounded-full bg-[#5B4FE8] text-white text-[9px] font-bold flex items-center justify-center">
                            ✓
                          </div>
                        )}
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="w-full border-t border-[#F0EDF6]" />

              {/* Question 3: Review Textarea */}
              <div>
                <div className="flex items-center gap-2.5 mb-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#5B4FE8] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </div>
                  <h3 className="text-base font-bold text-[#18181B]">
                    What was it actually like to use?
                  </h3>
                </div>

                <div className="relative">
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value.slice(0, 500))}
                    placeholder="Describe your texture feel, daily experience, and any visible skin changes..."
                    rows={4}
                    className="w-full rounded-2xl border border-[#E8E8E8] bg-white p-4 text-sm text-[#18181B] focus:border-[#5B4FE8] focus:outline-none transition-all placeholder:text-[#A1A1AA] shadow-sm"
                  />
                  <div className="text-right text-xs font-mono text-[#71717A] mt-1 pr-1">
                    {reviewText.length} / 500
                  </div>
                </div>
              </div>

              {/* Observational Consent Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-3 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    checked={observationalConsent}
                    onChange={(e) => setObservationalConsent(e.target.checked)}
                    className="w-4.5 h-4.5 mt-0.5 rounded border-[#D4D4D8] text-[#5B4FE8] focus:ring-[#5B4FE8] cursor-pointer"
                  />
                  <p className="text-xs text-[#71717A] leading-relaxed group-hover:text-[#18181B] transition-colors">
                    This is a personal observational review.
                    <br />
                    It reflects my own experience during the measured trial.
                  </p>
                </label>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                  {error}
                </div>
              )}

              {/* Submit CTA Button */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-[#5B4FE8] hover:bg-[#4E42DC] active:scale-[0.98] disabled:opacity-50 text-white font-bold text-sm sm:text-base shadow-[0_6px_20px_rgba(91,79,232,0.32)] transition-all flex items-center justify-center gap-1.5 text-center cursor-pointer"
                >
                  {loading ? "Creating Proof Review..." : "Create My Proof Review ✦"}
                </button>

                <p className="text-xs text-[#71717A] mt-3 font-normal">
                  You can&apos;t edit your review after it&apos;s created.
                </p>
              </div>
            </form>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
