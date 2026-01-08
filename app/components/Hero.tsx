'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Play, Star, Server, Shield, Zap, Cpu, HardDrive } from 'lucide-react'
import { useState, useEffect } from 'react'

// Typewriter phrases for Hero
const heroTexts = [
  "Best Hosting in Pakistan",
  "Intel Platinum Powered",
  "AMD EPYC Servers",
  "24/7 Expert Support",
  "DDoS Protected",
  "99.9% Uptime",
  "Premium Performance",
]

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = heroTexts[textIndex]
    const typeSpeed = isDeleting ? 40 : 100
    const pauseTime = 2500

    if (!isDeleting && displayText === currentText) {
      setTimeout(() => setIsDeleting(true), pauseTime)
      return
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setTextIndex((prev) => (prev + 1) % heroTexts.length)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayText(prev => 
        isDeleting 
          ? currentText.substring(0, prev.length - 1)
          : currentText.substring(0, prev.length + 1)
      )
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, textIndex])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      </div>

      {/* Floating Server Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-[10%] opacity-20"
        >
          <Server className="h-16 w-16 text-cyan-500" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-48 right-[15%] opacity-20"
        >
          <HardDrive className="h-12 w-12 text-blue-500" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-32 left-[20%] opacity-20"
        >
          <Cpu className="h-14 w-14 text-purple-500" />
        </motion.div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Tagline Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
              className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-5 py-2 mb-8"
            >
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-cyan-300">Pakistan #1 Minecraft Hosting</span>
            </motion.div>

            {/* Main Heading with Typewriter */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-white">Diamond</span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Host</span>
            </motion.h1>
            
            {/* Typewriter Line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center lg:justify-start mb-8"
            >
              <span className="text-2xl md:text-3xl font-semibold text-cyan-400">
                {displayText}
              </span>
              <motion.span 
                className="inline-block w-0.5 h-8 bg-cyan-400 ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl"
            >
              Intel Platinum & AMD EPYC powered servers. Multiple locations worldwide. Experience blazing-fast performance with 24/7 expert support.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12"
            >
              <motion.a
                href="#plans"
                className="group relative bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 inline-flex items-center space-x-2 shadow-lg shadow-blue-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Plans</span>
                <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="https://discord.gg/tKDRWYNcuE"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-600 hover:border-cyan-500/50 bg-slate-900/50 backdrop-blur-sm text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="h-5 w-5 text-cyan-400" />
                <span>Join Community</span>
              </motion.a>
            </motion.div>

            {/* Feature Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0"
            >
              {[
                { icon: Server, label: '99.9% Uptime', desc: 'Always Online' },
                { icon: Shield, label: 'DDoS Protected', desc: 'Secure Servers' },
                { icon: Zap, label: 'Instant Setup', desc: '60 Seconds' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <item.icon className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
                  <p className="text-white font-semibold text-xs">{item.label}</p>
                  <p className="text-gray-500 text-[10px]">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Server Rack Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex-1 relative hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-3xl rounded-full scale-110" />
              
              {/* Server Rack SVG */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="w-[300px] h-[400px] relative">
                  <svg viewBox="0 0 200 280" className="w-full h-full drop-shadow-2xl">
                    {/* Server Rack Frame */}
                    <rect x="20" y="10" width="160" height="260" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2"/>
                    
                    {/* Server Units */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <g key={i}>
                        <rect x="30" y={25 + i * 48} width="140" height="40" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                        {/* LED Lights */}
                        <circle cx="45" cy={45 + i * 48} r="4" fill="#22c55e">
                          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`}/>
                        </circle>
                        <circle cx="60" cy={45 + i * 48} r="4" fill="#3b82f6">
                          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.2}s`}/>
                        </circle>
                        {/* Vents */}
                        <rect x="80" y={35 + i * 48} width="80" height="2" fill="#334155"/>
                        <rect x="80" y={40 + i * 48} width="80" height="2" fill="#334155"/>
                        <rect x="80" y={45 + i * 48} width="80" height="2" fill="#334155"/>
                        <rect x="80" y={50 + i * 48} width="80" height="2" fill="#334155"/>
                        <rect x="80" y={55 + i * 48} width="80" height="2" fill="#334155"/>
                      </g>
                    ))}
                  </svg>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-10"
              >
                <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-3 rounded-xl shadow-lg shadow-cyan-500/50">
                  <Cpu className="h-8 w-8 text-white" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-5 -left-10"
              >
                <div className="bg-gradient-to-br from-purple-400 to-pink-600 p-3 rounded-xl shadow-lg shadow-purple-500/50">
                  <HardDrive className="h-8 w-8 text-white" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/3 -left-16"
              >
                <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-2 rounded-lg shadow-lg shadow-green-500/50">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-gray-500"
        >
          <span className="text-xs mb-2">Scroll Down</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
