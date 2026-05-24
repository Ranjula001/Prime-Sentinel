'use client'

import React, { useState, useEffect } from 'react'

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasConsented, setHasConsented] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent')
    if (consent === 'accepted' || consent === 'denied') {
      setHasConsented(true)
    } else {
      // Show banner after a short delay for new visitors
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setHasConsented(true)
    setIsVisible(false)
  }

  const handleDeny = () => {
    localStorage.setItem('cookieConsent', 'denied')
    setHasConsented(true)
    setIsVisible(false)
  }

  const handleCustomize = () => {
    // For now, just accept - you can expand this to show a modal with detailed options
    localStorage.setItem('cookieConsent', 'customized')
    setHasConsented(true)
    setIsVisible(false)
  }

  if (!isVisible || hasConsented) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-4 md:px-6 md:py-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-white text-sm md:text-base font-semibold mb-1 md:mb-2">
            Cookie Preferences
          </h3>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-2xl">
            We use cookies to enhance your experience and analyze site traffic. 
            You can choose to accept all cookies, deny non-essential cookies, or customize your preferences.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
          <button
            onClick={handleCustomize}
            className="px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-200 order-3 sm:order-1"
          >
            Customize
          </button>
          <button
            onClick={handleDeny}
            className="px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors duration-200 order-2 sm:order-2"
          >
            Deny
          </button>
          <button
            onClick={handleAccept}
            className="px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-semibold text-black bg-[#DAB001] rounded-lg hover:bg-[#c9a000] transition-colors duration-200 order-1 sm:order-3"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
