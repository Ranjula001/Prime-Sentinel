'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { Product } from '@/app/data/products'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  product: Product
  catalog: Product[]
}

/* ─── Hooks ────────────────────────────────────────────────────── */
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

function useInView(threshold = 0.15) {
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

/* ─── Highlight Icons ───────────────────────────────────────────── */
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)
const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 9h18M9 9v12M15 9v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
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
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const highlightIcons = [ShieldIcon, StarIcon, BuildingIcon]

/* ─── CSS ────────────────────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  .psi-root { font-family: 'Inter', sans-serif; background: #e7e9e5; color: #1C2130; }

  /* Hero */
  .psi-hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden; }
  .psi-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform: scale(1.05); animation: heroZoom 14s ease-out forwards; }
  @keyframes heroZoom { from { transform: scale(1.08); } to { transform: scale(1); } }
  .psi-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, rgba(8,14,26,.35) 0%, rgba(8,14,26,.65) 40%, rgba(8,14,26,.97) 100%);
  }
  .psi-hero-overlay-bottom {
    position: absolute; bottom: 0; left: 0; right: 0; height: 220px;
    background: linear-gradient(to top, #e7e9e5 0%, transparent 100%);
  }
  .psi-hero-content { position: relative; z-index: 2; padding: 56px 64px 72px; max-width: 860px; }
  @media (max-width: 768px) { .psi-hero-content { padding: 32px 24px 52px; } }

  .psi-badge {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid rgba(218,176,1,.5); color: #DAB001;
    font-size: 11px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase;
    padding: 6px 14px; border-radius: 2px; margin-bottom: 28px;
    background: rgba(218,176,1,.07);
    opacity: 0; animation: fadeUp .6s .2s ease forwards;
  }
  .psi-hero-title {
    font-family: 'Inter', sans-serif;
    font-size: clamp(2.8rem, 6vw, 5.2rem); font-weight: 700; line-height: 1.04;
    color: #F0EBE1; margin: 0 0 24px;
    opacity: 0; animation: fadeUp .7s .35s ease forwards;
  }
  .psi-hero-title em { font-style: normal; color: #DAB001; font-weight: 300; }
  .psi-hero-summary {
    font-size: 1.1rem; line-height: 1.7; color: rgba(240,235,225,.75); max-width: 600px;
    margin: 0 0 40px; font-weight: 300;
    opacity: 0; animation: fadeUp .7s .5s ease forwards;
  }
  .psi-hero-actions { display: flex; gap: 16px; flex-wrap: wrap; opacity: 0; animation: fadeUp .7s .65s ease forwards; }

  /* Buttons */
  .psi-btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: #DAB001; color: #ffffff;
    font-size: .88rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
    padding: 14px 28px; border-radius: 2px; border: none; cursor: pointer; text-decoration: none;
    transition: background .2s, transform .2s, box-shadow .2s;
  }
  .psi-btn-primary:hover { background: #B89200; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(218,176,1,.3); }
  .psi-btn-outline {
    display: inline-flex; align-items: center; gap: 10px;
    border: 1px solid rgba(28,33,48,.25); color: #1C2130;
    font-size: .88rem; font-weight: 500; letter-spacing: .05em;
    padding: 14px 28px; border-radius: 2px; cursor: pointer; text-decoration: none;
    transition: border-color .2s, background .2s;
  }
  .psi-btn-outline:hover { border-color: rgba(218,176,1,.6); background: rgba(218,176,1,.08); }

  /* Stats bar */
  .psi-stats {
    display: grid; grid-template-columns: repeat(3, 1fr);
    background: #f0f2ee; border-top: 1px solid rgba(218,176,1,.15); border-bottom: 1px solid rgba(218,176,1,.15);
  }
  @media (max-width: 640px) { .psi-stats { grid-template-columns: 1fr; } }
  .psi-stat-item {
    padding: 44px 48px; border-right: 1px solid rgba(218,176,1,.12);
    display: flex; flex-direction: column; gap: 8px;
  }
  .psi-stat-item:last-child { border-right: none; }
  .psi-stat-num {
    font-family: 'Inter', sans-serif; font-size: 3.6rem; font-weight: 700;
    color: #DAB001; line-height: 1; letter-spacing: -.02em;
  }
  .psi-stat-num sup { font-size: 1.6rem; vertical-align: top; margin-top: 8px; }
  .psi-stat-label { font-size: .82rem; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: rgba(28,33,48,.5); }

  /* Section layout */
  .psi-section { padding: 96px 64px; max-width: 1280px; margin: 0 auto; }
  @media (max-width: 768px) { .psi-section { padding: 64px 24px; } }
  .psi-section-tag {
    font-size: 11px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase;
    color: #DAB001; margin-bottom: 16px; display: flex; align-items: center; gap: 12px;
  }
  .psi-section-tag::before { content: ''; display: block; width: 32px; height: 1px; background: #DAB001; }
  .psi-section-title {
    font-family: 'Inter', sans-serif; font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 700; color: #1C2130; line-height: 1.15; margin-bottom: 0;
  }
  .psi-section-title em { font-style: normal; color: #DAB001; }

  /* About / Description */
  .psi-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  @media (max-width: 900px) { .psi-about-grid { grid-template-columns: 1fr; gap: 48px; } }
  .psi-about-text { font-size: 1.05rem; line-height: 1.85; color: rgba(28,33,48,.65); font-weight: 400; }
  .psi-divider { width: 48px; height: 2px; background: linear-gradient(90deg, #DAB001, transparent); margin: 32px 0; }
  .psi-decorative-box {
    position: relative; padding: 40px; background: #fff;
    border: 1px solid rgba(218,176,1,.18); border-radius: 4px; overflow: hidden; box-shadow: 0 4px 24px rgba(28,33,48,.06);
  }
  .psi-decorative-box::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #DAB001, transparent);
  }
  .psi-decorative-quote {
    font-family: 'Inter', sans-serif; font-size: 6rem; line-height: 1;
    color: rgba(218,176,1,.12); position: absolute; top: 10px; right: 24px; font-weight: 700;
  }
  .psi-decorative-body { font-size: 1.25rem; font-family: 'Inter', sans-serif; font-style: italic; font-weight: 300; color: #3a4155; line-height: 1.6; }
  .psi-decorative-sub { margin-top: 20px; font-size: .82rem; letter-spacing: .12em; text-transform: uppercase; color: rgba(28,33,48,.35); }

  /* Highlights */
  .psi-highlights-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  @media (max-width: 900px) { .psi-highlights-grid { grid-template-columns: 1fr; gap: 16px; } }
  .psi-highlight-card {
    padding: 40px 36px; background: #fff;
    border: 1px solid rgba(218,176,1,.12); border-radius: 4px;
    position: relative; overflow: hidden; box-shadow: 0 2px 16px rgba(28,33,48,.05);
    transition: border-color .3s, transform .3s, box-shadow .3s;
    cursor: default;
  }
  .psi-highlight-card:hover { border-color: rgba(218,176,1,.4); transform: translateY(-4px); box-shadow: 0 8px 32px rgba(28,33,48,.08); }
  .psi-highlight-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #DAB001, transparent);
    transform: scaleX(0); transform-origin: left; transition: transform .4s ease;
  }
  .psi-highlight-card:hover::after { transform: scaleX(1); }
  .psi-highlight-icon { color: #DAB001; margin-bottom: 20px; }
  .psi-highlight-num {
    font-family: 'Inter', sans-serif; font-size: 3rem; font-weight: 700;
    color: rgba(218,176,1,.12); position: absolute; top: 16px; right: 24px;
  }
  .psi-highlight-title { font-size: 1.05rem; font-weight: 600; color: #1C2130; margin-bottom: 8px; }
  .psi-highlight-desc { font-size: .88rem; color: rgba(28,33,48,.5); line-height: 1.6; }

  /* Protects section */
  .psi-protects-bg { background: #dfe1dc; padding: 96px 0; }
  .psi-protects-inner { max-width: 1280px; margin: 0 auto; padding: 0 64px; }
  @media (max-width: 768px) { .psi-protects-inner { padding: 0 24px; } }
  .psi-protects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; margin-top: 56px; }
  .psi-protects-item {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 24px 28px; background: #f0f2ee;
    border: 1px solid rgba(218,176,1,.1); border-radius: 4px;
    transition: border-color .25s, background .25s;
  }
  .psi-protects-item:hover { border-color: rgba(218,176,1,.35); background: #fff; }
  .psi-protects-icon { color: #DAB001; margin-top: 2px; flex-shrink: 0; }
  .psi-protects-text { font-size: .9rem; color: rgba(28,33,48,.75); line-height: 1.5; }

  /* Related products */
  .psi-related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; margin-top: 48px; }
  .psi-related-card {
    padding: 28px 28px 24px; background: #fff;
    border: 1px solid rgba(218,176,1,.1); border-radius: 4px;
    text-decoration: none; display: flex; flex-direction: column; gap: 10px;
    box-shadow: 0 2px 12px rgba(28,33,48,.04);
    transition: border-color .25s, transform .25s, box-shadow .25s;
  }
  .psi-related-card:hover { border-color: rgba(218,176,1,.4); transform: translateY(-3px); box-shadow: 0 8px 28px rgba(28,33,48,.08); }
  .psi-related-cat { font-size: .75rem; letter-spacing: .12em; text-transform: uppercase; color: #DAB001; }
  .psi-related-title { font-size: 1rem; font-weight: 600; color: #1C2130; line-height: 1.3; }
  .psi-related-summary { font-size: .82rem; color: rgba(28,33,48,.45); line-height: 1.5; }
  .psi-related-arrow { color: #DAB001; margin-top: auto; }

  /* CTA */
  .psi-cta { position: relative; overflow: hidden; background: #1C2130; }
  .psi-cta-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 560px; }
  @media (max-width: 900px) { .psi-cta-grid { grid-template-columns: 1fr; } }
  .psi-cta-img-wrap { position: relative; overflow: hidden; min-height: 360px; }
  .psi-cta-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.65) saturate(.85); transition: transform 8s ease; }
  .psi-cta-img:hover { transform: scale(1.04); }
  .psi-cta-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent 50%, #1C2130 100%);
  }
  @media (max-width: 900px) { .psi-cta-img-overlay { background: linear-gradient(0deg, #1C2130 0%, transparent 60%); } }
  .psi-cta-content {
    display: flex; flex-direction: column; justify-content: center;
    padding: 72px 64px; position: relative; z-index: 1;
    border-top: 1px solid rgba(218,176,1,.15);
  }
  @media (max-width: 768px) { .psi-cta-content { padding: 48px 24px; } }
  .psi-cta-eyebrow { font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: #DAB001; font-weight: 600; margin-bottom: 16px; }
  .psi-cta-title { font-family: 'Inter', sans-serif; font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 700; color: #F0EBE1; line-height: 1.2; margin-bottom: 16px; }
  .psi-cta-text { font-size: .95rem; color: rgba(240,235,225,.6); line-height: 1.75; margin-bottom: 40px; max-width: 400px; }
  .psi-cta-separator { width: 40px; height: 1px; background: rgba(218,176,1,.4); margin: 28px 0; }
  .psi-cta-actions { display: flex; gap: 14px; flex-wrap: wrap; }

  /* Scroll reveal */
  .psi-reveal { opacity: 0; transform: translateY(28px); transition: opacity .65s ease, transform .65s ease; }
  .psi-reveal.psi-visible { opacity: 1; transform: none; }
  .psi-reveal-delay-1 { transition-delay: .1s; }
  .psi-reveal-delay-2 { transition-delay: .2s; }
  .psi-reveal-delay-3 { transition-delay: .3s; }
  .psi-reveal-delay-4 { transition-delay: .4s; }
  .psi-reveal-left { opacity: 0; transform: translateX(-28px); transition: opacity .65s ease, transform .65s ease; }
  .psi-reveal-left.psi-visible { opacity: 1; transform: none; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }

  /* CTA section overrides — dark bg so outline needs light text */
  .psi-cta .psi-btn-outline { border-color: rgba(240,235,225,.25); color: #EDE8DF; }
  .psi-cta .psi-btn-outline:hover { border-color: rgba(218,176,1,.5); background: rgba(218,176,1,.07); }
  .psi-cta .psi-btn-primary { background: #DAB001; }
  .psi-cta .psi-btn-primary:hover { background: #E8C10A; }
  .psi-root ::-webkit-scrollbar { width: 6px; }
  .psi-root ::-webkit-scrollbar-track { background: #e7e9e5; }
  .psi-root ::-webkit-scrollbar-thumb { background: rgba(218,176,1,.3); border-radius: 3px; }
`

/* ─── Reveal wrapper ────────────────────────────────────────────── */
function Reveal({ children, delay = 0, direction = 'up', threshold = 0.12 }: {
  children: React.ReactNode; delay?: number; direction?: 'up' | 'left'; threshold?: number
}) {
  const { ref, visible } = useInView(threshold)
  const baseClass = direction === 'left' ? 'psi-reveal-left' : 'psi-reveal'
  const delayClass = delay ? `psi-reveal-delay-${delay}` : ''
  return (
    <div ref={ref} className={[baseClass, delayClass, visible ? 'psi-visible' : ''].join(' ')}>
      {children}
    </div>
  )
}

/* ─── Animated counter item ─────────────────────────────────────── */
function StatItem({ num, suffix = '', label, start }: { num: number; suffix?: string; label: string; start: boolean }) {
  const count = useCounter(num, 1800, start)
  return (
    <div className="psi-stat-item">
      <span className="psi-stat-num">{count}{suffix}</span>
      <span className="psi-stat-label">{label}</span>
    </div>
  )
}

/* ─── Main Component ────────────────────────────────────────────── */
export default function ProductDetailView({ product, catalog }: Props) {
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

  const related = catalog.filter((p) => p.slug !== product.slug).slice(0, 4)

  const stats = [
    { num: product.protects.length, suffix: '+', label: 'Industries & businesses covered' },
    { num: product.highlights.length, suffix: '', label: 'Core coverage areas' },
    { num: 24, suffix: '/7', label: 'Expert support available' },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      <div className="psi-root">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="psi-hero">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="100vw"
            className="psi-hero-img"
            style={{ objectFit: 'cover' }}
          />
          <div className="psi-hero-overlay" />
          <div className="psi-hero-overlay-bottom" />

          <div className="psi-hero-content">
            <div className="psi-badge">
              <ShieldIcon />
              {product.category}
            </div>
            <h1 className="psi-hero-title">
              {product.title.split(' ').slice(0, -1).join(' ')}{' '}
              <em>{product.title.split(' ').slice(-1)}</em>
            </h1>
            <p className="psi-hero-summary">{product.summary}</p>
            <div className="psi-hero-actions">
              <a href="#contact" className="psi-btn-primary">
                Get a Quote <ArrowRight />
              </a>
              <a href="#coverage" className="psi-btn-outline">
                Explore Coverage
              </a>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ──────────────────────────────────────────── */}
        <div className="psi-stats" ref={statsRef}>
          {stats.map((s, i) => (
            <StatItem key={i} num={s.num} suffix={s.suffix} label={s.label} start={statsVisible} />
          ))}
        </div>

        {/* ── About ──────────────────────────────────────────────── */}
        <section className="psi-section">
          <div className="psi-about-grid">
            <Reveal direction="left">
              <div>
                <div className="psi-section-tag">About this policy</div>
                <h2 className="psi-section-title">
                  Coverage that <em>works</em> for you
                </h2>
                <div className="psi-divider" />
                <p className="psi-about-text">{product.description}</p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="psi-decorative-box">
                <span className="psi-decorative-quote">&ldquo;</span>
                <p className="psi-decorative-body">
                  Protection isn&apos;t just a policy — it&apos;s a promise to keep your business moving forward, no matter what comes next.
                </p>
                <div className="psi-decorative-sub">Prime Sentinel Insurance</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Coverage Highlights ────────────────────────────────── */}
        <section id="coverage" className="psi-section" style={{ paddingTop: 0 }}>
          <Reveal>
            <div className="psi-section-tag">What&apos;s included</div>
            <h2 className="psi-section-title" style={{ marginBottom: 48 }}>
              Key coverage <em>highlights</em>
            </h2>
          </Reveal>
          <div className="psi-highlights-grid">
            {product.highlights.map((h, i) => {
              const Icon = highlightIcons[i % highlightIcons.length]
              return (
                <Reveal key={h} delay={(i % 3 + 1) as 1 | 2 | 3}>
                  <div className="psi-highlight-card">
                    <span className="psi-highlight-num">0{i + 1}</span>
                    <div className="psi-highlight-icon"><Icon /></div>
                    <div className="psi-highlight-title">{h}</div>
                    <div className="psi-highlight-desc">
                      Comprehensive protection ensuring your business is covered when it matters most.
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* ── Who We Protect ─────────────────────────────────────── */}
        <div className="psi-protects-bg">
          <div className="psi-protects-inner">
            <Reveal>
              <div className="psi-section-tag">Industries & businesses</div>
              <h2 className="psi-section-title">
                Who we <em>protect</em>
              </h2>
            </Reveal>
            <div className="psi-protects-grid">
              {product.protects.map((item, i) => (
                <Reveal key={item} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                  <div className="psi-protects-item">
                    <span className="psi-protects-icon"><CheckIcon /></span>
                    <span className="psi-protects-text">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related Products ───────────────────────────────────── */}
        <section className="psi-section">
          <Reveal>
            <div className="psi-section-tag">Explore more</div>
            <h2 className="psi-section-title">
              Related <em>coverage</em>
            </h2>
          </Reveal>
          <div className="psi-related-grid">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <Link href={`/products/${p.slug}`} className="psi-related-card">
                  <span className="psi-related-cat">{p.category}</span>
                  <span className="psi-related-title">{p.shortTitle}</span>
                  <span className="psi-related-summary">{p.summary.slice(0, 80)}…</span>
                  <span className="psi-related-arrow"><ArrowRight /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <section className="psi-cta" id="contact">
          <div className="psi-cta-grid">
            {/* Image side */}
            <div className="psi-cta-img-wrap">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="psi-cta-img"
                style={{ objectFit: 'cover' }}
              />
              <div className="psi-cta-img-overlay" />
            </div>

            {/* Content side */}
            <div className="psi-cta-content">
              <Reveal>
                <p className="psi-cta-eyebrow">Ready to get started?</p>
                <h2 className="psi-cta-title">{product.ctaTitle}</h2>
                <div className="psi-cta-separator" />
                <p className="psi-cta-text">{product.ctaText}</p>
                <div className="psi-cta-actions">
                  <a href="tel:+1234567890" className="psi-btn-primary">
                    <PhoneIcon />
                    Contact Us Today
                  </a>
                  <Link href="/products" className="psi-btn-outline">
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
