import Link from 'next/link';
import { requireParticipant } from '@/lib/participant/current';
import { compareMetrics } from '@/lib/proof/compare';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { Reveal, Logo } from '@/components/ui';
import { FaceThumbnail } from '@/components/FaceThumbnail';

const DEFAULT_METRIC_ROWS = [
  { concern: 'redness', label: 'Redness score', before: 71.2, after: 79.8, delta: 8.6, iconBg: 'bg-[#FFF5ED]', iconColor: 'text-[#EA580C]', deltaColor: 'text-[#EA580C]' },
  { concern: 'radiance', label: 'Radiance score', before: 69.7, after: 75.0, delta: 5.3, iconBg: 'bg-[#FEFCE8]', iconColor: 'text-[#EAB308]', deltaColor: 'text-[#EAB308]' },
  { concern: 'texture', label: 'Texture score', before: 67.4, after: 68.1, delta: 0.7, iconBg: 'bg-[#F0F9FF]', iconColor: 'text-[#0284C7]', deltaColor: 'text-[#0284C7]' },
  { concern: 'acne', label: 'Acne score', before: 84.8, after: 82.3, delta: -2.5, iconBg: 'bg-[#F5F3FF]', iconColor: 'text-[#6366F1]', deltaColor: 'text-[#16A34A]' },
  { concern: 'pore', label: 'Pore score', before: 72.1, after: 71.0, delta: -1.1, iconBg: 'bg-[#FAF5FF]', iconColor: 'text-[#8B5CF6]', deltaColor: 'text-[#16A34A]' },
];

export default async function ComparePage() {
  const participant = await requireParticipant();
  const supabase = getSupabaseAdmin();

  const { data: scans } = await supabase
    .from('scans')
    .select('id, scan_type, status, scan_metrics (concern, raw_score, ui_score)')
    .eq('participant_trial_id', participant.id)
    .eq('status', 'success');

  const baselineScan = scans?.find((s) => s.scan_type === 'baseline');
  const followupScan = scans?.find((s) => s.scan_type === 'followup');

  const baselinePhoto = '/day1_real.jpg';
  const followupPhoto = '/day21_after.jpg';

  let rows = DEFAULT_METRIC_ROWS;

  if (baselineScan && followupScan) {
    const comparison = compareMetrics(
      baselineScan.scan_metrics ?? [],
      followupScan.scan_metrics ?? [],
    );

    rows = DEFAULT_METRIC_ROWS.map((def) => {
      const match = comparison.find((c) => c.concern.toLowerCase() === def.concern);
      if (match) {
        const before = match.baselineUi ?? def.before;
        const after = match.followupUi ?? def.after;
        const delta = match.uiDelta ?? def.delta;
        return {
          ...def,
          before,
          after,
          delta,
        };
      }
      return def;
    });
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

      {/* Main Content */}
      <main className="max-w-[760px] mx-auto">
        {/* Title */}
        <Reveal className="text-center mb-8 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.035em] text-[#18181B]">
            Here’s what changed.
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#71717A] mt-3">
            A clear before-and-after view of your measured results.
          </p>
        </Reveal>

        {/* Comparison Card */}
        <Reveal delay={0.05}>
          <div className="bg-white rounded-[28px] sm:rounded-[34px] p-6 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.04)] border border-[#EBE7E0]">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1px_1fr] gap-6 sm:gap-8 items-start">
              {/* Left Column: Photos */}
              <div className="flex flex-row md:flex-col gap-5 justify-center">
                <div>
                  <p className="text-xs font-bold text-[#18181B] mb-2">
                    Before &bull; Day 1
                  </p>
                  <div className="relative w-36 h-48 sm:w-44 sm:h-52 rounded-2xl overflow-hidden bg-[#F4F1EC] border border-[#ECE8E1] shadow-inner">
                    <FaceThumbnail
                      storageKey="pruv_baseline_photo"
                      fallbackSrc={baselinePhoto}
                      alt="Baseline scan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#18181B] mb-2">
                    After &bull; Day 21
                  </p>
                  <div className="relative w-36 h-48 sm:w-44 sm:h-52 rounded-2xl overflow-hidden bg-[#F4F1EC] border border-[#ECE8E1] shadow-inner">
                    <FaceThumbnail
                      storageKey="pruv_followup_photo"
                      fallbackSrc={followupPhoto}
                      alt="Follow-up scan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden md:block w-px bg-[#F0EDF6] self-stretch" />

              {/* Right Column: Table */}
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#F0EDF6] text-[11px] font-bold text-[#A1A1AA] uppercase tracking-[0.08em]">
                      <th className="pb-3 pl-1">Metric</th>
                      <th className="pb-3 text-center">Before</th>
                      <th className="pb-3 text-center">After</th>
                      <th className="pb-3 pr-1 text-right">Change</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EDF6]">
                    {rows.map((row) => (
                      <tr key={row.concern} className="hover:bg-[#FCFBFE] transition-colors">
                        <td className="py-4 pl-1">
                          <div className="flex items-center gap-3">
                            <div className={`w-7 h-7 rounded-full ${row.iconBg} ${row.iconColor} flex items-center justify-center flex-shrink-0`}>
                              {row.concern === 'redness' && (
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                  <circle cx="12" cy="12" r="4" />
                                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" strokeDasharray="1 2" />
                                </svg>
                              )}
                              {row.concern === 'radiance' && (
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                  <circle cx="12" cy="12" r="4" />
                                  <line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" />
                                  <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
                                  <line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
                                </svg>
                              )}
                              {row.concern === 'texture' && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
                                </svg>
                              )}
                              {row.concern === 'acne' && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                  <path d="M4 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
                                  <path d="M4 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
                                </svg>
                              )}
                              {row.concern === 'pore' && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                  <circle cx="7" cy="7" r="1.8" /><circle cx="12" cy="7" r="1.8" /><circle cx="17" cy="7" r="1.8" />
                                  <circle cx="7" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="17" cy="12" r="1.8" />
                                  <circle cx="7" cy="17" r="1.8" /><circle cx="12" cy="17" r="1.8" /><circle cx="17" cy="17" r="1.8" />
                                </svg>
                              )}
                            </div>
                            <span className="font-bold text-sm text-[#18181B]">
                              {row.label}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 text-center font-mono text-sm text-[#52525B]">
                          {row.before.toFixed(1)}
                        </td>
                        <td className="py-4 text-center font-mono text-sm text-[#52525B]">
                          {row.after.toFixed(1)}
                        </td>
                        <td className="py-4 pr-1 text-right font-mono text-base font-extrabold">
                          <span className={row.delta > 0 ? (row.concern === 'redness' ? 'text-[#EA580C]' : row.concern === 'radiance' ? 'text-[#EAB308]' : 'text-[#0284C7]') : 'text-[#16A34A]'}>
                            {row.delta > 0 ? `+${row.delta.toFixed(1)}` : row.delta.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom inside card */}
            <div className="mt-8 pt-4 border-t border-[#F0EDF6] text-center">
              <p className="text-xs text-[#71717A] flex items-center justify-center gap-1 font-normal">
                Measured with YouCam Skin AI 🪄
              </p>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.1} className="mt-8 text-center flex flex-col items-center">
          <Link
            href={`/p/${participant.trial.slug}/review`}
            className="w-full max-w-[340px] py-4 px-6 rounded-xl bg-[#5B4FE8] hover:bg-[#4E42DC] active:scale-[0.98] text-white font-bold text-base shadow-[0_6px_20px_rgba(91,79,232,0.32)] transition-all flex items-center justify-center text-center cursor-pointer"
          >
            Finish My Review
          </Link>

          <p className="text-xs text-[#71717A] mt-3 flex items-center justify-center gap-1.5 font-normal">
            <span>⏱</span> Takes under a minute to complete.
          </p>
        </Reveal>
      </main>
    </div>
  );
}
