'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, Cpu, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getPlans, getLocations, getPlansByLocation, getEpycPlansByLocation, HostingPlan, Location, EpycPlan } from '@/lib/supabase'
import { useCurrency } from '@/lib/CurrencyContext'
import { useAuth } from '@/lib/AuthContext'
import { useRouter } from 'next/navigation'

// Fallback data - UAE in center (index 1)
const fallbackLocations: Location[] = [
  { id: '2', name: 'India', code: 'India', flag: 'IN', active: true, sort_order: 1, created_at: '' },
  { id: '1', name: 'UAE', code: 'UAE', flag: 'AE', active: true, sort_order: 2, created_at: '' },
  { id: '3', name: 'Germany', code: 'Germany', flag: 'DE', active: true, sort_order: 3, created_at: '' },
]

// Intel Platinum Plans - 100 PKR/GB for India & Germany (UAE = Coming Soon)
const fallbackPlans: HostingPlan[] = [
  // India Plans - 100 PKR/GB
  { id: 'in1', name: 'Bronze Plan', icon: 'Medal', ram: '2GB RAM', performance: '100%', location: 'India', price: 200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 1, active: true, created_at: '' },
  { id: 'in2', name: 'Silver Plan', icon: 'Star', ram: '4GB RAM', performance: '150%', location: 'India', price: 400, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 2, active: true, created_at: '' },
  { id: 'in3', name: 'Gold Plan', icon: 'Crown', ram: '8GB RAM', performance: '250%', location: 'India', price: 800, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 3, active: true, created_at: '' },
  { id: 'in4', name: 'Platinum Plan', icon: 'Award', ram: '10GB RAM', performance: '300%', location: 'India', price: 1000, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: true, sort_order: 4, active: true, created_at: '' },
  { id: 'in5', name: 'Diamond Plan', icon: 'Diamond', ram: '12GB RAM', performance: '350%', location: 'India', price: 1200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 5, active: true, created_at: '' },
  { id: 'in6', name: 'Emerald Plan', icon: 'Gem', ram: '16GB RAM', performance: '500%', location: 'India', price: 1600, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 6, active: true, created_at: '' },
  { id: 'in7', name: 'Nether Plan', icon: 'Nether', ram: '22GB RAM', performance: '700%', location: 'India', price: 2200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 7, active: true, created_at: '' },
  { id: 'in8', name: 'Ender Plan', icon: 'Ender', ram: '32GB RAM', performance: '900%', location: 'India', price: 3200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 8, active: true, created_at: '' },
  { id: 'in9', name: 'Diamond Plus Plan', icon: 'Trophy', ram: '48GB RAM', performance: '1200%', location: 'India', price: 4800, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Custom Plans'], popular: false, sort_order: 9, active: true, created_at: '' },
  // Germany Plans - 100 PKR/GB
  { id: 'de1', name: 'Bronze Plan', icon: 'Medal', ram: '2GB RAM', performance: '100%', location: 'Germany', price: 200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 1, active: true, created_at: '' },
  { id: 'de2', name: 'Silver Plan', icon: 'Star', ram: '4GB RAM', performance: '150%', location: 'Germany', price: 400, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 2, active: true, created_at: '' },
  { id: 'de3', name: 'Gold Plan', icon: 'Crown', ram: '8GB RAM', performance: '250%', location: 'Germany', price: 800, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 3, active: true, created_at: '' },
  { id: 'de4', name: 'Platinum Plan', icon: 'Award', ram: '10GB RAM', performance: '300%', location: 'Germany', price: 1000, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: true, sort_order: 4, active: true, created_at: '' },
  { id: 'de5', name: 'Diamond Plan', icon: 'Diamond', ram: '12GB RAM', performance: '350%', location: 'Germany', price: 1200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 5, active: true, created_at: '' },
  { id: 'de6', name: 'Emerald Plan', icon: 'Gem', ram: '16GB RAM', performance: '500%', location: 'Germany', price: 1600, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 6, active: true, created_at: '' },
  { id: 'de7', name: 'Nether Plan', icon: 'Nether', ram: '22GB RAM', performance: '700%', location: 'Germany', price: 2200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 7, active: true, created_at: '' },
  { id: 'de8', name: 'Ender Plan', icon: 'Ender', ram: '32GB RAM', performance: '900%', location: 'Germany', price: 3200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 8, active: true, created_at: '' },
  { id: 'de9', name: 'Diamond Plus Plan', icon: 'Trophy', ram: '48GB RAM', performance: '1200%', location: 'Germany', price: 4800, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Custom Plans'], popular: false, sort_order: 9, active: true, created_at: '' },
]

// AMD EPYC Plans - 100 PKR/GB for UAE only (India & Germany = Coming Soon)
const fallbackEpycPlans: EpycPlan[] = [
  { id: 'amd1', name: 'EPYC Bronze', icon: 'Cpu', ram: '2GB RAM', performance: '150%', location: 'UAE', price: 200, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Instant Setup'], popular: false, sort_order: 1, active: true, created_at: '' },
  { id: 'amd2', name: 'EPYC Silver', icon: 'Cpu', ram: '4GB RAM', performance: '200%', location: 'UAE', price: 400, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Instant Setup'], popular: false, sort_order: 2, active: true, created_at: '' },
  { id: 'amd3', name: 'EPYC Gold', icon: 'Cpu', ram: '8GB RAM', performance: '300%', location: 'UAE', price: 800, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Instant Setup'], popular: false, sort_order: 3, active: true, created_at: '' },
  { id: 'amd4', name: 'EPYC Platinum', icon: 'Cpu', ram: '12GB RAM', performance: '400%', location: 'UAE', price: 1200, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Priority Support'], popular: true, sort_order: 4, active: true, created_at: '' },
  { id: 'amd5', name: 'EPYC Diamond', icon: 'Cpu', ram: '16GB RAM', performance: '500%', location: 'UAE', price: 1600, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Priority Support'], popular: false, sort_order: 5, active: true, created_at: '' },
  { id: 'amd6', name: 'EPYC Ultimate', icon: 'Cpu', ram: '32GB RAM', performance: '1000%', location: 'UAE', price: 3200, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Custom Plans'], popular: false, sort_order: 6, active: true, created_at: '' },
]

// Circular 3D Flag Component - Large cinematic style
const CircularFlag = ({ code, size = 'normal' }: { code: string; size?: 'small' | 'normal' | 'large' | 'xlarge' }) => {
  const sizeClass = size === 'xlarge' ? 'w-32 h-32 md:w-40 md:h-40' : size === 'large' ? 'w-24 h-24 md:w-32 md:h-32' : size === 'normal' ? 'w-16 h-16 md:w-20 md:h-20' : 'w-12 h-12'
  
  const FlagContent = () => {
    if (code === 'UAE' || code === 'AE') {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <clipPath id="circleClipUAE">
              <circle cx="50" cy="50" r="48" />
            </clipPath>
            <linearGradient id="uaeShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.5" />
              <stop offset="30%" stopColor="white" stopOpacity="0.2" />
              <stop offset="50%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="black" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="uaeGlow" cx="30%" cy="30%" r="60%">
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g clipPath="url(#circleClipUAE)">
            <rect width="100" height="33.33" fill="#00732F" />
            <rect y="33.33" width="100" height="33.33" fill="#FFFFFF" />
            <rect y="66.66" width="100" height="33.34" fill="#000000" />
            <rect width="25" height="100" fill="#FF0000" />
          </g>
          <circle cx="50" cy="50" r="48" fill="url(#uaeGlow)" />
          <circle cx="50" cy="50" r="48" fill="url(#uaeShine)" />
          <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        </svg>
      )
    }
    if (code === 'India' || code === 'IN') {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <clipPath id="circleClipIN">
              <circle cx="50" cy="50" r="48" />
            </clipPath>
            <linearGradient id="inShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.5" />
              <stop offset="30%" stopColor="white" stopOpacity="0.2" />
              <stop offset="50%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="black" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="inGlow" cx="30%" cy="30%" r="60%">
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g clipPath="url(#circleClipIN)">
            {/* Saffron stripe */}
            <rect width="100" height="33.33" fill="#FF9933" />
            {/* White stripe */}
            <rect y="33.33" width="100" height="33.33" fill="#FFFFFF" />
            {/* Green stripe */}
            <rect y="66.66" width="100" height="33.34" fill="#138808" />
            {/* Ashoka Chakra - Navy blue wheel */}
            <circle cx="50" cy="50" r="10" fill="none" stroke="#000080" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="3" fill="#000080" />
            {/* 24 spokes */}
            {[...Array(24)].map((_, i) => {
              const angle = (i * 15) * Math.PI / 180
              const x1 = 50 + 3.5 * Math.cos(angle)
              const y1 = 50 + 3.5 * Math.sin(angle)
              const x2 = 50 + 9.5 * Math.cos(angle)
              const y2 = 50 + 9.5 * Math.sin(angle)
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#000080" strokeWidth="0.8" />
            })}
          </g>
          <circle cx="50" cy="50" r="48" fill="url(#inGlow)" />
          <circle cx="50" cy="50" r="48" fill="url(#inShine)" />
          <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        </svg>
      )
    }
    if (code === 'Germany' || code === 'DE') {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <clipPath id="circleClipDE">
              <circle cx="50" cy="50" r="48" />
            </clipPath>
            <linearGradient id="deShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.5" />
              <stop offset="30%" stopColor="white" stopOpacity="0.2" />
              <stop offset="50%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="black" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="deGlow" cx="30%" cy="30%" r="60%">
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g clipPath="url(#circleClipDE)">
            <rect width="100" height="33.33" fill="#000000" />
            <rect y="33.33" width="100" height="33.33" fill="#DD0000" />
            <rect y="66.66" width="100" height="33.34" fill="#FFCC00" />
          </g>
          <circle cx="50" cy="50" r="48" fill="url(#deGlow)" />
          <circle cx="50" cy="50" r="48" fill="url(#deShine)" />
          <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        </svg>
      )
    }
    return <div className="w-full h-full bg-gray-600 rounded-full" />
  }

  return (
    <div className={`${sizeClass} rounded-full overflow-hidden relative`}>
      <FlagContent />
    </div>
  )
}

// 3D Carousel Location Selector
const LocationCarousel = ({ 
  locations, 
  selectedIndex, 
  onSelect 
}: { 
  locations: Location[]; 
  selectedIndex: number; 
  onSelect: (index: number) => void 
}) => {
  const [direction, setDirection] = useState(0) // -1 left, 1 right, 0 initial
  const prevIndex = selectedIndex === 0 ? locations.length - 1 : selectedIndex - 1
  const nextIndex = (selectedIndex + 1) % locations.length
  const currentLoc = locations[selectedIndex]
  const prevLoc = locations[prevIndex]
  const nextLoc = locations[nextIndex]

  const handleSelect = (idx: number) => {
    if (idx === selectedIndex) return
    // Determine direction
    if (idx === nextIndex) {
      setDirection(1)
    } else if (idx === prevIndex) {
      setDirection(-1)
    } else {
      setDirection(idx > selectedIndex ? 1 : -1)
    }
    onSelect(idx)
  }

  // Flag texture for arrows
  const FlagArrow = ({ code, direction }: { code: string; direction: 'left' | 'right' }) => {
    const isLeft = direction === 'left'
    
    const getFlagColors = () => {
      if (code === 'UAE' || code === 'AE') {
        return { c1: '#00732F', c2: '#FFFFFF', c3: '#000000', accent: '#FF0000' }
      }
      if (code === 'India' || code === 'IN') {
        return { c1: '#FF9933', c2: '#FFFFFF', c3: '#138808', accent: '#000080' }
      }
      if (code === 'Germany' || code === 'DE') {
        return { c1: '#000000', c2: '#DD0000', c3: '#FFCC00', accent: '#DD0000' }
      }
      return { c1: '#666', c2: '#888', c3: '#AAA', accent: '#FFF' }
    }
    
    const colors = getFlagColors()
    const gradientId = `flagGrad${direction}${code}`
    
    return (
      <svg 
        viewBox="0 0 50 70" 
        className={`w-10 h-14 md:w-14 md:h-20 ${isLeft ? '-rotate-6' : 'rotate-6'} drop-shadow-lg`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.c1} />
            <stop offset="33%" stopColor={colors.c1} />
            <stop offset="33%" stopColor={colors.c2} />
            <stop offset="66%" stopColor={colors.c2} />
            <stop offset="66%" stopColor={colors.c3} />
            <stop offset="100%" stopColor={colors.c3} />
          </linearGradient>
          <linearGradient id={`shine${direction}${code}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="40%" stopColor="white" stopOpacity="0.1" />
            <stop offset="100%" stopColor="black" stopOpacity="0.2" />
          </linearGradient>
          <clipPath id={`arrowClip${direction}${code}`}>
            <path d={isLeft 
              ? "M40 5 L10 35 L40 65 L40 50 L22 35 L40 20 Z" 
              : "M10 5 L40 35 L10 65 L10 50 L28 35 L10 20 Z"
            } />
          </clipPath>
        </defs>
        
        {/* Flag texture background */}
        <g clipPath={`url(#arrowClip${direction}${code})`}>
          <rect width="50" height="70" fill={`url(#${gradientId})`} />
          {/* UAE red stripe */}
          {(code === 'UAE' || code === 'AE') && (
            <rect x="0" y="0" width="12" height="70" fill={colors.accent} />
          )}
          <rect width="50" height="70" fill={`url(#shine${direction}${code})`} />
        </g>
        
        {/* Arrow outline */}
        <path 
          d={isLeft 
            ? "M40 5 L10 35 L40 65 L40 50 L22 35 L40 20 Z" 
            : "M10 5 L40 35 L10 65 L10 50 L28 35 L10 20 Z"
          }
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
        />
      </svg>
    )
  }

  // Animation variants for smooth 3D-like transitions
  const flagVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.7,
      rotateY: dir > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.7,
      rotateY: dir > 0 ? -45 : 45,
    }),
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-8" style={{ perspective: '1000px' }}>
      {/* Main Container */}
      <div className="relative flex items-center justify-center gap-8 md:gap-16 w-full max-w-4xl px-4">
        
        {/* Left Arrow with Flag Texture */}
        <motion.button
          onClick={() => handleSelect(prevIndex)}
          className="relative group flex flex-col items-center"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <motion.div
            key={prevLoc.code}
            initial={{ opacity: 0, x: -20, rotate: -20 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <FlagArrow code={prevLoc.code} direction="left" />
          </motion.div>
          <motion.span 
            key={`prev-${prevLoc.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] md:text-xs text-gray-500 mt-2 group-hover:text-cyan-400 transition-colors"
          >
            {prevLoc.name}
          </motion.span>
        </motion.button>

        {/* Center Flag - Main Display with AnimatePresence */}
        <div className="relative flex flex-col items-center" style={{ transformStyle: 'preserve-3d' }}>
          {/* Outer Glow - Static */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-36 h-36 md:w-48 md:h-48 bg-cyan-500/20 rounded-full blur-2xl" />
          </div>
          
          {/* Popular Badge for UAE - Outside AnimatePresence */}
          {(currentLoc.code === 'UAE' || currentLoc.code === 'AE') && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-30">
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] md:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-orange-500/40 whitespace-nowrap">
                🔥 Popular
              </span>
            </div>
          )}
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={selectedIndex}
              custom={direction}
              variants={flagVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              }}
              className="relative flex flex-col items-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Popular Badge for UAE - Outside AnimatePresence to prevent flickering */}
              
              {/* Flag with ring */}
              <div className="relative">
                {/* Cyan ring glow - only around edges, not on flag */}
                <div className="absolute -inset-3 md:-inset-4 rounded-full border-2 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.4)]" />
                
                <div className="relative rounded-full overflow-hidden">
                  <CircularFlag code={currentLoc.code} size="xlarge" />
                </div>
              </div>
              
              {/* Location Name */}
              <motion.div 
                className="text-center mt-5 md:mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-lg md:text-2xl font-bold text-white tracking-wide">
                  {currentLoc.name}
                </p>
                <p className="text-cyan-400 text-[10px] md:text-xs font-medium tracking-widest uppercase mt-0.5">
                  Server Location
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow with Flag Texture */}
        <motion.button
          onClick={() => handleSelect(nextIndex)}
          className="relative group flex flex-col items-center"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <motion.div
            key={nextLoc.code}
            initial={{ opacity: 0, x: 20, rotate: 20 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <FlagArrow code={nextLoc.code} direction="right" />
          </motion.div>
          <motion.span 
            key={`next-${nextLoc.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] md:text-xs text-gray-500 mt-2 group-hover:text-cyan-400 transition-colors"
          >
            {nextLoc.name}
          </motion.span>
        </motion.button>
      </div>
      
      {/* Location Dots */}
      <div className="flex gap-2 mt-6">
        {locations.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === selectedIndex ? 'bg-cyan-400 w-5' : 'bg-slate-600 w-1.5 hover:bg-slate-500'
            }`}
            whileHover={{ scale: 1.3 }}
            layout
          />
        ))}
      </div>
    </div>
  )
}

export default function PricingCards() {
  const [locations, setLocations] = useState<Location[]>([])
  const [plans, setPlans] = useState<HostingPlan[]>([])
  const [epycPlans, setEpycPlans] = useState<EpycPlan[]>([])
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(1) // UAE is center (index 1)
  const [loading, setLoading] = useState(true)
  const [plansLoading, setPlansLoading] = useState(false)
  // Default processor: AMD for UAE, Intel for India/Germany
  const [selectedProcessor, setSelectedProcessor] = useState<'intel' | 'amd'>('amd')
  const { convertPrice, symbol } = useCurrency()
  const { user, setShowAuthModal } = useAuth()
  const router = useRouter()

  const selectedLocation = locations[selectedLocationIndex]?.code || 'UAE'
  
  // Handle Order Click - Redirect to order page
  const handleOrderClick = (plan: { id: string; name: string; price: number; ram: string }) => {
    if (!user) {
      setShowAuthModal(true)
      return
    }
    router.push(`/order/${plan.id}`)
  }

  useEffect(() => {
    async function fetchInitialData() {
      const [locsData, plansData] = await Promise.all([getLocations(), getPlans()])
      let locs = locsData.length > 0 ? locsData : fallbackLocations
      
      // Map Singapore to India (database migration)
      locs = locs.map(loc => {
        if (loc.code === 'Singapore' || loc.code === 'SG') {
          return { ...loc, name: 'India', code: 'India', flag: 'IN' }
        }
        return loc
      })
      
      // Reorder to put UAE in center
      const uaeIndex = locs.findIndex(l => l.code === 'UAE' || l.code === 'AE')
      if (uaeIndex !== -1 && uaeIndex !== 1 && locs.length >= 3) {
        const uae = locs[uaeIndex]
        locs = locs.filter((_, i) => i !== uaeIndex)
        locs.splice(1, 0, uae)
      }
      
      setLocations(locs)
      
      // Map Singapore plans to India
      const mappedPlans = plansData.length > 0 
        ? plansData.map(p => p.location === 'Singapore' ? { ...p, location: 'India' } : p)
        : fallbackPlans
      setPlans(mappedPlans)
      
      // Start with UAE (index 1)
      const startLocation = locs[1]?.code || 'UAE'
      const epycData = await getEpycPlansByLocation(startLocation)
      setEpycPlans(epycData.length > 0 ? epycData : fallbackEpycPlans.filter(p => p.location === startLocation))
      setLoading(false)
    }
    fetchInitialData()
  }, [])

  const handleLocationChange = async (newIndex: number) => {
    if (newIndex === selectedLocationIndex) return
    setSelectedLocationIndex(newIndex)
    setPlansLoading(true)
    
    const newLocationCode = locations[newIndex]?.code || 'UAE'
    // Set default processor based on location
    // UAE: AMD is main, Intel is coming soon
    // India & Germany: Intel is main, AMD is coming soon
    if (newLocationCode === 'UAE' || newLocationCode === 'AE') {
      setSelectedProcessor('amd')
    } else {
      setSelectedProcessor('intel')
    }
    
    // Map Singapore to India for database queries
    let locationCode = locations[newIndex]?.code || 'UAE'
    const queryLocation = locationCode === 'India' ? 'Singapore' : locationCode // Query with Singapore if India (for old DB)
    
    const [ryzenData, epycData] = await Promise.all([
      getPlansByLocation(locationCode),
      getEpycPlansByLocation(locationCode)
    ])
    
    // Also try Singapore if India returns empty
    let finalPlans = ryzenData
    if (ryzenData.length === 0 && locationCode === 'India') {
      const sgPlans = await getPlansByLocation('Singapore')
      finalPlans = sgPlans.map(p => ({ ...p, location: 'India' }))
    }
    
    setPlans(finalPlans.length > 0 ? finalPlans : fallbackPlans.filter(p => p.location === locationCode))
    setEpycPlans(epycData.length > 0 ? epycData : fallbackEpycPlans.filter(p => p.location === locationCode))
    setPlansLoading(false)
  }

  const filteredPlans = plans.filter(p => p.location === selectedLocation)

  if (loading) {
    return (
      <section id="plans" className="py-24 px-4 relative z-10">
        <div className="container mx-auto flex flex-col justify-center items-center min-h-[400px]">
          <div className="loader mb-4" />
          <p className="text-gray-500 text-sm">Loading plans...</p>
        </div>
      </section>
    )
  }

  const currentLoc = locations[selectedLocationIndex] || fallbackLocations[0]

  return (
    <section id="plans" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        {/* 3D VR Style Location Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          viewport={{ once: true }}
          className="mb-12"
        >
          <LocationCarousel 
            locations={locations}
            selectedIndex={selectedLocationIndex}
            onSelect={handleLocationChange}
          />
        </motion.div>

        {/* Intel / AMD Toggle with Coming Soon badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }} 
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="inline-flex bg-slate-900/90 backdrop-blur-xl p-2 rounded-2xl border border-slate-700/50 shadow-xl">
            {/* Intel Button - Coming Soon for UAE */}
            <motion.button
              onClick={() => (currentLoc.code === 'UAE' || currentLoc.code === 'AE') ? null : setSelectedProcessor('intel')}
              className={`relative px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                (currentLoc.code === 'UAE' || currentLoc.code === 'AE')
                  ? 'text-gray-500 cursor-not-allowed opacity-60'
                  : selectedProcessor === 'intel' 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-gray-400 hover:text-white'
              }`}
              whileHover={(currentLoc.code === 'UAE' || currentLoc.code === 'AE') ? {} : { scale: 1.02 }}
              whileTap={(currentLoc.code === 'UAE' || currentLoc.code === 'AE') ? {} : { scale: 0.98 }}
            >
              <Cpu className="h-5 w-5" />
              <span>Intel Platinum</span>
              {(currentLoc.code === 'UAE' || currentLoc.code === 'AE') && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Soon
                </span>
              )}
            </motion.button>
            
            {/* AMD Button - Coming Soon for India & Germany */}
            <motion.button
              onClick={() => (currentLoc.code !== 'UAE' && currentLoc.code !== 'AE') ? null : setSelectedProcessor('amd')}
              className={`relative px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                (currentLoc.code !== 'UAE' && currentLoc.code !== 'AE')
                  ? 'text-gray-500 cursor-not-allowed opacity-60'
                  : selectedProcessor === 'amd' 
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/30' 
                    : 'text-gray-400 hover:text-white'
              }`}
              whileHover={(currentLoc.code !== 'UAE' && currentLoc.code !== 'AE') ? {} : { scale: 1.02 }}
              whileTap={(currentLoc.code !== 'UAE' && currentLoc.code !== 'AE') ? {} : { scale: 0.98 }}
            >
              <Zap className="h-5 w-5" />
              <span>AMD EPYC</span>
              {(currentLoc.code !== 'UAE' && currentLoc.code !== 'AE') && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Soon
                </span>
              )}
            </motion.button>
          </div>
        </motion.div>
        {/* Intel Platinum Section - Only show when Intel is selected AND available */}
        <AnimatePresence mode="wait">
        {selectedProcessor === 'intel' && (currentLoc.code !== 'UAE' && currentLoc.code !== 'AE') && (
        <motion.div
          key="intel-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
        >
        {/* Intel Platinum Header */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1 text-blue-400 text-sm mb-4">
            <Cpu className="h-4 w-4" />
            <span>Budget Performance</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="text-blue-400">Intel</span> Platinum Plans
          </h2>
          <p className="text-gray-400 uppercase tracking-[0.3em] text-xs">Quality Wise, No Compromise</p>
        </motion.div>

        {/* Intel Platinum Plans Grid */}
        <AnimatePresence mode="wait">
          {plansLoading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="h-10 w-10 text-cyan-400 animate-spin" />
            </motion.div>
          ) : (
            <motion.div 
              key={selectedLocation} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4"
            >
              {filteredPlans.map((plan, idx) => (
                <motion.div 
                  key={plan.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.3, delay: idx * 0.03 }} 
                  className="group relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      <span className="bg-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">Best Value</span>
                    </div>
                  )}
                  
                  {/* Stable Glow Effect - No animation, just smooth transition */}
                  <div className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-cyan-500/30 blur-2xl rounded-3xl" />
                  </div>
                  
                  <motion.div 
                    className={`relative bg-slate-900/95 rounded-2xl p-6 border-2 border-slate-700/60 transition-all duration-200 flex flex-col overflow-hidden z-10 ${plan.popular ? 'border-cyan-500/50' : ''}`}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      boxShadow: '0 20px 40px -12px rgba(6, 182, 212, 0.4)',
                      borderColor: 'rgba(6, 182, 212, 0.8)',
                      transition: { duration: 0.15 } 
                    }}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-200 rounded-2xl" />
                    
                    {/* Icon - AMD style but blue */}
                    <div className="flex justify-center mb-3 relative z-10">
                      <motion.div 
                        className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Cpu className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-center text-white mb-2 uppercase tracking-wide relative z-10 group-hover:text-cyan-300 transition-colors">{plan.name}</h3>

                    {/* Price */}
                    <div className="text-center mb-4 relative z-10">
                      <span className="text-4xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">{symbol}{convertPrice(plan.price / 278)}</span>
                      <p className="text-gray-500 text-xs mt-1">per month</p>
                    </div>

                    {/* Features */}
                    <div className="flex-1 space-y-2 mb-4 relative z-10">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{plan.ram}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{plan.performance} CPU Power</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">Intel Platinum CPU</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">24/7 Support</span>
                      </div>
                    </div>

                    {/* Button */}
                    <motion.button 
                      onClick={() => handleOrderClick(plan)}
                      className="w-full py-3 rounded-xl font-semibold text-white text-sm text-center block transition-all duration-300 bg-blue-600 hover:bg-blue-500 relative z-10"
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                    >
                      Order Now
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        </motion.div>
        )}

        {/* AMD EPYC Section - Only show for UAE */}
        {selectedProcessor === 'amd' && (currentLoc.code === 'UAE' || currentLoc.code === 'AE') && epycPlans.length > 0 && (
        <motion.div
          key="amd-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
        >
          {/* AMD EPYC Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-1 text-red-400 text-sm mb-4"
            >
              <Zap className="h-4 w-4" />
              <span>Premium Performance</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              AMD <span className="text-red-500">EPYC</span> Plans
            </h2>
            <p className="text-gray-400 uppercase tracking-[0.3em] text-xs">Maximum Power, Ultimate Performance</p>
          </div>

          {/* AMD EPYC Plans Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`epyc-${selectedLocation}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4"
            >
              {epycPlans.map((plan, idx) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className="group relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">Best Value</span>
                    </div>
                  )}
                  
                  {/* Stable Glow Effect - No animation */}
                  <div className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-orange-500/30 to-red-500/30 blur-2xl rounded-3xl" />
                  </div>
                  
                  <motion.div
                    className={`relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 border-2 ${plan.popular ? 'border-red-500/50' : 'border-red-900/30'} transition-all duration-200 flex flex-col overflow-hidden z-10`}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      boxShadow: '0 20px 40px -12px rgba(239, 68, 68, 0.4)',
                      borderColor: 'rgba(239, 68, 68, 0.8)',
                      transition: { duration: 0.15 } 
                    }}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-orange-500/0 group-hover:from-red-500/10 group-hover:to-orange-500/10 transition-all duration-200 rounded-2xl" />

                    {/* Icon */}
                    <div className="flex justify-center mb-3 relative z-10">
                      <motion.div
                        className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-500/30"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Cpu className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-center text-white mb-2 uppercase tracking-wide relative z-10 group-hover:text-red-300 transition-colors">{plan.name}</h3>

                    {/* Price */}
                    <div className="text-center mb-4 relative z-10">
                      <span className="text-4xl font-bold text-red-400 group-hover:text-red-300 transition-colors">{symbol}{convertPrice(plan.price / 278)}</span>
                      <p className="text-gray-500 text-xs mt-1">per month</p>
                    </div>

                    {/* Features */}
                    <div className="flex-1 space-y-2 mb-4 relative z-10">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-red-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{plan.ram}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-red-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{plan.performance} CPU Power</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-red-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">AMD EPYC CPU</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-red-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">24/7 Support</span>
                      </div>
                    </div>

                    {/* Button */}
                    <motion.button
                      onClick={() => handleOrderClick(plan)}
                      className="w-full py-3 rounded-xl font-semibold text-white text-sm text-center block transition-all duration-300 bg-blue-600 hover:bg-blue-500 relative z-10"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Order Now
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }} className="text-center mt-16">
          <p className="text-gray-400 mb-4">Need a custom solution?</p>
          <motion.a href="https://discord.gg/tKDRWYNcuE" target="_blank" rel="noopener noreferrer"
            className="border border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-cyan-400 font-semibold py-3 px-8 rounded-xl transition-all duration-300 inline-block"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
