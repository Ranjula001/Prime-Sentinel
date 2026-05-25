import React, { useState } from 'react'

type NavButtonProps = {
  text: string
  activeText?: string
  mobileText?: string
  mobileActiveText?: string
  prefixSymbol?: string
  suffixSymbol?: string
  ClassName?: string
  onClick?: () => void
  rotateSuffix?: boolean
  isActive?: boolean
}

const NavButton = ({
  text,
  activeText,
  mobileText,
  mobileActiveText,
  prefixSymbol,
  suffixSymbol,
  ClassName,
  onClick,
  rotateSuffix,
  isActive,
}: NavButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const activeLabel = activeText || text
  const mobileLabel = mobileText || text
  const mobileActiveLabel = mobileActiveText || activeLabel

  return (
    <button
      type="button"
      className={`font-inter flex shrink-0 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap font-semibold uppercase leading-none sm:gap-2 ${ClassName}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {prefixSymbol && (
        <span
          className={`hidden transition-all duration-300 ease-in-out sm:inline-block ${
            isHovered ? 'w-auto translate-x-0 opacity-100' : 'w-0 -translate-x-3 opacity-0'
          }`}
        >
          {prefixSymbol}
        </span>
      )}

      <span className="relative flex h-[1.4em] items-center overflow-hidden">
        <span
          className={`transition-all duration-300 ease-in-out ${
            isActive ? 'absolute -translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <span className="sm:hidden">{mobileLabel}</span>
          <span className="hidden sm:inline">{text}</span>
        </span>
        <span
          className={`transition-all duration-300 ease-in-out ${
            isActive ? 'translate-y-0 opacity-100' : 'absolute translate-y-full opacity-0'
          }`}
        >
          <span className="sm:hidden">{mobileActiveLabel}</span>
          <span className="hidden sm:inline">{activeLabel}</span>
        </span>
      </span>

      {suffixSymbol && (
        <span
          className={`hidden transition-all duration-300 ease-in-out sm:inline-block ${
            rotateSuffix
              ? isActive || isHovered
                ? 'rotate-270'
                : 'rotate-0'
              : isHovered
                ? 'w-0 translate-x-3 opacity-0'
                : 'w-auto translate-x-0 opacity-100'
          }`}
        >
          {suffixSymbol}
        </span>
      )}
    </button>
  )
}

export default NavButton
