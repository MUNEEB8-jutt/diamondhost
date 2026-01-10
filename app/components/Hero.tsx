'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Server, Zap, Headphones, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-8 relative overflow-hidden">
      {/* Extra glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-blue-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto text-center relative z-10">
        {/* Main Heading - Gaming Style (Bold, Wide-spaced, No italic) */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 relative"
        >
          {/* NEXT-LEVEL - White bold */}
          <motion.span 
            className="block text-5xl md:text-7xl lg:text-8xl font-black tracking-wider text-white uppercase"
            style={{
              fontFamily: "'Russo One', var(--font-orbitron), sans-serif",
              textShadow: '0 0 30px rgba(255, 255, 255, 0.3), 2px 2px 0px rgba(59, 130, 246, 0.5)',
              letterSpacing: '0.1em',
            }}
          >
            NEXT-LEVEL
          </motion.span>
          
          {/* GAMING EXPERIENCE - Blue/Cyan with glow */}
          <div className="relative mt-2">
            {/* Glow behind */}
            <motion.div
              className="absolute inset-0 blur-2xl opacity-60"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span 
                className="block text-4xl md:text-6xl lg:text-7xl font-black text-cyan-500 uppercase"
                style={{ letterSpacing: '0.1em' }}
              >
                GAMING EXPERIENCE
              </span>
            </motion.div>
            
            <motion.span 
              className="block text-4xl md:text-6xl lg:text-7xl font-black tracking-wider relative uppercase"
              style={{
                fontFamily: "'Russo One', var(--font-orbitron), sans-serif",
                letterSpacing: '0.1em',
                background: 'linear-gradient(180deg, #67e8f9 0%, #06b6d4 40%, #0891b2 70%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.8)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.5))',
              }}
            >
              GAMING EXPERIENCE
            </motion.span>
          </div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Experience unparalleled performance with our enterprise-grade servers. 
          Low latency, DDoS protection, and 24/7 expert support for your gaming adventures.
        </motion.p>

        {/* CTA Button - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center items-center mb-16"
        >
          <Link href="/plans">
            <motion.div
              className="group relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-opacity"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              
              {/* Animated border */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                style={{ backgroundSize: '200% 200%' }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
              
              {/* Button */}
              <div className="relative bg-slate-950 rounded-full px-10 md:px-14 py-4 md:py-5 flex items-center gap-4 overflow-hidden">
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatDelay: 1
                  }}
                />
                
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-600/20 group-hover:from-blue-600/30 group-hover:via-cyan-500/30 group-hover:to-blue-600/30 transition-all rounded-full" />
                
                {/* Sparkle icon */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-cyan-400 relative z-10" />
                </motion.div>
                
                {/* Text - Gaming Style (Bold, no italic) */}
                <span 
                  className="font-black text-lg md:text-xl tracking-widest relative z-10 uppercase"
                  style={{
                    fontFamily: "'Russo One', var(--font-orbitron), sans-serif",
                    letterSpacing: '0.15em',
                    background: 'linear-gradient(90deg, #ffffff 0%, #67e8f9 50%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  GET STARTED
                </span>
                
                {/* Arrow */}
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight className="h-5 w-5 md:h-6 md:w-6 text-cyan-400" />
                </motion.div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto"
        >
          {[
            { icon: Server, value: '99.9%', label: 'Uptime' },
            { icon: Zap, value: 'Ultra', label: 'Low Latency' },
            { icon: Headphones, value: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="relative group text-center bg-slate-900/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-slate-700/50 hover:border-blue-500/30 transition-all"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 flex items-center justify-center group-hover:from-blue-600 group-hover:to-cyan-600 transition-all">
                <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <p 
                className="text-2xl md:text-4xl font-black mb-1 uppercase"
                style={{
                  fontFamily: "'Russo One', var(--font-orbitron), sans-serif",
                  letterSpacing: '0.05em',
                  background: 'linear-gradient(180deg, #ffffff 0%, #67e8f9 50%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </p>
              <p className="text-gray-400 text-xs md:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-blue-500/40 rounded-full flex justify-center pt-2"
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
            animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
