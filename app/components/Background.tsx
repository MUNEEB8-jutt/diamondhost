'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useTheme } from '@/lib/ThemeContext'
import { CrescentMoon, Lantern, MosqueSilhouette, StarField } from './FestiveDecor'

const AURORA_ORBS = [
  { className: 'left-[6%] top-[18%] h-40 w-40 md:h-56 md:w-56', color: 'rgba(247, 231, 206, 0.18)', delay: 0 },
  { className: 'right-[8%] top-[26%] h-48 w-48 md:h-72 md:w-72', color: 'rgba(212, 175, 55, 0.12)', delay: 0.8 },
  { className: 'left-1/3 bottom-[24%] h-52 w-52 md:h-80 md:w-80', color: 'rgba(15, 61, 46, 0.3)', delay: 1.4 },
]

export default function Background() {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (theme !== 'normal') {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    let animationFrameId = 0
    let time = 0
    let particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = []

    const initParticles = () => {
      particles = []
      const count = Math.floor((canvas.width * canvas.height) / 22000)

      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.45 + 0.18,
        })
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const drawBackground = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.14)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = 'rgba(34, 211, 238, 0.04)'
      ctx.lineWidth = 1

      const gridSize = 86
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(103, 232, 249, ${particle.alpha})`
        ctx.fill()

        for (let connectionIndex = index + 1; connectionIndex < particles.length; connectionIndex += 1) {
          const neighbor = particles[connectionIndex]
          const dx = particle.x - neighbor.x
          const dy = particle.y - neighbor.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(neighbor.x, neighbor.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.11 * (1 - distance / 150)})`
            ctx.stroke()
          }
        }
      })

      const scanY = (time * 0.4) % canvas.height
      const gradient = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60)
      gradient.addColorStop(0, 'rgba(56, 189, 248, 0)')
      gradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.07)')
      gradient.addColorStop(1, 'rgba(56, 189, 248, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, scanY - 60, canvas.width, 120)

      time += 1
      animationFrameId = window.requestAnimationFrame(drawBackground)
    }

    resizeCanvas()
    ctx.fillStyle = '#030712'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawBackground()

    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [theme])

  if (theme === 'eid') {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(247,231,206,0.14),transparent_26%),linear-gradient(180deg,rgba(0,0,0,0.18),transparent_28%),linear-gradient(135deg,#010202_0%,#07150f_48%,#0f3d2e_100%)]" />
        <div className="absolute inset-0 islamic-pattern pattern-drift opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.38)_100%)]" />

        <StarField count={12} className="opacity-95" />

        <div className="absolute right-[11%] top-8 h-28 w-28 md:h-40 md:w-40">
          <CrescentMoon />
        </div>

        <Lantern className="absolute left-3 top-16 hidden h-40 w-24 md:block lg:left-8 lg:h-52 lg:w-32" delay={0.4} />
        <Lantern className="absolute right-3 top-24 hidden h-36 w-24 md:block lg:right-8 lg:h-48 lg:w-32" delay={1.2} />

        {AURORA_ORBS.map((orb) => (
          <motion.div
            key={orb.className}
            className={`absolute rounded-full blur-[80px] ${orb.className}`}
            style={{ background: orb.color }}
            animate={{ x: [0, 18, -12, 0], y: [0, -16, 8, 0], opacity: [0.4, 0.8, 0.5, 0.4] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
          />
        ))}

        <div className="absolute bottom-0 left-0 right-0">
          <MosqueSilhouette className="h-32 w-full md:h-44 lg:h-52" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#010202] via-[#07150f]/94 to-transparent" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#030712]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute -top-40 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-500/16 via-blue-500/10 to-transparent blur-[110px]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute bottom-0 left-1/4 right-1/4 h-24 bg-gradient-to-t from-cyan-500/10 to-transparent blur-3xl" />
      <div className="absolute top-1/3 -left-20 h-[420px] w-44 bg-blue-600/10 blur-[90px]" />
      <div className="absolute top-1/2 -right-20 h-[420px] w-44 bg-cyan-600/10 blur-[90px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.46)_100%)]" />
    </div>
  )
}
