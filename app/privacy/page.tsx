import Link from 'next/link';
import { Logo } from '@/components/ui';

export const metadata = {
  title: 'Privacy Policy | Pruv',
  description: 'Pruv is built on privacy-first principles. We collect only what is necessary to generate your Proof Review and nothing more.',
};

export default function PrivacyPage() {
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
              <Link href="/demo" className="hover:text-[#18181B] transition-colors">
                Demo
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/start"
                className="bg-[#5B4FE8] hover:bg-[#4E42DC] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(91,79,232,0.25)] transition-all"
              >
                Start a Proof Review
              </Link>
              <Link
                href="https://github.com/NikhilRaikwar/Pruv"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#18181B] hover:text-[#5B4FE8] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-[1080px] mx-auto px-4 sm:px-6 pt-10 pb-20">
          {/* Header Section */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 items-center pb-12">
            <div>
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EFFF] border border-[#E4DCFB] text-[#5B4FE8] text-[11.5px] font-bold tracking-wider uppercase mb-4">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                PRIVACY POLICY
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-[-0.035em] text-[#18181B] leading-[1.1]">
                Your privacy,<br />respected by design.
              </h1>

              <p className="text-base sm:text-lg text-[#52525B] mt-4 max-w-[540px] leading-relaxed">
                Pruv is built on privacy-first principles. We collect only what&apos;s necessary to generate your Proof Review and nothing more.
              </p>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#71717A] mt-5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Last updated: August 17, 2026
              </div>
            </div>

            {/* Right Shield 3D-Styled Graphic */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                  <defs>
                    {/* Ambient Glow */}
                    <radialGradient id="ambient-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#7C6BF6" stopOpacity="0.35"/>
                      <stop offset="100%" stopColor="#7C6BF6" stopOpacity="0"/>
                    </radialGradient>
                    
                    {/* Shield Main Gradient */}
                    <linearGradient id="shield-grad" x1="20%" y1="0%" x2="80%" y2="100%">
                      <stop offset="0%" stopColor="#A59AFE"/>
                      <stop offset="45%" stopColor="#7B6BF8"/>
                      <stop offset="100%" stopColor="#5544E6"/>
                    </linearGradient>

                    {/* Shield Inner Bevel Gradient */}
                    <linearGradient id="shield-inner" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6"/>
                      <stop offset="30%" stopColor="#8F83FF" stopOpacity="0.1"/>
                      <stop offset="100%" stopColor="#3D2BC9" stopOpacity="0.4"/>
                    </linearGradient>

                    {/* Lock Body Gradient */}
                    <linearGradient id="lock-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF"/>
                      <stop offset="100%" stopColor="#EDE9FE"/>
                    </linearGradient>

                    {/* Shackle Gradient */}
                    <linearGradient id="shackle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF"/>
                      <stop offset="50%" stopColor="#D4CCFA"/>
                      <stop offset="100%" stopColor="#B2A3F7"/>
                    </linearGradient>

                    {/* Pedestal Gradient */}
                    <linearGradient id="pedestal-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ECE8FD"/>
                      <stop offset="100%" stopColor="#D8D0FC"/>
                    </linearGradient>

                    {/* Soft Shadow Filter */}
                    <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#4C3BC9" floodOpacity="0.25"/>
                    </filter>
                    <filter id="lock-shadow" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#2D1BA4" floodOpacity="0.22"/>
                    </filter>
                  </defs>

                  {/* Background Ambient Glow */}
                  <circle cx="130" cy="130" r="110" fill="url(#ambient-glow)" />

                  {/* Pedestal Platform Base */}
                  <ellipse cx="130" cy="204" rx="72" ry="16" fill="url(#pedestal-grad)" opacity="0.9" />
                  <ellipse cx="130" cy="201" rx="66" ry="12" fill="#F4F1FE" />

                  {/* Decorative Botanical Leaves on Left */}
                  <g transform="translate(42, 160)">
                    <path d="M28 35 Q18 20 10 5" stroke="#7A6BF5" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    <path d="M10 5 Q14 -4 24 2 Q16 8 10 5Z" fill="#887AF8"/>
                    <path d="M14 14 Q24 9 28 17 Q19 20 14 14Z" fill="#705FF4"/>
                    <path d="M19 23 Q29 20 31 29 Q22 30 19 23Z" fill="#5F4DEE"/>
                    <path d="M14 10 Q4 8 2 16 Q10 16 14 10Z" fill="#887AF8"/>
                  </g>

                  {/* 3D Shield Object */}
                  <g filter="url(#soft-shadow)">
                    <path d="M130 36 C168 36 198 52 198 84 C198 142 162 182 130 196 C98 182 62 142 62 84 C62 52 92 36 130 36 Z" 
                          fill="url(#shield-grad)" 
                          stroke="#FFFFFF" 
                          strokeWidth="2.5" 
                          strokeOpacity="0.7"/>

                    {/* Glossy Inner Reflection */}
                    <path d="M130 40 C162 40 190 53 192 80 C192 108 176 132 130 142 C84 132 68 108 68 80 C70 53 98 40 130 40 Z" 
                          fill="url(#shield-inner)" />

                    {/* Top Left Gloss Light Streak */}
                    <path d="M80 62 C100 48 130 44 145 44" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" fill="none"/>
                  </g>

                  {/* 3D Padlock (Centered in Shield) */}
                  <g filter="url(#lock-shadow)">
                    {/* Shackle (Top Arch) */}
                    <path d="M112 106 V88 C112 78 120 70 130 70 C140 70 148 78 148 88 V106" 
                          fill="none" 
                          stroke="url(#shackle-grad)" 
                          strokeWidth="8.5" 
                          strokeLinecap="round"/>

                    {/* Lock Body */}
                    <rect x="102" y="102" width="56" height="46" rx="14" fill="url(#lock-body-grad)" stroke="#FFFFFF" strokeWidth="1.5"/>

                    {/* Keyhole */}
                    <circle cx="130" cy="120" r="4.5" fill="#5B4FE8"/>
                    <path d="M128 122 L126.5 133 C126.5 134 127.5 135 128.5 135 H131.5 C132.5 135 133.5 134 133.5 133 L132 122 Z" fill="#5B4FE8"/>
                  </g>

                  {/* Sparkles / Stars */}
                  <path d="M214 74 L216 80 L222 82 L216 84 L214 90 L212 84 L206 82 L212 80 Z" fill="#A59AFE" opacity="0.9"/>
                  <path d="M218 178 L219.5 182.5 L224 184 L219.5 185.5 L218 190 L216.5 185.5 L212 184 L216.5 182.5 Z" fill="#7C6BF6" opacity="0.8"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Key Privacy Highlights (4 Cards) */}
          <div className="mb-14">
            <h2 className="text-xl font-bold tracking-tight text-[#18181B] mb-5">
              Key privacy highlights
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Highlight 1 */}
              <div className="bg-white rounded-2xl p-5 border border-[#ECE7DE] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F4F0FF] text-[#5B4FE8] flex items-center justify-center mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                      <circle cx="12" cy="13" r="4"></circle>
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-[#18181B] mb-1.5">
                    Your face images stay private
                  </h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    Photos you capture are processed securely via YouCam Skin AI. We do not store your raw face images on our servers.
                  </p>
                </div>
              </div>

              {/* Highlight 2 */}
              <div className="bg-white rounded-2xl p-5 border border-[#ECE7DE] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F4F0FF] text-[#5B4FE8] flex items-center justify-center mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-[#18181B] mb-1.5">
                    We store structured data only
                  </h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    We only store measurement scores and metadata needed to generate your Proof Review receipt.
                  </p>
                </div>
              </div>

              {/* Highlight 3 */}
              <div className="bg-white rounded-2xl p-5 border border-[#ECE7DE] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F4F0FF] text-[#5B4FE8] flex items-center justify-center mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-[#18181B] mb-1.5">
                    You control what you share
                  </h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    Your Proof Review is private by default. You decide whether to publish a shareable ProofLink.
                  </p>
                </div>
              </div>

              {/* Highlight 4 */}
              <div className="bg-white rounded-2xl p-5 border border-[#ECE7DE] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F4F0FF] text-[#5B4FE8] flex items-center justify-center mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-[#18181B] mb-1.5">
                    You can delete anytime
                  </h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    You can delete your data at any time. Once deleted, it is permanently removed from our systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
            {/* Left Content Sections */}
            <div className="space-y-8 text-[13.5px] leading-relaxed text-[#3F3F46]">
              {/* Section 1 */}
              <section className="pb-6 border-b border-[#ECE7DE]">
                <h2 className="text-base font-bold text-[#5B4FE8] mb-2.5">
                  1. Information We Collect
                </h2>
                <p className="text-[#52525B] mb-3">
                  We collect only the minimum information required to provide and improve Pruv.
                </p>
                <ul className="space-y-2 text-[#52525B] pl-1">
                  <li><strong className="text-[#18181B]">• Account:</strong> Anonymous participant ID</li>
                  <li><strong className="text-[#18181B]">• Trial data:</strong> Product details, trial dates, consent, and scan timestamps</li>
                  <li><strong className="text-[#18181B]">• Skin measurements:</strong> Structured scores from YouCam Skin AI</li>
                  <li><strong className="text-[#18181B]">• Experience:</strong> Your rating and optional written review</li>
                  <li><strong className="text-[#18181B]">• Device &amp; usage:</strong> Basic technical information to ensure security and reliability</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section className="pb-6 border-b border-[#ECE7DE]">
                <h2 className="text-base font-bold text-[#5B4FE8] mb-2.5">
                  2. How We Use Your Information
                </h2>
                <p className="text-[#52525B] mb-2.5">
                  We use your information only to:
                </p>
                <ul className="space-y-1.5 text-[#52525B] pl-1">
                  <li>• Generate your Proof Review receipt</li>
                  <li>• Provide and improve our services</li>
                  <li>• Ensure security and prevent abuse</li>
                  <li>• Comply with legal obligations</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="pb-6 border-b border-[#ECE7DE]">
                <h2 className="text-base font-bold text-[#5B4FE8] mb-2.5">
                  3. Third-Party Services
                </h2>
                <p className="text-[#52525B] mb-2.5">
                  Pruv uses trusted third-party services to operate:
                </p>
                <ul className="space-y-1.5 text-[#52525B] pl-1 mb-3">
                  <li><strong className="text-[#18181B]">• YouCam Skin AI</strong> (Perfect Corp.) — for skin analysis</li>
                  <li><strong className="text-[#18181B]">• Supabase</strong> — for secure data storage and authentication</li>
                  <li><strong className="text-[#18181B]">• Vercel</strong> — for hosting and performance</li>
                </ul>
                <p className="text-xs text-[#71717A]">
                  These services process data only on our behalf and under strict confidentiality obligations.
                </p>
              </section>

              {/* Section 4 */}
              <section className="pb-6 border-b border-[#ECE7DE]">
                <h2 className="text-base font-bold text-[#5B4FE8] mb-2.5">
                  4. Data Retention
                </h2>
                <p className="text-[#52525B]">
                  We retain your data only as long as necessary to provide the service or as required by law. You can request deletion at any time.
                </p>
              </section>

              {/* Section 5 */}
              <section className="pb-6 border-b border-[#ECE7DE]">
                <h2 className="text-base font-bold text-[#5B4FE8] mb-2.5">
                  5. Your Rights
                </h2>
                <p className="text-[#52525B] mb-2.5">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="space-y-1 text-[#52525B] pl-1 mb-3">
                  <li>• Access your data</li>
                  <li>• Correct inaccurate data</li>
                  <li>• Delete your data</li>
                  <li>• Object to or restrict processing</li>
                </ul>
                <p className="text-xs text-[#52525B]">
                  To exercise your rights, contact us at <a href="mailto:raikwarnik18@gmail.com" className="text-[#5B4FE8] font-bold underline">raikwarnik18@gmail.com</a>.
                </p>
              </section>

              {/* Section 6 */}
              <section className="pb-6 border-b border-[#ECE7DE]">
                <h2 className="text-base font-bold text-[#5B4FE8] mb-2.5">
                  6. Children&apos;s Privacy
                </h2>
                <p className="text-[#52525B]">
                  Pruv is not intended for children under 16. We do not knowingly collect personal data from children.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-base font-bold text-[#5B4FE8] mb-2.5">
                  7. Changes to This Policy
                </h2>
                <p className="text-[#52525B]">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date.
                </p>
              </section>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* Card 1: Our Privacy Principles */}
              <div className="bg-[#F6F2FF] rounded-3xl p-6 border border-[#E6DEFC] shadow-xs">
                <h3 className="text-base font-bold text-[#5B4FE8] mb-5">
                  Our privacy principles
                </h3>

                <div className="space-y-5">
                  {/* Item 1 */}
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-lg bg-white text-[#5B4FE8] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#18181B]">Privacy by design</h4>
                      <p className="text-[11.5px] text-[#52525B] leading-relaxed mt-0.5">
                        Privacy is built into every part of Pruv — not an afterthought.
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-lg bg-white text-[#5B4FE8] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#18181B]">Data minimization</h4>
                      <p className="text-[11.5px] text-[#52525B] leading-relaxed mt-0.5">
                        We collect the least amount of data needed to deliver value.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-lg bg-white text-[#5B4FE8] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#18181B]">Security first</h4>
                      <p className="text-[11.5px] text-[#52525B] leading-relaxed mt-0.5">
                        We protect your data with industry-standard security practices.
                      </p>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-lg bg-white text-[#5B4FE8] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#18181B]">Transparency</h4>
                      <p className="text-[11.5px] text-[#52525B] leading-relaxed mt-0.5">
                        We&apos;re clear about what we collect, why, and how it&apos;s used.
                      </p>
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-lg bg-white text-[#5B4FE8] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#18181B]">User control</h4>
                      <p className="text-[11.5px] text-[#52525B] leading-relaxed mt-0.5">
                        You&apos;re in control of your data, always.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Questions Box */}
              <div className="bg-white rounded-3xl p-6 border border-[#ECE7DE] shadow-xs">
                <h3 className="text-sm font-bold text-[#18181B] mb-1">Questions?</h3>
                <p className="text-xs text-[#71717A] mb-3.5">We&apos;re here to help.</p>
                <a
                  href="mailto:raikwarnik18@gmail.com"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#5B4FE8] hover:text-[#4E42DC] bg-[#F4F0FF] hover:bg-[#ECE4FE] px-3.5 py-2.5 rounded-xl transition-colors w-full justify-center"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  raikwarnik18@gmail.com
                </a>
              </div>
            </div>
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
            <Link href="/#how" className="hover:text-[#18181B] transition-colors">How it works</Link>
            <Link href="/demo" className="hover:text-[#18181B] transition-colors">Demo</Link>
            <Link href="/privacy" className="text-[#18181B] font-bold">Privacy</Link>
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
