'use client'

import Slider from '@/app/components/imageSliders/slider'
import { motion } from 'framer-motion'
import { Inter } from 'next/font/google'
import React, { useEffect, useRef, useState } from 'react'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

const Home = () => {
  const stageRef = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [horizontalProgress, setHorizontalProgress] = useState(0)
  const [showPlayButton, setShowPlayButton] = useState(false)
  const [videoStarted, setVideoStarted] = useState(false)

  const progressRef = useRef(0)
  const lockedRef = useRef(false)
  const releaseReadyAtRef = useRef(0)

  const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max)
  }

  const setProgress = (value: number) => {
    const next = clamp(value, 0, 1)
    progressRef.current = next
    setHorizontalProgress(next)
  }

  const scrollToSlider = () => {
    const stage = stageRef.current
    if (!stage) return

    window.scrollTo({
      top: stage.offsetTop,
      behavior: 'smooth',
    })
  }

  const lockStage = () => {
    const stage = stageRef.current
    if (!stage) return

    lockedRef.current = true
    window.scrollTo({
      top: stage.offsetTop,
      behavior: 'auto',
    })
  }

  const releaseDown = () => {
    const stage = stageRef.current
    if (!stage) return

    lockedRef.current = false

    window.scrollTo({
      top: stage.offsetTop + window.innerHeight + 2,
      behavior: 'smooth',
    })
  }

  const releaseUp = () => {
    const stage = stageRef.current
    if (!stage) return

    lockedRef.current = false

    window.scrollTo({
      top: Math.max(stage.offsetTop - window.innerHeight * 0.85, 0),
      behavior: 'smooth',
    })
  }

  const playVideoWithSound = async () => {
    const video = videoRef.current
    if (!video) return

    video.muted = false
    video.volume = 1

    try {
      await video.play()
      setVideoStarted(true)
      setShowPlayButton(false)
    } catch {
      setShowPlayButton(true)
    }
  }

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const stage = stageRef.current
      if (!stage) return

      const stageTop = stage.offsetTop
      const stageBottom = stageTop + window.innerHeight
      const scrollY = window.scrollY
      const direction = event.deltaY > 0 ? 1 : -1
      const progress = progressRef.current

      const isInsideStage =
        scrollY >= stageTop - 4 && scrollY <= stageBottom + 4

      const isEnteringStageFromTop =
        direction > 0 &&
        scrollY >= stageTop - 8 &&
        scrollY < stageBottom &&
        progress < 1

      const isEnteringStageFromBottom =
        direction < 0 &&
        scrollY <= stageBottom + 8 &&
        scrollY > stageTop &&
        progress > 0

      if (!lockedRef.current) {
        if (isEnteringStageFromTop || isEnteringStageFromBottom) {
          event.preventDefault()
          lockStage()
        } else {
          return
        }
      }

      if (!isInsideStage && lockedRef.current) {
        window.scrollTo({
          top: stageTop,
          behavior: 'auto',
        })
      }

      event.preventDefault()

      const now = Date.now()

      if (direction > 0 && progress >= 1) {
        if (now > releaseReadyAtRef.current) {
          releaseDown()
        }
        return
      }

      if (direction < 0 && progress <= 0) {
        if (now > releaseReadyAtRef.current) {
          releaseUp()
        }
        return
      }

      const speed = Math.abs(event.deltaY) / 1050
      const next = clamp(progress + direction * speed, 0, 1)

      setProgress(next)

      if (next === 1 || next === 0) {
        releaseReadyAtRef.current = Date.now() + 650
      }
    }

    const keepStagePinned = () => {
      const stage = stageRef.current
      if (!stage || !lockedRef.current) return

      const distance = Math.abs(window.scrollY - stage.offsetTop)

      if (distance > 2) {
        window.scrollTo({
          top: stage.offsetTop,
          behavior: 'auto',
        })
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', keepStagePinned, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', keepStagePinned)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (horizontalProgress >= 0.98 && !videoStarted) {
      video.muted = false
      video.volume = 1

      video
        .play()
        .then(() => {
          setVideoStarted(true)
          setShowPlayButton(false)
        })
        .catch(() => {
          setShowPlayButton(true)
        })
    }

    if (horizontalProgress < 0.9 && videoStarted) {
      video.pause()
      video.currentTime = 0
      setVideoStarted(false)
      setShowPlayButton(false)
    }
  }, [horizontalProgress, videoStarted])

  const trackX = `${-horizontalProgress * 100}vw`

  const sliderScale = 1 - horizontalProgress * 0.14
  const sliderRotateY = -18 * horizontalProgress
  const sliderRotateX = -8 * horizontalProgress
  const sliderOpacity = 1 - horizontalProgress * 0.75
  const sliderBlur = `blur(${horizontalProgress * 10}px)`

  const aboutScale = 0.84 + horizontalProgress * 0.16
  const aboutRotateY = 28 - horizontalProgress * 28
  const aboutRotateX = 10 - horizontalProgress * 10
  const aboutOpacity = clamp((horizontalProgress - 0.2) / 0.35, 0, 1)
  const aboutY = 80 - horizontalProgress * 80
  const aboutRadius = 44 - horizontalProgress * 44

  return (
    <main
      className={`${inter.className} min-h-screen w-full overflow-x-clip bg-[#e7e9e5] text-black`}
    >
      {/* HERO SECTION */}
      <section className="relative flex h-[76svh] min-h-[560px] items-center overflow-hidden bg-[#e7e9e5] px-6 py-20 md:px-[6vw] lg:px-[110px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: 0.4,
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="pointer-events-none absolute -right-[120px] -top-[90px] h-[190px] w-[190px] rounded-full border-[18px] border-white/70 shadow-[inset_18px_18px_35px_rgba(0,0,0,0.08),20px_24px_50px_rgba(0,0,0,0.12)] md:-right-[70px] md:h-[23vw] md:w-[23vw] md:border-[2.5vw] lg:max-h-[430px] lg:max-w-[430px]"
        />

        <div className="relative z-10 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="m-0 text-[clamp(54px,17vw,120px)] font-light leading-[0.88] tracking-[-0.08em] text-black lg:text-[clamp(62px,11vw,120px)]"
          >
            Welcome To <span className="text-[#DAB001]">Prime Sentinel</span>{' '}
            Insurance Solutions
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              opacity: {
                delay: 0.18,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              },
              y: {
                delay: 0.18,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              },
              filter: {
                delay: 0.18,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              },
              backgroundPosition: {
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            className="m-0 bg-gradient-to-r from-black via-[#DAB001] to-black bg-[length:220%_100%] bg-clip-text text-[clamp(40px,10vw,92px)] font-light leading-[0.92] tracking-[-0.07em] text-transparent lg:ml-[26vw] lg:text-[clamp(40px,7vw,82px)] xl:ml-[520px]"
          >
            Business. Property. Peace of Mind.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.8,
            }}
            className="mt-8 flex flex-col items-start gap-6 lg:ml-[27vw] lg:mt-[5vh] xl:ml-[535px]"
          >
            <button
              onClick={scrollToSlider}
              className="w-full max-w-[360px] rounded-lg border border-black/20 bg-black px-6 py-[15px] text-left text-xs font-semibold uppercase leading-[1.4] tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#DAB001] hover:text-[#071321] sm:w-auto sm:max-w-none"
            >
              Schedule your free coverage consultation
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1,
            duration: 0.7,
          }}
          className="absolute bottom-[34px] right-6 hidden flex-col items-center text-xs uppercase tracking-[0.18em] text-black/40 md:right-[4vw] md:flex lg:right-[70px]"
        >
          <span>Scroll</span>

          <motion.div
            animate={{
              scaleY: [0.25, 1, 0.25],
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mt-3 h-11 w-px origin-top bg-black/35"
          />
        </motion.div>
      </section>

      {/* LOCKED HORIZONTAL 3D STAGE */}
      <section
        ref={stageRef}
        className="relative h-screen overflow-hidden bg-[#080808]"
      >
        <div className="relative h-screen overflow-hidden [perspective:1800px]">
          <motion.div
            animate={{ x: trackX }}
            transition={{ type: 'spring', stiffness: 80, damping: 24 }}
            className="flex h-screen w-[200vw]"
          >
            {/* SLIDER PANEL */}
            <section className="relative h-screen w-screen shrink-0 overflow-hidden bg-[#080808]">
              <motion.div
                animate={{
                  scale: sliderScale,
                  rotateY: sliderRotateY,
                  rotateX: sliderRotateX,
                  opacity: sliderOpacity,
                  filter: sliderBlur,
                }}
                transition={{ type: 'spring', stiffness: 80, damping: 24 }}
                style={{ transformPerspective: 1800 }}
                className="h-full w-full origin-center overflow-hidden"
              >
                <Slider />
              </motion.div>
            </section>

            {/* ABOUT PANEL */}
            <section className="relative h-screen w-screen shrink-0 overflow-hidden bg-[#eef0f7]">
              <motion.div
                animate={{
                  y: aboutY,
                  scale: aboutScale,
                  rotateY: aboutRotateY,
                  rotateX: aboutRotateX,
                  opacity: aboutOpacity,
                  borderRadius: aboutRadius,
                }}
                transition={{ type: 'spring', stiffness: 80, damping: 24 }}
                style={{ transformPerspective: 1800 }}
                className="relative h-full w-full origin-center overflow-hidden bg-[#eef0f7] px-6 py-10 text-black shadow-[0_0_120px_rgba(0,0,0,0.35)] md:px-[6vw] lg:px-[80px] lg:py-12"
              >
                <div className="pointer-events-none absolute -left-[300px] top-[-180px] h-[720px] w-[720px] rounded-full border-[34px] border-[#DAB001] opacity-90 md:-left-[240px] lg:h-[820px] lg:w-[820px]" />

                <div className="relative z-10 grid h-full items-center gap-7 lg:grid-cols-[0.72fr_1fr] lg:gap-12">
                  {/* VIDEO CARD */}
                  <div className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-[28px] p-3 shadow-[0_35px_100px_rgba(110,88,0,0.35)] lg:max-w-[390px]">
                    <div className="relative aspect-[9/16] max-h-[58vh] w-full overflow-hidden rounded-[20px] bg-black">
                      <video
                        ref={videoRef}
                        src="/videos/prime-sentinel-reel.mp4"
                        className="h-full w-full object-cover"
                        loop
                        playsInline
                        controls
                      >
                        Your browser does not support the video tag.
                      </video>

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

                      {showPlayButton && (
                        <button
                          onClick={playVideoWithSound}
                          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-black shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[#DAB001]"
                        >
                          Play With Sound
                        </button>
                      )}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="max-w-[780px]">
                    <h2 className="text-[clamp(36px,6.5vw,96px)] font-light leading-[0.88] tracking-[-0.085em]">
                      Insurance,
                      <br />
                      Guided With Clarity
                    </h2>

                    <p className="mt-5 text-[clamp(17px,1.55vw,26px)] font-normal leading-[1.18] tracking-[-0.055em]">
                      Prime Sentinel Insurance Solutions is an independent
                      insurance brokerage built to help businesses and
                      individuals protect what matters most with clear guidance,
                      tailored coverage, and dependable support.
                    </p>

                    <p className="mt-4 max-w-[700px] text-[clamp(13px,0.95vw,17px)] leading-[1.55] tracking-[-0.025em] text-black/65">
                      Instead of forcing clients into one-size-fits-all
                      policies, Prime Sentinel focuses on understanding your
                      real risks first. From business owners and commercial
                      vehicles to property, personal lines, trucking, retail,
                      and specialty liability, the goal is to make insurance
                      easier to understand, easier to compare, and easier to
                      trust.
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-black/10 bg-white/55 p-4 backdrop-blur">
                        <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#DAB001]">
                          Business
                        </h3>
                        <p className="mt-2 text-xs leading-5 text-black/60">
                          Coverage guidance for owners, operators, franchises,
                          and growing companies.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-black/10 bg-white/55 p-4 backdrop-blur">
                        <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#DAB001]">
                          Property
                        </h3>
                        <p className="mt-2 text-xs leading-5 text-black/60">
                          Protection for physical assets, commercial spaces, and
                          valuable property.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-black/10 bg-white/55 p-4 backdrop-blur">
                        <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#DAB001]">
                          Peace
                        </h3>
                        <p className="mt-2 text-xs leading-5 text-black/60">
                          Transparent advice and ongoing client support.
                        </p>
                      </div>
                    </div>

                    <button className="mt-5 inline-flex items-center gap-4 rounded-full bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.1em] text-black shadow-[0_12px_35px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#DAB001]">
                      <span className="h-2 w-2 rounded-full bg-black" />
                      Learn More About Us
                    </button>
                  </div>
                </div>
              </motion.div>
            </section>
          </motion.div>

          <div className="pointer-events-none absolute bottom-5 left-1/2 z-50 h-[2px] w-[240px] -translate-x-1/2 overflow-hidden rounded-full bg-white/20">
            <motion.div
              animate={{ width: `${horizontalProgress * 100}%` }}
              transition={{ type: 'spring', stiffness: 80, damping: 24 }}
              className="h-full rounded-full bg-[#DAB001]"
            />
          </div>
        </div>
      </section>

      {/* NORMAL PAGE CONTINUES AFTER HORIZONTAL STAGE */}
      <section className="min-h-screen bg-[#e7e9e5] px-6 py-24 md:px-[6vw] lg:px-[110px]">
        <h2 className="max-w-4xl text-[clamp(48px,8vw,120px)] font-light leading-[0.9] tracking-[-0.08em]">
          Continue The Experience
        </h2>
      </section>
    </main>
  )
}

export default Home


