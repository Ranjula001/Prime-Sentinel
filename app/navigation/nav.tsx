'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import NavButton from '../components/buttons/navButton'
import Menu from './menuItems'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div>
      <div className="fixed top-0 left-0 w-full flex z-100 p-4 md:p-6 lg:p-10 backdrop-blur-md bg-white/10">
        <Image src="/PSLOGO.png" alt="logo" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 lg:w-[50px] lg:h-[50px]" />
        <div className="flex flex-col items-start ml-2 md:ml-3">
          <p className="text-xl md:text-2xl lg:text-3xl font-[var(--font-inter)] uppercase font-semibold leading-tight">
            Prime Sentinel
          </p>
          <p className="text-xs md:text-sm lg:text-lg font-[var(--font-inter)] text-[#DAB001] uppercase font-semibold leading-tight">
            insurance solutions
          </p>
        </div>

        <div className="flex gap-4 md:gap-6 lg:gap-10 ml-auto">
          <NavButton
            text="LET'S TALK"
            suffixSymbol="•"
            prefixSymbol="➪"
            onClick={() => window.location.href = '/contact'}
            ClassName="bg-black hover:bg-[#DAB001] text-white hover:text-black px-3 md:px-4 lg:px-6 py-1.5 md:py-2 rounded-full transition-all duration-300 text-xs md:text-sm lg:text-base"
          />
          <NavButton
            text="MENU"
            activeText="CLOSE"
            suffixSymbol="••"
            rotateSuffix={true}
            isActive={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ClassName="bg-transparent border-2 px-3 md:px-4 lg:px-6 py-1.5 md:py-2 rounded-full transition-all duration-300 text-xs md:text-sm lg:text-base"
          />
        </div>
      </div>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default Nav