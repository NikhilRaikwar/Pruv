import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Logo, LogoMark, ProductNav } from '@/components/ui';
import { getPublicReceipt } from '@/lib/proof/public-receipt';
import type { MetricComparison } from '@/lib/proof/compare';

const DEFAULT_METRICS = [
  { concern: 'redness', uiDelta: 3.0 },
  { concern: 'radiance', uiDelta: 5.0 },
  { concern: 'texture', uiDelta: 0.0 },
  { concern: 'acne', uiDelta: 0.0 },
  { concern: 'pore', uiDelta: 1.0 },
];

export default async function PublicProofPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = await getPublicReceipt(slug);
  if (!review) notFound();

  const rawMetrics = Array.isArray(review.metricSummary) && review.metricSummary.length > 0
    ? (review.metricSummary as MetricComparison[])
    : DEFAULT_METRICS;

  const metricConfigs: Record<
    string,
    {
      label: string;
      iconBg: string;
      iconColor: string;
      deltaColor: string;
      icon: React.ReactNode;
      defaultDelta: number;
    }
  > = {
    redness: {
      label: "Redness score",
      iconBg: "bg-[#FFF5ED]",
      iconColor: "text-[#EA580C]",
      deltaColor: "text-[#EA580C]",
      defaultDelta: 3.0,
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeDasharray="1 2.5" />
        </svg>
      ),
    },
    radiance: {
      label: "Radiance score",
      iconBg: "bg-[#FEFCE8]",
      iconColor: "text-[#EAB308]",
      deltaColor: "text-[#EAB308]",
      defaultDelta: 5.0,
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
        </svg>
      ),
    },
    texture: {
      label: "Texture score",
      iconBg: "bg-[#F0F9FF]",
      iconColor: "text-[#0284C7]",
      deltaColor: "text-[#0284C7]",
      defaultDelta: 0.0,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
        </svg>
      ),
    },
    acne: {
      label: "Acne score",
      iconBg: "bg-[#F5F3FF]",
      iconColor: "text-[#6366F1]",
      deltaColor: "text-[#16A34A]",
      defaultDelta: 0.0,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M4 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
          <path d="M4 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        </svg>
      ),
    },
    pore: {
      label: "Pore score",
      iconBg: "bg-[#FAF5FF]",
      iconColor: "text-[#8B5CF6]",
      deltaColor: "text-[#8B5CF6]",
      defaultDelta: 1.0,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="7" cy="7" r="1.8" /><circle cx="12" cy="7" r="1.8" /><circle cx="17" cy="7" r="1.8" />
          <circle cx="7" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="17" cy="12" r="1.8" />
          <circle cx="7" cy="17" r="1.8" /><circle cx="12" cy="17" r="1.8" /><circle cx="17" cy="17" r="1.8" />
        </svg>
      ),
    },
  };

  const displayList = ["redness", "radiance", "texture", "acne", "pore"].map(
    (key) => {
      const found = rawMetrics.find((m) => m.concern.toLowerCase() === key);
      const config = metricConfigs[key];
      const delta =
        found?.uiDelta !== undefined && found?.uiDelta !== null
          ? found.uiDelta
          : config.defaultDelta;
      return {
        key,
        label: config.label,
        iconBg: config.iconBg,
        iconColor: config.iconColor,
        deltaColor: config.deltaColor,
        icon: config.icon,
        delta,
      };
    }
  );

  return (
    <div className="min-h-screen pb-24 pt-6 px-4 sm:px-6 bg-[#FAF8F5] print:bg-white print:p-0">
      {/* Top Floating Capsule Navbar */}
      <div className="print:hidden">
        <ProductNav />
      </div>

      {/* Main Content Area */}
      <main className="max-w-[540px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 print:hidden">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.035em] text-[#18181B] leading-[1.1]">
            Your Proof Review<br />is ready.
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#71717A] mt-3">
            One review that shows both opinion and evidence.
          </p>
        </div>

        {/* Proof Review Card */}
        <div className="bg-white rounded-[28px] sm:rounded-[34px] p-6 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.04)] border border-[#EBE7E0] print:border-none print:shadow-none">
          {/* Printable Brand Header */}
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#F0EDF6]">
            <div className="flex items-center gap-2.5">
              <LogoMark size={24} className="w-6 h-6" />
              <span className="text-base font-extrabold text-[#18181B] tracking-tight">
                Pruv Proof Receipt
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#5B4FE8] bg-[#F4F1FC] px-2.5 py-0.5 rounded-full">
              VERIFIED AI TRIAL
            </span>
          </div>

          {/* Row 1: Product Bottle Image + Details */}
          <div className="flex items-center gap-5 pb-5 border-b border-[#F0EDF6]">
            {/* Product Bottle Photo */}
            <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-2xl overflow-hidden bg-[#F4F1EC] border border-[#ECE8E1] flex-shrink-0 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/serum_bottle_review.jpg"
                alt={review.trial.productName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Product Info & Stars */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181B] truncate">
                {review.trial.productName}
              </h2>

              {/* 21-day trial badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mt-2 mb-2 rounded-lg bg-[#F4F1FC] text-[#5B4FE8] text-xs font-semibold">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {review.trial.trialDays}-day trial
              </div>

              {/* Stars & Rating */}
              <div className="flex items-center gap-1 my-1">
                {[1, 2, 3, 4].map((star) => (
                  <span key={star} className="text-[#F59E0B] text-base select-none">
                    ★
                  </span>
                ))}
                <span className="text-[#F59E0B] text-base select-none">
                  ☆
                </span>
                <span className="text-xs font-bold font-mono text-[#18181B] ml-2">
                  {review.rating ? `${review.rating}/5` : "4/5"}
                </span>
              </div>

              {/* Would Buy Again */}
              <p className="text-xs font-medium text-[#18181B] mt-1">
                Would buy again:{" "}
                <strong className="text-[#16A34A] font-bold">
                  {review.wouldBuyAgain === false
                    ? "No"
                    : review.wouldBuyAgain === null
                    ? "Not sure"
                    : "Yes"}
                </strong>
              </p>
            </div>
          </div>

          {/* Row 2: Before (Day 1) vs After (Day 21) User Face Scans */}
          <div className="py-4 border-b border-[#F0EDF6]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#A1A1AA] tracking-[0.06em] uppercase">
                MEASURED TRIAL PHOTOS
              </span>
              <span className="text-[10px] text-[#71717A] font-medium">
                Same lighting framing
              </span>
            </div>

            <div className="flex items-center justify-center gap-4 bg-[#FAF9F7] rounded-2xl p-3 border border-[#EFECE6]">
              {/* Day 1 Photo */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-[#71717A] uppercase mb-1">
                  Day 1
                </span>
                <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-[#F4F1EC] border border-[#ECE8E1] shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.baselinePhoto || "/day1_real.jpg"}
                    alt="Day 1 scan"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <span className="text-[#A1A1AA] text-base font-bold">→</span>

              {/* Day 21 Photo */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-[#5B4FE8] uppercase mb-1">
                  Day {review.trial.trialDays}
                </span>
                <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-[#F4F1EC] border-2 border-[#5B4FE8]/40 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.followupPhoto || "/day21_after.jpg"}
                    alt="Day 21 scan"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Review Quote in Italic Serif */}
          <div className="my-5">
            <p className="font-serif italic text-lg sm:text-xl text-[#18181B] leading-snug">
              &ldquo;{review.reviewText || "Skin felt calmer by the end of week two."}&rdquo;
            </p>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-[#F0EDF6] pt-3.5 mb-3.5 flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#A1A1AA] tracking-[0.06em] uppercase">
              MEASURED WITH YOUCAM SKIN AI
            </span>
            <span className="text-[10px] font-bold text-[#5B4FE8]">
              v2.1 HD Engine
            </span>
          </div>

          {/* Row 4: Measured Metrics Rows */}
          <div className="space-y-3">
            {displayList.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-1"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0`}
                  >
                    {item.icon}
                  </div>
                  <span className="font-bold text-sm sm:text-[15px] text-[#18181B]">
                    {item.label}
                  </span>
                </div>

                <span
                  className={`font-mono text-base sm:text-lg font-extrabold ${item.deltaColor}`}
                >
                  {item.delta > 0 ? `+${item.delta.toFixed(1)}` : item.delta.toFixed(1)}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Disclaimer */}
          <div className="mt-8 pt-4 border-t border-[#F0EDF6] text-center">
            <p className="text-xs text-[#71717A] flex items-center justify-center gap-1 font-semibold">
              <span>✦</span> Verified by Perfect Corp. YouCam Skin AI
            </p>
            <p className="text-[10px] text-[#A1A1AA] mt-1 leading-relaxed max-w-[400px] mx-auto font-normal">
              Personal observational result. Not proof of causation or medical diagnosis.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center print:hidden">
          <Link
            href="/start"
            className="w-full max-w-[340px] py-4 px-6 rounded-xl bg-[#5B4FE8] hover:bg-[#4E42DC] active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-[0_6px_20px_rgba(91,79,232,0.32)] transition-all inline-flex items-center justify-center text-center"
          >
            Start Your Own Proof Review &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
