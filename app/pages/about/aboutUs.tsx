'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/* ─── Icons ─────────────────────────────────────────────────────── */
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.1 19.79 19.79 0 01.01 2.4 2 2 0 012 .22h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)
/* Value icons */
const IntegrityIcon = () => <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
const ClientFocusIcon = () => <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
const TrustIcon = () => <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
const TeamworkIcon = () => <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M20.188 20a8 8 0 10-16.376 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="5" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="19" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" /></svg>
const ReliabilityIcon = () => <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
const InnovationIcon = () => <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
const CommunityIcon = () => <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
const EthicsIcon = () => <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" /><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>

/* ─── Data ──────────────────────────────────────────────────────── */
const values = [
  { Icon: IntegrityIcon, label: 'Integrity' },
  { Icon: ClientFocusIcon, label: 'Client Focus' },
  { Icon: TrustIcon, label: 'Trust' },
  { Icon: TeamworkIcon, label: 'Teamwork' },
  { Icon: ReliabilityIcon, label: 'Reliability' },
  { Icon: InnovationIcon, label: 'Innovation' },
  { Icon: CommunityIcon, label: 'Community Commitment' },
  { Icon: EthicsIcon, label: 'Ethics' },
]

const whyItems = [
  { num: '01', title: 'More Options, More Fit', body: 'More options to fit different budgets from multiple carriers tailored to your business\'s specific risks.' },
  { num: '02', title: 'No Coverage Gaps', body: 'Ensure no coverage gaps, reducing liability risks and financial losses across every policy.' },
  { num: '03', title: 'Multi-State Coverage', body: 'Multi-state licensed so whether your business or property is local or spread across state lines, we\'ve got you covered — one trusted agency.' },
  { num: '04', title: 'Unbiased Advice', body: 'Offer unbiased advice focused entirely on the client\'s best interests, not a corporate sales quota.' },
  { num: '05', title: 'Your Advocate', body: 'We advocate for the client rather than trying to meet internal targets — your success is our only metric.' },
  { num: '06', title: 'Dedicated Agent', body: 'Direct, one-on-one service with a dedicated agent who truly understands your business inside and out.' },
  { num: '07', title: 'Proactive Risk Mgmt', body: 'Proactive risk management to help businesses avoid claims and reduce costs over time before issues arise.' },
  { num: '08', title: 'Fast COIs & Claims', body: 'Quick certificates of insurance (COIs) and responsive claims support when you need it most.' },
]

const team = [
  {
    id: 1,
    name: 'Chrishan De Silva',
    image: '/Chrishan.png',
    title: 'Partner / Agent',
    phone: '818-600-0821',
    email: 'chrishan@sentinelinsurance.agency',
    bio: `With over a decade of experience in the insurance industry, I've seen firsthand how confusing and overwhelming insurance can be for many people. After years of working within large corporations, I started Prime Sentinel because I believed businesses and families deserved more — more clarity, more options, and more genuine support.\n\nToo often, people were left with limited choices, poor communication, and a lack of guidance. I set out to change that. At Prime Sentinel, we're not just selling policies — we're building trusted partnerships. My mission is to break down the complexities of insurance, provide tailored solutions, and help clients protect what matters with confidence and peace of mind.\n\nOutside of work, I enjoy reading, traveling, and spending quality time with my family and close friends. Helping people is my passion — and I bring that same energy and purpose into everything I do at Prime Sentinel.`,
  },
  {
    id: 2,
    name: 'Amandeep Samra',
    image: '/Amandeep.png',
    title: 'Partner / Agent',
    phone: '818-290-6946',
    email: 'Amandeep@sentinelinsurance.agency',
    bio: `With over 7 years of experience at Farmers Insurance, I've developed a deep understanding of how to truly protect people, businesses, and livelihoods. Over the years, I saw firsthand how the insurance landscape was shifting — becoming more complex, less personal, and harder for clients to navigate. That realization is what sparked the creation of Prime Sentinel Insurance.\n\nAt Prime Sentinel, we specialize in business and trucking insurance, offering customized solutions for everything from small local operations to large fleets. Whether it's protecting your business assets or ensuring your trucks stay on the road and compliant, I take pride in being a reliable partner who's always in your corner. My mission is to make insurance not just easier but smarter, more transparent, and genuinely helpful for every client I work with.\n\nWhen I'm not working, you'll likely find me spending time with my family, exploring new places, or hiking the scenic trails around the beautiful city of Los Angeles. I believe in living life with purpose — both in business and at home.`,
  },
]

/* ─── Hooks ─────────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
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
    let t0: number | null = null
    const step = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(e * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function Reveal({ children, delay = 0, direction = 'up' }: {
  children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right'
}) {
  const { ref, visible } = useInView()
  const base = direction === 'left' ? 'au-rl' : direction === 'right' ? 'au-rr' : 'au-ru'
  return (
    <div ref={ref} className={[base, delay ? `au-d${delay}` : '', visible ? 'au-vis' : ''].join(' ')}>
      {children}
    </div>
  )
}

function StatItem({ num, suffix = '', label, start }: { num: number; suffix?: string; label: string; start: boolean }) {
  const c = useCounter(num, 1800, start)
  return (
    <div className="au-stat">
      <span className="au-stat-n">{c}{suffix}</span>
      <span className="au-stat-l">{label}</span>
    </div>
  )
}

/* ─── Team Modal ────────────────────────────────────────────────── */
function TeamModal({ member, onClose }: { member: typeof team[0]; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler) }
  }, [onClose])

  return (
    <div className="au-modal-bg" onClick={onClose}>
      <div className="au-modal" onClick={e => e.stopPropagation()}>
        <button className="au-modal-close" onClick={onClose}><CloseIcon /></button>
        <div className="au-modal-grid">
          <div className="au-modal-img-wrap">
            <Image src={member.image} alt={member.name} fill sizes="(max-width: 700px) 100vw, 340px" style={{ objectFit: 'cover' }} />
            <div className="au-modal-img-bar" />
          </div>
          <div className="au-modal-body">
            <div className="au-modal-tag">Our Team</div>
            <h3 className="au-modal-name">{member.name}</h3>
            <p className="au-modal-title">{member.title}</p>
            <div className="au-modal-divider" />
            {member.bio.split('\n\n').map((p, i) => (
              <p key={i} className="au-modal-bio">{p}</p>
            ))}
            <div className="au-modal-contacts">
              <a href={`tel:${member.phone}`} className="au-modal-contact">
                <PhoneIcon /> {member.phone}
              </a>
              <a href={`mailto:${member.email}`} className="au-modal-contact">
                <EmailIcon /> {member.email}
              </a>
              <a href="#" className="au-modal-contact">
                <LinkedInIcon /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── CSS ───────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  .au-root { font-family: 'Inter', sans-serif; color: #1C2130; position: relative; }

  /* ── Parallax background ── */
  .au-parallax-bg {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: url('/Team.png');
    background-size: cover; background-position: center;
    background-attachment: fixed;
    opacity: 0.45;
  }

  /* All sections sit above parallax */
  .au-above { position: relative; z-index: 1; }

  /* Sections WITH their own bg mask the parallax */
  .au-has-bg { position: relative; z-index: 1; }
  .au-has-bg > * { position: relative; z-index: 1; }
  .au-has-bg::before {
    content: ''; position: absolute; inset: 0; z-index: 0;
    background: inherit; pointer-events: none;
  }
  /* Sections WITHOUT bg are transparent — parallax shows through */
  .au-no-bg { background: transparent !important; position: relative; z-index: 1; }

  /* ── Hero ── */
  .au-hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden; z-index: 1; }
  .au-hero-img { position: absolute; inset: 0; object-fit: cover; animation: au-zoom 14s ease-out forwards; }
  @keyframes au-zoom { from { transform: scale(1.08); } to { transform: scale(1); } }
  .au-hero-ov1 { position: absolute; inset: 0; background: linear-gradient(160deg, rgba(8,14,26,.3) 0%, rgba(8,14,26,.6) 40%, rgba(8,14,26,.96) 100%); }
  .au-hero-ov2 { position: absolute; bottom: 0; left: 0; right: 0; height: 260px; background: linear-gradient(to top, #e7e9e5 0%, transparent 100%); }
  .au-hero-content { position: relative; z-index: 2; padding: 56px 64px 80px; max-width: 900px; }
  @media(max-width:768px){ .au-hero-content { padding: 32px 24px 60px; } }

  .au-badge {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid rgba(218,176,1,.5); color: #DAB001;
    font-size: 11px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase;
    padding: 6px 14px; border-radius: 2px; margin-bottom: 28px;
    background: rgba(218,176,1,.07);
    opacity: 0; animation: au-up .6s .2s ease forwards;
  }
  .au-hero-title {
    font-size: clamp(2.8rem, 6vw, 5.2rem); font-weight: 700; line-height: 1.04;
    color: #F0EBE1; margin: 0 0 24px;
    opacity: 0; animation: au-up .7s .35s ease forwards;
  }
  .au-hero-title em { font-style: normal; color: #DAB001; font-weight: 300; }
  .au-hero-sub {
    font-size: 1.1rem; line-height: 1.75; color: rgba(240,235,225,.72); max-width: 620px;
    margin: 0 0 40px; font-weight: 300;
    opacity: 0; animation: au-up .7s .5s ease forwards;
  }
  .au-hero-actions { display: flex; gap: 16px; flex-wrap: wrap; opacity: 0; animation: au-up .7s .65s ease forwards; }

  /* ── Buttons ── */
  .au-btn-p {
    display: inline-flex; align-items: center; gap: 10px;
    background: #DAB001; color: #fff;
    font-size: .88rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
    padding: 14px 28px; border-radius: 2px; border: none; cursor: pointer; text-decoration: none;
    transition: background .2s, transform .2s, box-shadow .2s;
  }
  .au-btn-p:hover { background: #B89200; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(218,176,1,.3); }
  .au-btn-o {
    display: inline-flex; align-items: center; gap: 10px;
    border: 1px solid rgba(28,33,48,.25); color: #1C2130;
    font-size: .88rem; font-weight: 500; letter-spacing: .05em;
    padding: 14px 28px; border-radius: 2px; cursor: pointer; text-decoration: none;
    transition: border-color .2s, background .2s;
  }
  .au-btn-o:hover { border-color: rgba(218,176,1,.6); background: rgba(218,176,1,.08); }

  /* ── Stats bar ── */
  .au-stats { display: grid; grid-template-columns: repeat(3,1fr); background: #f0f2ee; border-top: 1px solid rgba(218,176,1,.15); border-bottom: 1px solid rgba(218,176,1,.15); }
  @media(max-width:640px){ .au-stats { grid-template-columns: 1fr; } }
  .au-stat { padding: 44px 48px; border-right: 1px solid rgba(218,176,1,.12); display: flex; flex-direction: column; gap: 8px; }
  .au-stat:last-child { border-right: none; }
  .au-stat-n { font-size: 3.6rem; font-weight: 700; color: #DAB001; line-height: 1; letter-spacing: -.02em; }
  .au-stat-l { font-size: .82rem; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: rgba(28,33,48,.5); }

  /* ── Section helpers ── */
  .au-wrap { max-width: 1280px; margin: 0 auto; padding: 0 64px; }
  @media(max-width:768px){ .au-wrap { padding: 0 24px; } }
  .au-pad { padding: 96px 0; }
  @media(max-width:768px){ .au-pad { padding: 64px 0; } }
  .au-tag {
    font-size: 11px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase;
    color: #DAB001; margin-bottom: 16px; display: flex; align-items: center; gap: 12px;
  }
  .au-tag::before { content: ''; display: block; width: 32px; height: 1px; background: #DAB001; }
  .au-h2 { font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 700; color: #1C2130; line-height: 1.15; }
  .au-h2 em { font-style: normal; color: #DAB001; }
  .au-divider { width: 48px; height: 2px; background: linear-gradient(90deg, #DAB001, transparent); margin: 28px 0; }

  /* ── Who We Are ── */
  .au-who-bg { background: #e7e9e5; }
  .au-who-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
  @media(max-width:900px){ .au-who-grid { grid-template-columns: 1fr; gap: 40px; } }
  .au-who-text { font-size: 1.02rem; line-height: 1.85; color: rgba(28,33,48,.65); font-weight: 400; }
  .au-who-img-wrap {
    position: relative; height: 580px; border-radius: 4px; overflow: hidden;
    box-shadow: 0 20px 60px rgba(28,33,48,.14);
  }
  .au-who-img-wrap::before {
    content: ''; position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(160deg, transparent 55%, rgba(218,176,1,.12) 100%);
  }
  .au-who-img-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; z-index: 2; background: linear-gradient(90deg, #DAB001, transparent); }

  /* ── Mission (transparent — parallax shows through) ── */
  .au-mission-section { padding: 96px 0; }
  @media(max-width:768px){ .au-mission-section { padding: 64px 0; } }
  .au-mission-inner { max-width: 900px; margin: 0 auto; padding: 0 64px; text-align: center; }
  @media(max-width:768px){ .au-mission-inner { padding: 0 24px; } }
  .au-mission-inner .au-tag { justify-content: center; }
  .au-mission-inner .au-tag::before { display: none; }
  .au-mission-text { font-size: 1.08rem; line-height: 1.9; color: rgba(28,33,48,.68); margin-top: 28px; }
  .au-mission-quote {
    margin: 40px auto; max-width: 720px; padding: 36px 40px; background: #fff;
    border: 1px solid rgba(218,176,1,.18); border-radius: 4px;
    box-shadow: 0 4px 28px rgba(28,33,48,.07); position: relative; overflow: hidden;
  }
  .au-mission-quote::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #DAB001, transparent); }
  .au-mission-qmark { font-size: 5rem; color: rgba(218,176,1,.1); position: absolute; top: 8px; right: 20px; font-weight: 700; }
  .au-mission-qbody { font-size: 1.2rem; font-style: italic; font-weight: 300; color: #3a4155; line-height: 1.65; }
  .au-mission-qsub { margin-top: 16px; font-size: .8rem; letter-spacing: .12em; text-transform: uppercase; color: rgba(28,33,48,.35); }

  /* ── Values ── */
  .au-values-bg { background: #dfe1dc; }
  .au-values-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; margin-top: 52px; }
  @media(max-width:1024px){ .au-values-grid { grid-template-columns: repeat(2,1fr); } }
  @media(max-width:500px){ .au-values-grid { grid-template-columns: 1fr 1fr; } }
  .au-val-card {
    padding: 36px 28px; background: #fff;
    border: 1px solid rgba(218,176,1,.12); border-radius: 4px;
    display: flex; flex-direction: column; align-items: flex-start; gap: 16px;
    box-shadow: 0 2px 14px rgba(28,33,48,.05);
    transition: border-color .3s, transform .3s, box-shadow .3s;
    position: relative; overflow: hidden;
  }
  .au-val-card:hover { border-color: rgba(218,176,1,.4); transform: translateY(-4px); box-shadow: 0 10px 32px rgba(28,33,48,.09); }
  .au-val-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #DAB001, transparent);
    transform: scaleX(0); transform-origin: left; transition: transform .4s;
  }
  .au-val-card:hover::after { transform: scaleX(1); }
  .au-val-icon { color: #DAB001; }
  .au-val-label { font-size: .95rem; font-weight: 600; color: #1C2130; }

  /* ── Why Choose Us — horizontal scroll ── */
  .au-why-section { position: relative; z-index: 1; overflow: hidden; }
  .au-why-hero {
    position: relative; height: 420px; overflow: hidden;
    display: flex; align-items: flex-end;
  }
  .au-why-hero-img { position: absolute; inset: 0; object-fit: cover; }
  .au-why-hero-ov {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, rgba(8,14,26,.4) 0%, rgba(8,14,26,.75) 60%, rgba(8,14,26,.95) 100%);
  }
  .au-why-hero-content { position: relative; z-index: 2; padding: 0 64px 52px; }
  @media(max-width:768px){ .au-why-hero-content { padding: 0 24px 40px; } }
  .au-why-hero-tag { font-size: 11px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: #DAB001; margin-bottom: 12px; display: flex; align-items: center; gap: 12px; }
  .au-why-hero-tag::before { content: ''; display: block; width: 32px; height: 1px; background: #DAB001; }
  .au-why-hero-title { font-size: clamp(2rem, 4vw, 3.6rem); font-weight: 700; color: #F0EBE1; line-height: 1.1; }
  .au-why-hero-title em { font-style: normal; color: #DAB001; font-weight: 300; }

  /* Horizontal scroll track */
  .au-hscroll-outer {
    background: #1C2130; padding: 60px 0 80px; overflow: hidden; cursor: grab;
  }
  .au-hscroll-outer:active { cursor: grabbing; }
  .au-hscroll-hint { padding: 0 64px; margin-bottom: 32px; display: flex; align-items: center; gap: 12px; }
  @media(max-width:768px){ .au-hscroll-hint { padding: 0 24px; } }
  .au-hscroll-hint-text { font-size: .78rem; letter-spacing: .16em; text-transform: uppercase; color: rgba(240,235,225,.3); }
  .au-hscroll-hint-arrow { color: #DAB001; animation: au-nudge 2s ease-in-out infinite; }
  @keyframes au-nudge { 0%,100%{ transform: translateX(0); } 50%{ transform: translateX(8px); } }
  .au-hscroll-track {
    display: flex; gap: 24px; padding: 8px 64px;
    overflow-x: auto; scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .au-hscroll-track::-webkit-scrollbar { display: none; }
  .au-why-card {
    flex: 0 0 320px; padding: 40px 32px; background: rgba(255,255,255,.04);
    border: 1px solid rgba(218,176,1,.15); border-radius: 4px;
    position: relative; overflow: hidden;
    transition: background .3s, border-color .3s, transform .3s;
  }
  .au-why-card:hover { background: rgba(218,176,1,.06); border-color: rgba(218,176,1,.4); transform: translateY(-4px); }
  .au-why-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #DAB001, transparent);
    transform: scaleX(0); transform-origin: left; transition: transform .4s;
  }
  .au-why-card:hover::after { transform: scaleX(1); }
  .au-why-card-num { font-size: 3.2rem; font-weight: 700; color: rgba(218,176,1,.1); line-height: 1; margin-bottom: 20px; }
  .au-why-card-title { font-size: 1.05rem; font-weight: 600; color: #F0EBE1; margin-bottom: 12px; }
  .au-why-card-body { font-size: .86rem; color: rgba(240,235,225,.5); line-height: 1.7; }
  .au-why-card-icon { color: #DAB001; margin-bottom: 16px; }

  /* ── Team Section ── */
  .au-team-section { background: #e7e9e5; padding: 96px 0; }
  @media(max-width:768px){ .au-team-section { padding: 64px 0; } }
  .au-team-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 32px; margin-top: 56px; max-width: 820px; margin-left: auto; margin-right: auto; }
  @media(max-width:700px){ .au-team-grid { grid-template-columns: 1fr; max-width: 400px; } }
  .au-team-card {
    cursor: pointer; border-radius: 4px; overflow: hidden;
    border: 1px solid rgba(218,176,1,.12);
    box-shadow: 0 4px 24px rgba(28,33,48,.08);
    background: #fff; transition: border-color .3s, transform .3s, box-shadow .3s;
  }
  .au-team-card:hover { border-color: rgba(218,176,1,.45); transform: translateY(-6px); box-shadow: 0 16px 48px rgba(28,33,48,.14); }
  .au-team-img-wrap { position: relative; height: 340px; overflow: hidden; }
  .au-team-img-wrap img { transition: transform .6s ease; }
  .au-team-card:hover .au-team-img-wrap img { transform: scale(1.05); }
  .au-team-img-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #DAB001, transparent); z-index: 2; }
  .au-team-img-overlay { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(28,33,48,.6) 0%, transparent 50%); z-index: 1; }
  .au-team-info { padding: 24px 28px 28px; }
  .au-team-name { font-size: 1.15rem; font-weight: 700; color: #1C2130; margin-bottom: 4px; }
  .au-team-title { font-size: .82rem; letter-spacing: .1em; text-transform: uppercase; color: #DAB001; margin-bottom: 16px; }
  .au-team-cta {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: .8rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
    color: rgba(28,33,48,.4); transition: color .2s;
  }
  .au-team-card:hover .au-team-cta { color: #DAB001; }
  .au-team-click-hint {
    position: absolute; top: 16px; right: 16px; z-index: 3;
    background: rgba(218,176,1,.9); color: #fff;
    font-size: .72rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
    padding: 5px 10px; border-radius: 2px;
    opacity: 0; transition: opacity .2s;
  }
  .au-team-card:hover .au-team-click-hint { opacity: 1; }

  .au-cta { position: relative; overflow: hidden; background: #1C2130; }
  .au-cta-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 560px; }
  @media(max-width:900px){ .au-cta-grid { grid-template-columns: 1fr; } }
  .au-cta-img-wrap { position: relative; overflow: hidden; min-height: 360px; }
  .au-cta-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.65) saturate(.85); transition: transform 8s ease; }
  .au-cta-img:hover { transform: scale(1.04); }
  .au-cta-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent 50%, #1C2130 100%);
  }
  @media(max-width:900px){ .au-cta-img-overlay { background: linear-gradient(0deg, #1C2130 0%, transparent 60%); } }
  .au-cta-content {
    display: flex; flex-direction: column; justify-content: center;
    padding: 72px 64px; position: relative; z-index: 1;
    border-top: 1px solid rgba(218,176,1,.15);
  }
  @media(max-width:768px){ .au-cta-content { padding: 48px 24px; } }
  .au-cta-eyebrow { font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: #DAB001; font-weight: 600; margin-bottom: 16px; }
  .au-cta-title { font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 700; color: #F0EBE1; line-height: 1.2; margin-bottom: 16px; }
  .au-cta-text { font-size: .95rem; color: rgba(240,235,225,.6); line-height: 1.75; margin-bottom: 40px; max-width: 440px; }
  .au-cta-separator { width: 40px; height: 1px; background: rgba(218,176,1,.4); margin: 28px 0; }
  .au-cta-actions { display: flex; gap: 14px; flex-wrap: wrap; }
  .au-cta .au-btn-o { border-color: rgba(240,235,225,.25); color: #EDE8DF; }
  .au-cta .au-btn-o:hover { border-color: rgba(218,176,1,.5); background: rgba(218,176,1,.07); }

  /* ── Modal ── */
  .au-modal-bg {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(8,14,26,.8); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center; padding: 24px;
    animation: au-fadein .2s ease;
  }
  @keyframes au-fadein { from { opacity: 0; } to { opacity: 1; } }
  .au-modal {
    background: #fff; border-radius: 4px; overflow: hidden;
    max-width: 900px; width: 100%; max-height: 90vh; overflow-y: auto;
    border: 1px solid rgba(218,176,1,.2);
    box-shadow: 0 32px 80px rgba(8,14,26,.4);
    animation: au-slideup .3s ease;
    position: relative;
  }
  @keyframes au-slideup { from { transform: translateY(32px); opacity: 0; } to { transform: none; opacity: 1; } }
  .au-modal-close {
    position: absolute; top: 20px; right: 20px; z-index: 10;
    background: rgba(28,33,48,.08); border: none; border-radius: 50%; width: 40px; height: 40px;
    display: flex; align-items: center; justify-content: center; cursor: pointer; color: #1C2130;
    transition: background .2s;
  }
  .au-modal-close:hover { background: rgba(218,176,1,.15); }
  .au-modal-grid { display: grid; grid-template-columns: 340px 1fr; }
  @media(max-width:700px){ .au-modal-grid { grid-template-columns: 1fr; } }
  .au-modal-img-wrap { position: relative; min-height: 440px; }
  @media(max-width:700px){ .au-modal-img-wrap { min-height: 280px; } }
  .au-modal-img-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #DAB001, transparent); z-index: 2; }
  .au-modal-body { padding: 44px 40px; overflow-y: auto; }
  @media(max-width:700px){ .au-modal-body { padding: 32px 24px; } }
  .au-modal-tag { font-size: 10px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: #DAB001; margin-bottom: 10px; }
  .au-modal-name { font-size: 1.8rem; font-weight: 700; color: #1C2130; margin-bottom: 4px; }
  .au-modal-title { font-size: .82rem; letter-spacing: .12em; text-transform: uppercase; color: rgba(28,33,48,.4); margin-bottom: 0; }
  .au-modal-divider { width: 40px; height: 2px; background: linear-gradient(90deg, #DAB001, transparent); margin: 20px 0; }
  .au-modal-bio { font-size: .92rem; line-height: 1.8; color: rgba(28,33,48,.65); margin-bottom: 16px; }
  .au-modal-contacts { display: flex; flex-direction: column; gap: 10px; margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(218,176,1,.15); }
  .au-modal-contact {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: .86rem; color: rgba(28,33,48,.6); text-decoration: none;
    transition: color .2s;
  }
  .au-modal-contact:hover { color: #DAB001; }

  /* ── Scroll reveal ── */
  .au-ru { opacity: 0; transform: translateY(28px); transition: opacity .65s ease, transform .65s ease; }
  .au-rl { opacity: 0; transform: translateX(-28px); transition: opacity .65s ease, transform .65s ease; }
  .au-rr { opacity: 0; transform: translateX(28px); transition: opacity .65s ease, transform .65s ease; }
  .au-ru.au-vis, .au-rl.au-vis, .au-rr.au-vis { opacity: 1; transform: none; }
  .au-d1 { transition-delay: .1s; } .au-d2 { transition-delay: .2s; }
  .au-d3 { transition-delay: .3s; } .au-d4 { transition-delay: .4s; }

  @keyframes au-up { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
  .au-root ::-webkit-scrollbar { width: 6px; }
  .au-root ::-webkit-scrollbar-track { background: #e7e9e5; }
  .au-root ::-webkit-scrollbar-thumb { background: rgba(218,176,1,.3); border-radius: 3px; }
`

/* ─── Main Component ────────────────────────────────────────────── */
export default function AboutUsPage() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)
  const [activeMember, setActiveMember] = useState<typeof team[0] | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* Drag-to-scroll */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0)
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0
  }, [])
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current)
  }, [])
  const onMouseUp = useCallback(() => { isDragging.current = false }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="au-root">
        {/* Parallax background — always visible, fixed */}
        <div className="au-parallax-bg" aria-hidden="true" />

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="au-hero au-above">
          <Image src="/Footer.png" alt="About Prime Sentinel" fill priority sizes="100vw" className="au-hero-img" style={{ objectFit: 'cover' }} />
          <div className="au-hero-ov1" />
          <div className="au-hero-ov2" />
          <div className="au-hero-content">
            <div className="au-badge">About Us</div>
            <h1 className="au-hero-title">Redefining how insurance <em>supports</em> business</h1>
            <p className="au-hero-sub">A full-service agency headquartered in Los Angeles, built on over a decade of expertise in Business and Transportation Insurance.</p>
            <div className="au-hero-actions">
              <a href="#who-we-are" className="au-btn-p">Who We Are <ArrowRight /></a>
              <a href="#team" className="au-btn-o">Meet the Team</a>
            </div>
          </div>
        </section>


        {/* ── Stats Bar ───────────────────────────────────────── */}
        <div className="au-stats au-above" ref={statsRef}>
          <StatItem num={10} suffix="+" label="Years of experience" start={statsVisible} />
          <StatItem num={30} suffix="+" label="A-rated carrier partners" start={statsVisible} />
          <StatItem num={10} suffix="+" label="States licensed" start={statsVisible} />
        </div>

        {/* ── Who We Are ──────────────────────────────────────── */}
        <section className="au-has-bg au-who-bg au-pad" id="who-we-are">
          <div className="au-wrap">
            <div className="au-who-grid">
              <Reveal direction="left">
                <div>
                  <div className="au-tag">Who We Are</div>
                  <h2 className="au-h2">Built to <em>redefine</em> insurance</h2>
                  <div className="au-divider" />
                  <p className="au-who-text">
                    Prime Sentinel Insurance Solutions is a full-service agency with over a decade of experience, established with the sole purpose of redefining how insurance supports and protects businesses. Headquartered in Los Angeles and led by a team of industry experts, we are committed to delivering smart, strategic coverage that aligns with each client&apos;s operational needs.
                  </p>
                  <p className="au-who-text" style={{ marginTop: 20 }}>
                    We specialize in Business and Transportation insurance, offering targeted solutions for companies that demand reliable protection and responsive service.
                  </p>
                  <p className="au-who-text" style={{ marginTop: 20 }}>
                    Backed by a network of 30+ top-rated carriers and trusted wholesale partners, we craft customized policies that balance affordability with robust protection. With deep roots in the western states and a rapidly growing national footprint, Prime Sentinel is proud to serve as a long-term partner to businesses across the country.
                  </p>
                </div>
              </Reveal>
              <Reveal direction="right" delay={2}>
                <div className="au-who-img-wrap">
                  <Image src="/BRI.png" alt="Risk management" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                  <div className="au-who-img-bar" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Our Mission (transparent — parallax visible) ─────── */}
        <section className="au-no-bg au-mission-section" id="mission">
          <div className="au-mission-inner">
            <Reveal>
              <div className="au-tag" style={{ justifyContent: 'center' }}>Our Mission</div>
              <h2 className="au-h2" style={{ textAlign: 'center' }}>More than just an insurance <em>provider</em></h2>
              <p className="au-mission-text">
                At Prime Sentinel, we stand out because of our dedicated team and unwavering commitment to excellence. Our mission is to provide businesses with seamless, efficient, and customized insurance solutions that offer peace of mind and security.
              </p>
              <p className="au-mission-text">
                We understand the value of time, which is why we deliver fast, competitive quotes from A++ rated carriers. Our cutting-edge technology streamlines the entire process, ensuring a smooth, stress-free experience from quote to policy issuance.
              </p>
              <div className="au-mission-quote">
                <span className="au-mission-qmark">&ldquo;</span>
                <p className="au-mission-qbody">Whether you&apos;re a small business or a large enterprise, our team is committed to delivering exceptional service, expert guidance, and innovative solutions to protect what matters most.</p>
                <div className="au-mission-qsub">Prime Sentinel Insurance Solutions</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Our Values ──────────────────────────────────────── */}
        <section className="au-has-bg au-values-bg au-pad">
          <div className="au-wrap">
            <Reveal>
              <div className="au-tag">Our Values</div>
              <h2 className="au-h2">The principles that <em>guide</em> us</h2>
            </Reveal>
            <div className="au-values-grid">
              {values.map(({ Icon, label }, i) => (
                <Reveal key={label} delay={Math.min(i % 4 + 1, 4) as 1|2|3|4}>
                  <div className="au-val-card">
                    <div className="au-val-icon"><Icon /></div>
                    <span className="au-val-label">{label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>


        {/* ── Why Choose Us — horizontal scroll ───────────────── */}
        <section className="au-why-section" id="why">
          {/* Hero banner for this section */}
          <div className="au-why-hero">
            <Image src="/Team.png" alt="Why Choose Prime Sentinel" fill sizes="100vw" className="au-why-hero-img" style={{ objectFit: 'cover' }} />
            <div className="au-why-hero-ov" />
            <div className="au-why-hero-content">
              <div className="au-why-hero-tag">Why Choose Us</div>
              <h2 className="au-why-hero-title">Your business deserves a <em>smarter</em> partner</h2>
            </div>
          </div>

          {/* Horizontal scrolling cards */}
          <div className="au-hscroll-outer">
            <div className="au-hscroll-hint">
              <span className="au-hscroll-hint-text">Scroll to explore</span>
              <span className="au-hscroll-hint-arrow">
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="#DAB001" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div
              className="au-hscroll-track"
              ref={trackRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              {whyItems.map((item) => (
                <div key={item.num} className="au-why-card">
                  <div className="au-why-card-num">{item.num}</div>
                  <div className="au-why-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" stroke="#DAB001" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M9 12l2 2 4-4" stroke="#DAB001" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="au-why-card-title">{item.title}</div>
                  <div className="au-why-card-body">{item.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Team ────────────────────────────────────────── */}
        <section className="au-team-section au-above" id="team">
          <div className="au-wrap">
            <Reveal>
              <div className="au-tag" style={{ justifyContent: 'center' }}>Our Team</div>
              <h2 className="au-h2" style={{ textAlign: 'center' }}>The people behind <em>Prime Sentinel</em></h2>
              <p style={{ textAlign: 'center', marginTop: 16, fontSize: '1rem', color: 'rgba(28,33,48,.55)', fontWeight: 300 }}>
                Click a profile to learn more
              </p>
            </Reveal>
            <div className="au-team-grid">
              {team.map((member, i) => (
                <Reveal key={member.id} delay={(i + 1) as 1 | 2}>
                  <div className="au-team-card" onClick={() => setActiveMember(member)} role="button" tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveMember(member)}>
                    <div className="au-team-img-wrap" style={{ position: 'relative' }}>
                      <Image src={member.image} alt={member.name} fill sizes="(max-width: 700px) 100vw, 410px" style={{ objectFit: 'cover' }} />
                      <div className="au-team-img-overlay" />
                      <div className="au-team-img-bar" />
                      <span className="au-team-click-hint">View Profile</span>
                    </div>
                    <div className="au-team-info">
                      <div className="au-team-name">{member.name}</div>
                      <div className="au-team-title">{member.title}</div>
                      <div className="au-team-cta">
                        View Profile <ArrowRight />
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="au-cta" id="about-cta">
          <div className="au-cta-grid">
            <div className="au-cta-img-wrap">
              <Image
                src="/Risk.png"
                alt="Prime Sentinel risk guidance"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="au-cta-img"
                style={{ objectFit: 'cover' }}
              />
              <div className="au-cta-img-overlay" />
            </div>
            <div className="au-cta-content">
              <Reveal>
                <p className="au-cta-eyebrow">Ready to work with us?</p>
                <h2 className="au-cta-title">Protect your business with a team built around clarity</h2>
                <div className="au-cta-separator" />
                <p className="au-cta-text">
                  Prime Sentinel brings carrier access, practical guidance, and long-term support together so your coverage can grow with your business instead of holding it back.
                </p>
                <div className="au-cta-actions">
                  <a href="tel:8186000821" className="au-btn-p">
                    <PhoneIcon />
                    Contact Us Today
                  </a>
                  <Link href="/#products" className="au-btn-o">
                    View Our Products
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Team Modal ──────────────────────────────────────── */}
        {activeMember && (
          <TeamModal member={activeMember} onClose={() => setActiveMember(null)} />
        )}
      </div>
    </>
  )
}
