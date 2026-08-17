import Link from 'next/link';
import { Logo } from '@/components/ui';

export const metadata = {
  title: 'How Pruv Works | Measured Skincare Reviews',
  description: 'From scan to shareable Proof Review in 4 simple steps. Backed by YouCam Skin AI.',
};

export default function HowItWorksPage() {
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
              <Link href="/how" className="text-[#5B4FE8] font-bold">
                How it works
              </Link>
              <Link href="/demo" className="hover:text-[#18181B] transition-colors">
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
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.035em] text-[#18181B]">
              How Pruv Works
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-[#71717A] mt-3">
              From scan to shareable Proof Review in 4 simple steps.
            </p>
          </div>

          {/* 4 Step Cards Grid with Connecting Dashed Lines */}
          <div className="relative mb-14">
            {/* Desktop Connecting Dashed Line */}
            <div className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-[#DDD7EE] z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {/* Step 1 */}
              <div className="bg-white rounded-3xl p-6 pt-8 border border-[#ECE7DE] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center text-center relative group hover:border-[#5B4FE8]/40 transition-colors">
                {/* Number Badge */}
                <div className="w-8 h-8 rounded-full bg-[#5B4FE8] text-white text-xs font-bold flex items-center justify-center absolute -top-4 shadow-sm">
                  1
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#F5F2FF] text-[#5B4FE8] flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>

                <h2 className="text-base font-bold text-[#18181B] mb-2">
                  Scan Your Skin
                </h2>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Capture a quick baseline scan using YouCam Skin AI.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-3xl p-6 pt-8 border border-[#ECE7DE] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center text-center relative group hover:border-[#5B4FE8]/40 transition-colors">
                {/* Number Badge */}
                <div className="w-8 h-8 rounded-full bg-[#5B4FE8] text-white text-xs font-bold flex items-center justify-center absolute -top-4 shadow-sm">
                  2
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#F5F2FF] text-[#5B4FE8] flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>

                <h2 className="text-base font-bold text-[#18181B] mb-2">
                  Complete Your Trial
                </h2>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Use the product as recommended. Pruv reminds you.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-3xl p-6 pt-8 border border-[#ECE7DE] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center text-center relative group hover:border-[#5B4FE8]/40 transition-colors">
                {/* Number Badge */}
                <div className="w-8 h-8 rounded-full bg-[#5B4FE8] text-white text-xs font-bold flex items-center justify-center absolute -top-4 shadow-sm">
                  3
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#F5F2FF] text-[#5B4FE8] flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <path d="M11 8v6M8 11h6" />
                  </svg>
                </div>

                <h2 className="text-base font-bold text-[#18181B] mb-2">
                  Follow-up Scan
                </h2>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Capture your follow-up scan. We analyze the changes.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-3xl p-6 pt-8 border border-[#ECE7DE] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center text-center relative group hover:border-[#5B4FE8]/40 transition-colors">
                {/* Number Badge */}
                <div className="w-8 h-8 rounded-full bg-[#5B4FE8] text-white text-xs font-bold flex items-center justify-center absolute -top-4 shadow-sm">
                  4
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#F5F2FF] text-[#5B4FE8] flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 12l2 2 4-4" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                  </svg>
                </div>

                <h2 className="text-base font-bold text-[#18181B] mb-2">
                  Get Your Proof Review
                </h2>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  See measured results, add your experience, and publish your ProofLink.
                </p>
              </div>
            </div>
          </div>

          {/* Middle Workflow Strip (Purple Tinted Box with Chevrons) */}
          <div className="mb-12 bg-[#F6F2FF] rounded-3xl p-6 sm:p-8 border border-[#E6DEFC] shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
              {/* Item 1 */}
              <div className="flex flex-col items-center text-center relative">
                <div className="w-10 h-10 rounded-xl bg-white text-[#5B4FE8] shadow-xs flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
                    <line x1="9" y1="22" x2="15" y2="22" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[#18181B] mb-1">
                  YouCam Skin AI
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Advanced AI analyzes multiple skin metrics.
                </p>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-center text-center relative">
                <div className="w-10 h-10 rounded-xl bg-white text-[#5B4FE8] shadow-xs flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[#18181B] mb-1">
                  Deterministic Comparison
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  We compare baseline vs follow-up with precision.
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-center text-center relative">
                <div className="w-10 h-10 rounded-xl bg-white text-[#5B4FE8] shadow-xs flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[#18181B] mb-1">
                  Your Experience
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Add your honest rating and personal notes.
                </p>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col items-center text-center relative">
                <div className="w-10 h-10 rounded-xl bg-white text-[#5B4FE8] shadow-xs flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[#18181B] mb-1">
                  Share ProofLink
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Get a unique link to share your verified results.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Card: Why Pruv? */}
          <div className="bg-white rounded-3xl p-8 border border-[#ECE7DE] shadow-xs mb-8">
            <h2 className="text-center text-lg font-bold text-[#5B4FE8] mb-8">
              Why Pruv?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {/* Point 1 */}
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-2xl bg-[#F6F2FF] text-[#5B4FE8] flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-[#18181B]">
                  Measured, not just opinions
                </h3>
              </div>

              {/* Point 2 */}
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-2xl bg-[#F6F2FF] text-[#5B4FE8] flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-[#18181B]">
                  Anonymous by default
                </h3>
              </div>

              {/* Point 3 */}
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-2xl bg-[#F6F2FF] text-[#5B4FE8] flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-[#18181B]">
                  You own Your data
                </h3>
              </div>

              {/* Point 4 */}
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-2xl bg-[#F6F2FF] text-[#5B4FE8] flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-[#18181B]">
                  No fake reviews, just real proof
                </h3>
              </div>
            </div>
          </div>

          {/* Bottom Tagline */}
          <div className="text-center text-xs text-[#71717A] font-medium">
            Built with YouCam Skin AI • Privacy First • No Signup Required
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
            <Link href="/how" className="text-[#18181B] font-bold">How it works</Link>
            <Link href="/demo" className="hover:text-[#18181B] transition-colors">Demo</Link>
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
