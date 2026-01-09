'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, Cpu, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getPlans, getLocations, getPlansByLocation, getEpycPlansByLocation, HostingPlan, Location, EpycPlan } from '@/lib/supabase'

// Fallback data - UAE in center (index 1)
const fallbackLocations: Location[] = [
  { id: '2', name: 'Singapore', code: 'Singapore', flag: 'SG', active: true, sort_order: 1, created_at: '' },
  { id: '1', name: 'UAE', code: 'UAE', flag: 'AE', active: true, sort_order: 2, created_at: '' },
  { id: '3', name: 'Germany', code: 'Germany', flag: 'DE', active: true, sort_order: 3, created_at: '' },
]

// Intel Platinum Plans
const fallbackPlans: HostingPlan[] = [
  { id: '1', name: 'Bronze Plan', icon: 'Medal', ram: '2GB RAM', performance: '100%', location: 'UAE', price: 240, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 1, active: true, created_at: '' },
  { id: '2', name: 'Silver Plan', icon: 'Star', ram: '4GB RAM', performance: '150%', location: 'UAE', price: 480, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 2, active: true, created_at: '' },
  { id: '3', name: 'Gold Plan', icon: 'Crown', ram: '8GB RAM', performance: '250%', location: 'UAE', price: 960, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 3, active: true, created_at: '' },
  { id: '4', name: 'Platinum Plan', icon: 'Award', ram: '10GB RAM', performance: '300%', location: 'UAE', price: 1200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: true, sort_order: 4, active: true, created_at: '' },
  { id: '5', name: 'Diamond Plan', icon: 'Diamond', ram: '12GB RAM', performance: '350%', location: 'UAE', price: 1440, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 5, active: true, created_at: '' },
  { id: '6', name: 'Emerald Plan', icon: 'Gem', ram: '16GB RAM', performance: '500%', location: 'UAE', price: 1920, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 6, active: true, created_at: '' },
  { id: '7', name: 'Nether Plan', icon: 'Nether', ram: '22GB RAM', performance: '700%', location: 'UAE', price: 2640, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 7, active: true, created_at: '' },
  { id: '8', name: 'Ender Plan', icon: 'Ender', ram: '32GB RAM', performance: '900%', location: 'UAE', price: 3840, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 8, active: true, created_at: '' },
  { id: '9', name: 'Diamond Plus Plan', icon: 'Trophy', ram: '48GB RAM', performance: '1200%', location: 'UAE', price: 5760, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Custom Plans'], popular: false, sort_order: 9, active: true, created_at: '' },
]

// AMD EPYC Plans (fallback)
const fallbackEpycPlans: EpycPlan[] = [
  { id: 'amd1', name: 'EPYC Bronze', icon: 'Cpu', ram: '2GB RAM', performance: '150%', location: 'UAE', price: 319, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Instant Setup'], popular: false, sort_order: 1, active: true, created_at: '' },
  { id: 'amd2', name: 'EPYC Silver', icon: 'Cpu', ram: '4GB RAM', performance: '200%', location: 'UAE', price: 599, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Instant Setup'], popular: false, sort_order: 2, active: true, created_at: '' },
  { id: 'amd3', name: 'EPYC Gold', icon: 'Cpu', ram: '8GB RAM', performance: '300%', location: 'UAE', price: 1199, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Instant Setup'], popular: false, sort_order: 3, active: true, created_at: '' },
  { id: 'amd4', name: 'EPYC Platinum', icon: 'Cpu', ram: '12GB RAM', performance: '400%', location: 'UAE', price: 1899, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Priority Support'], popular: true, sort_order: 4, active: true, created_at: '' },
  { id: 'amd5', name: 'EPYC Diamond', icon: 'Cpu', ram: '16GB RAM', performance: '500%', location: 'UAE', price: 2499, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Priority Support'], popular: false, sort_order: 5, active: true, created_at: '' },
  { id: 'amd6', name: 'EPYC Ultimate', icon: 'Cpu', ram: '32GB RAM', performance: '1000%', location: 'UAE', price: 4499, currency: 'PKR', features: ['24/7 Support', 'AMD EPYC', 'Custom Plans'], popular: false, sort_order: 6, active: true, created_at: '' },
]

// Flag Component - Large cinematic style
const FlagIcon = ({ code, size = 'normal' }: { code: string; size?: 'normal' | 'large' | 'xlarge' }) => {
  const sizeClass = size === 'xlarge' ? 'w-24 h-16' : size === 'large' ? 'w-16 h-12' : 'w-10 h-7'
  
  if (code === 'UAE' || code === 'AE') {
    return (
      <svg viewBox="0 0 36 24" className={`${sizeClass} rounded-lg shadow-lg`}>
        <rect width="36" height="8" fill="#00732F" />
        <rect y="8" width="36" height="8" fill="#FFFFFF" />
        <rect y="16" width="36" height="8" fill="#000000" />
        <rect width="9" height="24" fill="#FF0000" />
      </svg>
    )
  }
  if (code === 'Singapore' || code === 'SG') {
    return (
      <svg viewBox="0 0 36 24" className={`${sizeClass} rounded-lg shadow-lg`}>
        <rect width="36" height="12" fill="#ED2939" />
        <rect y="12" width="36" height="12" fill="#FFFFFF" />
        <circle cx="10" cy="8" r="4" fill="#FFFFFF" />
        <circle cx="11" cy="8" r="3" fill="#ED2939" />
      </svg>
    )
  }
  if (code === 'Germany' || code === 'DE') {
    return (
      <svg viewBox="0 0 36 24" className={`${sizeClass} rounded-lg shadow-lg`}>
        <rect width="36" height="8" fill="#000000" />
        <rect y="8" width="36" height="8" fill="#DD0000" />
        <rect y="16" width="36" height="8" fill="#FFCC00" />
      </svg>
    )
  }
  return <div className={`${sizeClass} bg-gray-600 rounded-lg`} />
}

export default function PricingCards() {
  const [locations, setLocations] = useState<Location[]>([])
  const [plans, setPlans] = useState<HostingPlan[]>([])
  const [epycPlans, setEpycPlans] = useState<EpycPlan[]>([])
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(1) // UAE is center (index 1)
  const [loading, setLoading] = useState(true)
  const [plansLoading, setPlansLoading] = useState(false)
  const [selectedProcessor, setSelectedProcessor] = useState<'intel' | 'amd'>('intel')

  const selectedLocation = locations[selectedLocationIndex]?.code || 'UAE'

  useEffect(() => {
    async function fetchInitialData() {
      const [locsData, plansData] = await Promise.all([getLocations(), getPlans()])
      let locs = locsData.length > 0 ? locsData : fallbackLocations
      
      // Reorder to put UAE in center
      const uaeIndex = locs.findIndex(l => l.code === 'UAE' || l.code === 'AE')
      if (uaeIndex !== -1 && uaeIndex !== 1 && locs.length >= 3) {
        const uae = locs[uaeIndex]
        locs = locs.filter((_, i) => i !== uaeIndex)
        locs.splice(1, 0, uae)
      }
      
      setLocations(locs)
      setPlans(plansData.length > 0 ? plansData : fallbackPlans)
      
      // Start with UAE (index 1)
      const startLocation = locs[1]?.code || 'UAE'
      const epycData = await getEpycPlansByLocation(startLocation)
      setEpycPlans(epycData.length > 0 ? epycData : fallbackEpycPlans.filter(p => p.location === startLocation))
      setLoading(false)
    }
    fetchInitialData()
  }, [])

  const handleLocationChange = async (direction: 'prev' | 'next') => {
    let newIndex = selectedLocationIndex
    if (direction === 'next') {
      newIndex = (selectedLocationIndex + 1) % locations.length
    } else {
      newIndex = selectedLocationIndex === 0 ? locations.length - 1 : selectedLocationIndex - 1
    }
    setSelectedLocationIndex(newIndex)
    setPlansLoading(true)
    
    // Reset to Intel if switching away from UAE while AMD is selected
    const newLocationCode = locations[newIndex]?.code || 'UAE'
    if (newLocationCode !== 'UAE' && newLocationCode !== 'AE' && selectedProcessor === 'amd') {
      setSelectedProcessor('intel')
    }
    
    const locationCode = locations[newIndex]?.code || 'UAE'
    const [ryzenData, epycData] = await Promise.all([
      getPlansByLocation(locationCode),
      getEpycPlansByLocation(locationCode)
    ])
    setPlans(ryzenData.length > 0 ? ryzenData : fallbackPlans.filter(p => p.location === locationCode))
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
      {/* Plans Section Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14] via-[#0c1929] to-[#070b14]" />
        
        {/* Animated moving grid */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        {/* Animated gradient orbs */}
        <div 
          className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[150px]"
          style={{ animation: 'pulse 4s ease-in-out infinite' }}
        />
        <div 
          className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-[120px]"
          style={{ animation: 'pulse 4s ease-in-out infinite', animationDelay: '2s' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[200px]"
          style={{ animation: 'pulse 6s ease-in-out infinite', animationDelay: '1s' }}
        />
        
        {/* Animated scan line */}
        <div 
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
          style={{ animation: 'scanLine 8s linear infinite' }}
        />
        
        {/* Top and bottom fade */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#070b14] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#070b14] to-transparent" />
        
        {/* Accent lines with glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-500/10 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Cinematic Location Selector - Above Everything */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="relative flex items-center gap-6">
            {/* Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-3xl rounded-full scale-150 opacity-50" />
            
            {/* Left Arrow - Sleek style */}
            <motion.button
              onClick={() => handleLocationChange('prev')}
              className="relative z-10 p-4 text-slate-500 hover:text-cyan-400 transition-all duration-300 group"
              whileHover={{ scale: 1.2, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 rounded-full blur-xl transition-all duration-300" />
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </motion.button>

            {/* Flag Display Card */}
            <motion.div 
              className="relative flex items-center gap-5 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-2xl px-10 py-5 rounded-2xl border border-slate-600/30 shadow-2xl"
              key={selectedLocationIndex}
              initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
            >
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-2xl">
                <div className="absolute inset-[-2px] bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
              </div>
              
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 rounded-2xl" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
              
              {/* Popular Badge for UAE - Top right corner */}
              {(currentLoc.code === 'UAE' || currentLoc.code === 'AE') && (
                <motion.div 
                  className="absolute -top-2 -right-2 z-30"
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 400, delay: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-orange-500/40 whitespace-nowrap">
                    Popular
                  </span>
                </motion.div>
              )}
              
              {/* Flag with 3D effect */}
              <motion.div
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-white/10 blur-xl rounded-lg scale-110" />
                <FlagIcon code={currentLoc.code} size="xlarge" />
              </motion.div>
              
              {/* Location Info */}
              <div className="relative z-10">
                <motion.p 
                  className="text-2xl font-bold text-white tracking-wide"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {currentLoc.name}
                </motion.p>
                <motion.p 
                  className="text-xs text-cyan-400/80 font-medium tracking-widest uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  Server Location
                </motion.p>
              </div>
            </motion.div>

            {/* Right Arrow - Sleek style */}
            <motion.button
              onClick={() => handleLocationChange('next')}
              className="relative z-10 p-4 text-slate-500 hover:text-cyan-400 transition-all duration-300 group"
              whileHover={{ scale: 1.2, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 rounded-full blur-xl transition-all duration-300" />
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Location Dots */}
        <div className="flex justify-center gap-3 mb-8">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.id}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === selectedLocationIndex ? 'bg-cyan-400 w-8' : 'bg-slate-600'}`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        {/* Intel / AMD Toggle - Only show AMD for UAE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }} 
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="inline-flex bg-slate-900/90 backdrop-blur-xl p-2 rounded-2xl border border-slate-700/50 shadow-xl">
            <motion.button
              onClick={() => setSelectedProcessor('intel')}
              className={`relative px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                selectedProcessor === 'intel' 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Cpu className="h-5 w-5" />
              <span>Intel Platinum</span>
            </motion.button>
            {/* AMD button only for UAE */}
            {(currentLoc.code === 'UAE' || currentLoc.code === 'AE') && (
            <motion.button
              onClick={() => setSelectedProcessor('amd')}
              className={`relative px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                selectedProcessor === 'amd' 
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/30' 
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap className="h-5 w-5" />
              <span>AMD EPYC</span>
            </motion.button>
            )}
          </div>
        </motion.div>

        {/* Intel Platinum Section */}
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
                      <span className="text-4xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">{plan.price}</span>
                      <span className="text-sm text-cyan-400 ml-1">{plan.currency}</span>
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
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">DDoS Protection</span>
                      </div>
                    </div>

                    {/* Button */}
                    <motion.a 
                      href="https://discord.gg/tKDRWYNcuE" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl font-semibold text-white text-sm text-center block transition-all duration-300 bg-blue-600 hover:bg-blue-500 relative z-10"
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                    >
                      Buy Now
                    </motion.a>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        </motion.div>
        )}

        {/* AMD EPYC Section */}
        {selectedProcessor === 'amd' && epycPlans.length > 0 && (
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
                      <span className="text-4xl font-bold text-red-400 group-hover:text-red-300 transition-colors">{plan.price}</span>
                      <span className="text-sm text-red-400 ml-1">{plan.currency}</span>
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
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-red-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">DDoS Protection</span>
                      </div>
                    </div>

                    {/* Button */}
                    <motion.a
                      href="https://discord.gg/tKDRWYNcuE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl font-semibold text-white text-sm text-center block transition-all duration-300 bg-blue-600 hover:bg-blue-500 relative z-10"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Buy Now
                    </motion.a>
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
