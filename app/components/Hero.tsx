'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Server, Zap, Headphones } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-8 relative">
      <div className="container mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="text-yellow-400">⚡</span>
          <span className="text-sm text-gray-300">Premium Game Server Hosting</span>
        </motion.div>

        {/* Main Heading - Orbitron font with glow */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 font-orbitron"
        >
          <span 
            className="block text-5xl md:text-6xl lg:text-7xl font-black tracking-wider mb-2"
            style={{
              background: 'linear-gradient(180deg, #93c5fd 0%, #3b82f6 50%, #1d4ed8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 60px rgba(59, 130, 246, 0.6)',
            }}
          >
            NEXT-LEVEL
          </span>
          <span 
            className="block text-5xl md:text-6xl lg:text-7xl font-black tracking-wider"
            style={{
              background: 'linear-gradient(180deg, #a5f3fc 0%, #22d3ee 50%, #0891b2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 60px rgba(6, 182, 212, 0.6)',
            }}
          >
            GAME HOSTING
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Experience unparalleled performance with our enterprise-grade servers. 
          Low latency, DDoS protection, and 24/7 expert support for your gaming adventures.
        </motion.p>

        {/* CTA Button - Single with cool animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center items-center mb-20"
        >
          <Link href="/plans">
            <motion.div
              className="group relative bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_100%] text-white font-bold py-4 px-12 rounded-full transition-all duration-500 inline-flex items-center gap-3 shadow-2xl shadow-blue-500/40 overflow-hidden cursor-pointer"
              whileHover={{ 
                scale: 1.08, 
                y: -5,
                boxShadow: '0 30px 60px -15px rgba(59, 130, 246, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }}
            >
              {/* Animated ring */}
              <span className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 group-hover:scale-110 transition-all duration-500" />
              
              {/* Shine sweep effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Pulse rings on hover */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100">
                <span className="absolute inset-0 rounded-full border border-cyan-400/50 animate-ping" />
              </span>
              
              {/* Button content */}
              <span className="relative font-orbitron tracking-widest text-lg">GET STARTED</span>
              <motion.span
                className="relative"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
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
              className="relative group text-center"
            >
              <stat.icon className="h-5 w-5 text-blue-400 mx-auto mb-3" />
              <p 
                className="font-orbitron text-3xl md:text-4xl font-black mb-1"
                style={{
                  background: 'linear-gradient(180deg, #67e8f9 0%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </p>
              <p className="text-gray-500 text-xs md:text-sm">{stat.label}</p>
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
          className="w-5 h-8 border-2 border-blue-500/30 rounded-full flex justify-center pt-1.5"
        >
          <motion.div 
            className="w-1 h-1 bg-blue-400 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
