'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, Cpu, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getPlans, getLocations, getPlansByLocation, getEpycPlansByLocation, HostingPlan, Location, EpycPlan } from '@/lib/supabase'

// Minecraft block images for each rank
const rankImages: { [key: string]: string } = {
  'Medal': '🥉',
  'Star': '🥈', 
  'Crown': '🥇', 
  'Award': '💎',
  'Diamond': '💠', 
  'Gem': '🔮',
  'Trophy': '🏆',
  'Sparkles': '✨',
  'Zap': '⚡',
}

// Fallback data
const fallbackLocations: Location[] = [
  { id: '1', name: 'UAE', code: 'UAE', flag: '🇦🇪', active: true, sort_order: 1, created_at: '' },
  { id: '2', name: 'Singapore', code: 'Singapore', flag: '🇸🇬', active: true, sort_order: 2, created_at: '' },
  { id: '3', name: 'Germany', code: 'Germany', flag: '🇩🇪', active: true, sort_order: 3, created_at: '' },
]

// Intel Platinum Plans
const fallbackPlans: HostingPlan[] = [
  { id: '1', name: 'Bronze Plan', icon: 'Medal', ram: '2GB RAM', performance: '100%', location: 'UAE', price: 240, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 1, active: true, created_at: '' },
  { id: '2', name: 'Silver Plan', icon: 'Star', ram: '4GB RAM', performance: '150%', location: 'UAE', price: 480, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 2, active: true, created_at: '' },
  { id: '3', name: 'Gold Plan', icon: 'Crown', ram: '8GB RAM', performance: '250%', location: 'UAE', price: 960, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Instant Setup'], popular: false, sort_order: 3, active: true, created_at: '' },
  { id: '4', name: 'Platinum Plan', icon: 'Award', ram: '10GB RAM', performance: '300%', location: 'UAE', price: 1200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: true, sort_order: 4, active: true, created_at: '' },
  { id: '5', name: 'Diamond Plan', icon: 'Diamond', ram: '12GB RAM', performance: '350%', location: 'UAE', price: 1440, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 5, active: true, created_at: '' },
  { id: '6', name: 'Emerald Plan', icon: 'Gem', ram: '16GB RAM', performance: '500%', location: 'UAE', price: 1920, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 6, active: true, created_at: '' },
  { id: '7', name: 'Ruby Plan', icon: 'Sparkles', ram: '20GB RAM', performance: '600%', location: 'UAE', price: 2400, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 7, active: true, created_at: '' },
  { id: '8', name: 'Sapphire Plan', icon: 'Zap', ram: '24GB RAM', performance: '800%', location: 'UAE', price: 2880, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Priority Support'], popular: false, sort_order: 8, active: true, created_at: '' },
  { id: '9', name: 'Diamond Plus Plan', icon: 'Trophy', ram: '32GB RAM', performance: '1000%', location: 'UAE', price: 3840, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'Intel Platinum', 'Custom Plans'], popular: false, sort_order: 9, active: true, created_at: '' },
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

const iconBgColors: { [key: string]: string } = {
  'Medal': 'bg-amber-700',
  'Star': 'bg-gray-400', 
  'Crown': 'bg-yellow-500', 
  'Award': 'bg-slate-400',
  'Diamond': 'bg-cyan-500', 
  'Gem': 'bg-emerald-500',
  'Trophy': 'bg-yellow-600',
  'Sparkles': 'bg-pink-500',
  'Zap': 'bg-blue-500',
}

export default function PricingCards() {
  const [locations, setLocations] = useState<Location[]>([])
  const [plans, setPlans] = useState<HostingPlan[]>([])
  const [epycPlans, setEpycPlans] = useState<EpycPlan[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [plansLoading, setPlansLoading] = useState(false)

  useEffect(() => {
    async function fetchInitialData() {
      const [locsData, plansData] = await Promise.all([getLocations(), getPlans()])
      const locs = locsData.length > 0 ? locsData : fallbackLocations
      setLocations(locs)
      setPlans(plansData.length > 0 ? plansData : fallbackPlans)
      setSelectedLocation(locs[0]?.code || 'UAE')
      const epycData = await getEpycPlansByLocation(locs[0]?.code || 'UAE')
      setEpycPlans(epycData.length > 0 ? epycData : fallbackEpycPlans.filter(p => p.location === (locs[0]?.code || 'UAE')))
      setLoading(false)
    }
    fetchInitialData()
  }, [])

  const handleLocationChange = async (locationCode: string) => {
    setSelectedLocation(locationCode)
    setPlansLoading(true)
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

  return (
    <section id="plans" className="py-24 px-4 relative z-10">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1 text-blue-400 text-sm mb-4">
            <Cpu className="h-4 w-4" />
            <span>Pricing</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="text-blue-400">Intel</span> Platinum Plans
          </h2>
          <p className="text-gray-400 uppercase tracking-[0.3em] text-xs">Quality Wise, No Compromise</p>
        </motion.div>

        {/* Location Tabs with Flags */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}
          className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-900/80 backdrop-blur-sm p-2 rounded-2xl border border-slate-700/50 gap-2 flex-wrap justify-center">
            {locations.map((loc) => (
              <motion.button
                key={loc.id}
                onClick={() => handleLocationChange(loc.code)}
                className={`relative px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedLocation === loc.code 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25' 
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-2xl">{loc.flag}</span>
                <span className="hidden sm:inline">{loc.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Intel Platinum Plans Grid */}
        <AnimatePresence mode="wait">
          {plansLoading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="h-10 w-10 text-cyan-400 animate-spin" />
            </motion.div>
          ) : (
            <motion.div key={selectedLocation} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
              {filteredPlans.map((plan, idx) => {
                const currentLoc = locations.find(l => l.code === selectedLocation) || fallbackLocations[0]
                return (
                <motion.div key={plan.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.05 }} className="group relative">
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      <span className="bg-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">Most Popular</span>
                    </div>
                  )}
                  <motion.div className={`relative bg-slate-900/95 rounded-2xl p-6 border-2 border-slate-700/60 transition-all duration-300 group-hover:border-cyan-500/50 group-hover:shadow-xl group-hover:shadow-cyan-500/10 flex flex-col ${plan.popular ? 'border-cyan-500/50' : ''}`}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                    
                    {/* Icon */}
                    <div className="flex justify-center mb-3">
                      <motion.div className={`w-14 h-14 rounded-xl ${iconBgColors[plan.icon] || 'bg-cyan-500'} flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}>
                        <span className="text-3xl">{rankImages[plan.icon] || '⭐'}</span>
                      </motion.div>
                    </div>
                    
                    {/* Name */}
                    <h3 className="text-base font-bold text-center text-white mb-2 uppercase tracking-wide">{plan.name}</h3>
                    
                    {/* Price */}
                    <div className="text-center mb-4">
                      <span className="text-4xl font-bold text-cyan-400">{plan.price}</span>
                      <span className="text-sm text-cyan-400 ml-1">{plan.currency}</span>
                      <p className="text-gray-500 text-xs mt-1">per month</p>
                    </div>
                    
                    {/* Features */}
                    <div className="flex-1 space-y-2 mb-4">
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
                    <motion.a href="https://discord.gg/tKDRWYNcuE" target="_blank" rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl font-semibold text-white text-sm text-center block transition-all duration-300 bg-blue-600 hover:bg-blue-500"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      Buy Now
                    </motion.a>
                  </motion.div>
                </motion.div>
              )})}
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
              {epycPlans.map((plan, idx) => {
                const currentLoc = locations.find(l => l.code === selectedLocation) || fallbackLocations[0]
                return (
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
                      className={`relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 border-2 ${plan.popular ? 'border-red-500/50' : 'border-red-900/30'} transition-all duration-300 group-hover:border-red-500/50 group-hover:shadow-xl group-hover:shadow-red-500/10 flex flex-col`}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      {/* Icon */}
                      <div className="flex justify-center mb-3">
                        <motion.div 
                          className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-500/30"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Cpu className="h-7 w-7 text-white" />
                        </motion.div>
                      </div>
                      
                      {/* Name */}
                      <h3 className="text-base font-bold text-center text-white mb-2 uppercase tracking-wide">{plan.name}</h3>
                      
                      {/* Price */}
                      <div className="text-center mb-4">
                        <span className="text-4xl font-bold text-red-400">{plan.price}</span>
                        <span className="text-sm text-red-400 ml-1">{plan.currency}</span>
                        <p className="text-gray-500 text-xs mt-1">per month</p>
                      </div>
                      
                      {/* Features */}
                      <div className="flex-1 space-y-2 mb-4">
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
                        className="w-full py-3 rounded-xl font-semibold text-white text-sm text-center block transition-all duration-300 bg-blue-600 hover:bg-blue-500"
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                      >
                        Buy Now
                      </motion.a>
                    </motion.div>
                  </motion.div>
                )
              })}
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
