import Link from 'next/link';
import Image from 'next/image';
import { requireParticipant } from '@/lib/participant/current';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { Reveal, Logo } from '@/components/ui';

export default async function MyProofPage() {
  const participant = await requireParticipant();
  const supabase = getSupabaseAdmin();

  const { data: scans } = await supabase
    .from('scans')
    .select('id, scan_type, status')
    .eq('participant_trial_id', participant.id)
    .eq('status', 'success');

  const hasFollowup = scans?.some((s) => s.scan_type === 'followup') ?? false;

  // Calculate target date (e.g. 21 days from baseline)
  const dueDate = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

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
      <main className="max-w-[560px] mx-auto">
        {/* Title */}
        <Reveal className="text-center mb-8 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.035em] text-[#18181B] leading-[1.1]">
            Your Proof Trial<br />is running.
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#71717A] mt-3">
            One baseline complete. Come back for your follow-up and final review.
          </p>
        </Reveal>

        {/* Card */}
        <Reveal delay={0.05}>
          <div className="bg-white rounded-[28px] sm:rounded-[34px] p-6 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.04)] border border-[#EBE7E0]">
            {/* Product Header */}
            <div className="flex items-center gap-5 pb-6 border-b border-[#F0EDF6]">
              <div className="relative w-24 h-28 sm:w-26 sm:h-30 rounded-2xl overflow-hidden bg-[#F4F1EC] border border-[#ECE8E1] flex-shrink-0 shadow-inner">
                <Image
                  src="/serum_bottle_review.jpg"
                  alt="Product"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181B] truncate">
                  {participant.trial.product_name}
                </h2>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2.5 rounded-lg bg-[#F4F1FC] text-[#5B4FE8] text-xs font-semibold">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {participant.trial.trial_days}-Day Proof Trial
                </div>
              </div>
            </div>

            {/* 3-Step Timeline */}
            <div className="py-8 border-b border-[#F0EDF6]">
              <div className="flex items-center justify-between max-w-[420px] mx-auto relative">
                {/* Step 1: Baseline */}
                <div className="flex flex-col items-center text-center z-10">
                  <div className="relative w-12 h-12 rounded-full border-2 border-[#5B4FE8] bg-white flex items-center justify-center text-base font-extrabold text-[#5B4FE8] shadow-sm">
                    1
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#5B4FE8] text-white text-[9px] font-bold flex items-center justify-center shadow">
                      ✓
                    </div>
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-[#18181B] mt-2">
                    Baseline
                  </span>
                  <span className="text-[11px] font-semibold text-[#5B4FE8]">
                    Completed
                  </span>
                </div>

                {/* Connector Line 1 */}
                <div className="flex-1 border-t-2 border-dashed border-[#E4E0EC] mx-2 -mt-7" />

                {/* Step 2: Follow-up */}
                <div className="flex flex-col items-center text-center z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-extrabold ${hasFollowup ? 'border-2 border-[#5B4FE8] bg-white text-[#5B4FE8]' : 'bg-[#F4F1FC] text-[#52525B]'}`}>
                    2
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-[#18181B] mt-2">
                    Follow-up
                  </span>
                  <span className="text-[11px] font-semibold text-[#71717A]">
                    {hasFollowup ? 'Completed' : 'Upcoming'}
                  </span>
                </div>

                {/* Connector Line 2 */}
                <div className="flex-1 border-t-2 border-dashed border-[#E4E0EC] mx-2 -mt-7" />

                {/* Step 3: Proof Review */}
                <div className="flex flex-col items-center text-center z-10">
                  <div className="relative w-12 h-12 rounded-full bg-[#F4F1FC] flex items-center justify-center text-base font-extrabold text-[#52525B]">
                    3
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#71717A] text-white text-[9px] flex items-center justify-center shadow">
                      🔒
                    </div>
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-[#18181B] mt-2">
                    Proof Review
                  </span>
                  <span className="text-[11px] font-semibold text-[#71717A]">
                    Locked
                  </span>
                </div>
              </div>
            </div>

            {/* Date Reminder Box */}
            <div className="mt-6 p-4 rounded-2xl bg-[#F7F5FE] border border-[#ECE8FB] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white text-[#5B4FE8] shadow-sm flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#18181B]">
                  Follow-up scan due on {dueDate}
                </h3>
                <p className="text-xs text-[#71717A] mt-0.5">
                  Use the product as usual during the trial period.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 space-y-3">
              <Link
                href={`/p/${participant.trial.slug}/scan?type=followup`}
                className="w-full py-4 px-6 rounded-xl bg-[#5B4FE8] hover:bg-[#4E42DC] active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-[0_6px_20px_rgba(91,79,232,0.32)] transition-all flex items-center justify-center text-center"
              >
                Take Follow-up Scan
              </Link>

              <Link
                href={`/p/${participant.trial.slug}/baseline`}
                className="w-full py-3.5 px-6 rounded-xl border border-[#EBE7E0] bg-white hover:bg-[#FAF9F6] active:scale-[0.98] text-[#5B4FE8] font-bold text-sm transition-all flex items-center justify-center text-center"
              >
                View baseline results
              </Link>
            </div>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
