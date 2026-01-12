'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true) // Default true to prevent flash
  
  // Store mouse position
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    // Check if mobile/touch device
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

    // Smooth lerp function
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    // Animation loop for ultra smooth movement
    const animate = () => {
      // Lerp factor - higher = faster, lower = smoother trail
      const smoothness = 0.35
      
      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, smoothness)
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, smoothness)
      
      // Use transform for GPU acceleration (much smoother than left/top)
      cursor.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`
      
      rafId.current = requestAnimationFrame(animate)
    }

    // Start animation loop
    rafId.current = requestAnimationFrame(animate)

    // Track mouse position (no DOM updates here, just store values)
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Hover detection for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    addHoverListeners()
    
    // Watch for new elements
    const observer = new MutationObserver(() => {
      addHoverListeners()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [isVisible, isMobile])

  // Don't render on mobile
  if (isMobile) return null

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block transition-opacity duration-150 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        willChange: 'transform',
      }}
    >
      {/* Cyan Arrow Cursor - No glow */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24"
        className="transition-transform duration-150"
        style={{
          transform: isHovering ? 'scale(1.15)' : 'scale(1)',
        }}
      >
        {/* Arrow shape - classic cursor */}
        <path 
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z"
          fill={isHovering ? '#67e8f9' : '#22d3ee'}
          stroke="#0e7490"
          strokeWidth="1"
          className="transition-all duration-150"
        />
      </svg>
    </div>
  )
}
