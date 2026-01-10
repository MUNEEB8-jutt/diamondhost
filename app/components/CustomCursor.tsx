'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const glow = glowRef.current
    if (!cursor || !glow) return

    const handleMouseMove = (e: MouseEvent) => {
      // Direct transform - no delay, instant follow
      cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`
      glow.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`
      
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Detect hovering on interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    addHoverListeners()
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
    }
  }, [isVisible])

  return (
    <>
      {/* Main glow cursor - blur effect */}
      <div
        ref={glowRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div 
          className={`rounded-full transition-all duration-150 ${
            isHovering ? 'w-12 h-12' : 'w-8 h-8'
          }`}
          style={{
            background: isHovering 
              ? 'radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, rgba(6, 182, 212, 0.3) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 70%)',
            filter: 'blur(4px)',
            boxShadow: isHovering
              ? '0 0 25px 8px rgba(6, 182, 212, 0.4)'
              : '0 0 15px 5px rgba(6, 182, 212, 0.3)',
          }}
        />
      </div>

      {/* Center dot - precise point */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div 
          className={`rounded-full bg-cyan-400 transition-all duration-100 ${
            isHovering ? 'w-5 h-5 bg-cyan-300' : 'w-5 h-5'
          }`}
          style={{
            boxShadow: '0 0 10px 3px rgba(6, 182, 212, 0.6), 0 0 20px 6px rgba(6, 182, 212, 0.3)',
            filter: 'blur(2px)',
          }}
        />
      </div>
    </>
  )
}
