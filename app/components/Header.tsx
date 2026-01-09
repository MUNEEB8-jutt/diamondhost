'use client'

import { motion } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import { useState } from 'react'

const DiamondLogo = () => (
  <svg viewBox="0 0 40 40" className="w-9 h-9">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#06b6d4"/>
      </linearGradient>
    </defs>
    <polygon points="20,2 38,14 38,30 20,38 2,30 2,14" fill="url(#logoGrad)" stroke="#3b82f6" strokeWidth="1"/>
    <polygon points="20,2 38,14 20,20 2,14" fill="#60a5fa" opacity="0.9"/>
    <polygon points="20,20 38,14 38,30 20,38" fill="#2563eb" opacity="0.7"/>
  </svg>
)

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('Home')

  const navItems = [
    { href: '#', label: 'Home' },
    { href: '#plans', label: 'Plans' },
    { href: '#support', label: 'Support' },
  ]

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#070b14]/80 backdrop-blur-xl border-b border-blue-500/10"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <motion.a 
            href="#"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <DiamondLogo />
            <span className="font-orbitron text-lg font-bold tracking-wide">
              <span className="text-blue-400">DIAMOND</span>
              <span className="text-white">HOST</span>
            </span>
          </motion.a>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => setActiveItem(item.label)}
                className={`relative px-6 py-2.5 text-base font-medium transition-all duration-300 ${
                  activeItem === item.label 
                    ? 'text-white' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
                whileHover={{ y: -1 }}
              >
                {item.label}
                {activeItem === item.label && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* Discord Button - Right Side */}
          <motion.a
            href="https://discord.gg/tKDRWYNcuE"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm py-2.5 px-5 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="h-4 w-4" />
            Join Discord
          </motion.a>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-blue-500/10"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveItem(item.label)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeItem === item.label 
                      ? 'text-white bg-blue-600/20' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="https://discord.gg/tKDRWYNcuE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-sm py-3 px-4 rounded-lg mt-2"
              >
                <Sparkles className="h-4 w-4" />
                Join Discord
              </a>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
