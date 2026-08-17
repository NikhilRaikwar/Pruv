import Link from 'next/link';
import { Logo } from '@/components/ui';

export const metadata = {
  title: 'Terms of Service | Pruv',
  description: 'Please read these terms carefully before using Pruv.',
};

export default function TermsPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 items-center pb-10">
            <div>
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EFFF] border border-[#E4DCFB] text-[#5B4FE8] text-[11.5px] font-bold tracking-wider uppercase mb-4">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                TERMS OF SERVICE
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-[-0.035em] text-[#18181B] leading-[1.1]">
                Terms of Service
              </h1>

              <p className="text-base sm:text-lg text-[#52525B] mt-4 max-w-[540px] leading-relaxed">
                Please read these terms carefully before using Pruv.
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

            {/* Right Document 3D-Styled Graphic */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                  <defs>
                    <radialGradient id="ambient-glow-terms" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#7C6BF6" stopOpacity="0.35"/>
                      <stop offset="100%" stopColor="#7C6BF6" stopOpacity="0"/>
                    </radialGradient>

                    <linearGradient id="doc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D5CDFC"/>
                      <stop offset="40%" stopColor="#B3A4F8"/>
                      <stop offset="100%" stopColor="#7C6BF6"/>
                    </linearGradient>

                    <linearGradient id="pedestal-grad-terms" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ECE8FD"/>
                      <stop offset="100%" stopColor="#D8D0FC"/>
                    </linearGradient>

                    <filter id="doc-shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#4C3BC9" floodOpacity="0.25"/>
                    </filter>
                    <filter id="badge-shadow" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#2D1BA4" floodOpacity="0.3"/>
                    </filter>
                  </defs>

                  {/* Ambient Glow */}
                  <circle cx="130" cy="130" r="110" fill="url(#ambient-glow-terms)" />

                  {/* Pedestal Base */}
                  <ellipse cx="130" cy="210" rx="76" ry="16" fill="url(#pedestal-grad-terms)" opacity="0.9" />
                  <ellipse cx="130" cy="207" rx="70" ry="12" fill="#F4F1FE" />

                  {/* 3D Document Sheet */}
                  <g filter="url(#doc-shadow)" transform="rotate(4, 130, 120)">
                    <rect x="74" y="44" width="112" height="142" rx="20" fill="url(#doc-grad)" stroke="#FFFFFF" strokeWidth="2.5"/>
                    
                    {/* Top Fold / Gloss Highlight */}
                    <path d="M74 64 C74 53 83 44 94 44 H166 C177 44 186 53 186 64 V100 C150 110 110 100 74 100 Z" fill="#FFFFFF" fillOpacity="0.2"/>

                    {/* Text Placeholder Pill Lines */}
                    <rect x="94" y="68" width="42" height="6.5" rx="3.25" fill="#FFFFFF" fillOpacity="0.9"/>
                    <rect x="94" y="86" width="72" height="6.5" rx="3.25" fill="#FFFFFF" fillOpacity="0.75"/>
                    <rect x="94" y="104" width="60" height="6.5" rx="3.25" fill="#FFFFFF" fillOpacity="0.75"/>
                    <rect x="94" y="122" width="48" height="6.5" rx="3.25" fill="#FFFFFF" fillOpacity="0.6"/>
                  </g>

                  {/* Circular Checkmark Badge */}
                  <g filter="url(#badge-shadow)">
                    <circle cx="172" cy="166" r="24" fill="#5B4FE8" stroke="#FFFFFF" strokeWidth="3"/>
                    <path d="M162 166 L169 173 L183 159" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>

                  {/* Sparkles / Stars */}
                  <path d="M214 66 L216 72 L222 74 L216 76 L214 82 L212 76 L206 74 L212 72 Z" fill="#A59AFE" opacity="0.9"/>
                  <path d="M46 170 L47.5 174.5 L52 176 L47.5 177.5 L46 182 L44.5 177.5 L40 176 L44.5 174.5 Z" fill="#7C6BF6" opacity="0.8"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Agreement to Terms Banner */}
          <div className="mb-10 bg-[#F4F0FF] rounded-2xl p-5 sm:p-6 border border-[#E6DEFC] flex items-start gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#ECE5FD] text-[#5B4FE8] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#18181B] mb-1">
                Agreement to Terms
              </h2>
              <p className="text-xs sm:text-[13.5px] text-[#52525B] leading-relaxed">
                By accessing or using Pruv, you agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
            </div>
          </div>

          {/* 8 Bento Cards Grid (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 border border-[#ECE7DE] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4F0FF] text-[#5B4FE8] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#18181B] mb-1.5">1. Use of Pruv</h3>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  You must be at least 13 years old to use Pruv. You agree to use the service only for lawful purposes and in accordance with these terms.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 border border-[#ECE7DE] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4F0FF] text-[#5B4FE8] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="7" r="4"></circle>
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#18181B] mb-1.5">2. Accounts</h3>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  You may use Pruv anonymously. If you create an account, you are responsible for maintaining the security of your account.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[#ECE7DE] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4F0FF] text-[#5B4FE8] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#18181B] mb-1.5">3. User Content</h3>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  You retain ownership of the content you submit (product details, experiences, photos). You grant Pruv a limited license to use this content solely to provide and improve the service.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 border border-[#ECE7DE] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4F0FF] text-[#5B4FE8] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#18181B] mb-1.5">4. Prohibited Activities</h3>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  You agree not to misuse Pruv or interfere with the platform. Do not upload unlawful, harmful, or misleading content.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl p-6 border border-[#ECE7DE] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4F0FF] text-[#5B4FE8] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#18181B] mb-1.5">5. Privacy</h3>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  Your use of Pruv is also governed by our Privacy Policy, which explains how we collect, use, and protect your data.
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-2xl p-6 border border-[#ECE7DE] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4F0FF] text-[#5B4FE8] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#18181B] mb-1.5">6. Changes to Terms</h3>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  We may update these terms from time to time. We will notify users of significant changes by updating the &ldquo;Last updated&rdquo; date.
                </p>
              </div>
            </div>

            {/* Card 7 */}
            <div className="bg-white rounded-2xl p-6 border border-[#ECE7DE] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4F0FF] text-[#5B4FE8] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#18181B] mb-1.5">7. Limitation of Liability</h3>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  Pruv is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.
                </p>
              </div>
            </div>

            {/* Card 8 */}
            <div className="bg-white rounded-2xl p-6 border border-[#ECE7DE] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4F0FF] text-[#5B4FE8] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#18181B] mb-1.5">8. Governing Law</h3>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  These terms are governed by the laws of India. Any disputes will be resolved in the courts of India.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Contact Us Banner */}
          <div className="bg-[#F4F0FF] rounded-2xl p-6 border border-[#E6DEFC] flex items-start gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#ECE5FD] text-[#5B4FE8] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#18181B] mb-1">
                Contact Us
              </h2>
              <p className="text-xs sm:text-[13.5px] text-[#52525B] mb-2 leading-relaxed">
                If you have any questions about these Terms, contact us at:
              </p>
              <a
                href="mailto:raikwarnik18@gmail.com"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#5B4FE8] hover:text-[#4E42DC] underline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                raikwarnik18@gmail.com
              </a>
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
            <Link href="/privacy" className="hover:text-[#18181B] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[#18181B] font-bold">Terms</Link>
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
