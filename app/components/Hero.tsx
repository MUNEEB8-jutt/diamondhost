'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Play, Star, Server, Shield, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/90 to-slate-950" />
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
              <span className="text-sm font-medium text-cyan-300">Pakistan's First Minecraft Hosting</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-white">Premium</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Minecraft Hosting
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl"
            >
              AMD Ryzen powered servers with UAE location. Experience blazing-fast performance with 24/7 expert support.
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
                className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 inline-flex items-center space-x-2 overflow-hidden shadow-lg shadow-cyan-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View Plans</span>
                <ArrowDown className="h-5 w-5 relative z-10 group-hover:translate-y-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              
              <motion.a
                href="https://discord.gg/pk8cmFNm6P"
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

          {/* Right Side - Minecraft Character */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex-1 relative hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 blur-3xl rounded-full scale-110" />
              
              {/* Minecraft Steve - Using SVG */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="w-[250px] h-[350px] relative">
                  {/* Steve Body SVG */}
                  <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-2xl">
                    {/* Head */}
                    <rect x="30" y="0" width="40" height="40" fill="#c4a57b"/>
                    <rect x="30" y="0" width="40" height="20" fill="#6b5344"/>
                    <rect x="35" y="22" width="8" height="8" fill="#4a7fc4"/>
                    <rect x="57" y="22" width="8" height="8" fill="#4a7fc4"/>
                    <rect x="45" y="32" width="10" height="4" fill="#8b6b4a"/>
                    {/* Body */}
                    <rect x="30" y="42" width="40" height="50" fill="#00a8a8"/>
                    <rect x="30" y="42" width="40" height="25" fill="#00a8a8"/>
                    <rect x="30" y="67" width="40" height="25" fill="#00a8a8"/>
                    {/* Arms */}
                    <rect x="10" y="42" width="18" height="50" fill="#c4a57b"/>
                    <rect x="72" y="42" width="18" height="50" fill="#c4a57b"/>
                    {/* Legs */}
                    <rect x="30" y="94" width="18" height="46" fill="#3b5998"/>
                    <rect x="52" y="94" width="18" height="46" fill="#3b5998"/>
                  </svg>
                </div>
              </motion.div>

              {/* Floating Diamond */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-5 -left-10"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rotate-45 shadow-lg shadow-cyan-500/50" />
              </motion.div>

              {/* Floating Gold Block */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-5 -right-10"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-600 shadow-lg shadow-yellow-500/50" />
              </motion.div>

              {/* Floating Emerald */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute top-1/2 -right-16"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rotate-45 shadow-lg shadow-green-500/50" />
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