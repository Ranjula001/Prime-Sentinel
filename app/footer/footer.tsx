'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const aboutLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#slider' },
  { label: 'Why Choose Us', href: '/#slider' },
  { label: 'Our Products', href: '/#products' },
  { label: 'Client Reviews', href: '/#feedback' },
  { label: 'Contact', href: '/contact' },
]

const productLinks = [
  { label: 'Business Owners Policy', href: '/products/business-owners-policy' },
  { label: 'Trucking / Commercial Auto', href: '/products/transportation' },
  { label: 'Commercial Property', href: '/products/commercial-property' },
  { label: 'Workers Compensation', href: '/products/workers-compensation' },
  { label: 'Professional Liability / E&O', href: '/products/professional-liability' },
  { label: 'EPLI', href: '/products/epli' },
  { label: 'Umbrella / Excess Liability', href: '/products/umbrella-excess-liability' },
  { label: 'Personal Lines', href: '/products/personal-lines' },
]

const contactItems = [
  {
    label: 'Corporate Office',
    value: '15233 Ventura Blvd Suite 500\nSherman Oaks CA 91403',
    href: 'https://maps.google.com/?q=15233+Ventura+Blvd+Suite+500+Sherman+Oaks+CA+91403',
    external: true,
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '818-600-0821',
    href: 'tel:8186000821',
    external: false,
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.1 19.79 19.79 0 01.01 2.4 2 2 0 012 .22h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
  },
  {
    label: 'Fax',
    value: '818-337-7125',
    href: 'tel:8183377125',
    external: false,
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20M7 5v5" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'info@sentinelinsurance.agency',
    href: 'mailto:info@sentinelinsurance.agency',
    external: false,
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 8l10 6 10-6" />
      </svg>
    ),
  },
]

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )

    obs.observe(el)

    return () => obs.disconnect()
  }, [threshold])

  return { ref, visible }
}

function ScrollTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400)

    window.addEventListener('scroll', handler, { passive: true })

    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 50,
        height: 40,
        width: 40,
        borderRadius: '50%',
        background: '#fbbf24',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0a0a0a',
        boxShadow: '0 8px 24px rgba(251,191,36,0.25)',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: show ? 'auto' : 'none',
        transition: 'opacity .3s, transform .3s',
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}

const s = {
  root: {
    position: 'relative' as const,
    overflow: 'hidden',
    color: '#fff',
    fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
    background: '#09090b',
  },
  bgImg: {
    position: 'absolute' as const,
    inset: 0,
    backgroundImage: "url('/footer.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0,
  },
  overlay: {
    position: 'absolute' as const,
    inset: 0,
    background:
      'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.82) 45%, rgba(0,0,0,0.7) 100%)',
    zIndex: 1,
  },
  content: {
    position: 'relative' as const,
    zIndex: 2,
  },
  ctaBand: {
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    padding: '52px 48px 44px',
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 24,
  },
  ctaLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '.18em',
    textTransform: 'uppercase' as const,
    color: '#fbbf24',
    margin: '0 0 10px',
  },
  ctaHeading: {
    fontSize: 'clamp(28px, 4vw, 40px)',
    fontWeight: 300,
    lineHeight: 1.15,
    letterSpacing: '-.02em',
    color: '#fff',
    margin: 0,
  },
  ctaBtns: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 10,
  },
  btnGold: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: '#fbbf24',
    color: '#0a0a0a',
    fontSize: 12,
    fontWeight: 700,
    padding: '12px 24px',
    borderRadius: 8,
    textDecoration: 'none',
  },
  btnOutline: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'transparent',
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: 500,
    padding: '12px 24px',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.15)',
    textDecoration: 'none',
  },
  mainGrid: {
    padding: '48px 48px 40px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 40,
  },
  colLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '.16em',
    textTransform: 'uppercase' as const,
    color: '#52525b',
    margin: '0 0 18px',
  },
  navLink: {
    fontSize: 12,
    color: '#71717a',
    textDecoration: 'none',
    display: 'block',
    padding: '3px 0',
  },
  contactRow: {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
    textDecoration: 'none',
  },
  contactIcon: {
    color: '#fbbf24',
    flexShrink: 0,
    marginTop: 2,
  },
  contactLbl: {
    fontSize: 10,
    color: '#3f3f46',
    marginBottom: 3,
    letterSpacing: '.04em',
  },
  contactVal: {
    fontSize: 12,
    color: '#71717a',
    lineHeight: 1.6,
    wordBreak: 'break-all' as const,
  },
  bottomBar: {
    borderTop: '1px solid rgba(255,255,255,0.08)',
    padding: '16px 48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap' as const,
    gap: 8,
  },
  bottomText: {
    fontSize: 11,
    color: '#3f3f46',
    margin: 0,
  },
}

export default function Footer() {
  const { ref, visible } = useInView()

  return (
    <>
      <ScrollTop />

      <footer ref={ref} style={s.root}>
        <div style={s.bgImg} />
        <div style={s.overlay} />

        <div
          style={{
            ...s.content,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity .7s ease, transform .7s ease',
          }}
        >
          {/* CTA band */}
          <div style={s.ctaBand}>
            <div>
              <p style={s.ctaLabel}>Prime Sentinel Insurance Solutions</p>

              <h2 style={s.ctaHeading}>
                Insurance that works
                <br />
                <span style={{ color: '#a1a1aa' }}>as hard as you do.</span>
              </h2>
            </div>

            <div style={s.ctaBtns}>
              <Link href="/contact" style={s.btnGold}>
                Get a Quote
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/#products" style={s.btnOutline}>
                View Products
              </Link>
            </div>
          </div>

          {/* Main grid */}
          <div style={s.mainGrid}>
            {/* Brand */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    height: 42,
                    width: 42,
                    borderRadius: 10,
                    background: 'rgba(251,191,36,0.1)',
                    border: '1px solid rgba(251,191,36,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden',
                    padding: 5,
                  }}
                >
                  <Image
                    src="/PSLOGO.png"
                    alt="Prime Sentinel Insurance Solutions Logo"
                    width={32}
                    height={32}
                    priority={false}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#fff',
                      lineHeight: 1.3,
                    }}
                  >
                    Prime Sentinel
                  </div>

                  <div
                    style={{
                      fontSize: 10,
                      color: '#52525b',
                      letterSpacing: '.06em',
                    }}
                  >
                    Insurance Solutions
                  </div>
                </div>
              </div>

              <p
                style={{
                  fontSize: 12,
                  color: '#71717a',
                  lineHeight: 1.75,
                  margin: '0 0 16px',
                }}
              >
                Independent guidance for business owners, families, and growing teams
                across California.
              </p>

              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: '#3f3f46',
                  margin: 0,
                }}
              >
                CA LIC No. 6013732
              </p>
            </div>

            {/* About */}
            <div>
              <p style={s.colLabel}>About</p>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {aboutLinks.map((link) => (
                  <Link key={link.label} href={link.href} style={s.navLink}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Products */}
            <div>
              <p style={s.colLabel}>Products</p>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {productLinks.map((link) => (
                  <Link key={link.label} href={link.href} style={s.navLink}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <p style={s.colLabel}>Contact</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    style={s.contactRow}
                  >
                    <span style={s.contactIcon}>{item.icon}</span>

                    <div>
                      <div style={s.contactLbl}>{item.label}</div>
                      <div style={s.contactVal}>{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={s.bottomBar}>
            <p style={s.bottomText}>
              © 2026 Prime Sentinel Insurance Solutions · CA LIC No. 6013732 · All
              rights reserved.
            </p>

            <p style={s.bottomText}>
              Developed by <span style={{ color: '#52525b' }}>Ranjula Ilukpitiya</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}