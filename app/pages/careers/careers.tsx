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
const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 12v2M8 12v2M16 12v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const TrendingUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="17,6 23,6 23,12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const ZapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)
const DollarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const BookOpenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
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
  children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right'; threshold?: number
}) {
  const { ref, visible } = useInView(threshold)
  const baseClass = direction === 'left' ? 'cp-reveal-left' : direction === 'right' ? 'cp-reveal-right' : 'cp-reveal'
  const delayClass = delay ? `cp-reveal-delay-${delay}` : ''
  return (
    <div ref={ref} className={[baseClass, delayClass, visible ? 'cp-visible' : ''].join(' ')}>
      {children}
    </div>
  )
}

/* ─── Stat Item ─────────────────────────────────────────────────── */
function StatItem({ num, suffix = '', label, start }: { num: number; suffix?: string; label: string; start: boolean }) {
  const count = useCounter(num, 1800, start)
  return (
    <div className="cp-stat-item">
      <span className="cp-stat-num">{count}{suffix}</span>
      <span className="cp-stat-label">{label}</span>
    </div>
  )
}

/* ─── Data ──────────────────────────────────────────────────────── */
const whyItems = [
  {
    Icon: ShieldIcon,
    title: 'Recession-Resistant Industry',
    desc: 'Insurance is one of the most recession-resilient sectors. Through every economic cycle, businesses need protection.',
  },
  {
    Icon: TrendingUpIcon,
    title: 'High-Value Clients, Bigger Impact',
    desc: 'Focus on logistics, trucking, and commercial operations. Larger accounts, higher premiums, and the chance to become a trusted advisor who grows their book faster than personal lines alone.',
  },
  {
    Icon: BookOpenIcon,
    title: 'Skills That Translate Everywhere',
    desc: 'Commercial insurance sharpens risk management, underwriting, compliance, communication, and negotiation — valuable in any business role.',
  },
  {
    Icon: ZapIcon,
    title: 'Diverse Products = More Ways to Earn',
    desc: 'Offer a complete range of coverage tailored to every client — no gaps, no limits.',
  },
  {
    Icon: StarIcon,
    title: 'Access to 30+ A-Rated Carriers',
    desc: "You'll never have to turn away a client. We provide top-tier markets for almost every risk.",
  },
  {
    Icon: DollarIcon,
    title: 'Unlimited Earning Potential',
    desc: 'Your income grows with your performance. Whether you want to be a top producer or build a team, no caps, no ceilings.',
  },
  {
    Icon: GlobeIcon,
    title: 'Licensed in 10+ States',
    desc: "You'll have the flexibility to build your book locally or expand your reach across the country.",
  },
  {
    Icon: UsersIcon,
    title: 'Real Relationships, Real Impact',
    desc: 'Be a trusted advisor and solution provider to business owners who rely on your guidance every day.',
  },
  {
    Icon: HomeIcon,
    title: 'A Career That Fits Your Lifestyle',
    desc: 'Work remotely, in-office, or hybrid — whatever fits your lifestyle and goals.',
  },
]

const qualitiesLeft = [
  'Strong Communication Skills',
  'Customer Service Mindset',
  'Industry Knowledge (or Willingness to Learn)',
]
const qualitiesRight = [
  'Tech-Savvy',
  'Organized & Reliable',
  'Team Player with a Positive Attitude',
]

const stats = [
  { num: 30, suffix: '+', label: 'A-Rated carrier partners' },
  { num: 10, suffix: '+', label: 'States licensed' },
  { num: 100, suffix: '%', label: 'Commission uncapped' },
]

/* ─── CSS ───────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  .cp-root { font-family: 'Inter', sans-serif; background: #e7e9e5; color: #1C2130; }

  /* ── Hero ── */
  .cp-hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden; }
  .cp-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform: scale(1.05); animation: cp-heroZoom 14s ease-out forwards; }
  @keyframes cp-heroZoom { from { transform: scale(1.08); } to { transform: scale(1); } }
  .cp-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, rgba(8,14,26,.35) 0%, rgba(8,14,26,.65) 40%, rgba(8,14,26,.97) 100%);
  }
  .cp-hero-overlay-bottom {
    position: absolute; bottom: 0; left: 0; right: 0; height: 220px;
    background: linear-gradient(to top, #e7e9e5 0%, transparent 100%);
  }
  .cp-hero-content { position: relative; z-index: 2; padding: 56px 64px 72px; max-width: 900px; }
  @media (max-width: 768px) { .cp-hero-content { padding: 32px 24px 52px; } }

  .cp-badge {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid rgba(218,176,1,.5); color: #DAB001;
    font-size: 11px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase;
    padding: 6px 14px; border-radius: 2px; margin-bottom: 28px;
    background: rgba(218,176,1,.07);
    opacity: 0; animation: cp-fadeUp .6s .2s ease forwards;
  }
  .cp-hero-title {
    font-size: clamp(2.6rem, 5.5vw, 5rem); font-weight: 700; line-height: 1.06;
    color: #F0EBE1; margin: 0 0 16px;
    opacity: 0; animation: cp-fadeUp .7s .35s ease forwards;
  }
  .cp-hero-subtitle {
    font-size: clamp(1.1rem, 2vw, 1.5rem); font-weight: 300; color: #DAB001;
    margin: 0 0 20px; letter-spacing: .01em;
    opacity: 0; animation: cp-fadeUp .7s .45s ease forwards;
  }
  .cp-hero-summary {
    font-size: 1.05rem; line-height: 1.75; color: rgba(240,235,225,.72); max-width: 640px;
    margin: 0 0 40px; font-weight: 300;
    opacity: 0; animation: cp-fadeUp .7s .55s ease forwards;
  }
  .cp-hero-actions { display: flex; gap: 16px; flex-wrap: wrap; opacity: 0; animation: cp-fadeUp .7s .68s ease forwards; }

  /* ── Buttons ── */
  .cp-btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: #DAB001; color: #ffffff;
    font-size: .88rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
    padding: 14px 28px; border-radius: 2px; border: none; cursor: pointer; text-decoration: none;
    transition: background .2s, transform .2s, box-shadow .2s;
  }
  .cp-btn-primary:hover { background: #B89200; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(218,176,1,.3); }
  .cp-btn-outline {
    display: inline-flex; align-items: center; gap: 10px;
    border: 1px solid rgba(28,33,48,.25); color: #1C2130;
    font-size: .88rem; font-weight: 500; letter-spacing: .05em;
    padding: 14px 28px; border-radius: 2px; cursor: pointer; text-decoration: none;
    transition: border-color .2s, background .2s;
  }
  .cp-btn-outline:hover { border-color: rgba(218,176,1,.6); background: rgba(218,176,1,.08); }

  /* ── Stats bar ── */
  .cp-stats {
    display: grid; grid-template-columns: repeat(3, 1fr);
    background: #f0f2ee; border-top: 1px solid rgba(218,176,1,.15); border-bottom: 1px solid rgba(218,176,1,.15);
  }
  @media (max-width: 640px) { .cp-stats { grid-template-columns: 1fr; } }
  .cp-stat-item {
    padding: 44px 48px; border-right: 1px solid rgba(218,176,1,.12);
    display: flex; flex-direction: column; gap: 8px;
  }
  .cp-stat-item:last-child { border-right: none; }
  .cp-stat-num { font-size: 3.6rem; font-weight: 700; color: #DAB001; line-height: 1; letter-spacing: -.02em; }
  .cp-stat-label { font-size: .82rem; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: rgba(28,33,48,.5); }

  /* ── Section layout ── */
  .cp-section { padding: 96px 64px; max-width: 1280px; margin: 0 auto; }
  @media (max-width: 768px) { .cp-section { padding: 64px 24px; } }
  .cp-section-tag {
    font-size: 11px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase;
    color: #DAB001; margin-bottom: 16px; display: flex; align-items: center; gap: 12px;
  }
  .cp-section-tag::before { content: ''; display: block; width: 32px; height: 1px; background: #DAB001; }
  .cp-section-title { font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 700; color: #1C2130; line-height: 1.15; }
  .cp-section-title em { font-style: normal; color: #DAB001; }
  .cp-divider { width: 48px; height: 2px; background: linear-gradient(90deg, #DAB001, transparent); margin: 32px 0; }

  /* ── Why Join grid ── */
  .cp-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
  @media (max-width: 1024px) { .cp-why-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 640px) { .cp-why-grid { grid-template-columns: 1fr; } }
  .cp-why-card {
    padding: 36px 32px; background: #fff;
    border: 1px solid rgba(218,176,1,.12); border-radius: 4px;
    position: relative; overflow: hidden; box-shadow: 0 2px 16px rgba(28,33,48,.05);
    transition: border-color .3s, transform .3s, box-shadow .3s;
  }
  .cp-why-card:hover { border-color: rgba(218,176,1,.4); transform: translateY(-4px); box-shadow: 0 8px 32px rgba(28,33,48,.08); }
  .cp-why-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #DAB001, transparent);
    transform: scaleX(0); transform-origin: left; transition: transform .4s ease;
  }
  .cp-why-card:hover::after { transform: scaleX(1); }
  .cp-why-icon { color: #DAB001; margin-bottom: 18px; }
  .cp-why-num { font-size: 2.8rem; font-weight: 700; color: rgba(218,176,1,.1); position: absolute; top: 14px; right: 20px; }
  .cp-why-title { font-size: 1rem; font-weight: 600; color: #1C2130; margin-bottom: 10px; line-height: 1.3; }
  .cp-why-desc { font-size: .86rem; color: rgba(28,33,48,.5); line-height: 1.65; }

  /* ── Who We're Looking For — image + list ── */
  .cp-split-bg { background: #dfe1dc; padding: 96px 0; }
  .cp-split-inner { max-width: 1280px; margin: 0 auto; padding: 0 64px; }
  @media (max-width: 768px) { .cp-split-inner { padding: 0 24px; } }
  .cp-split-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; margin-top: 56px; }
  @media (max-width: 900px) { .cp-split-grid { grid-template-columns: 1fr; gap: 40px; } }

  .cp-split-img-wrap {
    position: relative; border-radius: 4px; overflow: hidden;
    height: 520px; box-shadow: 0 16px 48px rgba(28,33,48,.14);
  }
  .cp-split-img-wrap::before {
    content: ''; position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(160deg, transparent 50%, rgba(218,176,1,.12) 100%);
  }
  .cp-split-img-accent {
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px; z-index: 2;
    background: linear-gradient(90deg, #DAB001, transparent);
  }

  .cp-qualities-list { display: flex; flex-direction: column; gap: 14px; }
  .cp-quality-item {
    display: flex; align-items: center; gap: 14px;
    padding: 18px 24px; background: #f0f2ee;
    border: 1px solid rgba(218,176,1,.1); border-radius: 4px;
    transition: border-color .25s, background .25s, transform .25s;
  }
  .cp-quality-item:hover { border-color: rgba(218,176,1,.35); background: #fff; transform: translateX(4px); }
  .cp-quality-icon { color: #DAB001; flex-shrink: 0; }
  .cp-quality-text { font-size: .92rem; font-weight: 500; color: rgba(28,33,48,.8); }
  .cp-qualities-cta { margin-top: 32px; }

  /* ── Internship section ── */
  .cp-intern-section { padding: 96px 64px; max-width: 1280px; margin: 0 auto; }
  @media (max-width: 768px) { .cp-intern-section { padding: 64px 24px; } }
  .cp-intern-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; margin-top: 56px; }
  @media (max-width: 900px) { .cp-intern-grid { grid-template-columns: 1fr; gap: 40px; } }
  .cp-intern-img-wrap {
    position: relative; border-radius: 4px; overflow: hidden;
    height: 480px; box-shadow: 0 16px 48px rgba(28,33,48,.12);
    order: 2;
  }
  @media (max-width: 900px) { .cp-intern-img-wrap { order: unset; } }
  .cp-intern-img-wrap::before {
    content: ''; position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(160deg, transparent 50%, rgba(218,176,1,.1) 100%);
  }
  .cp-intern-img-accent {
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px; z-index: 2;
    background: linear-gradient(90deg, #DAB001, transparent);
  }
  .cp-intern-content { order: 1; }
  @media (max-width: 900px) { .cp-intern-content { order: unset; } }
  .cp-intern-text { font-size: 1.05rem; line-height: 1.85; color: rgba(28,33,48,.65); margin-bottom: 32px; }

  /* ── Quote box (reused in intern) ── */
  .cp-quote-box {
    position: relative; padding: 32px 36px; background: #fff;
    border: 1px solid rgba(218,176,1,.18); border-radius: 4px; overflow: hidden;
    box-shadow: 0 4px 24px rgba(28,33,48,.06); margin-bottom: 32px;
  }
  .cp-quote-box::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #DAB001, transparent);
  }
  .cp-quote-mark { font-size: 5rem; line-height: 1; color: rgba(218,176,1,.12); position: absolute; top: 8px; right: 20px; font-weight: 700; }
  .cp-quote-body { font-size: 1.1rem; font-style: italic; font-weight: 300; color: #3a4155; line-height: 1.65; }
  .cp-quote-sub { margin-top: 16px; font-size: .8rem; letter-spacing: .12em; text-transform: uppercase; color: rgba(28,33,48,.35); }

  /* ── CTA section ── */
  .cp-cta { position: relative; overflow: hidden; background: #1C2130; }
  .cp-cta-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 560px; }
  @media (max-width: 900px) { .cp-cta-grid { grid-template-columns: 1fr; } }
  .cp-cta-img-wrap { position: relative; overflow: hidden; min-height: 360px; }
  .cp-cta-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.65) saturate(.85); transition: transform 8s ease; }
  .cp-cta-img:hover { transform: scale(1.04); }
  .cp-cta-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent 50%, #1C2130 100%);
  }
  @media (max-width: 900px) { .cp-cta-img-overlay { background: linear-gradient(0deg, #1C2130 0%, transparent 60%); } }
  .cp-cta-content {
    display: flex; flex-direction: column; justify-content: center;
    padding: 72px 64px; position: relative; z-index: 1;
    border-top: 1px solid rgba(218,176,1,.15);
  }
  @media (max-width: 768px) { .cp-cta-content { padding: 48px 24px; } }
  .cp-cta-eyebrow { font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: #DAB001; font-weight: 600; margin-bottom: 16px; }
  .cp-cta-title { font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 700; color: #F0EBE1; line-height: 1.2; margin-bottom: 16px; }
  .cp-cta-text { font-size: .95rem; color: rgba(240,235,225,.6); line-height: 1.75; margin-bottom: 40px; max-width: 400px; }
  .cp-cta-separator { width: 40px; height: 1px; background: rgba(218,176,1,.4); margin: 28px 0; }
  .cp-cta-actions { display: flex; gap: 14px; flex-wrap: wrap; }
  .cp-cta .cp-btn-outline { border-color: rgba(240,235,225,.25); color: #EDE8DF; }
  .cp-cta .cp-btn-outline:hover { border-color: rgba(218,176,1,.5); background: rgba(218,176,1,.07); }

  /* ── Scroll reveal ── */
  .cp-reveal { opacity: 0; transform: translateY(28px); transition: opacity .65s ease, transform .65s ease; }
  .cp-reveal.cp-visible { opacity: 1; transform: none; }
  .cp-reveal-left { opacity: 0; transform: translateX(-28px); transition: opacity .65s ease, transform .65s ease; }
  .cp-reveal-left.cp-visible { opacity: 1; transform: none; }
  .cp-reveal-right { opacity: 0; transform: translateX(28px); transition: opacity .65s ease, transform .65s ease; }
  .cp-reveal-right.cp-visible { opacity: 1; transform: none; }
  .cp-reveal-delay-1 { transition-delay: .1s; }
  .cp-reveal-delay-2 { transition-delay: .2s; }
  .cp-reveal-delay-3 { transition-delay: .3s; }
  .cp-reveal-delay-4 { transition-delay: .4s; }
  .cp-reveal-delay-5 { transition-delay: .5s; }
  .cp-reveal-delay-6 { transition-delay: .6s; }

  @keyframes cp-fadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
  .cp-root ::-webkit-scrollbar { width: 6px; }
  .cp-root ::-webkit-scrollbar-track { background: #e7e9e5; }
  .cp-root ::-webkit-scrollbar-thumb { background: rgba(218,176,1,.3); border-radius: 3px; }
`

/* ─── Main Component ────────────────────────────────────────────── */
export default function CareersPage() {
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

      <div className="cp-root">

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="cp-hero">
          <Image
            src="/Careers.png"
            alt="Careers at Prime Sentinel"
            fill
            priority
            sizes="100vw"
            className="cp-hero-img"
            style={{ objectFit: 'cover' }}
          />
          <div className="cp-hero-overlay" />
          <div className="cp-hero-overlay-bottom" />

          <div className="cp-hero-content">
            <div className="cp-badge">
              <BriefcaseIcon />
              Careers
            </div>
            <h1 className="cp-hero-title">
              Looking for a Rewarding Career in Insurance?
            </h1>
            <p className="cp-hero-subtitle">
              Build a Career with Purpose, Flexibility &amp; Growth
            </p>
            <p className="cp-hero-summary">
              Join Prime Sentinel Insurance Solutions. We&apos;re hiring driven individuals — whether you&apos;re experienced or just starting out — who want to make a real impact in the business world.
            </p>
            <div className="cp-hero-actions">
              <a href="#contact" className="cp-btn-primary">
                Contact Us Today <ArrowRight />
              </a>
              <a href="#why-join" className="cp-btn-outline">
                Why Join Us
              </a>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ──────────────────────────────────────────── */}
        <div className="cp-stats" ref={statsRef}>
          {stats.map((s, i) => (
            <StatItem key={i} num={s.num} suffix={s.suffix} label={s.label} start={statsVisible} />
          ))}
        </div>

        {/* ── Why Join ───────────────────────────────────────────── */}
        <section className="cp-section" id="why-join">
          <Reveal>
            <div className="cp-section-tag">Why Join Our Team?</div>
            <h2 className="cp-section-title">
              A career built for <em>growth</em>
            </h2>
            <p style={{ marginTop: 16, fontSize: '1.05rem', lineHeight: 1.75, color: 'rgba(28,33,48,.6)', maxWidth: 680, fontWeight: 300 }}>
              We specialize in Business &amp; Transportation Insurance, along with a full suite of solutions including Commercial Property, Workers Compensation, Professional Liability, EPLI, Umbrella, and Personal Lines.
            </p>
          </Reveal>
          <div className="cp-why-grid">
            {whyItems.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={Math.min((i % 3 + 1), 4) as 1 | 2 | 3 | 4}>
                <div className="cp-why-card">
                  <span className="cp-why-num">0{i + 1}</span>
                  <div className="cp-why-icon"><Icon /></div>
                  <div className="cp-why-title">{title}</div>
                  <div className="cp-why-desc">{desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={2}>
            <div style={{ marginTop: 56, textAlign: 'center' }}>
              <p style={{ fontSize: '1.1rem', color: 'rgba(28,33,48,.65)', marginBottom: 28, fontWeight: 300 }}>
                Ready to build a meaningful career in one of the most stable and rewarding industries?
              </p>
              <a href="#contact" className="cp-btn-primary">
                Contact Us Today <ArrowRight />
              </a>
            </div>
          </Reveal>
        </section>

        {/* ── Who We're Looking For ──────────────────────────────── */}
        <div className="cp-split-bg">
          <div className="cp-split-inner">
            <Reveal>
              <div className="cp-section-tag">Who We&apos;re Looking For</div>
              <h2 className="cp-section-title">
                If you&apos;re someone <em>like this</em>
              </h2>
            </Reveal>
            <div className="cp-split-grid">
              <Reveal direction="left">
                <div className="cp-split-img-wrap">
                  <Image
                    src="/someone.webp"
                    alt="The kind of person we're looking for"
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="cp-split-img-accent" />
                </div>
              </Reveal>
              <Reveal direction="right">
                <div>
                  <div className="cp-qualities-list">
                    {[...qualitiesLeft, ...qualitiesRight].map((q, i) => (
                      <div key={q} className="cp-quality-item" style={{ transitionDelay: `${i * 0.06}s` }}>
                        <span className="cp-quality-icon"><CheckIcon /></span>
                        <span className="cp-quality-text">{q}</span>
                      </div>
                    ))}
                  </div>
                  <div className="cp-qualities-cta">
                    <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1C2130', marginBottom: 20 }}>
                      Then we want to hear from you.
                    </p>
                    <a href="#contact" className="cp-btn-primary">
                      Contact Us Today <ArrowRight />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── Internship ─────────────────────────────────────────── */}
        <section className="cp-intern-section">
          <Reveal>
            <div className="cp-section-tag">Internship Opportunities</div>
            <h2 className="cp-section-title">
              Kickstart your <em>journey</em>
            </h2>
          </Reveal>
          <div className="cp-intern-grid">
            <div className="cp-intern-content">
              <Reveal direction="left">
                <div className="cp-quote-box">
                  <span className="cp-quote-mark">&ldquo;</span>
                  <p className="cp-quote-body">
                    Kickstart your journey in a career that makes a real impact.
                  </p>
                  <div className="cp-quote-sub">Prime Sentinel Insurance Solutions</div>
                </div>
                <p className="cp-intern-text">
                  We offer internship opportunities for college students and recent graduates eager to gain hands-on experience in a fast-growing, recession-resistant industry. Learn the foundations of commercial and personal insurance, work alongside experienced professionals, and develop real-world skills that set you apart.
                </p>
                <a href="#contact" className="cp-btn-primary">
                  Apply Today <ArrowRight />
                </a>
              </Reveal>
            </div>
            <div className="cp-intern-img-wrap">
              <Reveal direction="right">
                <Image
                  src="/intern.webp"
                  alt="Internship opportunities at Prime Sentinel"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className="cp-intern-img-accent" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <section className="cp-cta" id="contact">
          <div className="cp-cta-grid">
            <div className="cp-cta-img-wrap">
              <Image
                src="/CareersCTA.png"
                alt="Build your career with Prime Sentinel"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="cp-cta-img"
                style={{ objectFit: 'cover' }}
              />
              <div className="cp-cta-img-overlay" />
            </div>
            <div className="cp-cta-content">
              <Reveal>
                <p className="cp-cta-eyebrow">Ready to get started?</p>
                <h2 className="cp-cta-title">Build a career with purpose, flexibility &amp; growth</h2>
                <div className="cp-cta-separator" />
                <p className="cp-cta-text">
                  Whether you&apos;re an experienced professional or just starting out, Prime Sentinel gives you the tools, markets, and support to build something extraordinary.
                </p>
                <div className="cp-cta-actions">
                  <a href="tel:8186000821" className="cp-btn-primary">
                    <PhoneIcon />
                    Contact Us Today
                  </a>
                  <Link href="/#products" className="cp-btn-outline">
                    View Our Products
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
