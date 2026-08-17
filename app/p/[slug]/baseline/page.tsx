import Link from 'next/link';
import { requireParticipant } from '@/lib/participant/current';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { Reveal, ProductNav } from '@/components/ui';
import { FaceThumbnail } from '@/components/FaceThumbnail';

const DEFAULT_METRIC_SCORES = [
  { concern: 'redness', label: 'Redness', score: 71.2, barColor: 'bg-[#EA580C]', iconBg: 'bg-[#FFF5ED]', iconColor: 'text-[#EA580C]' },
  { concern: 'acne', label: 'Acne', score: 84.8, barColor: 'bg-[#6366F1]', iconBg: 'bg-[#F5F3FF]', iconColor: 'text-[#6366F1]' },
  { concern: 'texture', label: 'Texture', score: 67.4, barColor: 'bg-[#0284C7]', iconBg: 'bg-[#F0F9FF]', iconColor: 'text-[#0284C7]' },
  { concern: 'pore', label: 'Pores', score: 72.1, barColor: 'bg-[#8B5CF6]', iconBg: 'bg-[#FAF5FF]', iconColor: 'text-[#8B5CF6]' },
  { concern: 'radiance', label: 'Radiance', score: 69.7, barColor: 'bg-[#EAB308]', iconBg: 'bg-[#FEFCE8]', iconColor: 'text-[#EAB308]' },
];

export default async function BaselinePage() {
  const participant = await requireParticipant();
  const supabase = getSupabaseAdmin();

  const { data: scan } = await supabase
    .from('scans')
    .select('completed_at, scan_metrics (concern, raw_score, ui_score)')
    .eq('participant_trial_id', participant.id)
    .eq('scan_type', 'baseline')
    .eq('status', 'success')
    .single();

  const metrics = scan?.scan_metrics ?? [];
  const facePhoto = '/day1_real.jpg';

  const displayList = DEFAULT_METRIC_SCORES.map((def) => {
    const found = metrics.find((m) => m.concern.toLowerCase() === def.concern);
    const score = found?.ui_score ?? found?.raw_score ?? def.score;
    return {
      ...def,
      score,
    };
  });

  return (
    <div className="min-h-screen pb-24 pt-6 px-4 sm:px-6 bg-[#FAF8F5]">
      {/* Top Floating Capsule Navbar */}
      <ProductNav />

      {/* Main Content */}
      <main className="max-w-[560px] mx-auto">
        {/* Title */}
        <Reveal className="text-center mb-8 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.035em] text-[#18181B]">
            Your baseline is ready.
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#71717A] mt-3">
            This is your starting point for the trial.
          </p>
        </Reveal>

        {/* Baseline Card */}
        <Reveal delay={0.05}>
          <div className="bg-white rounded-[28px] sm:rounded-[34px] p-6 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.04)] border border-[#EBE7E0]">
            {/* Header */}
            <div className="flex items-start justify-between pb-6 border-b border-[#F0EDF6]">
              <div className="flex items-center gap-4">
                {/* Face Thumbnail with HUD brackets */}
                <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-[#F4F1EC] border border-[#ECE8E1] flex-shrink-0 shadow-inner">
                  <FaceThumbnail
                    storageKey="pruv_baseline_photo"
                    fallbackSrc={facePhoto}
                    alt="Baseline Face Scan"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 p-1.5 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-between">
                      <div className="w-2.5 h-2.5 border-t border-l border-white" />
                      <div className="w-2.5 h-2.5 border-t border-r border-white" />
                    </div>
                    <div className="flex justify-between">
                      <div className="w-2.5 h-2.5 border-b border-l border-white" />
                      <div className="w-2.5 h-2.5 border-b border-r border-white" />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#18181B]">
                    {participant.trial.product_name}
                  </h2>
                  <p className="text-xs text-[#71717A] mt-1.5 flex items-center gap-1.5">
                    <span>📅</span> Baseline scan
                  </p>
                </div>
              </div>

              <span className="rounded-lg bg-[#F4F1FC] px-3 py-1 text-xs font-bold text-[#5B4FE8]">
                Baseline &bull; Day 1
              </span>
            </div>

            {/* Metric Bars */}
            <div className="py-6 space-y-5">
              {displayList.map((item) => (
                <div key={item.concern} className="flex items-center justify-between gap-4">
                  {/* Icon + Label */}
                  <div className="flex items-center gap-3 w-28 flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0`}>
                      {item.concern === 'redness' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" strokeDasharray="1 2" />
                        </svg>
                      )}
                      {item.concern === 'acne' && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <circle cx="12" cy="12" r="2" fill="currentColor" />
                          <circle cx="6" cy="12" r="1.5" fill="currentColor" />
                          <circle cx="18" cy="12" r="1.5" fill="currentColor" />
                          <circle cx="12" cy="6" r="1.5" fill="currentColor" />
                          <circle cx="12" cy="18" r="1.5" fill="currentColor" />
                        </svg>
                      )}
                      {item.concern === 'texture' && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M4 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
                          <path d="M4 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
                          <path d="M4 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
                        </svg>
                      )}
                      {item.concern === 'pore' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="7" cy="7" r="1.8" /><circle cx="12" cy="7" r="1.8" /><circle cx="17" cy="7" r="1.8" />
                          <circle cx="7" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="17" cy="12" r="1.8" />
                          <circle cx="7" cy="17" r="1.8" /><circle cx="12" cy="17" r="1.8" /><circle cx="17" cy="17" r="1.8" />
                        </svg>
                      )}
                      {item.concern === 'radiance' && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
                        </svg>
                      )}
                    </div>
                    <span className="font-bold text-sm text-[#18181B] capitalize">
                      {item.label}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex-1 h-1.5 bg-[#F0EDF6] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.barColor} rounded-full transition-all duration-700`}
                      style={{ width: `${Math.min(Math.max(item.score, 0), 100)}%` }}
                    />
                  </div>

                  {/* Score */}
                  <span className="font-mono text-base font-extrabold text-[#18181B] w-12 text-right">
                    {item.score.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom notice */}
            <div className="pt-4 border-t border-[#F0EDF6] flex items-center justify-center gap-2 text-center text-xs text-[#71717A]">
              <span>ⓘ</span>
              <p>These measurements will be compared again at the end of your trial.</p>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.1} className="mt-8 text-center flex flex-col items-center">
          <Link
            href={`/p/${participant.trial.slug}/my-proof`}
            className="w-full max-w-[340px] py-4 px-6 rounded-xl bg-[#5B4FE8] hover:bg-[#4E42DC] active:scale-[0.98] text-white font-bold text-base shadow-[0_6px_20px_rgba(91,79,232,0.32)] transition-all flex items-center justify-center text-center cursor-pointer"
          >
            Start My Trial
          </Link>

          <p className="text-xs text-[#71717A] mt-3 font-normal">
            Follow-up scan due in 21 days.
          </p>
        </Reveal>
      </main>
    </div>
  );
}
