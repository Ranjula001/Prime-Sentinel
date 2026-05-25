'use client'

import { products } from '@/app/data/products'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState } from 'react'

const ProductsGallery = () => {
  const [mounted, setMounted] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const frameRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const rotationRef = useRef(0)

  const pointerDownRef = useRef(false)
  const pointerCapturedRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartRotationRef = useRef(0)
  const dragMovedRef = useRef(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const animate = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time
      }

      const delta = time - lastTimeRef.current
      lastTimeRef.current = time

      if (!isPaused && !isDragging) {
        rotationRef.current += delta * 0.018
        setRotation(rotationRef.current)
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [mounted, isPaused, isDragging])

  useEffect(() => {
    if (!isDragging) return

    const previousUserSelect = document.body.style.userSelect
    const previousWebkitUserSelect = document.body.style.webkitUserSelect

    document.body.style.userSelect = 'none'
    document.body.style.webkitUserSelect = 'none'

    return () => {
      document.body.style.userSelect = previousUserSelect
      document.body.style.webkitUserSelect = previousWebkitUserSelect
    }
  }, [isDragging])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerDownRef.current = true
    pointerCapturedRef.current = false
    dragMovedRef.current = false

    dragStartXRef.current = event.clientX
    dragStartRotationRef.current = rotationRef.current

    setIsPaused(true)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerDownRef.current) return

    const dragDistance = event.clientX - dragStartXRef.current

    if (Math.abs(dragDistance) > 6) {
      dragMovedRef.current = true
      setIsDragging(true)

      if (!pointerCapturedRef.current) {
        event.currentTarget.setPointerCapture(event.pointerId)
        pointerCapturedRef.current = true
      }

      event.preventDefault()
    }

    if (!dragMovedRef.current) return

    const nextRotation = dragStartRotationRef.current + dragDistance * 0.22

    rotationRef.current = nextRotation
    setRotation(nextRotation)
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerDownRef.current = false
    setIsDragging(false)
    setIsPaused(false)

    if (
      pointerCapturedRef.current &&
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    pointerCapturedRef.current = false

    window.setTimeout(() => {
      dragMovedRef.current = false
    }, 120)
  }

  const handlePointerCancel = () => {
    pointerDownRef.current = false
    pointerCapturedRef.current = false
    setIsDragging(false)
    setIsPaused(false)

    window.setTimeout(() => {
      dragMovedRef.current = false
    }, 120)
  }

  const cards = useMemo(() => {
    const total = products.length
    const step = 360 / total

    return products.map((product, index) => {
      const rawAngle = index * step + rotation
      const angle = ((rawAngle + 540) % 360) - 180
      const rad = (angle * Math.PI) / 180

      const radiusX = 470
      const x = Math.sin(rad) * radiusX
      const depth = Math.cos(rad)

      const frontStrength = Math.max(0, 1 - Math.abs(angle) / 125)
      const isVisible = Math.abs(angle) <= 130

      const scale = 0.58 + frontStrength * 0.46
      const y = Math.abs(angle) * 0.2
      const rotate = -angle * 0.08
      const opacity = isVisible ? 0.32 + frontStrength * 0.68 : 0
      const zIndex = Math.round(1000 + depth * 500)

      return {
        product,
        x,
        y,
        scale,
        rotate,
        opacity,
        zIndex,
        isVisible,
        frontStrength,
      }
    })
  }, [rotation])

  return (
    <section
      className="relative mt-8 md:mt-12 min-h-[500px] md:min-h-[680px] lg:min-h-[740px] select-none overflow-hidden rounded-[24px] md:rounded-[38px] bg-[#070707] px-4 md:px-6 lg:px-16 py-10 md:py-16 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        pointerDownRef.current = false
        pointerCapturedRef.current = false
        setIsDragging(false)
        setIsPaused(false)
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(218,176,1,0.24),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.06),transparent_28%)]" />

      <div
        className={`relative z-10 mt-8 md:mt-12 h-[400px] md:h-[520px] lg:h-[560px] overflow-visible ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } touch-pan-y select-none`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onDragStart={(event) => event.preventDefault()}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[1px] w-[60%] md:w-[76%] -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#DAB001]/50 to-transparent" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] md:h-[500px] w-[600px] md:w-[940px] -translate-x-1/2 -translate-y-1/2 rounded-t-full border-t border-[#DAB001]/30 opacity-80" />

        <div className="absolute inset-0 overflow-visible select-none">
          {mounted && cards.map(
            ({
              product,
              x,
              y,
              scale,
              rotate,
              opacity,
              zIndex,
              isVisible,
              frontStrength,
            }) => (
              <div
                key={product.slug}
                className="absolute left-1/2 top-1/2 h-[280px] w-[200px] md:h-[360px] md:w-[260px] select-none"
                style={{
                  zIndex,
                  opacity,
                  pointerEvents: isVisible ? 'auto' : 'none',
                  transform: `
                    translate(-50%, -50%)
                    translateX(${x}px)
                    translateY(${y}px)
                    rotate(${rotate}deg)
                    scale(${scale})
                  `,
                  transformOrigin: 'center center',
                  transition: isDragging
                    ? 'opacity 120ms linear'
                    : 'transform 180ms linear, opacity 180ms linear',
                  willChange: 'transform, opacity',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                }}
              >
                <Link
                  href={`/products/${product.slug}`}
                  draggable={false}
                  onClick={(event) => {
                    if (dragMovedRef.current) {
                      event.preventDefault()
                      event.stopPropagation()
                    }
                  }}
                  className="group block h-full w-full cursor-pointer select-none"
                >
                  <div className="relative h-full w-full select-none overflow-hidden rounded-[20px] md:rounded-[28px] border border-white/10 bg-[#111] shadow-[0_35px_90px_rgba(0,0,0,0.55)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[#DAB001]/70">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 78vw, (max-width: 1200px) 34vw, 24vw"
                      className="pointer-events-none h-full w-full select-none object-cover transition-transform duration-700 group-hover:scale-110"
                      draggable={false}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

                    <div className="pointer-events-none absolute left-3 md:left-5 top-3 md:top-5 select-none rounded-full border border-white/15 bg-black/70 px-2 md:px-3 py-1.5 md:py-2 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
                      {product.category}
                    </div>

                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 select-none p-3 md:p-5">
                      <p className="select-none text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#DAB001]">
                        {product.shortTitle}
                      </p>

                      <h4 className="mt-1 md:mt-2 select-none text-lg md:text-2xl font-medium leading-none tracking-[-0.06em] text-white">
                        {product.title}
                      </h4>

                      <p
                        className="mt-2 md:mt-3 line-clamp-3 select-none text-xs md:text-sm leading-4 md:leading-5 text-white/65"
                        style={{
                          opacity: Math.max(0.5, frontStrength),
                        }}
                      >
                        {product.summary}
                      </p>

                      <div className="mt-3 md:mt-5 inline-flex select-none items-center gap-2 md:gap-3 rounded-full bg-white px-3 md:px-4 py-2 md:py-3 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.12em] text-black transition-colors duration-300 group-hover:bg-[#DAB001]">
                        View Details
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          )}
        </div>
      </div>

      {/* <div className="relative z-10 mx-auto mt-4 max-w-3xl select-none text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/35">
          Currently highlighting
        </p>

        <h4 className="mt-3 text-[clamp(26px,4vw,48px)] font-light leading-none tracking-[-0.06em] text-white">
          {activeProduct?.title}
        </h4>
      </div> */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}

export default ProductsGallery
