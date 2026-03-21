'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, Cpu, Zap, MoonStar, Sparkles } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { getPlans, getLocations, getPlansByLocation, getEpycPlansByLocation, HostingPlan, Location, EpycPlan } from '@/lib/supabase'
import { useCurrency } from '@/lib/CurrencyContext'
import { useAuth } from '@/lib/AuthContext'
import { useTheme } from '@/lib/ThemeContext'
import { useDiscounts } from '@/lib/DiscountContext'
import { applyDiscountPercentage, formatDiscountBadge } from '@/lib/discount'
import { useRouter } from 'next/navigation'
import { FestiveRibbon } from './FestiveDecor'

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
  const { theme } = useTheme()
  const { discountConfig, getPlanDiscountPercentage } = useDiscounts()
  const festive = theme === 'eid'

  const selectedLocation = locations[selectedLocationIndex]?.code || 'UAE'
  const hasActiveSaleOffer =
    (discountConfig.global.enabled && discountConfig.global.percentage > 0) ||
    Object.values(discountConfig.plans).some(
      rule => rule.mode === 'custom' && rule.percentage > 0,
    )
  const saleExpiryLabel = 'Eid offer valid until 23 March'
  const formatPlanPrice = (price: number) => `${symbol}${convertPrice(price / 278)}`
  const getPlanPricing = (plan: { id: string; price: number }) => {
    const discountPercentage = getPlanDiscountPercentage(plan.id)
    const discountedPrice = applyDiscountPercentage(plan.price, discountPercentage)

    return {
      discountPercentage,
      discountedPrice,
      hasDiscount: discountPercentage > 0,
    }
  }
  
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
  
  // Handle Order Click - Redirect to order page
  const handleOrderClick = (plan: { id: string; name: string; price: number; ram: string; location?: string }, processor: 'intel' | 'amd') => {
    if (!user) {
      setShowAuthModal(true)
      return
    }
    router.push(`/order/${plan.id}?processor=${processor}`)
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
    <section id="plans" className="relative z-10 overflow-hidden px-4 py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 islamic-pattern opacity-[0.06]" />
        <div className="absolute left-[-6%] top-10 h-72 w-72 rounded-full bg-[var(--theme-glow)] blur-[130px]" />
        <div className="absolute bottom-0 right-[-6%] h-80 w-80 rounded-full bg-[color:var(--theme-button-shadow)] blur-[150px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-4xl text-center"
        >
          {festive ? (
            <FestiveRibbon className="mb-6" label="Ramadan and Eid Sale Plans" />
          ) : (
            <span className="theme-badge mb-6 text-sm">
              <Sparkles className="h-4 w-4" />
              Premium Game Hosting Plans
            </span>
          )}

          <h2 className="theme-heading text-4xl md:text-6xl">
            {festive ? (
              <>
                Choose Your
                <br />
                <span className="theme-heading-accent">Diamond Host Plan</span>
              </>
            ) : (
              <>
                Choose The Plan
                <br />
                <span className="theme-heading-accent">That Fits Your Community</span>
              </>
            )}
          </h2>

          <p className="theme-copy mx-auto mt-6 max-w-2xl text-base leading-8 md:text-lg">
            Browse locations, switch processor types, and order the server that matches your performance goals. The experience is now wrapped in a richer festive presentation without changing the purchase flow.
          </p>

          {(festive || hasActiveSaleOffer) && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--theme-border-strong)] bg-[var(--theme-surface-strong)] px-4 py-2 text-sm font-semibold text-[var(--theme-highlight)] shadow-[0_18px_45px_-22px_var(--theme-button-shadow)]">
              <MoonStar className="h-4 w-4" />
              <span>{saleExpiryLabel}</span>
            </div>
          )}
        </motion.div>

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
          className="mb-8 flex flex-col items-center justify-center gap-2"
        >
          {/* Label */}
          <p className="theme-copy mb-2 text-xs uppercase tracking-[0.34em] md:text-sm">
            {festive ? 'Select Hosting Engine' : 'Select Processor'}
          </p>
          
          <div className="theme-panel inline-flex overflow-visible rounded-2xl p-1.5 shadow-xl shadow-black/20">
            {/* For UAE: Intel (left) | AMD (right) */}
            {/* For India/Germany: Intel (left) | AMD (right, coming soon) */}
            
            {(currentLoc.code === 'UAE' || currentLoc.code === 'AE') ? (
              <>
                {/* UAE: Intel Button (Left) */}
                <motion.button
                  onClick={() => setSelectedProcessor('intel')}
                  className={`relative px-5 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                    selectedProcessor === 'intel' 
                      ? festive
                        ? 'bg-gradient-to-r from-[#0f3d2e] to-[#d4af37] text-[#fff8ea] shadow-lg shadow-[#d4af37]/30'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/40'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                  whileHover={{ scale: selectedProcessor === 'intel' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Cpu className="h-4 w-4 md:h-5 md:w-5" />
                  <span>Intel Platinum</span>
                </motion.button>
                
                {/* UAE: AMD Button (Right) */}
                <motion.button
                  onClick={() => setSelectedProcessor('amd')}
                  className={`relative px-5 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 flex items-center gap-1.5 md:gap-2 overflow-visible ${
                    selectedProcessor === 'amd' 
                      ? festive
                        ? 'bg-gradient-to-r from-[#1a4f3f] to-[#f59e0b] text-[#fff8ea] shadow-lg shadow-[#f59e0b]/30'
                        : 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/40'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                  whileHover={{ scale: selectedProcessor === 'amd' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ overflow: 'visible' }}
                >
                  <Zap className="h-4 w-4 md:h-5 md:w-5" />
                  <span>AMD EPYC</span>
                </motion.button>
              </>
            ) : (
              <>
                {/* India/Germany: Intel Button (Left - Main) */}
                <motion.button
                  onClick={() => setSelectedProcessor('intel')}
                  className={`relative px-5 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                    selectedProcessor === 'intel' 
                      ? festive
                        ? 'bg-gradient-to-r from-[#0f3d2e] to-[#d4af37] text-[#fff8ea] shadow-lg shadow-[#d4af37]/30'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/40'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
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
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm mb-4 ${
              festive
                ? 'border border-[#d4af37]/30 bg-[#0f3d2e]/60 text-[#f7e7ce]'
                : 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
            }`}>
            {festive ? <MoonStar className="h-4 w-4" /> : <Cpu className="h-4 w-4" />}
            <span>{festive ? 'Festive Performance Collection' : 'Optimized Performance'}</span>
          </motion.div>
          <h2 className="theme-heading text-4xl md:text-5xl mb-4">
            {festive ? (
              <>
                <span className="theme-heading-accent">Premium</span> Intel Plans
              </>
            ) : (
              <>
                <span className="text-blue-400">Intel</span> Platinum Plans
              </>
            )}
          </h2>
          <p className="theme-copy uppercase tracking-[0.3em] text-xs">
            {festive ? 'Elegant performance for festive communities' : 'Quality Wise, No Compromise'}
          </p>
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
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap ${
                        festive ? 'bg-[#d4af37] text-[#11271e]' : 'bg-cyan-500 text-white'
                      }`}>Best Value</span>
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
                    <div className={`absolute inset-0 blur-2xl rounded-3xl ${
                      festive
                        ? 'bg-gradient-to-r from-[#0f3d2e]/40 via-[#d4af37]/25 to-[#f7e7ce]/25'
                        : 'bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-cyan-500/30'
                    }`} />
                  </div>
                  
                  <motion.div 
                    className={`theme-panel-strong theme-spotlight relative rounded-[28px] p-6 border transition-all duration-200 flex flex-col overflow-hidden z-10 ${
                      plan.popular ? (festive ? 'border-[#d4af37]/50' : 'border-cyan-500/50') : ''
                    } ${
                      selectedLocation === 'UAE' || currentLoc.code === 'UAE' 
                        ? 'opacity-60 blur-[1px] grayscale' 
                        : ''
                    }`}
                    whileHover={selectedLocation === 'UAE' || currentLoc.code === 'UAE' ? {} : { 
                      y: -8, 
                      scale: 1.02,
                      boxShadow: festive
                        ? '0 24px 55px -18px rgba(212, 175, 55, 0.45)'
                        : '0 20px 40px -12px rgba(6, 182, 212, 0.4)',
                      borderColor: festive ? 'rgba(212, 175, 55, 0.8)' : 'rgba(6, 182, 212, 0.8)',
                      transition: { duration: 0.15 } 
                    }}
                  >
                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 transition-all duration-200 rounded-[28px] ${
                      festive
                        ? 'bg-gradient-to-br from-[#0f3d2e]/0 to-[#d4af37]/0 group-hover:from-[#0f3d2e]/10 group-hover:to-[#d4af37]/10'
                        : 'bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10'
                    }`} />
                    
                    {/* Icon - AMD style but blue */}
                    <div className="flex justify-center mb-3 relative z-10">
                      <motion.div 
                        className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg ${
                          festive
                            ? 'bg-gradient-to-br from-[#0f3d2e] via-[#185742] to-[#d4af37] text-[#fff8ea] shadow-[#d4af37]/25'
                            : 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-blue-500/30'
                        }`}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Cpu className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Name */}
                    <h3 className={`text-lg font-bold text-center text-white mb-2 uppercase tracking-wide relative z-10 transition-colors ${
                      festive ? 'group-hover:text-[#f7e7ce]' : 'group-hover:text-cyan-300'
                    }`}>{plan.name}</h3>

                    {(() => {
                      const pricing = getPlanPricing(plan)

                      return (
                        <div className="text-center mb-4 relative z-10">
                          {pricing.hasDiscount && (
                            <div className="mb-1 flex items-center justify-center gap-2">
                              <span className="text-sm text-gray-500 line-through">
                                {formatPlanPrice(plan.price)}
                              </span>
                              <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                                {formatDiscountBadge(pricing.discountPercentage)}
                              </span>
                            </div>
                          )}
                          <span className={`text-4xl font-bold transition-colors ${
                            festive ? 'text-[var(--theme-highlight)] group-hover:text-[var(--theme-gold)]' : 'text-cyan-400 group-hover:text-cyan-300'
                          }`}>
                            {formatPlanPrice(pricing.discountedPrice)}
                          </span>
                          <p className="text-gray-500 text-xs mt-1">per month</p>
                        </div>
                      )
                    })()}

                    {/* Features */}
                    <div className="flex-1 space-y-2 mb-4 relative z-10">
                      <div className="flex items-center gap-2">
                        <Check className={`h-4 w-4 flex-shrink-0 ${festive ? 'text-[var(--theme-gold)]' : 'text-green-400'}`} />
                        <span className="text-gray-300 text-sm">{plan.ram}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className={`h-4 w-4 flex-shrink-0 ${festive ? 'text-[var(--theme-gold)]' : 'text-green-400'}`} />
                        <span className="text-gray-300 text-sm">{plan.performance} CPU Power</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className={`h-4 w-4 flex-shrink-0 ${festive ? 'text-[var(--theme-gold)]' : 'text-green-400'}`} />
                        <span className="text-gray-300 text-sm">Intel Platinum CPU</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className={`h-4 w-4 flex-shrink-0 ${festive ? 'text-[var(--theme-gold)]' : 'text-green-400'}`} />
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
                          : festive
                            ? 'theme-button-primary !rounded-xl'
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
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm mb-4 ${
                festive
                  ? 'border border-[#d4af37]/30 bg-[#0f3d2e]/60 text-[#f7e7ce]'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}
            >
              <Zap className="h-4 w-4" />
              <span>{festive ? 'Lantern Glow Performance' : 'Premium Performance'}</span>
            </motion.div>
            <h2 className="theme-heading text-4xl md:text-5xl mb-4">
              AMD <span className={festive ? 'theme-heading-accent' : 'text-red-500'}>EPYC</span> Plans
            </h2>
            <p className="theme-copy uppercase tracking-[0.3em] text-xs">
              {festive ? 'Premium servers with a festive glow' : 'Maximum Power, Ultimate Performance'}
            </p>
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
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap ${
                        festive ? 'bg-[#d4af37] text-[#11271e]' : 'bg-red-500 text-white'
                      }`}>Best Value</span>
                    </div>
                  )}
                  
                  {/* Stable Glow Effect - No animation */}
                  <div className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                    <div className={`absolute inset-0 blur-2xl rounded-3xl ${
                      festive
                        ? 'bg-gradient-to-r from-[#0f3d2e]/40 via-[#d4af37]/25 to-[#f59e0b]/25'
                        : 'bg-gradient-to-r from-red-500/30 via-orange-500/30 to-red-500/30'
                    }`} />
                  </div>
                  
                  <motion.div
                    className={`theme-panel-strong theme-spotlight relative rounded-[28px] p-6 border ${plan.popular ? (festive ? 'border-[#d4af37]/50' : 'border-red-500/50') : festive ? 'border-[#d4af37]/20' : 'border-red-900/30'} transition-all duration-200 flex flex-col overflow-hidden z-10`}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      boxShadow: festive
                        ? '0 24px 55px -18px rgba(212, 175, 55, 0.45)'
                        : '0 20px 40px -12px rgba(239, 68, 68, 0.4)',
                      borderColor: festive ? 'rgba(212, 175, 55, 0.8)' : 'rgba(239, 68, 68, 0.8)',
                      transition: { duration: 0.15 } 
                    }}
                  >
                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 transition-all duration-200 rounded-[28px] ${
                      festive
                        ? 'bg-gradient-to-br from-[#0f3d2e]/0 to-[#d4af37]/0 group-hover:from-[#0f3d2e]/10 group-hover:to-[#d4af37]/10'
                        : 'bg-gradient-to-br from-red-500/0 to-orange-500/0 group-hover:from-red-500/10 group-hover:to-orange-500/10'
                    }`} />

                    {/* Icon */}
                    <div className="flex justify-center mb-3 relative z-10">
                      <motion.div
                        className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg ${
                          festive
                            ? 'bg-gradient-to-br from-[#0f3d2e] via-[#185742] to-[#d4af37] text-[#fff8ea] shadow-[#d4af37]/25'
                            : 'bg-gradient-to-br from-red-600 to-red-800 text-white shadow-red-500/30'
                        }`}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Cpu className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Name */}
                    <h3 className={`text-lg font-bold text-center text-white mb-2 uppercase tracking-wide relative z-10 transition-colors ${
                      festive ? 'group-hover:text-[#f7e7ce]' : 'group-hover:text-red-300'
                    }`}>{plan.name}</h3>

                    {(() => {
                      const pricing = getPlanPricing(plan)

                      return (
                        <div className="text-center mb-4 relative z-10">
                          {pricing.hasDiscount && (
                            <div className="mb-1 flex items-center justify-center gap-2">
                              <span className="text-sm text-gray-500 line-through">
                                {formatPlanPrice(plan.price)}
                              </span>
                              <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                                {formatDiscountBadge(pricing.discountPercentage)}
                              </span>
                            </div>
                          )}
                          <span className={`text-4xl font-bold transition-colors ${
                            festive ? 'text-[var(--theme-highlight)] group-hover:text-[var(--theme-gold)]' : 'text-red-400 group-hover:text-red-300'
                          }`}>
                            {formatPlanPrice(pricing.discountedPrice)}
                          </span>
                          <p className="text-gray-500 text-xs mt-1">per month</p>
                        </div>
                      )
                    })()}

                    {/* Features */}
                    <div className="flex-1 space-y-2 mb-4 relative z-10">
                      <div className="flex items-center gap-2">
                        <Check className={`h-4 w-4 flex-shrink-0 ${festive ? 'text-[var(--theme-gold)]' : 'text-red-400'}`} />
                        <span className="text-gray-300 text-sm">{plan.ram}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className={`h-4 w-4 flex-shrink-0 ${festive ? 'text-[var(--theme-gold)]' : 'text-red-400'}`} />
                        <span className="text-gray-300 text-sm">{plan.performance} CPU Power</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className={`h-4 w-4 flex-shrink-0 ${festive ? 'text-[var(--theme-gold)]' : 'text-red-400'}`} />
                        <span className="text-gray-300 text-sm">AMD EPYC CPU</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className={`h-4 w-4 flex-shrink-0 ${festive ? 'text-[var(--theme-gold)]' : 'text-red-400'}`} />
                        <span className="text-gray-300 text-sm">24/7 Support</span>
                      </div>
                    </div>

                    {/* Button */}
                    <motion.button
                      onClick={() => handleOrderClick(plan, 'amd')}
                      className={`w-full py-3 rounded-xl font-semibold text-sm text-center block transition-all duration-300 relative z-10 ${
                        festive ? 'theme-button-primary !rounded-xl' : 'text-white bg-red-600 hover:bg-red-500'
                      }`}
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
          <p className="theme-copy mb-4">Need a custom solution?</p>
          <motion.a href="https://discord.gg/tKDRWYNcuE" target="_blank" rel="noopener noreferrer"
            className={festive ? 'theme-button-secondary !rounded-xl inline-flex' : 'border border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-cyan-400 font-semibold py-3 px-8 rounded-xl transition-all duration-300 inline-block'}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Contact Us
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}
