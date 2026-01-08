'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Background() {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 20 + Math.random() * 15,
      size: 2 + Math.random() * 4,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Minecraft Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074')`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />
      
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Animated Gradient Mesh */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute w-[800px] h-[800px] rounded-full blur-[120px] bg-gradient-to-r from-blue-600/20 to-cyan-500/20 -top-[20%] -left-[10%]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] bg-gradient-to-r from-purple-600/15 to-pink-500/15 bottom-[10%] -right-[5%]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[80px] bg-gradient-to-r from-cyan-500/15 to-blue-600/15 top-[40%] left-[30%]"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>
      
      {/* Floating Particles */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />
    </div>
  )
}