'use client'

import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const DiamondLogo = () => (
  <svg viewBox="0 0 40 40" className="w-8 h-8">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff"/>
        <stop offset="100%" stopColor="#0099cc"/>
      </linearGradient>
    </defs>
    <polygon points="20,4 36,16 36,32 20,38 4,32 4,16" fill="url(#logoGrad)" stroke="#0088aa" strokeWidth="1"/>
    <polygon points="20,4 36,16 20,22 4,16" fill="#66e0ff" opacity="0.9"/>
  </svg>
)

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <DiamondLogo />
            <span className="text-xl font-bold text-cyan-400">Diamond Host</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#plans" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">Plans</a>
            <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">Features</a>
            <a href="#support" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">Support</a>
            <motion.a 
              href="https://discord.gg/tKDRWYNcuE"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium py-2 px-5 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Discord
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-slate-800"
          >
            <div className="flex flex-col space-y-4 pt-4">
              <a href="#plans" className="text-gray-300 hover:text-cyan-400 transition-colors">Plans</a>
              <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors">Features</a>
              <a href="#support" className="text-gray-300 hover:text-cyan-400 transition-colors">Support</a>
              <a 
                href="https://discord.gg/tKDRWYNcuE"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium py-2 px-5 rounded-lg text-center"
              >
                Join Discord
              </a>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}