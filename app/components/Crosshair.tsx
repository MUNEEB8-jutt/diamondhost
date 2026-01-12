'use client'

import { useEffect, useRef, useState } from 'react'

export default function Crosshair() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches || 
                     'ontouchstart' in window ||
                     navigator.maxTouchPoints > 0
      setIsMobile(mobile)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (isMobile) return

    const cursor = cursorRef.current
    if (!cursor) return

    // Direct DOM manipulation - no React state, no delay
    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [isVisible, isMobile])

  if (isMobile) return null

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Custom mouse pointer cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[99999] hidden md:block -translate-x-[2px] -translate-y-[2px] ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          willChange: 'left, top',
          transition: isHovering ? 'transform 0.1s ease' : 'none'
        }}
      >
        {/* Mouse pointer SVG - cyan colored */}
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          style={{ 
            transform: isHovering ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.1s ease'
          }}
        >
          {/* Mouse pointer shape */}
          <path 
            d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z"
            fill={isHovering ? '#67e8f9' : '#22d3ee'}
            stroke="#0e7490"
            strokeWidth="1.2"
          />
        </svg>
      </div>
    </>
  )
}
