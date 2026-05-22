'use client'

import React, {useState} from 'react'
import Image from 'next/image'
import NavButton from '../components/buttons/navButton'
import Menu from './menuItems'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div>
        <div className={`fixed top-0 left-0 w-full flex z-10 p-10`}>
            <Image src={"/PSLogo.webp"} alt={"logo"} width={50} height={50} />
            <div className={`flex flex-col items-start`}>
                <p className={`text-3xl font-inter uppercase font-semibold`}>Prime Sentinel</p>
                <p className={`text-lg font-inter uppercase font-semibold`}>insurance solutions</p>
            </div>
            <div className={`flex gap-10 ml-auto`}>
                <NavButton
                  text="LET'S TALK"
                  suffixSymbol="•"
                  prefixSymbol="➪"
                  onClick={() => console.log('Let\'s Talk clicked')}
                  ClassName={`bg-black hover:bg-[#DAB001] text-white hover:text-black px-6 py-2 rounded-full transition-all duration-300`}
                />
                <NavButton
                    text="MENU"
                    activeText="CLOSE"
                    suffixSymbol="••"
                    rotateSuffix={true}
                    isActive={isMenuOpen}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    ClassName="bg-transparent border-2 border-black px-6 py-2 rounded-full transition-all duration-300"
          />
            </div>
        </div>

        {/* Menu panel */}
      <Menu isOpen={isMenuOpen} />

    </div>
  )
}

export default Nav