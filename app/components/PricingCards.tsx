'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, Cpu, Zap, Users, Star, Youtube, ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
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

// Intel Platinum Plans - 100 PKR/GB for India & Germany & UAE (with 10% OFF)
const fallbackPlans: HostingPlan[] = [
  // India Plans - 100 PKR/GB with 10% OFF
  { id: 'in1', name: 'Low-Fire Plan', icon: 'Medal', ram: '2GB RAM', performance: '100%', location: 'India', price: 200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 1, active: true, created_at: '' },
  { id: 'in2', name: 'Fire Plan', icon: 'Star', ram: '4GB RAM', performance: '150%', location: 'India', price: 400, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 2, active: true, created_at: '' },
  { id: 'in3', name: 'Low-Water Plan', icon: 'Crown', ram: '8GB RAM', performance: '250%', location: 'India', price: 800, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 3, active: true, created_at: '' },
  { id: 'in4', name: 'Water Plan', icon: 'Award', ram: '10GB RAM', performance: '300%', location: 'India', price: 1000, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 4, active: true, created_at: '' },
  { id: 'in5', name: 'Spirit Plan', icon: 'Diamond', ram: '12GB RAM', performance: '350%', location: 'India', price: 1200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: true, sort_order: 5, active: true, created_at: '' },
  { id: 'in6', name: 'Infinity Plan', icon: 'Gem', ram: '16GB RAM', performance: '500%', location: 'India', price: 1600, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 6, active: true, created_at: '' },
  { id: 'in7', name: 'Sharingan Plan', icon: 'Nether', ram: '22GB RAM', performance: '700%', location: 'India', price: 2200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 7, active: true, created_at: '' },
  { id: 'in8', name: 'Arise Plan', icon: 'Ender', ram: '32GB RAM', performance: '900%', location: 'India', price: 3200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 8, active: true, created_at: '' },
  { id: 'in9', name: 'Arise-Plus Plan', icon: 'Trophy', ram: '48GB RAM', performance: '1200%', location: 'India', price: 4800, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Custom Plans'], popular: false, sort_order: 9, active: true, created_at: '' },
  // Germany Plans - 100 PKR/GB with 10% OFF
  { id: 'de1', name: 'Low-Fire Plan', icon: 'Medal', ram: '2GB RAM', performance: '100%', location: 'Germany', price: 200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 1, active: true, created_at: '' },
  { id: 'de2', name: 'Fire Plan', icon: 'Star', ram: '4GB RAM', performance: '150%', location: 'Germany', price: 400, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 2, active: true, created_at: '' },
  { id: 'de3', name: 'Low-Water Plan', icon: 'Crown', ram: '8GB RAM', performance: '250%', location: 'Germany', price: 800, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 3, active: true, created_at: '' },
  { id: 'de4', name: 'Water Plan', icon: 'Award', ram: '10GB RAM', performance: '300%', location: 'Germany', price: 1000, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 4, active: true, created_at: '' },
  { id: 'de5', name: 'Spirit Plan', icon: 'Diamond', ram: '12GB RAM', performance: '350%', location: 'Germany', price: 1200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: true, sort_order: 5, active: true, created_at: '' },
  { id: 'de6', name: 'Infinity Plan', icon: 'Gem', ram: '16GB RAM', performance: '500%', location: 'Germany', price: 1600, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 6, active: true, created_at: '' },
  { id: 'de7', name: 'Sharingan Plan', icon: 'Nether', ram: '22GB RAM', performance: '700%', location: 'Germany', price: 2200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 7, active: true, created_at: '' },
  { id: 'de8', name: 'Arise Plan', icon: 'Ender', ram: '32GB RAM', performance: '900%', location: 'Germany', price: 3200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 8, active: true, created_at: '' },
  { id: 'de9', name: 'Arise-Plus Plan', icon: 'Trophy', ram: '48GB RAM', performance: '1200%', location: 'Germany', price: 4800, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Custom Plans'], popular: false, sort_order: 9, active: true, created_at: '' },
  // UAE Intel Plans - 100 PKR/GB with 10% OFF
  { id: 'uae1', name: 'Low-Fire Plan', icon: 'Medal', ram: '2GB RAM', performance: '100%', location: 'UAE', price: 200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 1, active: true, created_at: '' },
  { id: 'uae2', name: 'Fire Plan', icon: 'Star', ram: '4GB RAM', performance: '150%', location: 'UAE', price: 400, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 2, active: true, created_at: '' },
  { id: 'uae3', name: 'Low-Water Plan', icon: 'Crown', ram: '8GB RAM', performance: '250%', location: 'UAE', price: 800, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 3, active: true, created_at: '' },
  { id: 'uae4', name: 'Water Plan', icon: 'Award', ram: '10GB RAM', performance: '300%', location: 'UAE', price: 1000, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 4, active: true, created_at: '' },
  { id: 'uae5', name: 'Spirit Plan', icon: 'Diamond', ram: '12GB RAM', performance: '350%', location: 'UAE', price: 1200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: true, sort_order: 5, active: true, created_at: '' },
  { id: 'uae6', name: 'Infinity Plan', icon: 'Gem', ram: '16GB RAM', performance: '500%', location: 'UAE', price: 1600, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 6, active: true, created_at: '' },
  { id: 'uae7', name: 'Sharingan Plan', icon: 'Nether', ram: '22GB RAM', performance: '700%', location: 'UAE', price: 2200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 7, active: true, created_at: '' },
  { id: 'uae8', name: 'Arise Plan', icon: 'Ender', ram: '32GB RAM', performance: '900%', location: 'UAE', price: 3200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 8, active: true, created_at: '' },
  { id: 'uae9', name: 'Arise-Plus Plan', icon: 'Trophy', ram: '48GB RAM', performance: '1200%', location: 'UAE', price: 4800, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Custom Plans'], popular: false, sort_order: 9, active: true, created_at: '' },
]

// AMD EPYC Plans - 100 PKR/GB for UAE only (India & Germany = Coming Soon)
const fallbackEpycPlans: EpycPlan[] = [
  { id: 'amd1', name: 'Low-Fire Plan', icon: 'Cpu', ram: '2GB RAM', performance: '150%', location: 'UAE', price: 200, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Instant Setup'], popular: false, sort_order: 1, active: true, created_at: '' },
  { id: 'amd2', name: 'Fire Plan', icon: 'Cpu', ram: '4GB RAM', performance: '200%', location: 'UAE', price: 400, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Instant Setup'], popular: false, sort_order: 2, active: true, created_at: '' },
  { id: 'amd3', name: 'Low-Water Plan', icon: 'Cpu', ram: '8GB RAM', performance: '300%', location: 'UAE', price: 800, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Instant Setup'], popular: false, sort_order: 3, active: true, created_at: '' },
  { id: 'amd4', name: 'Water Plan', icon: 'Cpu', ram: '12GB RAM', performance: '400%', location: 'UAE', price: 1200, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Priority Support'], popular: false, sort_order: 4, active: true, created_at: '' },
  { id: 'amd5', name: 'Spirit Plan', icon: 'Cpu', ram: '16GB RAM', performance: '500%', location: 'UAE', price: 1600, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Priority Support'], popular: true, sort_order: 5, active: true, created_at: '' },
  { id: 'amd6', name: 'Infinity Plan', icon: 'Cpu', ram: '24GB RAM', performance: '750%', location: 'UAE', price: 2400, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Priority Support'], popular: false, sort_order: 6, active: true, created_at: '' },
  { id: 'amd7', name: 'Sharingan Plan', icon: 'Cpu', ram: '32GB RAM', performance: '1000%', location: 'UAE', price: 3200, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Custom Plans'], popular: false, sort_order: 7, active: true, created_at: '' },
  { id: 'amd8', name: 'Arise Plan', icon: 'Cpu', ram: '48GB RAM', performance: '1500%', location: 'UAE', price: 4800, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Custom Plans'], popular: false, sort_order: 8, active: true, created_at: '' },
  { id: 'amd9', name: 'Arise-Plus Plan', icon: 'Cpu', ram: '64GB RAM', performance: '2000%', location: 'UAE', price: 6400, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Custom Plans'], popular: false, sort_order: 9, active: true, created_at: '' },
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
    <div className="relative w-full flex flex-col items-center justify-center py-3" style={{ perspective: '1000px' }}>
      {/* Become a YouTube Partner Button - Above carousel, centered */}
      <motion.a
        href="#creator-program"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/40 hover:border-red-500/60 text-red-400 hover:text-red-300 px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 backdrop-blur-sm shadow-lg shadow-red-500/10 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -10px rgba(239, 68, 68, 0.4)' }}
        whileTap={{ scale: 0.95 }}
      >
        {/* YouTube Logo - Red rounded rectangle with white play button */}
        <svg viewBox="0 0 28 20" width="18" height="14">
          <rect width="28" height="20" rx="5" fill="#FF0000"/>
          <polygon points="11,5 11,15 20,10" fill="white"/>
        </svg>
        <span>Become a YouTube Partner</span>
      </motion.a>

      {/* Main Container - More compact */}
      <div className="relative flex items-center justify-center gap-4 md:gap-8 w-full max-w-3xl px-4">
        
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
                Popular
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
                <div className="absolute -inset-2 md:-inset-3 rounded-full border-2 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.4)]" />
                
                <div className="relative rounded-full overflow-hidden">
                  <CircularFlag code={currentLoc.code} size="xlarge" />
                </div>
              </div>
              
              {/* Location Name */}
              <motion.div 
                className="text-center mt-3 md:mt-4"
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
      
      {/* Location Dots - Smaller */}
      <div className="flex gap-1.5 mt-2">
        {locations.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === selectedIndex ? 'bg-cyan-400 w-4' : 'bg-slate-600 w-1 hover:bg-slate-500'
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
  
  // Ref for processor toggle section to scroll to
  const processorSectionRef = useRef<HTMLDivElement>(null)
  
  // Determine if plan is available or pre-order based on location and processor
  const isPlanAvailable = (location: string, processor: 'intel' | 'amd') => {
    // Germany Intel: Available now with 10% OFF
    if ((location === 'Germany' || location === 'DE') && processor === 'intel') return true
    // India Intel: Available now with 10% OFF
    if ((location === 'India' || location === 'IN') && processor === 'intel') return true
    // UAE Intel: Available now with 10% OFF
    if ((location === 'UAE' || location === 'AE') && processor === 'intel') return true
    // AMD EPYC UAE: Launch Jan 17 (pre-order)
    if ((location === 'UAE' || location === 'AE') && processor === 'amd') return false
    return false
  }
  
  // Check if plan has 10% discount - Only AMD EPYC plans
  const hasDiscount = (location: string, processor: 'intel' | 'amd') => {
    return processor === 'amd'
  }
  
  // Handle Order Click - Redirect to order page
  const handleOrderClick = (plan: { id: string; name: string; price: number; ram: string; location?: string }, processor: 'intel' | 'amd') => {
    if (!user) {
      setShowAuthModal(true)
      return
    }
    // Pass discount info in URL if applicable
    const planLocation = plan.location || selectedLocation
    const discount = hasDiscount(planLocation, processor) ? '0.9' : '1'
    router.push(`/order/${plan.id}?discount=${discount}&processor=${processor}`)
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
    
    // Smooth scroll to processor section after location change
    setTimeout(() => {
      processorSectionRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      })
    }, 300)
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
    <section id="plans" className="py-16 px-4 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        {/* 3D VR Style Location Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          viewport={{ once: true }}
          className="mb-4"
        >
          <LocationCarousel 
            locations={locations}
            selectedIndex={selectedLocationIndex}
            onSelect={handleLocationChange}
          />
        </motion.div>

        {/* Processor Toggle - Dynamic order based on location */}
        <motion.div 
          ref={processorSectionRef}
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }} 
          viewport={{ once: true }}
          className="flex flex-col justify-center items-center gap-2 mb-8"
        >
          {/* Label */}
          <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mb-2">Select Processor</p>
          
          <div className="inline-flex bg-slate-800/80 backdrop-blur-xl p-1 rounded-2xl border border-slate-600/50 shadow-xl shadow-black/20 overflow-visible">
            {/* For UAE: Intel (left) | AMD (right) */}
            {/* For India/Germany: Intel (left) | AMD (right, coming soon) */}
            
            {(currentLoc.code === 'UAE' || currentLoc.code === 'AE') ? (
              <>
                {/* UAE: Intel Button (Left) */}
                <motion.button
                  onClick={() => setSelectedProcessor('intel')}
                  className={`relative px-5 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                    selectedProcessor === 'intel' 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/40' 
                      : 'text-gray-400 hover:text-gray-200 hover:bg-slate-700/50'
                  }`}
                  whileHover={{ scale: selectedProcessor === 'intel' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Cpu className="h-4 w-4 md:h-5 md:w-5" />
                  <span>Intel Platinum</span>
                </motion.button>
                
                {/* UAE: AMD Button (Right) with 10% OFF */}
                <motion.button
                  onClick={() => setSelectedProcessor('amd')}
                  className={`relative px-5 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 flex items-center gap-1.5 md:gap-2 overflow-visible ${
                    selectedProcessor === 'amd' 
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/40' 
                      : 'text-gray-400 hover:text-gray-200 hover:bg-slate-700/50'
                  }`}
                  whileHover={{ scale: selectedProcessor === 'amd' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ overflow: 'visible' }}
                >
                  <Zap className="h-4 w-4 md:h-5 md:w-5" />
                  <span>AMD EPYC</span>
                  {/* 10% OFF Badge */}
                  <div className="absolute -top-3 md:-top-4 -right-2 md:-right-3 z-50 pointer-events-none">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[7px] md:text-[9px] font-bold px-1.5 md:px-2 py-0.5 rounded-full uppercase shadow-lg shadow-green-500/50 whitespace-nowrap">
                      10% OFF
                    </span>
                  </div>
                </motion.button>
              </>
            ) : (
              <>
                {/* India/Germany: Intel Button (Left - Main) */}
                <motion.button
                  onClick={() => setSelectedProcessor('intel')}
                  className={`relative px-5 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                    selectedProcessor === 'intel' 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/40' 
                      : 'text-gray-400 hover:text-gray-200 hover:bg-slate-700/50'
                  }`}
                  whileHover={{ scale: selectedProcessor === 'intel' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Cpu className="h-4 w-4 md:h-5 md:w-5" />
                  <span>Intel Platinum</span>
                </motion.button>
                
                {/* India/Germany: AMD Button (Right - Coming Soon) */}
                <motion.button
                  className="relative px-5 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 flex items-center gap-1.5 md:gap-2 text-gray-500 cursor-not-allowed opacity-50"
                >
                  <Zap className="h-4 w-4 md:h-5 md:w-5" />
                  <span>AMD EPYC</span>
                  <span className="absolute -top-1.5 md:-top-2 -right-1 md:-right-2 bg-amber-500 text-white text-[6px] md:text-[8px] font-bold px-1.5 md:px-2 py-0.5 rounded-full uppercase">
                    Soon
                  </span>
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
        {/* Intel Platinum Section - Show when Intel is selected */}
        <AnimatePresence mode="wait">
        {selectedProcessor === 'intel' && (
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
            <span>Optimized Performance</span>
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
                  
                  {/* Out of Stock Badge for UAE Intel */}
                  {(selectedLocation === 'UAE' || currentLoc.code === 'UAE') && (
                    <div className="absolute -top-3 right-4 z-20">
                      <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">Out of Stock</span>
                    </div>
                  )}
                  
          {/* 10% OFF Badge for Intel plans - REMOVED */}
                  
                  {/* Stable Glow Effect - No animation, just smooth transition */}
                  <div className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-cyan-500/30 blur-2xl rounded-3xl" />
                  </div>
                  
                  <motion.div 
                    className={`relative bg-slate-900/95 rounded-2xl p-6 border-2 border-slate-700/60 transition-all duration-200 flex flex-col overflow-hidden z-10 ${
                      plan.popular ? 'border-cyan-500/50' : ''
                    } ${
                      selectedLocation === 'UAE' || currentLoc.code === 'UAE' 
                        ? 'opacity-60 blur-[1px] grayscale' 
                        : ''
                    }`}
                    whileHover={selectedLocation === 'UAE' || currentLoc.code === 'UAE' ? {} : { 
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

                    {/* Price - No discount */}
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
                      onClick={() => handleOrderClick(plan, 'intel')}
                      disabled={selectedLocation === 'UAE' || currentLoc.code === 'UAE'}
                      className={`w-full py-3 rounded-xl font-semibold text-sm text-center block transition-all duration-300 relative z-10 ${
                        selectedLocation === 'UAE' || currentLoc.code === 'UAE'
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'text-white bg-blue-600 hover:bg-blue-500'
                      }`}
                      whileHover={selectedLocation === 'UAE' || currentLoc.code === 'UAE' ? {} : { scale: 1.02 }} 
                      whileTap={selectedLocation === 'UAE' || currentLoc.code === 'UAE' ? {} : { scale: 0.98 }}
                    >
                      {selectedLocation === 'UAE' || currentLoc.code === 'UAE' ? 'Out of Stock' : 'Order Now'}
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

                    {/* Price - No discount for AMD EPYC - Actually 10% OFF */}
                    <div className="text-center mb-4 relative z-10">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-gray-500 text-sm line-through">{symbol}{convertPrice(plan.price / 278)}</span>
                        <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">10% OFF</span>
                      </div>
                      <span className="text-4xl font-bold text-red-400 group-hover:text-red-300 transition-colors">{symbol}{convertPrice((plan.price * 0.9) / 278)}</span>
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
                      onClick={() => handleOrderClick(plan, 'amd')}
                      className="w-full py-3 rounded-xl font-semibold text-white text-sm text-center block transition-all duration-300 bg-red-600 hover:bg-red-500 relative z-10"
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

        {/* Become a Partner Section */}
        <PartnerSection />
      </div>
    </section>
  )
}

// Partner Section Component - Premium YouTube Creator Program
function PartnerSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  const partnerTiers = [
    {
      subscribers: '1,000+',
      reward: '8GB RAM',
      color: 'from-red-500 to-rose-600',
      bgGlow: 'red',
      description: 'Rising Creator'
    },
    {
      subscribers: '5,000+',
      reward: '16GB RAM',
      color: 'from-red-600 to-red-500',
      bgGlow: 'red',
      description: 'Established Creator'
    },
    {
      subscribers: '10,000+',
      reward: '32GB RAM',
      color: 'from-red-700 to-red-600',
      bgGlow: 'red',
      description: 'Elite Creator'
    }
  ]

  const requirements = [
    'Quality gaming content focused on Minecraft',
    'Consistent upload schedule (minimum 1 video in 2 weeks)',
    'Active and engaged community',
    'Professional presentation and commentary',
    'Must mention Diamond Host in videos',
    'Server link in video description',
    'Minimum 1,000 subscribers on YouTube',
    'No controversial or inappropriate content',
    'Must stream/record on Diamond Host servers',
    'Partnership review every 3 months'
  ]

  // YouTube Play Button SVG
  const YouTubeIcon = ({ size = 24 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )

  return (
    <motion.div 
      id="creator-program"
      initial={{ opacity: 0, y: 40 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }} 
      viewport={{ once: true }}
      className="mt-24 relative scroll-mt-24"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-5 py-2 text-red-400 text-sm mb-6"
        >
          <YouTubeIcon size={18} />
          <span className="font-medium">Content Creator Program</span>
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Become a <span className="text-red-500">YouTube</span> Partner
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Get <span className="text-red-400 font-semibold">FREE</span> premium servers based on your subscriber count!
        </p>
      </div>

      {/* Partner Tiers - Premium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12 relative z-10 px-4">
        {partnerTiers.map((tier, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            viewport={{ once: true }}
            className="group relative"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-all duration-500" />
            
            <motion.div 
              className="relative bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-8 border border-red-500/20 hover:border-red-500/50 transition-all duration-300 overflow-hidden"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* YouTube Icon Background */}
              <div className="absolute top-4 right-4 text-red-500/10">
                <YouTubeIcon size={80} />
              </div>
              
              {/* Tier Badge */}
              <div className="relative z-10">
                <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${tier.color} text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6`}>
                  <YouTubeIcon size={14} />
                  <span>{tier.description}</span>
                </div>
                
                {/* Subscribers */}
                <div className="mb-6">
                  <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Subscribers</p>
                  <p className="text-4xl font-bold text-white">{tier.subscribers}</p>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mb-6" />
                
                {/* Reward */}
                <div className="text-center">
                  <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">FREE Server</p>
                  <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                    <Cpu className="h-5 w-5 text-red-400" />
                    <span className="text-2xl font-bold text-red-400">{tier.reward}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Requirements Expandable Section */}
      <motion.div 
        className="max-w-4xl mx-auto px-4 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-gradient-to-r from-slate-900 to-slate-950 backdrop-blur-xl rounded-2xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 flex items-center justify-between"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/30">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Partnership Requirements</p>
              <p className="text-gray-500 text-sm">Click to view eligibility criteria</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center"
          >
            <ChevronDown className="h-5 w-5 text-red-400" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-b-2xl p-8 border border-t-0 border-red-500/20 -mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requirements.map((req, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-red-500/5 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="text-gray-300">{req}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 p-5 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <YouTubeIcon size={16} />
                    </div>
                    <p className="text-red-300 text-sm leading-relaxed">
                      <strong>Important:</strong> All partnerships are reviewed every 3 months. Servers are provided free of charge as long as requirements are met. Diamond Host reserves the right to modify or terminate partnerships.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Apply Button */}
      <motion.div 
        className="text-center mt-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        <motion.a
          href="https://discord.gg/tKDRWYNcuE"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 shadow-lg shadow-red-500/30 text-lg"
          whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          <YouTubeIcon size={24} />
          <span>Apply for Creator Program</span>
        </motion.a>
        <p className="text-gray-500 text-sm mt-4">Opens Discord → Create a ticket to apply</p>
      </motion.div>
    </motion.div>
  )

}