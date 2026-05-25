'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

/* ─── Icons ─────────────────────────────────────────────────────── */
const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
  </svg>
)
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.1 19.79 19.79 0 01.01 2.4 2 2 0 012 .22h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const FaxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M2 10h20M7 5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
)
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="13" height="13">
    <path d="M20 6L9 17l-5-5" stroke="#DAB001" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ─── useInView ─────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Reveal({ children, delay = 0, dx = 0 }: { children: React.ReactNode; delay?: number; dx?: number }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : `translate(${dx}px, ${dx === 0 ? 28 : 0}px)`,
      transition: `opacity .7s ${delay}s cubic-bezier(.16,1,.3,1), transform .7s ${delay}s cubic-bezier(.16,1,.3,1)`,
    }}>
      {children}
    </div>
  )
}

/* ─── Field ─────────────────────────────────────────────────────── */
function Field({ label, id, type = 'text', placeholder, required = false, value, onChange, textarea = false }: {
  label: string; id: string; type?: string; placeholder: string; required?: boolean
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  textarea?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'transparent', border: 'none',
    borderBottom: `1.5px solid ${focused ? '#DAB001' : 'rgba(0,0,0,0.16)'}`,
    outline: 'none', fontSize: 15, fontWeight: 300, letterSpacing: '-0.02em',
    color: '#000', paddingBottom: 12, paddingTop: 4, fontFamily: 'inherit',
    transition: 'border-color .3s', resize: 'none',
  }
  const sharedProps = {
    id, name: id, required,
    placeholder: focused ? '' : placeholder,
    value, onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: inputStyle,
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label htmlFor={id} style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
        color: focused ? '#DAB001' : 'rgba(0,0,0,0.36)', transition: 'color .3s',
      }}>
        {label}{required && <span style={{ color: '#DAB001', marginLeft: 2 }}>*</span>}
      </label>
      {textarea ? <textarea {...sharedProps} rows={4} /> : <input type={type} {...sharedProps} />}
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', businessName: '', coverageType: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [selectFocused, setSelectFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    setSubmitting(false); setSubmitted(true)
  }

  const coverageOptions = ['Business Owners Policy (BOP)', 'Trucking / Commercial Auto', 'Commercial Property', 'Workers Compensation', 'Professional Liability / E&O', 'EPLI', 'Umbrella / Excess Liability', 'Personal Lines', 'Not sure — need guidance']

  const contactDetails = [
    { icon: <MapPinIcon />, label: 'Corporate Office', value: '15233 Ventura Blvd Suite 500\nSherman Oaks CA 91403', href: 'https://maps.google.com/?q=15233+Ventura+Blvd+Suite+500+Sherman+Oaks+CA+91403', external: true },
    { icon: <PhoneIcon />, label: 'Phone', value: '818-600-0821', href: 'tel:8186000821', external: false },
    { icon: <FaxIcon />, label: 'Fax', value: '818-337-7125', href: 'tel:8183377125', external: false },
    { icon: <MailIcon />, label: 'Email', value: 'info@sentinelinsurance.agency', href: 'mailto:info@sentinelinsurance.agency', external: false },
    { icon: <ClockIcon />, label: 'Business Hours', value: 'Mon – Fri: 9:00 AM – 6:00 PM\nSaturday: By Appointment', href: null, external: false },
  ]

  const whyPoints = [
    { title: 'Independent Brokerage', desc: 'We shop multiple carriers to find the best fit — not just the easiest sale.' },
    { title: 'No Jargon, No Pressure', desc: 'Plain-English explanations so you can make confident decisions.' },
    { title: 'Ongoing Support', desc: 'We stay with you after the policy is issued — for claims, updates, renewals.' },
    { title: 'Licensed in California', desc: 'CA LIC No. 6013732. Trusted by businesses and families statewide.' },
  ]

  const CSS = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    @keyframes heroZoom{from{transform:scale(1.07)}to{transform:scale(1)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
    @keyframes badgePop{from{opacity:0;transform:scale(.6) rotate(-12deg)}to{opacity:1;transform:none}}
    @keyframes spin{to{transform:rotate(360deg)}}

    .cp{font-family:inherit;background:#e7e9e5;color:#111;overflow-x:hidden}

    /* HERO */
    .cp-hero{position:relative;height:clamp(520px,68svh,820px);display:flex;align-items:flex-end;overflow:hidden}
    .cp-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:heroZoom 14s ease-out forwards}
    .cp-hero-ov1{position:absolute;inset:0;background:linear-gradient(105deg,rgba(0,0,0,.82) 0%,rgba(0,0,0,.5) 55%,rgba(0,0,0,.15) 100%)}
    .cp-hero-ov2{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 55%)}
    .cp-hero-ov3{position:absolute;bottom:0;left:0;right:0;height:160px;background:linear-gradient(to top,#e7e9e5 0%,transparent 100%)}
    .cp-hero-ring{position:absolute;top:-90px;right:-120px;width:clamp(190px,23vw,430px);height:clamp(190px,23vw,430px);border-radius:50%;border:clamp(18px,2.5vw,40px) solid rgba(255,255,255,.11);animation:fadeUp 1.1s .4s cubic-bezier(.16,1,.3,1) both;pointer-events:none}
    .cp-hero-body{position:relative;z-index:2;width:100%;padding:0 clamp(24px,8vw,110px) clamp(56px,7vw,80px)}
    .cp-badge{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(218,176,1,.5);background:rgba(218,176,1,.1);color:#DAB001;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;padding:7px 14px;border-radius:3px;margin-bottom:24px;animation:badgePop .9s .3s cubic-bezier(.16,1,.3,1) both}
    .cp-badge-dot{width:6px;height:6px;border-radius:50%;background:#DAB001;flex-shrink:0}
    .cp-hero-h1{font-size:clamp(48px,10vw,108px);font-weight:300;line-height:.88;letter-spacing:-.08em;color:#fff;animation:fadeUp .9s .15s cubic-bezier(.16,1,.3,1) both}
    .cp-hero-h1 span{color:#DAB001}
    .cp-hero-sub{margin-top:18px;font-size:clamp(14px,1.3vw,18px);font-weight:300;line-height:1.6;letter-spacing:-.02em;color:rgba(255,255,255,.62);max-width:520px;animation:fadeUp .8s .35s cubic-bezier(.16,1,.3,1) both}

    /* STRIP */
    .cp-strip{background:#dfe1dc;border-top:1px solid rgba(218,176,1,.12);border-bottom:1px solid rgba(218,176,1,.12)}
    .cp-strip-grid{display:grid;grid-template-columns:repeat(5,1fr);padding:0 clamp(24px,8vw,110px)}
    @media(max-width:1100px){.cp-strip-grid{grid-template-columns:repeat(3,1fr)}}
    @media(max-width:700px){.cp-strip-grid{grid-template-columns:1fr 1fr}}
    @media(max-width:480px){.cp-strip-grid{grid-template-columns:1fr}}
    .cp-strip-item{display:flex;align-items:flex-start;gap:14px;padding:32px 24px 32px 0;border-right:1px solid rgba(218,176,1,.12);text-decoration:none;color:inherit;transition:background .25s;cursor:pointer}
    .cp-strip-item:last-child{border-right:none}
    .cp-strip-item:hover{background:rgba(218,176,1,.05)}
    .cp-strip-icon{color:#DAB001;flex-shrink:0;margin-top:2px}
    .cp-strip-lbl{font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(0,0,0,.3);margin-bottom:5px}
    .cp-strip-val{font-size:13px;font-weight:400;line-height:1.65;letter-spacing:-.02em;color:rgba(0,0,0,.66);white-space:pre-line}

    /* MAIN GRID */
    .cp-main{display:grid;grid-template-columns:1fr 400px;gap:clamp(48px,5vw,96px);align-items:start;padding:clamp(60px,7vw,112px) clamp(24px,8vw,110px)}
    @media(max-width:1100px){.cp-main{grid-template-columns:1fr}}

    /* FORM */
    .cp-eyebrow{display:flex;align-items:center;gap:12px;font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#DAB001;margin-bottom:14px}
    .cp-eyebrow::before{content:'';display:block;width:32px;height:1px;background:#DAB001;flex-shrink:0}
    .cp-form-h2{font-size:clamp(36px,5vw,68px);font-weight:300;line-height:.92;letter-spacing:-.075em;margin-bottom:18px}
    .cp-form-desc{font-size:14px;font-weight:300;line-height:1.7;letter-spacing:-.02em;color:rgba(0,0,0,.46);max-width:500px;margin-bottom:48px}
    .cp-form{display:flex;flex-direction:column;gap:32px}
    .cp-form-row{display:grid;grid-template-columns:1fr 1fr;gap:32px}
    @media(max-width:600px){.cp-form-row{grid-template-columns:1fr}}
    .cp-sel-lbl{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(0,0,0,.36);margin-bottom:6px;display:block;transition:color .3s}
    .cp-sel-lbl.on{color:#DAB001}
    .cp-select{width:100%;background:transparent;border:none;border-bottom:1.5px solid rgba(0,0,0,.16);outline:none;font-size:15px;font-weight:300;letter-spacing:-.02em;color:#000;padding-bottom:12px;padding-top:4px;font-family:inherit;appearance:none;cursor:pointer;transition:border-color .3s}
    .cp-select:focus{border-bottom-color:#DAB001}
    .cp-form-foot{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap;padding-top:8px}
    .cp-disclaimer{font-size:11px;line-height:1.65;color:rgba(0,0,0,.3);max-width:320px}
    .cp-btn-submit{display:inline-flex;align-items:center;gap:12px;background:#111;color:#fff;border:1.5px solid rgba(0,0,0,.18);padding:15px 28px;border-radius:8px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:background .25s,color .25s,transform .2s;flex-shrink:0}
    .cp-btn-submit:hover:not(:disabled){background:#DAB001;color:#071321;transform:translateY(-2px)}
    .cp-btn-submit:disabled{opacity:.55;cursor:not-allowed}
    .cp-spin{animation:spin .8s linear infinite}

    /* SUCCESS */
    .cp-success{background:rgba(218,176,1,.07);border:1px solid rgba(218,176,1,.24);border-radius:20px;padding:44px;margin-top:48px;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) both}
    .cp-success-icon{width:52px;height:52px;border-radius:50%;background:rgba(218,176,1,.14);display:flex;align-items:center;justify-content:center;margin-bottom:20px}
    .cp-success h3{font-size:28px;font-weight:300;letter-spacing:-.05em;margin-bottom:10px}
    .cp-success p{font-size:14px;font-weight:300;line-height:1.7;color:rgba(0,0,0,.5)}

    /* SIDEBAR */
    .cp-sidebar{display:flex;flex-direction:column;gap:20px}
    .cp-why{background:rgba(255,255,255,.72);border:1px solid rgba(0,0,0,.08);border-radius:20px;padding:36px;backdrop-filter:blur(10px)}
    .cp-why-ey{font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#DAB001;margin-bottom:24px;display:flex;align-items:center;gap:10px}
    .cp-why-ey::before{content:'';display:block;width:24px;height:1px;background:#DAB001}
    .cp-why-list{display:flex;flex-direction:column;gap:20px}
    .cp-why-item{display:flex;align-items:flex-start;gap:12px}
    .cp-why-chk{width:22px;height:22px;border-radius:50%;background:rgba(218,176,1,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
    .cp-why-title{font-size:13px;font-weight:600;letter-spacing:-.02em;margin-bottom:3px}
    .cp-why-desc{font-size:12px;line-height:1.6;color:rgba(0,0,0,.46)}

    .cp-call{display:flex;align-items:center;justify-content:space-between;background:#111;border-radius:20px;padding:28px 32px;text-decoration:none;color:#fff;transition:background .25s,color .25s}
    .cp-call:hover{background:#DAB001;color:#071321}
    .cp-call-lbl{font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;opacity:.42;margin-bottom:6px}
    .cp-call-num{font-size:22px;font-weight:300;letter-spacing:-.04em}
    .cp-call-ring{width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:border-color .25s,transform .25s}
    .cp-call:hover .cp-call-ring{border-color:rgba(0,0,0,.2);transform:translateX(4px)}

    .cp-map{border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,.08);text-decoration:none;display:block;transition:box-shadow .25s}
    .cp-map:hover{box-shadow:0 16px 48px rgba(0,0,0,.1)}
    .cp-map-wrap{position:relative;height:190px;overflow:hidden;background:#dfe1dc}
    .cp-map-wrap iframe{display:block;width:100%;height:100%;border:0;filter:grayscale(1) contrast(1.04)}
    .cp-map-tint{position:absolute;inset:0;background:rgba(218,176,1,.08);transition:opacity .25s;pointer-events:none}
    .cp-map:hover .cp-map-tint{opacity:0}
    .cp-map-foot{display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);padding:16px 20px}
    .cp-map-tag{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#DAB001;margin-bottom:3px}
    .cp-map-addr{font-size:12px;font-weight:300;color:rgba(0,0,0,.56)}
    .cp-map-arrow{font-size:18px;color:#DAB001;transition:transform .25s}
    .cp-map:hover .cp-map-arrow{transform:translate(3px,-3px)}

    /* BOTTOM */
    .cp-bottom{border-top:1px solid rgba(218,176,1,.13);background:#dfe1dc;padding:clamp(48px,6vw,80px) clamp(24px,8vw,110px)}
    .cp-bottom-inner{display:flex;align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap}
    .cp-bottom-h3{font-size:clamp(28px,4vw,52px);font-weight:300;line-height:.95;letter-spacing:-.07em;margin-bottom:10px}
    .cp-bottom-sub{font-size:14px;font-weight:300;color:rgba(0,0,0,.46)}
    .cp-bottom-acts{display:flex;gap:14px;flex-wrap:wrap}
    .cp-btn-outline{display:inline-flex;align-items:center;gap:10px;border:1.5px solid rgba(0,0,0,.18);background:rgba(255,255,255,.6);backdrop-filter:blur(8px);color:#111;padding:14px 24px;border-radius:8px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;transition:background .25s,border-color .25s,transform .2s}
    .cp-btn-outline:hover{background:#DAB001;border-color:#DAB001;transform:translateY(-2px)}
    .cp-btn-solid{display:inline-flex;align-items:center;gap:10px;background:#111;color:#fff;padding:14px 24px;border-radius:8px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;transition:background .25s,color .25s,transform .2s}
    .cp-btn-solid:hover{background:#DAB001;color:#071321;transform:translateY(-2px)}
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <main className={inter.className}>
        <div className="cp">

          {/* ── HERO ─────────────────────────────────────────────── */}
          <section className="cp-hero">
            <Image src="/Footer.png" alt="Contact Prime Sentinel Insurance" fill priority sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }} className="cp-hero-img" />
            <div className="cp-hero-ov1" />
            <div className="cp-hero-ov2" />
            <div className="cp-hero-ov3" />
            <div className="cp-hero-ring" />
            <div className="cp-hero-body">
              <div className="cp-badge">
                <span className="cp-badge-dot" />
                Get In Touch
              </div>
              <h1 className="cp-hero-h1">Let&apos;s Talk <span>Coverage.</span></h1>
              <p className="cp-hero-sub">
                Whether you&apos;re protecting a business, fleet, or family — we&apos;re here to find the right coverage for your real risks.
              </p>
            </div>
          </section>

          {/* ── CONTACT STRIP ────────────────────────────────────── */}
          <section className="cp-strip">
            <div className="cp-strip-grid">
              {contactDetails.map((item, i) => {
                const inner = (
                  <>
                    <span className="cp-strip-icon">{item.icon}</span>
                    <div>
                      <p className="cp-strip-lbl">{item.label}</p>
                      <p className="cp-strip-val">{item.value}</p>
                    </div>
                  </>
                )
                return item.href ? (
                  <Reveal key={item.label} delay={i * 0.07}>
                    <a href={item.href} target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="cp-strip-item">{inner}</a>
                  </Reveal>
                ) : (
                  <Reveal key={item.label} delay={i * 0.07}>
                    <div className="cp-strip-item" style={{ cursor: 'default', pointerEvents: 'none' }}>{inner}</div>
                  </Reveal>
                )
              })}
            </div>
          </section>

          {/* ── MAIN ─────────────────────────────────────────────── */}
          <div className="cp-main">

            {/* FORM COLUMN */}
            <div>
              <Reveal>
                <p className="cp-eyebrow">Free Consultation</p>
                <h2 className="cp-form-h2">Request a Quote</h2>
                <p className="cp-form-desc">
                  Fill out the form and a member of our team will reach out within one business day — no pressure, no jargon.
                </p>
              </Reveal>

              {submitted ? (
                <div className="cp-success">
                  <div className="cp-success-icon">
                    <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                      <path d="M20 6L9 17l-5-5" stroke="#DAB001" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3>Message Received</h3>
                  <p>Thank you for reaching out. A Prime Sentinel advisor will be in touch within one business day.</p>
                </div>
              ) : (
                <Reveal delay={0.1}>
                  <form onSubmit={handleSubmit} className="cp-form">
                    <div className="cp-form-row">
                      <Field label="First Name" id="firstName" placeholder="John" required value={form.firstName} onChange={handleChange} />
                      <Field label="Last Name" id="lastName" placeholder="Smith" required value={form.lastName} onChange={handleChange} />
                    </div>
                    <div className="cp-form-row">
                      <Field label="Email Address" id="email" type="email" placeholder="john@company.com" required value={form.email} onChange={handleChange} />
                      <Field label="Phone Number" id="phone" type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="cp-form-row">
                      <Field label="Business Name" id="businessName" placeholder="Acme Corp (optional)" value={form.businessName} onChange={handleChange} />
                      <div className="cp-select-wrap" style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="coverageType" className={`cp-sel-lbl${selectFocused ? ' on' : ''}`}>Coverage Type</label>
                        <select id="coverageType" name="coverageType" value={form.coverageType} onChange={handleChange}
                          onFocus={() => setSelectFocused(true)} onBlur={() => setSelectFocused(false)}
                          className="cp-select"
                          style={{ borderBottomColor: selectFocused ? '#DAB001' : 'rgba(0,0,0,0.16)' }}>
                          <option value="" disabled>Select a product…</option>
                          {coverageOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                    <Field label="Your Message" id="message" placeholder="Tell us about your business and coverage needs…" required value={form.message} onChange={handleChange} textarea />
                    <div className="cp-form-foot">
                      <p className="cp-disclaimer">By submitting you agree to be contacted by a Prime Sentinel advisor. CA LIC No. 6013732. We never sell your information.</p>
                      <button type="submit" disabled={submitting} className="cp-btn-submit">
                        {submitting ? (
                          <>
                            <svg className="cp-spin" viewBox="0 0 24 24" fill="none" width="16" height="16">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity=".25" />
                              <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>Send Request <ArrowRightIcon /></>
                        )}
                      </button>
                    </div>
                  </form>
                </Reveal>
              )}
            </div>

            {/* SIDEBAR COLUMN */}
            <div className="cp-sidebar">
              <Reveal delay={0.15} dx={20}>
                <div className="cp-why">
                  <p className="cp-why-ey">Why Prime Sentinel</p>
                  <div className="cp-why-list">
                    {whyPoints.map(item => (
                      <div key={item.title} className="cp-why-item">
                        <div className="cp-why-chk"><CheckIcon /></div>
                        <div>
                          <p className="cp-why-title">{item.title}</p>
                          <p className="cp-why-desc">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.25} dx={20}>
                <a href="tel:8186000821" className="cp-call">
                  <div>
                    <p className="cp-call-lbl">Prefer to call?</p>
                    <p className="cp-call-num">818-600-0821</p>
                  </div>
                  <div className="cp-call-ring"><PhoneIcon /></div>
                </a>
              </Reveal>

              <Reveal delay={0.35} dx={20}>
                <a href="https://maps.google.com/?q=15233+Ventura+Blvd+Suite+500+Sherman+Oaks+CA+91403"
                  target="_blank" rel="noopener noreferrer" className="cp-map">
                  <div className="cp-map-wrap">
                    <iframe
                      title="Prime Sentinel Office"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.8!2d-118.4484!3d34.1514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2959b1e5c4c09%3A0x5d55e4c3e32c4f0e!2s15233%20Ventura%20Blvd%20Suite%20500%2C%20Sherman%20Oaks%2C%20CA%2091403!5e0!3m2!1sen!2sus!4v1716800000000"
                      width="100%" height="190" allowFullScreen loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="cp-map-tint" />
                  </div>
                  <div className="cp-map-foot">
                    <div>
                      <p className="cp-map-tag">Office</p>
                      <p className="cp-map-addr">15233 Ventura Blvd Suite 500, Sherman Oaks</p>
                    </div>
                    <span className="cp-map-arrow">↗</span>
                  </div>
                </a>
              </Reveal>
            </div>

          </div>

          {/* ── BOTTOM BAND ──────────────────────────────────────── */}
          <section className="cp-bottom">
            <Reveal>
              <div className="cp-bottom-inner">
                <div>
                  <h3 className="cp-bottom-h3">Already a client?</h3>
                  <p className="cp-bottom-sub">Reach us directly for policy questions, updates, or claims support.</p>
                </div>
                <div className="cp-bottom-acts">
                  <a href="mailto:info@sentinelinsurance.agency" className="cp-btn-outline">
                    <MailIcon /> Email Us
                  </a>
                  <a href="tel:8186000821" className="cp-btn-solid">
                    <PhoneIcon /> 818-600-0821
                  </a>
                </div>
              </div>
            </Reveal>
          </section>

        </div>
      </main>
    </>
  )
}
