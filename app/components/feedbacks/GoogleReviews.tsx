'use client'

import Image from 'next/image'
import React, { useEffect, useMemo, useState, CSSProperties } from 'react'

type Review = {
  author_name: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  role?: string
}

type ReviewsResponse = {
  name: string
  rating: number
  totalReviews: number
  googleUrl?: string
  reviews: Review[]
}

const fallbackReviews: Review[] = [
  { author_name: 'Rohan Mehta', role: 'Startup founder', rating: 5, relative_time_description: 'Google review', text: 'The attention to detail in PrebuiltUI is impressive. Saved me hours of repetitive work and time. Highly recommended.' },
  { author_name: 'Jason Kim', role: 'Product designer', rating: 5, relative_time_description: 'Google review', text: 'We were able to ship faster using PrebuiltUI. The consistency across components made UI feel polished.' },
  { author_name: 'Cristofer Levin', role: 'Frontend engineer', rating: 5, relative_time_description: 'Google review', text: 'PrebuiltUI helped us move faster without sacrificing design quality. The components are production-ready.' },
  { author_name: 'Sofia Martinez', role: 'UX designer', rating: 5, relative_time_description: 'Google review', text: "PrebuiltUI helped us maintain design consistency across multiple projects. It's now a core part of our design system." },
  { author_name: 'Daniel Wong', role: 'UI designer', rating: 5, relative_time_description: 'Google review', text: 'Our team productivity improved noticeably after adopting PrebuiltUI. It reduced design handoff friction.' },
  { author_name: 'Alex Turner', role: 'Full stack developer', rating: 5, relative_time_description: 'Google review', text: 'PrebuiltUI feels like it was built by people who actually ship products. Components are clean and easy to use.' },
]

const avatarColors: Record<string, { bg: string; color: string }> = {
  R: { bg: '#fce7f3', color: '#9d174d' },
  J: { bg: '#e0f2fe', color: '#075985' },
  C: { bg: '#d1fae5', color: '#065f46' },
  S: { bg: '#ede9fe', color: '#5b21b6' },
  D: { bg: '#fef3c7', color: '#92400e' },
  A: { bg: '#fee2e2', color: '#991b1b' },
}

function getAvatarStyle(name: string): { bg: string; color: string } {
  const letter = name.charAt(0).toUpperCase()
  const keys = Object.keys(avatarColors)
  return avatarColors[letter] ?? avatarColors[keys[name.charCodeAt(0) % keys.length]]
}

const StarRating = () => (
  <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ color: '#DAB001', fontSize: 14 }}>★</span>
    ))}
  </div>
)

const ReviewCard = ({ review }: { review: Review }) => {
  const av = getAvatarStyle(review.author_name)
  return (
    <article
      style={{
        width: 260,
        flexShrink: 0,
        background: 'black',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 16,
        boxSizing: 'border-box',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
      }}
    >
      <StarRating />
      <p
        style={{
          fontSize: 12,
          lineHeight: 1.6,
          color: '#ffffff',
          margin: '0 0 14px',
          minHeight: 72,
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        } as CSSProperties}
      >
        {review.text}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 600,
            background: av.bg,
            color: av.color,
            overflow: 'hidden',
          }}
        >
          {review.profile_photo_url ? (
            <Image src={review.profile_photo_url} alt={review.author_name} width={32} height={32} style={{ objectFit: 'cover', borderRadius: '50%' }} />
          ) : (
            review.author_name.charAt(0)
          )}
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#ffffff' }}>{review.author_name}</p>
          <p style={{ margin: 0, fontSize: 11, color: '#9ca3af' }}>{review.role ?? 'Google Review'}</p>
        </div>
      </div>
    </article>
  )
}

const GoogleReviews = () => {
  const [data, setData] = useState<ReviewsResponse | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/google-reviews', { cache: 'no-store' })
        if (!response.ok) throw new Error('Failed')
        setData(await response.json())
      } catch {
        setData({ name: 'Prime Sentinel Insurance', rating: 5, totalReviews: 40, reviews: fallbackReviews })
      }
    }
    fetchReviews()
  }, [])

  const reviews = useMemo(() => {
    const source = data?.reviews?.length ? data.reviews : fallbackReviews
    if (source.length >= 6) return source
    return [...source, ...fallbackReviews].slice(0, 6)
  }, [data])

  return (
    <section style={{ background: 'transparent', padding: '32px 0 40px', width: '100%' }}>
      <style>{`
        @keyframes reviewScrollFwd {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .review-scroll-fwd {
          animation: reviewScrollFwd 32s linear infinite;
        }
        .review-row:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .review-scroll-fwd { animation: none; transform: translateX(0); }
        }
      `}</style>

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Left fade */}
        <div style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: 80,
          background: 'linear-gradient(to right, rgba(255,255,255,0.9), transparent)',
          zIndex: 2,
        }} />
        {/* Right fade */}
        <div style={{
          pointerEvents: 'none',
          position: 'absolute',
          right: 0, top: 0, bottom: 0,
          width: 80,
          background: 'linear-gradient(to left, rgba(255,255,255,0.9), transparent)',
          zIndex: 2,
        }} />

        <div
          className="review-row review-scroll-fwd"
          style={{ display: 'flex', gap: 12, width: 'max-content' }}
        >
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={`${review.author_name}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default GoogleReviews