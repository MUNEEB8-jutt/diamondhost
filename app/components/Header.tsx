'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

const DiamondLogo = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff"/>
        <stop offset="100%" stopColor="#0099cc"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <polygon points="20,2 38,14 38,30 20,38 2,30 2,14" fill="url(#logoGrad)" stroke="#00d4ff" strokeWidth="1" filter="url(#glow)"/>
    <polygon points="20,2 38,14 20,20 2,14" fill="#66e0ff" opacity="0.9"/>
    <polygon points="20,20 38,14 38,30 20,38" fill="#0099cc" opacity="0.7"/>
  </svg>
)

// Typewriter phrases
const phrases = [
  "Best Minecraft Hosting",
  "Premium Performance",
  "24/7 Expert Support",
  "DDoS Protected",
  "Intel Platinum Powered",
  "AMD EPYC Servers",
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]
    const typeSpeed = isDeleting ? 30 : 80
    const pauseTime = 2000

    if (!isDeleting && displayText === currentPhrase) {
      setTimeout(() => setIsDeleting(true), pauseTime)
      return
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setPhraseIndex((prev) => (prev + 1) % phrases.length)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayText(prev => 
        isDeleting 
          ? currentPhrase.substring(0, prev.length - 1)
          : currentPhrase.substring(0, prev.length + 1)
      )
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, phraseIndex])

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
    >
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl shadow-black/20">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo with Typewriter */}
            <motion.a 
              href="#"
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <DiamondLogo />
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Diamond Host</span>
                <div className="flex items-center h-4">
                  <span className="text-[10px] text-cyan-400 font-medium">
                    {displayText}
                  </span>
                  <motion.span 
                    className="w-0.5 h-3 bg-cyan-400 ml-0.5"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  />
                </div>
              </div>
            </motion.a>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-xl p-1">
              {[
                { href: '#plans', label: 'Plans' },
                { href: '#features', label: 'Features' },
                { href: '#support', label: 'Support' },
              ].map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-white hover:bg-slate-700/50 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Discord Button */}
            <motion.a 
              href="https://discord.gg/tKDRWYNcuE"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Join Discord</span>
            </motion.a>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-300 p-2 hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pt-4 border-t border-slate-700/50"
              >
                <div className="flex flex-col space-y-2">
                  <a href="#plans" className="text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 px-4 py-3 rounded-lg transition-all">Plans</a>
                  <a href="#features" className="text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 px-4 py-3 rounded-lg transition-all">Features</a>
                  <a href="#support" className="text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 px-4 py-3 rounded-lg transition-all">Support</a>
                  <a 
                    href="https://discord.gg/tKDRWYNcuE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white font-medium py-3 px-5 rounded-xl text-center mt-2"
                  >
                    Join Discord
                  </a>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  )
}
