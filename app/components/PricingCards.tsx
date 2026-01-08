'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, Cpu, Zap, ChevronLeft, ChevronRight, Server } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getPlans, getLocations, getPlansByLocation, getEpycPlansByLocation, HostingPlan, Location, EpycPlan } from '@/lib/supabase'

// Fallback data
const fallbackLocations: Location[] = [
  { id: '1', name: 'UAE', code: 'UAE', flag: 'AE', active: true, sort_order: 1, created_at: '' },
  { id: '2', name: 'Singapore', code: 'Singapore', flag: 'SG', active: true, sort_order: 2, created_at: '' },
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
const FlagIcon = ({ code, size = 'normal' }: { code: string; size?: 'normal' | 'large' }) => {
  const sizeClass = size === 'large' ? 'w-16 h-12' : 'w-10 h-7'
  
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
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [plansLoading, setPlansLoading] = useState(false)

  const selectedLocation = locations[selectedLocationIndex]?.code || 'UAE'

  useEffect(() => {
    async function fetchInitialData() {
      const [locsData, plansData] = await Promise.all([getLocations(), getPlans()])
      const locs = locsData.length > 0 ? locsData : fallbackLocations
      setLocations(locs)
      setPlans(plansData.length > 0 ? plansData : fallbackPlans)
      const epycData = await getEpycPlansByLocation(locs[0]?.code || 'UAE')
      setEpycPlans(epycData.length > 0 ? epycData : fallbackEpycPlans.filter(p => p.location === (locs[0]?.code || 'UAE')))
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
    <section id="plans" className="py-24 px-4 relative z-10">
      <div className="container mx-auto">
        {/* Header */}
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

        {/* Cinematic Location Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }} 
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="flex items-center gap-6">
            {/* Left Arrow */}
            <motion.button
              onClick={() => handleLocationChange('prev')}
              className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-slate-700 hover:border-cyan-500/50 transition-all duration-300"
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            {/* Flag Display */}
            <motion.div 
              className="relative flex items-center gap-4 bg-slate-900/90 backdrop-blur-xl px-8 py-4 rounded-2xl border border-slate-700/50 shadow-2xl"
              key={selectedLocationIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 rounded-2xl" />
              <motion.div
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.4 }}
              >
                <FlagIcon code={currentLoc.code} size="large" />
              </motion.div>
              <div className="relative">
                <motion.p 
                  className="text-2xl font-bold text-white"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {currentLoc.name}
                </motion.p>
                <p className="text-xs text-cyan-400">Server Location</p>
              </div>
            </motion.div>

            {/* Right Arrow */}
            <motion.button
              onClick={() => handleLocationChange('next')}
              className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-slate-700 hover:border-cyan-500/50 transition-all duration-300"
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Location Dots */}
        <div className="flex justify-center gap-2 mb-12">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.id}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === selectedLocationIndex ? 'bg-cyan-400 w-6' : 'bg-slate-600'}`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

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
                  initial={{ opacity: 0, y: 50 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5, delay: idx * 0.05 }} 
                  className="group relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      <span className="bg-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">Most Popular</span>
                    </div>
                  )}
                  <motion.div 
                    className={`relative bg-slate-900/95 rounded-2xl p-6 border-2 border-slate-700/60 transition-all duration-500 flex flex-col overflow-hidden ${plan.popular ? 'border-cyan-500/50' : ''}`}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.02,
                      boxShadow: '0 25px 50px -12px rgba(6, 182, 212, 0.35)',
                      borderColor: 'rgba(6, 182, 212, 0.8)',
                      transition: { duration: 0.3 } 
                    }}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500 rounded-2xl" />
                    
                    {/* Icon - AMD style */}
                    <div className="flex justify-center mb-3 relative z-10">
                      <motion.div 
                        className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Server className="h-8 w-8 text-white" />
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

        {/* AMD EPYC Section */}
        {epycPlans.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24"
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
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">Best Value</span>
                    </div>
                  )}
                  <motion.div
                    className={`relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 border-2 ${plan.popular ? 'border-red-500/50' : 'border-red-900/30'} transition-all duration-500 flex flex-col overflow-hidden`}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.02,
                      boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.35)',
                      borderColor: 'rgba(239, 68, 68, 0.8)',
                      transition: { duration: 0.3 } 
                    }}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-orange-500/0 group-hover:from-red-500/10 group-hover:to-orange-500/10 transition-all duration-500 rounded-2xl" />

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
