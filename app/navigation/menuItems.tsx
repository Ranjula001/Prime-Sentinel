'use client'
import React, { useState } from 'react'
import MenuItem from './itemButton'

type MenuItemType = {
  label: string
  active: boolean
}

const initialItems: MenuItemType[] = [
  { label: 'HOME', active: true },
  { label: 'ABOUT US', active: false },
  { label: 'PRODUCTS', active: false },
  { label: 'FINANCING', active: false },
  { label: 'CAREERS', active: false },
]

type MenuItemsProps = {
  isOpen: boolean
}

const MenuItems = ({ isOpen }: MenuItemsProps) => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>(initialItems)

  const handleItemClick = (clickedLabel: string) => {
    setMenuItems(prev =>
      prev.map(item => ({ ...item, active: item.label === clickedLabel }))
    )
  }

  return (
    <div
      className={`fixed top-24 right-0 my-5 px-6 z-100 w-[420px] transition-all duration-500 ease-in-out ${
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-6 pointer-events-none'
      }`}
    >
      {/* Nav links */}
      <div className="bg-white rounded-3xl shadow-xl px-4 pt-4 pb-4 mb-3">
        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            label={item.label}
            active={item.active}
            onClick={() => handleItemClick(item.label)}
          />
        ))}
      </div>

      {/* Newsletter section */}
      <div className="bg-white shadow-xl rounded-3xl p-8 mb-3">
        <p className="font-inter text-3xl font-semibold mb-6 leading-tight">
          Subscribe to<br />our newsletter
        </p>
        <div className="bg-gray-100 rounded-2xl flex items-center px-6 py-4 gap-4">
          <input
            type="email"
            placeholder="Your email"
            className="bg-transparent flex-1 font-inter text-lg outline-none text-gray-400 placeholder-gray-400"
          />
          <button className="text-2xl hover:translate-x-1 transition-transform duration-200 cursor-pointer">
            →
          </button>
        </div>
      </div>

      {/* LABS bar */}
      <div className="bg-black rounded-3xl px-8 py-5 flex items-center justify-between cursor-pointer group">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <p className="font-inter text-xl font-semibold uppercase text-white tracking-wide">
            CONTACT US
          </p>
        </div>
        {/* Arrow — nudges on hover */}
        <span className="text-white text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          ↗
        </span>
      </div>

    </div>
  )
}

export default MenuItems