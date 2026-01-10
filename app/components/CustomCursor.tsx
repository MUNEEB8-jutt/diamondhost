'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const cursor = cursorRef.current
    if (!cursor || isMobile) return

    // Direct DOM manipulation for zero delay
    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    addHoverListeners()
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
    }
  }, [isVisible, isMobile])

  // Don't render on mobile
  if (isMobile) return null

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] hidden md:block ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'left, top' }}
    >
      {/* Cyan Arrow Cursor */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        style={{
          filter: `drop-shadow(0 0 ${isHovering ? '6px' : '3px'} rgba(6, 182, 212, ${isHovering ? '0.9' : '0.7'})) drop-shadow(0 0 ${isHovering ? '12px' : '6px'} rgba(6, 182, 212, 0.4))`,
        }}
      >
        {/* Arrow shape - classic cursor */}
        <path 
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z"
          fill={isHovering ? '#67e8f9' : '#22d3ee'}
          stroke={isHovering ? '#fff' : '#cffafe'}
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}
