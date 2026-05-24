'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import MenuItem from './itemButton'

/* ─── Nav link definitions ──────────────────────────────────────────
   href rules:
   - '/'          → home (scroll to top)
   - '/#<id>'     → home page section (smooth scroll if already on /)
   - '/contact'   → dedicated contact page
 ──────────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'HOME',     href: '/'          },
  { label: 'ABOUT US', href: '/#slider'   },
  { label: 'PRODUCTS', href: '/#products' },
  { label: 'REVIEWS',  href: '/#feedback' },
  { label: 'CONTACT',  href: '/contact'   },
]

type MenuItemsProps = {
  isOpen: boolean
  onClose: () => void
}

const MenuItems = ({ isOpen, onClose }: MenuItemsProps) => {
  const router   = useRouter()
  const pathname = usePathname()

  const [email, setEmail] = useState('')

  /* Determines whether a link is "active" based on current route */
  const isActive = (href: string) => {
    if (href === '/')        return pathname === '/'
    if (href.startsWith('/#')) return pathname === '/'   // section links are "active" when on home
    return pathname.startsWith(href)
  }

  /* Smart navigation:
     - Section links (#)  → smooth scroll if on home, otherwise push then rely on hash
     - Regular page links → router.push
  */
  const handleClick = (href: string) => {
    onClose()

    if (href.startsWith('/#')) {
      const sectionId = href.slice(2) // strip leading /#

      if (pathname === '/') {
        // Already on home — just scroll
        const el = document.getElementById(sectionId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // Navigate to home; the hash lets the browser jump to the section
        router.push(href)
      }
      return
    }

    if (href === '/') {
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        router.push('/')
      }
      return
    }

    router.push(href)
  }

  const handleNewsletterSubmit = () => {
    if (!email) return
    // Wire to your newsletter service here
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <div
      className={`fixed top-24 right-0 my-5 px-6 z-100 w-[420px] transition-all duration-500 ease-in-out ${
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-6 pointer-events-none'
      }`}
    >
      {/* ── Nav links ── */}
      <div className="bg-white rounded-3xl shadow-xl px-4 pt-4 pb-4 mb-3">
        {NAV_LINKS.map((item) => (
          <MenuItem
            key={item.label}
            label={item.label}
            active={isActive(item.href)}
            onClick={() => handleClick(item.href)}
          />
        ))}
      </div>

      {/* ── Newsletter ── */}
      <div className="bg-white shadow-xl rounded-3xl p-8 mb-3">
        <p className="font-[var(--font-inter)] text-3xl font-semibold mb-6 leading-tight">
          Subscribe to<br />our newsletter
        </p>
        <div className="bg-gray-100 rounded-2xl flex items-center px-6 py-4 gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNewsletterSubmit()}
            placeholder="Your email"
            className="bg-transparent flex-1 font-[var(--font-inter)] text-lg outline-none text-gray-400 placeholder-gray-400"
          />
          <button
            onClick={handleNewsletterSubmit}
            className="text-2xl hover:translate-x-1 transition-transform duration-200 cursor-pointer"
          >
            →
          </button>
        </div>
      </div>

      {/* ── Contact Us bar ── */}
      <button
        onClick={() => handleClick('/contact')}
        className="w-full bg-black rounded-3xl px-8 py-5 flex items-center justify-between cursor-pointer group"
      >
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <p className="font-[var(--font-inter)] text-xl font-semibold uppercase text-white tracking-wide">
            CONTACT US
          </p>
        </div>
        <span className="text-white text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          ↗
        </span>
      </button>
    </div>
  )
}

export default MenuItems