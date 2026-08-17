"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Reveal, Logo, ProductNav } from '@/components/ui';

export default function LandingPage() {
  return (
    <>
      <div className="pt-6 px-4 sm:px-6">
        <ProductNav />
      </div>

      <main id="top">
        {/* HERO SECTION */}
        <section className="hero" style={{padding: '24px 0 80px'}}>
          <div className="wrap split-layout items-center">
            <Reveal className="hero-text text-center md:text-left">
              <div className="eyebrow-text mx-auto md:mx-0" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 600, color: 'var(--ink-soft)', letterSpacing: '0.05em', marginBottom: '16px'}}>
                <span className="pulse-dot" style={{background: 'var(--accent)', width: '6px', height: '6px', borderRadius: '50%'}} />
                MEASURED SKINCARE REVIEWS
              </div>
              <h1 className="display" style={{fontSize: 'clamp(34px, 7vw, 68px)', lineHeight: 1.08, letterSpacing: '-0.04em', fontWeight: 700, marginBottom: '20px'}}>
                Did it actually<br/>work for you?
              </h1>
              <div className="hero-desc" style={{margin: '0 0 28px'}}>
                <span className="serif italic mx-auto md:mx-0" style={{fontSize: 'clamp(19px, 4vw, 26px)', lineHeight: 1.3, color: 'var(--ink)', display: 'block', marginBottom: '16px'}}>
                  Turn a skincare trial into a review backed by your own before-and-after skin data.
                </span>
                <span className="mx-auto md:mx-0" style={{color: 'var(--ink-soft)', fontSize: '14.5px', lineHeight: 1.6, display: 'block', maxWidth: '440px'}}>
                  Scan before you start, use the product regularly, then scan again. Pruv turns the change into a Proof Review scored by YouCam Skin AI.
                </span>
              </div>
              
              <div className="hero-actions flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3 mb-5">
                <Link href="/start" className="btn btn-primary justify-center text-center" style={{padding: '14px 26px', fontSize: '14.5px', borderRadius: '12px', fontWeight: 600, textDecoration: 'none'}}>
                  Start a Proof Review
                </Link>
                <Link href="#demo" className="btn btn-outline justify-center text-center" style={{padding: '14px 26px', fontSize: '14.5px', background: '#FFF', borderRadius: '12px', border: '1px solid var(--line)', fontWeight: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textDecoration: 'none'}}>
                  See Demo &nbsp;&rarr;
                </Link>
              </div>
              <div className="text-center md:text-left" style={{fontSize: '12px', color: 'var(--muted)'}}>
                No signup &middot; Browser based &middot; ~33 sec per scan
              </div>
            </Reveal>

            {/* HERO RIGHT: PROOF REVIEW CARD */}
            <Reveal className="hero-visual" delay={0.1}>
              <div className="proof-card hero-card shadow-premium" style={{background: '#FFF', borderRadius: '20px', padding: '32px 36px', border: '1px solid var(--line)'}}>
                <div className="proof-header" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px'}}>
                  <h3 style={{fontSize: '20px', fontWeight: 700, color: 'var(--ink)'}}>Proof Review</h3>
                  <div className="shield-icon" style={{color: 'var(--accent)'}}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3 0 1.25-.77 2.32-1.86 2.76L15 17h-2v-3h-2v3H9l1.86-4.24C9.77 12.32 9 11.25 9 10c0-1.66 1.34-3 3-3z"/>
                    </svg>
                  </div>
                </div>
                <div className="product-row" style={{display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px'}}>
                  <div className="product-img" style={{width: '74px', height: '98px', position: 'relative', background: '#F8F8F8', borderRadius: '8px', overflow: 'hidden', flexShrink: 0}}>
                    <Image src="/serum_bottle_review.jpg" alt="Serum" fill style={{objectFit: 'cover'}} />
                  </div>
                  <div className="product-info" style={{flex: 1}}>
                    <h4 style={{fontSize: '16px', fontWeight: 700, color: 'var(--ink)', marginBottom: '3px'}}>Niacinamide 10% Serum</h4>
                    <span className="trial-len" style={{fontSize: '12px', color: 'var(--muted)', display: 'block'}}>21-day trial</span>
                    <div className="stars" style={{display: 'flex', alignItems: 'center', gap: '2px', margin: '8px 0'}}>
                      <span className="star" style={{color: '#F59E0B'}}>★</span>
                      <span className="star" style={{color: '#F59E0B'}}>★</span>
                      <span className="star" style={{color: '#F59E0B'}}>★</span>
                      <span className="star" style={{color: '#F59E0B'}}>★</span>
                      <span className="star half" style={{color: '#F59E0B', opacity: 0.5}}>★</span>
                      <span className="rating-num" style={{fontSize: '13px', fontWeight: 700, marginLeft: '6px', color: 'var(--ink)'}}>4.5/5</span>
                    </div>
                    <div className="buy-again" style={{fontSize: '12.5px', fontWeight: 600, color: 'var(--ink)'}}>
                      Would buy again? <span className="yes" style={{color: '#16A34A', fontWeight: 700}}>Yes</span>
                    </div>
                  </div>
                </div>
                
                <div className="divider-label" style={{fontSize: '10px', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginBottom: '8px'}}>
                  MEASURED CHANGE(YOUCAM SKIN AI + FOLLOW-UP)
                </div>
                
                <div className="metrics-list" style={{display: 'flex', flexDirection: 'column'}}>
                  <div className="metric-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--line)'}}>
                    <div className="m-left" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <div className="dot redness" style={{width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="10" strokeDasharray="4 4" strokeWidth="2"/></svg>
                      </div>
                      <span style={{fontWeight: 600, fontSize: '14.5px', color: 'var(--ink)'}}>Redness score</span>
                    </div>
                    <div className="m-right redness num" style={{color: '#EA580C', fontWeight: 700, fontSize: '18px'}}>+8.6</div>
                  </div>

                  <div className="metric-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--line)'}}>
                    <div className="m-left" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <div className="dot radiance" style={{width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                      </div>
                      <span style={{fontWeight: 600, fontSize: '14.5px', color: 'var(--ink)'}}>Radiance score</span>
                    </div>
                    <div className="m-right radiance num" style={{color: '#F59E0B', fontWeight: 700, fontSize: '18px'}}>+5.3</div>
                  </div>

                  <div className="metric-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: 'none'}}>
                    <div className="m-left" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <div className="dot texture" style={{width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.1)', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg>
                      </div>
                      <span style={{fontWeight: 600, fontSize: '14.5px', color: 'var(--ink)'}}>Texture score</span>
                    </div>
                    <div className="m-right texture num" style={{color: '#2563EB', fontWeight: 700, fontSize: '18px'}}>+0.7</div>
                  </div>
                </div>

                <div className="quote-box" style={{background: 'var(--bg-subtle)', borderRadius: '12px', padding: '14px 16px', margin: '20px 0 16px', border: '1px solid var(--line)'}}>
                  <p style={{fontSize: '13.5px', fontStyle: 'italic', color: 'var(--ink-soft)', margin: 0, lineHeight: 1.5}}>
                    “My skin feels much calmer and visibly less red around cheeks.”
                  </p>
                </div>

                <div className="proof-footer" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--muted)', paddingTop: '12px', borderTop: '1px solid var(--line)'}}>
                  <div className="scan-pill" style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <span className="dot" style={{width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A'}}></span>
                    2 scans verified
                  </div>
                  <span>Measured with YouCam Skin AI 🪄</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3 STEPS SECTION */}
        <section id="how" style={{padding: '90px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--bg)'}}>
          <div className="wrap">
            <Reveal>
              <div className="section-head" style={{maxWidth: '800px', margin: '0 auto 80px', textAlign: 'center'}}>
                <h2 style={{fontSize: 'clamp(36px, 5vw, 44px)', fontWeight: 700, letterSpacing: '-0.04em'}}>Two scans. One measured review.</h2>
                <p style={{fontSize: '16px', color: 'var(--ink-soft)'}}>Capture your baseline, use the product normally,<br/>then come back for a follow-up and review.</p>
              </div>
            </Reveal>

            <Reveal className="steps-row">
              <div className="step-card-new shadow-premium">
                <div className="step-badge">1</div>
                <div className="step-icon-new">
                  <Image src="/icons8-face-scan-96.png" width={48} height={48} alt="Face Scan" style={{margin: '0 auto'}} />
                </div>
                <h3>Baseline scan</h3>
                <p>Capture the<br/>starting point</p>
              </div>
              <div className="step-connector"></div>
              
              <div className="step-card-new shadow-premium">
                <div className="step-badge">2</div>
                <div className="step-icon-new">
                  <Image src="/icons8-serum-64.png" width={48} height={48} alt="Serum" style={{margin: '0 auto'}} />
                </div>
                <h3>Use the product</h3>
                <p>Use it normally<br/>during the trial</p>
              </div>
              <div className="step-connector"></div>

              <div className="step-card-new shadow-premium">
                <div className="step-badge">3</div>
                <div className="step-icon-new">
                  <Image src="/icons8-face-scan-96.png" width={48} height={48} alt="Face Scan" style={{margin: '0 auto'}} />
                </div>
                <h3>Review with proof</h3>
                <p>Scan again and see<br/>what changed</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* COMPARE SECTION */}
        <section id="demo" style={{padding: '90px 0'}}>
          <div className="wrap compare-section-grid items-center">
            <Reveal>
              <div className="section-head left" style={{margin: 0, maxWidth: '360px'}}>
                <h2 style={{fontSize: 'clamp(36px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.04em', fontWeight: 700}}>
                  See what actually<br/>changed.
                </h2>
                <p style={{fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: '24px 0 28px'}}>
                  Pruv adds a bit you that compares two scans with YouCam Texture and between them to turn the numbers.
                </p>
                <Link href="/demo" className="btn btn-outline inline-flex items-center gap-2" style={{background: '#FFF', borderRadius: '9999px', padding: '14px 26px', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.08)', color: 'var(--ink)'}}>
                  Try the Demo &nbsp;&rarr;
                </Link>
              </div>
            </Reveal>

            <Reveal>
              <div className="compare-card-new shadow-premium">
                <div className="compare-layout-new">
                  <div className="compare-images-block">
                    <div className="compare-images">
                      <div className="ci-col">
                        <div className="ci-head">Before<span>Day 0</span></div>
                        <div className="face-frame relative aspect-[3/4] rounded-[14px] overflow-hidden shadow-sm">
                          <Image src="/day1_real.jpg" alt="Day 0 Before" fill style={{objectFit: 'cover'}} />
                        </div>
                      </div>
                      <div className="ci-arrow">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                      </div>
                      <div className="ci-col">
                        <div className="ci-head">After<span>Day 21</span></div>
                        <div className="face-frame relative aspect-[3/4] rounded-[14px] overflow-hidden shadow-sm">
                          <Image src="/day21_after.jpg" alt="Day 21 After" fill style={{objectFit: 'cover'}} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="compare-table-wrap">
                    <table className="compare-table">
                      <thead>
                        <tr>
                          <th style={{textAlign: 'left'}}>METRIC</th>
                          <th>BEFORE</th>
                          <th>AFTER</th>
                          <th>CHANGE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="metric-label" style={{color: 'var(--ink)', fontWeight: 600}}>Redness score</td>
                          <td className="num">71.2</td>
                          <td className="num">79.8</td>
                          <td className="num change redness" style={{fontWeight: 700}}>+8.6</td>
                        </tr>
                        <tr>
                          <td className="metric-label" style={{color: 'var(--ink)', fontWeight: 600}}>Radiance score</td>
                          <td className="num">60.7</td>
                          <td className="num">72.0</td>
                          <td className="num change radiance" style={{fontWeight: 700}}>+5.3</td>
                        </tr>
                        <tr>
                          <td className="metric-label" style={{color: 'var(--ink)', fontWeight: 600}}>Texture score</td>
                          <td className="num">67.4</td>
                          <td className="num">68.1</td>
                          <td className="num change texture" style={{fontWeight: 700}}>+0.7</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="proof-footer justify-center" style={{borderTop: '1px solid var(--line)', marginTop: '28px', paddingTop: '16px', fontSize: '12px'}}>
                  Measured with YouCam Skin AI 🪄
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* WIDE PROOF REVIEW */}
        <section style={{padding: '90px 0 120px'}}>
          <div className="wrap compare-section-grid items-center">
            <Reveal>
              <div className="section-head left" style={{margin: 0, maxWidth: '360px'}}>
                <h2 style={{fontSize: 'clamp(36px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.04em', fontWeight: 700}}>
                  Your trial becomes<br/>a Proof Review.
                </h2>
                <p style={{fontSize: '15px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: '24px 0'}}>
                  Add your 21-day trial experience to the measured changes, then share this review that shows both opinion and evidence.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="proof-card wide shadow-premium" style={{padding: '36px 40px', borderRadius: '20px'}}>
                <div className="product-row" style={{alignItems: 'center', gap: '24px', marginBottom: '28px'}}>
                  <div className="product-img" style={{width: '84px', height: '110px', borderRadius: '10px', flexShrink: 0}}>
                    <Image src="/serum_bottle_review.jpg" alt="Serum" fill style={{objectFit: 'cover'}} />
                  </div>
                  <div className="product-info" style={{flex: 1}}>
                    <h4 style={{fontSize: '17px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px'}}>Niacinamide 10% Serum</h4>
                    <span className="trial-len" style={{fontSize: '12px', color: 'var(--muted)', display: 'block'}}>21-day trial</span>
                    <div className="stars" style={{margin: '8px 0'}}>
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star half">★</span>
                      <span className="rating-num" style={{marginLeft: '6px', fontSize: '13px', fontWeight: 700}}>4.5/5</span>
                    </div>
                    <div className="text-review" style={{fontSize: '14.5px', color: 'var(--ink)', marginTop: '6px', fontWeight: 500}}>
                      “Skin felt calmer by the end of week two.”
                    </div>
                  </div>
                </div>
                
                <div className="divider-label" style={{fontSize: '10px', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginBottom: '8px'}}>
                  MEASURED CHANGE(YOUCAM SKIN AI + FOLLOW-UP)
                </div>
                
                <div className="wide-metrics-list">
                  <div className="wide-metric-row">
                    <div className="m-left">
                      <div className="dot redness">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="10" strokeDasharray="4 4" strokeWidth="2"/></svg>
                      </div>
                      <span style={{fontWeight: 600, fontSize: '14.5px', color: 'var(--ink)'}}>Redness score</span>
                    </div>
                    <div className="num text-[var(--ink-soft)]" style={{fontSize: '14.5px'}}>71.2 &rarr; 79.8</div>
                    <div className="num change redness" style={{fontWeight: 700, fontSize: '16px'}}>+8.6</div>
                  </div>

                  <div className="wide-metric-row">
                    <div className="m-left">
                      <div className="dot radiance">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                      </div>
                      <span style={{fontWeight: 600, fontSize: '14.5px', color: 'var(--ink)'}}>Radiance score</span>
                    </div>
                    <div className="num text-[var(--ink-soft)]" style={{fontSize: '14.5px'}}>60.7 &rarr; 72.0</div>
                    <div className="num change radiance" style={{fontWeight: 700, fontSize: '16px'}}>+5.3</div>
                  </div>

                  <div className="wide-metric-row">
                    <div className="m-left">
                      <div className="dot texture">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg>
                      </div>
                      <span style={{fontWeight: 600, fontSize: '14.5px', color: 'var(--ink)'}}>Texture score</span>
                    </div>
                    <div className="num text-[var(--ink-soft)]" style={{fontSize: '14.5px'}}>67.4 &rarr; 68.1</div>
                    <div className="num change texture" style={{fontWeight: 700, fontSize: '16px'}}>+0.7</div>
                  </div>
                </div>
                
                <div className="proof-footer flex-col items-start gap-1" style={{borderTop: 'none', marginTop: '24px', paddingTop: '8px'}}>
                  <div className="flex items-center gap-1" style={{fontSize: '12px', color: 'var(--ink-soft)'}}>
                    Measured with YouCam Skin AI 🪄
                  </div>
                  <div style={{color: 'var(--muted)', fontSize: '11px', fontWeight: 400, marginTop: '2px'}}>
                    Personal observational result. Not proof of causation or medical diagnosis.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="cta-banner">
          <div className="cta-sparks" aria-hidden="true">
            <span style={{top:'18%', left:'12%', fontSize:'20px'}}>✦</span>
            <span style={{top:'28%', left:'88%', fontSize:'18px'}}>✦</span>
            <span style={{top:'55%', left:'18%', fontSize:'15px'}}>✦</span>
            <span style={{top:'65%', left:'82%', fontSize:'14px'}}>✦</span>
            <span style={{top:'75%', left:'28%', fontSize:'12px'}}>✦</span>
          </div>
          <div className="wrap relative z-10">
            <Reveal>
              <h2 style={{fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '14px'}}>
                Ready to Pruv it?
              </h2>
              <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.85)', marginBottom: '32px'}}>
                Start with a baseline. Finish with a review people can actually understand.
              </p>
              <div>
                <Link href="/start" className="btn btn-cta" style={{borderRadius: '12px', padding: '16px 36px', fontSize: '15px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', textDecoration: 'none'}}>
                  Start a Proof Review
                </Link>
              </div>
              <div className="cta-note" style={{marginTop: '20px', fontSize: '13px', color: 'rgba(255,255,255,0.65)'}}>
                No signup &middot; Browser based
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer style={{padding: '40px 0', borderTop: '1px solid var(--line)', background: 'var(--bg)'}}>
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-6" style={{width: '100%'}}>
          <Link href="#top" className="logo hover:opacity-90 transition-opacity" style={{textDecoration: 'none'}}>
            <Logo />
          </Link>
          <div className="foot-links flex flex-wrap items-center justify-center gap-6">
            <Link href="/how" style={{fontSize: '13.5px', color: 'var(--ink-soft)', fontWeight: 500}}>How it works</Link>
            <Link href="/demo" style={{fontSize: '13.5px', color: 'var(--ink-soft)', fontWeight: 500}}>Demo</Link>
            <Link href="/privacy" style={{fontSize: '13.5px', color: 'var(--ink-soft)', fontWeight: 500}}>Privacy</Link>
            <Link href="/terms" style={{fontSize: '13.5px', color: 'var(--ink-soft)', fontWeight: 500}}>Terms</Link>
            <Link href="https://github.com/NikhilRaikwar/Pruv" target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--ink)', fontWeight: 500}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
