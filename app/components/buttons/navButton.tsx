import React, { useState } from 'react'

type NavButtonProps = {
    text : string
    activeText?: string
    prefixSymbol?: string
    suffixSymbol?: string
    ClassName?: string
    onClick?: () => void
    rotateSuffix?: boolean
    isActive?: boolean
}

const NavButton = ({ text, activeText, prefixSymbol, suffixSymbol, ClassName, onClick, rotateSuffix, isActive }: NavButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`font-inter text-lg font-semibold uppercase flex items-center justify-center cursor-pointer overflow-hidden gap-2 ${ClassName}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ➪ prefix — slides in from left on hover */}
      {prefixSymbol && (
        <span className={`transition-all duration-300 ease-in-out ${
          isHovered ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-3 w-0'
        }`}>
          {prefixSymbol}
        </span>
      )}

      {/* Text — rolls up to activeText when isActive */}
      <span className="relative overflow-hidden flex items-center h-[1.4em]">
        {/* Default text — rolls up and out */}
        <span className={`transition-all duration-300 ease-in-out ${
          isActive ? '-translate-y-full opacity-0 absolute' : 'translate-y-0 opacity-100'
        }`}>
          {text}
        </span>
        {/* Active text — rolls up and in */}
        <span className={`transition-all duration-300 ease-in-out ${
          isActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 absolute'
        }`}>
          {activeText || text}
        </span>
      </span>

      {/* Suffix — rotates if rotateSuffix, otherwise slides out */}
      {suffixSymbol && (
        <span className={`transition-all duration-300 ease-in-out ${
          rotateSuffix
            ? isActive || isHovered ? 'rotate-270' : 'rotate-0'
            : isHovered ? 'opacity-0 translate-x-3 w-0' : 'opacity-100 translate-x-0 w-auto'
        }`}>
          {suffixSymbol}
        </span>
      )}
    </div>
  )
}

export default NavButton