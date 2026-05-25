'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/* ─── Icons ─────────────────────────────────────────────────────── */
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.1 19.79 19.79 0 01.01 2.4 2 2 0 012 .22h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const HandshakeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ZapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)
const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 9h18M9 9v12M15 9v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

/* ─── Hooks ─────────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

/* ─── Reveal wrapper ────────────────────────────────────────────── */
function Reveal({ children, delay = 0, direction = 'up', threshold = 0.12 }: {
  children: React.ReactNode; delay?: number; direction?: 'up' | 'left'; threshold?: number
}) {
  const { ref, visible } = useInView(threshold)
  const baseClass = direction === 'left' ? 'fp-reveal-left' : 'fp-reveal'
  const delayClass = delay ? `fp-reveal-delay-${delay}` : ''
  return (
    <div ref={ref} className={[baseClass, delayClass, visible ? 'fp-visible' : ''].join(' ')}>
      {children}
    </div>
  )
}

/* ─── Stat Item ─────────────────────────────────────────────────── */
function StatItem({ num, suffix = '', label, start }: { num: number; suffix?: string; label: string; start: boolean }) {
  const count = useCounter(num, 1800, start)
  return (
    <div className="fp-stat-item">
      <span className="fp-stat-num">{count}{suffix}</span>
      <span className="fp-stat-label">{label}</span>
    </div>
  )
}

/* ─── Data ──────────────────────────────────────────────────────── */
const benefits = [
  'Pre-approved – No credit check',
  'Flexible payment options with no pre-payment penalties',
  'Tailored terms that fit your business needs',
  'Easy online account management',
  'Reprint capabilities for all documents and notices',
  'Final Approach Program – proactive reminders before cancellations',
  'Credit reference available if requested',
  'Potential tax-deductible interest',
  'Ability to finance policies above $1M+',
]

const highlights = [
  {
    Icon: HandshakeIcon,
    title: 'Your Advocate, Not the Lender',
    desc: 'We shop and negotiate across our large pool of financing partners on your behalf, ensuring you always get the most competitive terms available.',
  },
  {
    Icon: ZapIcon,
    title: 'Fast & Flexible Approvals',
    desc: 'No credit checks, no red tape. Pre-approved financing with flexible payment schedules and zero pre-payment penalties.',
  },
  {
    Icon: BuildingIcon,
    title: 'Built for Business Growth',
    desc: 'Tailored structures — including policies above $1M+ — so protecting your business never comes at the expense of growing it.',
  },
]

const stats = [
  { num: 50, suffix: '+', label: 'Financing partners nationwide' },
  { num: 1, suffix: 'M+', label: 'Policies financed above $1M' },
  { num: 24, suffix: '/7', label: 'Account access & support' },
]

/* ─── CSS ───────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  .fp-root { font-family: 'Inter', sans-serif; background: #e7e9e5; color: #1C2130; }

  /* ── Hero ── */
  .fp-hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden; }
  .fp-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform: scale(1.05); animation: fp-heroZoom 14s ease-out forwards; }
  @keyframes fp-heroZoom { from { transform: scale(1.08); } to { transform: scale(1); } }
  .fp-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, rgba(8,14,26,.35) 0%, rgba(8,14,26,.65) 40%, rgba(8,14,26,.97) 100%);
  }
  .fp-hero-overlay-bottom {
    position: absolute; bottom: 0; left: 0; right: 0; height: 220px;
    background: linear-gradient(to top, #e7e9e5 0%, transparent 100%);
  }
  .fp-hero-content { position: relative; z-index: 2; padding: 56px 64px 72px; max-width: 860px; }
  @media (max-width: 768px) { .fp-hero-content { padding: 32px 24px 52px; } }

  .fp-badge {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid rgba(218,176,1,.5); color: #DAB001;
    font-size: 11px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase;
    padding: 6px 14px; border-radius: 2px; margin-bottom: 28px;
    background: rgba(218,176,1,.07);
    opacity: 0; animation: fp-fadeUp .6s .2s ease forwards;
  }
  .fp-hero-title {
    font-size: clamp(2.8rem, 6vw, 5.2rem); font-weight: 700; line-height: 1.04;
    color: #F0EBE1; margin: 0 0 24px;
    opacity: 0; animation: fp-fadeUp .7s .35s ease forwards;
  }
  .fp-hero-title em { font-style: normal; color: #DAB001; font-weight: 300; }
  .fp-hero-summary {
    font-size: 1.1rem; line-height: 1.7; color: rgba(240,235,225,.75); max-width: 600px;
    margin: 0 0 40px; font-weight: 300;
    opacity: 0; animation: fp-fadeUp .7s .5s ease forwards;
  }
  .fp-hero-actions { display: flex; gap: 16px; flex-wrap: wrap; opacity: 0; animation: fp-fadeUp .7s .65s ease forwards; }

  /* ── Buttons ── */
  .fp-btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: #DAB001; color: #ffffff;
    font-size: .88rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
    padding: 14px 28px; border-radius: 2px; border: none; cursor: pointer; text-decoration: none;
    transition: background .2s, transform .2s, box-shadow .2s;
  }
  .fp-btn-primary:hover { background: #B89200; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(218,176,1,.3); }
  .fp-btn-outline {
    display: inline-flex; align-items: center; gap: 10px;
    border: 1px solid rgba(28,33,48,.25); color: #1C2130;
    font-size: .88rem; font-weight: 500; letter-spacing: .05em;
    padding: 14px 28px; border-radius: 2px; cursor: pointer; text-decoration: none;
    transition: border-color .2s, background .2s;
  }
  .fp-btn-outline:hover { border-color: rgba(218,176,1,.6); background: rgba(218,176,1,.08); }

  /* ── Stats bar ── */
  .fp-stats {
    display: grid; grid-template-columns: repeat(3, 1fr);
    background: #f0f2ee; border-top: 1px solid rgba(218,176,1,.15); border-bottom: 1px solid rgba(218,176,1,.15);
  }
  @media (max-width: 640px) { .fp-stats { grid-template-columns: 1fr; } }
  .fp-stat-item {
    padding: 44px 48px; border-right: 1px solid rgba(218,176,1,.12);
    display: flex; flex-direction: column; gap: 8px;
  }
  .fp-stat-item:last-child { border-right: none; }
  .fp-stat-num {
    font-size: 3.6rem; font-weight: 700;
    color: #DAB001; line-height: 1; letter-spacing: -.02em;
  }
  .fp-stat-label { font-size: .82rem; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: rgba(28,33,48,.5); }

  /* ── Section layout ── */
  .fp-section { padding: 96px 64px; max-width: 1280px; margin: 0 auto; }
  @media (max-width: 768px) { .fp-section { padding: 64px 24px; } }
  .fp-section-tag {
    font-size: 11px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase;
    color: #DAB001; margin-bottom: 16px; display: flex; align-items: center; gap: 12px;
  }
  .fp-section-tag::before { content: ''; display: block; width: 32px; height: 1px; background: #DAB001; }
  .fp-section-title {
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 700; color: #1C2130; line-height: 1.15; margin-bottom: 0;
  }
  .fp-section-title em { font-style: normal; color: #DAB001; }
  .fp-divider { width: 48px; height: 2px; background: linear-gradient(90deg, #DAB001, transparent); margin: 32px 0; }

  /* ── Why Choose — two-col intro ── */
  .fp-intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  @media (max-width: 900px) { .fp-intro-grid { grid-template-columns: 1fr; gap: 48px; } }
  .fp-intro-text { font-size: 1.05rem; line-height: 1.85; color: rgba(28,33,48,.65); font-weight: 400; }

  .fp-quote-box {
    position: relative; padding: 40px; background: #fff;
    border: 1px solid rgba(218,176,1,.18); border-radius: 4px; overflow: hidden;
    box-shadow: 0 4px 24px rgba(28,33,48,.06);
  }
  .fp-quote-box::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #DAB001, transparent);
  }
  .fp-quote-mark {
    font-size: 6rem; line-height: 1; color: rgba(218,176,1,.12);
    position: absolute; top: 10px; right: 24px; font-weight: 700;
  }
  .fp-quote-body { font-size: 1.25rem; font-style: italic; font-weight: 300; color: #3a4155; line-height: 1.6; }
  .fp-quote-sub { margin-top: 20px; font-size: .82rem; letter-spacing: .12em; text-transform: uppercase; color: rgba(28,33,48,.35); }

  /* ── Highlights grid ── */
  .fp-highlights-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  @media (max-width: 900px) { .fp-highlights-grid { grid-template-columns: 1fr; gap: 16px; } }
  .fp-highlight-card {
    padding: 40px 36px; background: #fff;
    border: 1px solid rgba(218,176,1,.12); border-radius: 4px;
    position: relative; overflow: hidden; box-shadow: 0 2px 16px rgba(28,33,48,.05);
    transition: border-color .3s, transform .3s, box-shadow .3s;
  }
  .fp-highlight-card:hover { border-color: rgba(218,176,1,.4); transform: translateY(-4px); box-shadow: 0 8px 32px rgba(28,33,48,.08); }
  .fp-highlight-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #DAB001, transparent);
    transform: scaleX(0); transform-origin: left; transition: transform .4s ease;
  }
  .fp-highlight-card:hover::after { transform: scaleX(1); }
  .fp-highlight-icon { color: #DAB001; margin-bottom: 20px; }
  .fp-highlight-num {
    font-size: 3rem; font-weight: 700;
    color: rgba(218,176,1,.12); position: absolute; top: 16px; right: 24px;
  }
  .fp-highlight-title { font-size: 1.05rem; font-weight: 600; color: #1C2130; margin-bottom: 8px; }
  .fp-highlight-desc { font-size: .88rem; color: rgba(28,33,48,.5); line-height: 1.6; }

  /* ── Benefits list section ── */
  .fp-benefits-bg { background: #dfe1dc; padding: 96px 0; }
  .fp-benefits-inner { max-width: 1280px; margin: 0 auto; padding: 0 64px; }
  @media (max-width: 768px) { .fp-benefits-inner { padding: 0 24px; } }
  .fp-benefits-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px; margin-top: 56px;
  }
  .fp-benefit-item {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 24px 28px; background: #f0f2ee;
    border: 1px solid rgba(218,176,1,.1); border-radius: 4px;
    transition: border-color .25s, background .25s;
  }
  .fp-benefit-item:hover { border-color: rgba(218,176,1,.35); background: #fff; }
  .fp-benefit-icon { color: #DAB001; margin-top: 2px; flex-shrink: 0; }
  .fp-benefit-text { font-size: .9rem; color: rgba(28,33,48,.75); line-height: 1.5; font-weight: 500; }

  /* ── CTA section ── */
  .fp-cta { position: relative; overflow: hidden; background: #1C2130; }
  .fp-cta-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 560px; }
  @media (max-width: 900px) { .fp-cta-grid { grid-template-columns: 1fr; } }
  .fp-cta-img-wrap { position: relative; overflow: hidden; min-height: 360px; }
  .fp-cta-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.65) saturate(.85); transition: transform 8s ease; }
  .fp-cta-img:hover { transform: scale(1.04); }
  .fp-cta-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent 50%, #1C2130 100%);
  }
  @media (max-width: 900px) { .fp-cta-img-overlay { background: linear-gradient(0deg, #1C2130 0%, transparent 60%); } }
  .fp-cta-content {
    display: flex; flex-direction: column; justify-content: center;
    padding: 72px 64px; position: relative; z-index: 1;
    border-top: 1px solid rgba(218,176,1,.15);
  }
  @media (max-width: 768px) { .fp-cta-content { padding: 48px 24px; } }
  .fp-cta-eyebrow { font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: #DAB001; font-weight: 600; margin-bottom: 16px; }
  .fp-cta-title { font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 700; color: #F0EBE1; line-height: 1.2; margin-bottom: 16px; }
  .fp-cta-text { font-size: .95rem; color: rgba(240,235,225,.6); line-height: 1.75; margin-bottom: 40px; max-width: 400px; }
  .fp-cta-separator { width: 40px; height: 1px; background: rgba(218,176,1,.4); margin: 28px 0; }
  .fp-cta-actions { display: flex; gap: 14px; flex-wrap: wrap; }

  /* dark bg overrides */
  .fp-cta .fp-btn-outline { border-color: rgba(240,235,225,.25); color: #EDE8DF; }
  .fp-cta .fp-btn-outline:hover { border-color: rgba(218,176,1,.5); background: rgba(218,176,1,.07); }

  /* ── Scroll reveal ── */
  .fp-reveal { opacity: 0; transform: translateY(28px); transition: opacity .65s ease, transform .65s ease; }
  .fp-reveal.fp-visible { opacity: 1; transform: none; }
  .fp-reveal-delay-1 { transition-delay: .1s; }
  .fp-reveal-delay-2 { transition-delay: .2s; }
  .fp-reveal-delay-3 { transition-delay: .3s; }
  .fp-reveal-delay-4 { transition-delay: .4s; }
  .fp-reveal-left { opacity: 0; transform: translateX(-28px); transition: opacity .65s ease, transform .65s ease; }
  .fp-reveal-left.fp-visible { opacity: 1; transform: none; }

  @keyframes fp-fadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }

  .fp-root ::-webkit-scrollbar { width: 6px; }
  .fp-root ::-webkit-scrollbar-track { background: #e7e9e5; }
  .fp-root ::-webkit-scrollbar-thumb { background: rgba(218,176,1,.3); border-radius: 3px; }
`

/* ─── Main Component ────────────────────────────────────────────── */
export default function FinancingPage() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="fp-root">

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="fp-hero">
          <Image
            src="/Finance.webp"
            alt="Financing"
            fill
            priority
            sizes="100vw"
            className="fp-hero-img"
            style={{ objectFit: 'cover' }}
          />
          <div className="fp-hero-overlay" />
          <div className="fp-hero-overlay-bottom" />

          <div className="fp-hero-content">
            <div className="fp-badge">
              <ShieldIcon />
              Financing
            </div>
            <h1 className="fp-hero-title">
              Flexible financing <em>solutions</em>
            </h1>
            <p className="fp-hero-summary">
              Prime Sentinel isn&apos;t the lender — we&apos;re your advocate. We shop and negotiate across our network of financing partners so protecting your business never comes at the expense of growing it.
            </p>
            <div className="fp-hero-actions">
              <a href="#contact" className="fp-btn-primary">
                Get Financing <ArrowRight />
              </a>
              <a href="#benefits" className="fp-btn-outline">
                Explore Benefits
              </a>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ──────────────────────────────────────────── */}
        <div className="fp-stats" ref={statsRef}>
          {stats.map((s, i) => (
            <StatItem key={i} num={s.num} suffix={s.suffix} label={s.label} start={statsVisible} />
          ))}
        </div>

        {/* ── Why Choose Prime Sentinel ──────────────────────────── */}
        <section className="fp-section">
          <div className="fp-intro-grid">
            <Reveal direction="left">
              <div>
                <div className="fp-section-tag">Why Choose Prime Sentinel?</div>
                <h2 className="fp-section-title">
                  Your advocate, <em>not</em> the lender
                </h2>
                <div className="fp-divider" />
                <p className="fp-intro-text">
                  Prime Sentinel isn&apos;t the lender — we&apos;re your advocate. By leveraging our large pool of financing partners, we shop and negotiate on your behalf to secure competitive terms and flexible options. Our goal is simple: to make sure protecting your business doesn&apos;t come at the expense of growing it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="fp-quote-box">
                <span className="fp-quote-mark">&ldquo;</span>
                <p className="fp-quote-body">
                  Our goal is simple: to make sure protecting your business doesn&apos;t come at the expense of growing it.
                </p>
                <div className="fp-quote-sub">Prime Sentinel Insurance</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Highlights ─────────────────────────────────────────── */}
        <section className="fp-section" style={{ paddingTop: 0 }}>
          <Reveal>
            <div className="fp-section-tag">How it works</div>
            <h2 className="fp-section-title" style={{ marginBottom: 48 }}>
              Built around your <em>business</em>
            </h2>
          </Reveal>
          <div className="fp-highlights-grid">
            {highlights.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="fp-highlight-card">
                  <span className="fp-highlight-num">0{i + 1}</span>
                  <div className="fp-highlight-icon"><Icon /></div>
                  <div className="fp-highlight-title">{title}</div>
                  <div className="fp-highlight-desc">{desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Benefits List ──────────────────────────────────────── */}
        <div className="fp-benefits-bg" id="benefits">
          <div className="fp-benefits-inner">
            <Reveal>
              <div className="fp-section-tag">Through our financing partners</div>
              <h2 className="fp-section-title">
                Everything you&apos;ll <em>enjoy</em>
              </h2>
            </Reveal>
            <div className="fp-benefits-grid">
              {benefits.map((item, i) => (
                <Reveal key={item} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                  <div className="fp-benefit-item">
                    <span className="fp-benefit-icon"><CheckIcon /></span>
                    <span className="fp-benefit-text">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <section className="fp-cta" id="contact">
          <div className="fp-cta-grid">
            {/* Image side */}
            <div className="fp-cta-img-wrap">
              <Image
                src="/FinanceCTA.webp"
                alt="Get financing"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="fp-cta-img"
                style={{ objectFit: 'cover' }}
              />
              <div className="fp-cta-img-overlay" />
            </div>

            {/* Content side */}
            <div className="fp-cta-content">
              <Reveal>
                <p className="fp-cta-eyebrow">Ready to get started?</p>
                <h2 className="fp-cta-title">Secure financing that works for your business</h2>
                <div className="fp-cta-separator" />
                <p className="fp-cta-text">
                  Let our team of experts shop your financing options and negotiate the best terms — so you can focus on what matters most: running your business.
                </p>
                <div className="fp-cta-actions">
                  <a href="tel:8186000821" className="fp-btn-primary">
                    <PhoneIcon />
                    Contact Us Today
                  </a>
                  <Link href="/#products" className="fp-btn-outline">
                    View All Products
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
