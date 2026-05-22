"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    image: "/Trucks.webp",
    tag: "Commercial & Trucking",
    headline: "Keep Your Fleet\nMoving Forward",
    description:
      "Tailored insurance for independent truckers and large fleets — compliance guaranteed, assets protected.",
    cta: "Get Trucking Coverage",
  },
  {
    image: "/Porsche.webp",
    tag: "Commercial Auto",
    headline: "Protect Every\nVehicle You Own",
    description:
      "From single-vehicle operators to multi-car commercial fleets, we find the right coverage across 30+ carriers.",
    cta: "Explore Auto Plans",
  },
  {
    image: "/House.webp",
    tag: "Business Owners Policy",
    headline: "One Policy.\nComplete Peace of Mind.",
    description:
      "Bundle general liability, commercial property, and business income into a single seamless BOP.",
    cta: "Build Your BOP",
  },
  {
    image: "/Yatch.webp",
    tag: "Specialty Liability",
    headline: "Luxury Assets\nDeserve Elite Cover",
    description:
      "Professional liability, EPLI, and umbrella policies crafted for high-value assets and discerning clients.",
    cta: "Discover Specialty Plans",
  },
  {
    image: "/7Eleven.webp",
    tag: "Small Business",
    headline: "Your Business,\nOur Priority",
    description:
      "Independent advocates shopping 30+ carriers to secure custom coverage for small businesses like yours.",
    cta: "Protect My Business",
  },
  {
    image: "/SubWay.webp",
    tag: "Franchise & Retail",
    headline: "Scale With\nConfidence",
    description:
      "Comprehensive coverage solutions for franchise operators, retail chains, and growing enterprises.",
    cta: "Get a Custom Quote",
  },
  {
    image: "/Life.webp",
    tag: "Personal Lines",
    headline: "Guard What\nMatters Most",
    description:
      "Auto, home, and umbrella coverage for individuals and families — securing your world beyond business.",
    cta: "Explore Personal Plans",
  },
];

export default function Slider() {
  const [items, setItems] = useState(slides);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [contentKey, setContentKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (dir: "next" | "prev") => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    setContentKey((k) => k + 1);

    timeoutRef.current = setTimeout(() => {
      setItems((prev) => {
        const arr = [...prev];
        if (dir === "next") {
          const first = arr.shift()!;
          arr.push(first);
        } else {
          const last = arr.pop()!;
          arr.unshift(last);
        }
        return arr;
      });
      setAnimating(false);
      setDirection(null);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // The "hero" slide is always index 1 (the large background)
  const activeSlide = items[1];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Barlow+Condensed:wght@300;400;500;600&display=swap');

        :root {
          --gold: #C9A84C;
          --gold-light: #E8C97A;
          --navy: #0B1929;
          --navy-mid: #112236;
          --cream: #F7F3EC;
          --text-muted: rgba(247,243,236,0.6);
        }

        .ps-hero {
          font-family: 'Barlow Condensed', sans-serif;
          width: 100%;
          height: 100svh;
          min-height: 600px;
          background: var(--navy);
          overflow: hidden;
          position: relative;
        }

        /* ── SLIDE ITEMS ── */
        .ps-slide {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .ps-item {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 16px;
          background-size: cover;
          background-position: center;
          overflow: hidden;
          transition: all 0.55s cubic-bezier(0.77, 0, 0.175, 1);
        }

        /* Slot layout */
        .ps-item:nth-child(1),
        .ps-item:nth-child(2) {
          top: 0;
          left: 0;
          transform: none;
          border-radius: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .ps-item:nth-child(3) { left: 50%;         width: 220px; height: 340px; z-index: 3; }
        .ps-item:nth-child(4) { left: calc(50% + 240px); width: 220px; height: 340px; z-index: 3; }
        .ps-item:nth-child(5) { left: calc(50% + 480px); width: 220px; height: 340px; z-index: 3; opacity: 0.7; }
        .ps-item:nth-child(n+6) { left: calc(50% + 720px); width: 220px; height: 340px; z-index: 3; opacity: 0; }

        /* Background overlay */
        .ps-item:nth-child(2)::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            rgba(11,25,41,0.92) 0%,
            rgba(11,25,41,0.65) 45%,
            rgba(11,25,41,0.2) 100%
          );
          z-index: 1;
        }

        /* Thumbnail overlay */
        .ps-item:nth-child(n+3)::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(11,25,41,0.85) 100%);
          border-radius: 16px;
          z-index: 1;
        }

        .ps-item:nth-child(3),
        .ps-item:nth-child(4),
        .ps-item:nth-child(5) {
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        }

        /* ── HERO CONTENT ── */
        .ps-content {
          position: absolute;
          top: 50%;
          left: clamp(32px, 8vw, 120px);
          transform: translateY(-50%);
          z-index: 10;
          max-width: 560px;
          display: none;
        }

        .ps-item:nth-child(2) .ps-content {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .ps-tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
          animation: slideUp 0.7s ease forwards 0.1s;
        }

        .ps-tag::before {
          content: '';
          display: block;
          width: 30px;
          height: 1px;
          background: var(--gold);
        }

        .ps-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 7vw, 96px);
          font-weight: 700;
          line-height: 1.0;
          color: var(--cream);
          white-space: pre-line;
          margin-bottom: 20px;
          opacity: 0;
          animation: slideUp 0.7s ease forwards 0.25s;
        }

        .ps-headline em {
          font-style: italic;
          color: var(--gold-light);
        }

        .ps-desc {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(15px, 1.4vw, 18px);
          font-weight: 300;
          letter-spacing: 0.02em;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 400px;
          margin-bottom: 36px;
          opacity: 0;
          animation: slideUp 0.7s ease forwards 0.4s;
        }

        .ps-btn-group {
          display: flex;
          gap: 14px;
          align-items: center;
          opacity: 0;
          animation: slideUp 0.7s ease forwards 0.55s;
        }

        .ps-cta {
          background: var(--gold);
          color: var(--navy);
          border: none;
          padding: 14px 32px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 3px;
          transition: background 0.25s, transform 0.2s;
          white-space: nowrap;
        }

        .ps-cta:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
        }

        .ps-cta-ghost {
          background: transparent;
          color: var(--cream);
          border: 1px solid rgba(247,243,236,0.3);
          padding: 14px 28px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 3px;
          transition: border-color 0.25s, color 0.25s;
          white-space: nowrap;
        }

        .ps-cta-ghost:hover {
          border-color: var(--gold);
          color: var(--gold-light);
        }

        /* ── THUMBNAIL LABEL ── */
        .ps-thumb-label {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          z-index: 2;
          display: none;
        }

        .ps-item:nth-child(n+3) .ps-thumb-label {
          display: block;
        }

        .ps-thumb-tag {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 4px;
        }

        .ps-thumb-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          color: var(--cream);
          line-height: 1.2;
        }

        /* ── LOGO / NAV HEADER ── */
        .ps-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
          padding: clamp(20px, 3vw, 36px) clamp(24px, 6vw, 80px);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ps-logo {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ps-logo-top {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(18px, 2vw, 26px);
          font-weight: 700;
          color: var(--cream);
          letter-spacing: 0.05em;
          line-height: 1;
        }

        .ps-logo-sub {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .ps-badge {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: var(--text-muted);
          border: 1px solid rgba(201,168,76,0.3);
          padding: 8px 16px;
          border-radius: 2px;
          text-transform: uppercase;
        }

        /* ── NAV CONTROLS ── */
        .ps-controls {
          position: absolute;
          bottom: clamp(24px, 4vh, 48px);
          left: clamp(32px, 8vw, 120px);
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ps-nav-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.4);
          background: rgba(11,25,41,0.5);
          backdrop-filter: blur(8px);
          color: var(--cream);
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.25s, border-color 0.25s, transform 0.2s;
        }

        .ps-nav-btn:hover {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--navy);
          transform: scale(1.08);
        }

        .ps-nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }

        .ps-slide-count {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          padding: 0 8px;
          user-select: none;
        }

        /* ── DECORATIVE RULE ── */
        .ps-rule {
          position: absolute;
          right: clamp(24px, 4vw, 60px);
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          pointer-events: none;
        }

        .ps-rule-line {
          width: 1px;
          height: 80px;
          background: linear-gradient(180deg, transparent, rgba(201,168,76,0.5), transparent);
        }

        .ps-rule-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--gold);
          opacity: 0.6;
        }

        /* ── ANIMATIONS ── */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); filter: blur(8px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ps-item:nth-child(3),
          .ps-item:nth-child(4),
          .ps-item:nth-child(5),
          .ps-item:nth-child(n+6) {
            display: none;
          }
          .ps-rule { display: none; }
          .ps-badge { display: none; }
          .ps-headline { font-size: clamp(42px, 10vw, 72px); }
        }

        @media (max-width: 600px) {
          .ps-content {
            left: 24px;
            right: 24px;
            max-width: 100%;
          }
          .ps-controls {
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `}</style>

      <section className="ps-hero">
        {/* Header */}
        <header className="ps-header mt-20">
          <span className="ps-badge">30+ Carrier Network</span>
        </header>

        {/* Slide Track */}
        <div className="ps-slide">
          {items.map((slide, i) => (
            <div
              key={`${slide.image}-${i}`}
              className="ps-item"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Hero content (only shown on slot 2) */}
              <div className="ps-content" key={`content-${contentKey}-${i}`}>
                <span className="ps-tag">{activeSlide.tag}</span>
                <h1 className="ps-headline">{activeSlide.headline}</h1>
                <p className="ps-desc">{activeSlide.description}</p>
                <div className="ps-btn-group">
                  <button className="ps-cta">{activeSlide.cta}</button>
                  <button className="ps-cta-ghost">Free Consultation</button>
                </div>
              </div>

              {/* Thumbnail label (slots 3+) */}
              <div className="ps-thumb-label">
                <div className="ps-thumb-tag">{slide.tag}</div>
                <div className="ps-thumb-name">
                  {slide.headline.split("\n")[0]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative rule */}
        <div className="ps-rule">
          <div className="ps-rule-line" />
          <div className="ps-rule-dot" />
          <div className="ps-rule-line" />
        </div>

        {/* Controls */}
        <div className="ps-controls">
          <button
            className="ps-nav-btn prev"
            onClick={() => go("prev")}
            disabled={animating}
            aria-label="Previous slide"
          >
            ←
          </button>
          <span className="ps-slide-count">
            {String(items.indexOf(activeSlide) + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
          <button
            className="ps-nav-btn next"
            onClick={() => go("next")}
            disabled={animating}
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </section>
    </>
  );
}