import React, { useState } from 'react'

type MenuItemProps = {
  label: string
  active: boolean
  onClick: () => void
}

const MenuItem = ({ label, active, onClick }: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`flex items-center justify-between py-4 px-4 rounded-2xl cursor-pointer transition-all duration-300 group ${
        isHovered ? 'bg-gray-100' : 'bg-transparent'
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Text — rolls up on hover */}
      <div className="overflow-hidden h-[1.3em] flex items-center">
        {/* Default — rolls up and out */}
        <span
          className={`font-inter text-2xl uppercase tracking-tight transition-all duration-300 ease-in-out block ${
            isHovered ? '-translate-y-full opacity-0 absolute' : 'translate-y-0 opacity-100'
          }`}
        >
          {label}
        </span>
        {/* Hover — rolls up and in */}
        <span
          className={`font-inter text-2xl uppercase tracking-tight transition-all duration-300 ease-in-out block ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 absolute'
          }`}
        >
          {label}
        </span>
      </div>

      {/* Right side indicator */}
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Bullet — visible when active */}
        <span
          className={`absolute transition-all duration-300 ease-in-out text-lg ${
            active && !isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
        >
          •
        </span>
        {/* Arrow — visible on hover */}
        <span
          className={`absolute transition-all duration-300 ease-in-out text-xl ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
          }`}
        >
          →
        </span>
      </div>
    </div>
  )
}

export default MenuItem