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
  { author_name: 'Hiran Wirekoon', role: 'Citizen', rating: 5, relative_time_description: 'Google review', text: 'I had a great experience working with Chrishan. From the very beginning, he took the time to clearly walk us through the entire process and made sure we understood our options. Commercial insurance can often feel complicated, but his ability to explain things in a straightforward and thoughtful way made it much easier for us to make informed decisions.Chrishan was consistently responsive and accessible whenever we had questions. His communication was prompt, professional, and reliable, which gave us confidence throughout the process. What stood out the most was his willingness to explore different options and solutions to ensure that the coverage aligned with our business needs and long-term interests.It was clear that he approached the relationship as a true partner rather than just a broker. He was proactive, transparent, and genuinely focused on finding the best outcome for our business.This is our first policy with Chrishan, but based on this experience, I am confident that we will continue working together in the future. I would highly recommend him to any business looking for a knowledgeable, responsive, and trustworthy commercial insurance advisor.' },
  { author_name: 'Shaheen Ghazaly', role: 'Citizen', rating: 5, relative_time_description: 'Google review', text: 'I’ve had a great experience with Prime Sentinel Insurance Solutions for my business insurance and workers’ compensation coverage. Their service is efficient, responsive, and very professional.Chrishan has been outstanding — always quick to respond, patient in explaining details, and proactive in making sure my business is properly covered. It gives me peace of mind knowing I can consult him anytime I need assistance or clarification.If you’re looking for reliable and knowledgeable insurance support for your business, Prime Sentinel Insurance Solutions is a great choice.' },
  { author_name: 'Jose Fernandez', role: 'Citizen', rating: 5, relative_time_description: 'Google review', text: 'I would like to give thanks to Agent Chrishan of Prime sentinel insurance. He was so knowledgeable and helpful with helping me get a great reliable Home insurance policy for home. I will definitely send him referrals for his services and assistance with getting a great plan that met our insurance needs.' },
  { author_name: 'Vishal Dudheker', role: 'Mortage Broker', rating: 5, relative_time_description: 'Google review', text: "As a mortgage broker, I have referred several clients to Prime Sentinel Insurance Solutions, primarily for their business insurance needs, and the experience has been consistently positive. Chrishan and his team are knowledgeable, responsive, and take the time to clearly explain coverage options, which makes the process easy and stress free for my clients. They have been especially helpful when timing mattered, stepping in quickly and finding solid solutions that kept transactions moving. My clients always come back appreciative of the service they received, and Prime Sentinel Insurance Solutions has become a trusted partner that I confidently recommend." },
  { author_name: 'Melan Jansz', role: 'Citizen', rating: 5, relative_time_description: 'Google review', text: 'When I was shopping around for Insurance options for my business, I was referred to Chrishan at Prime Sentinel Insurance by another business associate.Since then, I’ve had an amazing experience with Prime Sentinel Insurance Solutions! From the moment I reached out, he was incredibly professional, knowledgeable, and genuinely cared about finding the best coverage for my business. He took the time to explain every detail clearly, which made the whole process stress-free and easy to understand.What really stood out to me was how responsive and transparent he was — no hidden surprises, just honest advice and great customer service. It’s refreshing to work with an agency that treats you like a person, not just a policy number.I feel confident knowing that my insurance is handled by someone that truly has my back. If you’re looking for reliable, trustworthy insurance expert, I highly recommend Prime Sentinel Insurance Solutions!' },
  { author_name: 'Natalie Campos', role: 'Citizen', rating: 5, relative_time_description: 'Google review', text: `I've been working with Chrishan at Prime Sentinel Insurance Services as my insurance broker, and I couldn't be happier. He is knowledgeable, caring, and always goes the extra mile to ensure I have the best coverage available. Chrishan is consistently responsive and genuinely committed to helping. It’s clear he puts his clients first. Highly recommend!` },
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
  const [data, setData] = useState<ReviewsResponse>({
    name: 'Prime Sentinel Insurance',
    rating: 5,
    totalReviews: 40,
    reviews: fallbackReviews,
  })

  useEffect(() => {
    const fetchReviews = async () => {
      const controller = new AbortController()
      const timeout = window.setTimeout(() => controller.abort(), 5000)

      try {
        const response = await fetch('/api/google-reviews', {
          cache: 'force-cache',
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('Failed')
        setData(await response.json())
      } catch {
        setData({ name: 'Prime Sentinel Insurance', rating: 5, totalReviews: 40, reviews: fallbackReviews })
      } finally {
        window.clearTimeout(timeout)
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
