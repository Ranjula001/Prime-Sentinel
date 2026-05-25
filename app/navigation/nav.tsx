'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import NavButton from '../components/buttons/navButton'
import Menu from './menuItems'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div>
      <div className="fixed left-0 top-0 z-[100] flex w-full items-center gap-2 bg-white/10 px-3 py-3 backdrop-blur-md sm:gap-3 sm:px-4 md:p-6 lg:p-10">
        <Image
          src="/PSLOGO.png"
          alt="logo"
          width={40}
          height={40}
          className="h-7 w-7 shrink-0 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-[50px] lg:w-[50px]"
          priority
        />
        <div className="flex min-w-0 flex-col items-start">
          <p className="max-w-[38vw] truncate font-[var(--font-inter)] text-sm font-semibold uppercase leading-tight sm:max-w-none sm:text-xl md:text-2xl lg:text-3xl">
            Prime Sentinel
          </p>
          <p className="hidden font-[var(--font-inter)] text-[10px] font-semibold uppercase leading-tight text-[#DAB001] min-[390px]:block sm:text-xs md:text-sm lg:text-lg">
            insurance solutions
          </p>
        </div>

        <div className="ml-auto flex shrink-0 gap-1.5 sm:gap-3 md:gap-6 lg:gap-10">
          <NavButton
            text="LET'S TALK"
            mobileText="TALK"
            suffixSymbol="•"
            prefixSymbol="➪"
            onClick={() => window.location.href = '/contact'}
            ClassName="min-h-9 rounded-full bg-black px-3 py-2 text-xs text-white transition-all duration-300 hover:bg-[#DAB001] hover:text-black sm:px-4 md:min-h-10 md:px-4 md:text-sm lg:px-6 lg:text-base"
          />
          <NavButton
            text="MENU"
            activeText="CLOSE"
            mobileActiveText="X"
            suffixSymbol="••"
            rotateSuffix={true}
            isActive={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ClassName="min-h-9 rounded-full border-2 bg-transparent px-3 py-2 text-xs transition-all duration-300 sm:px-4 md:min-h-10 md:px-4 md:text-sm lg:px-6 lg:text-base"
          />
        </div>
      </div>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default Nav
