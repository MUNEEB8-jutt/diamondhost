'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, Cpu } from 'lucide-react'
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
}

// Fallback data
const fallbackLocations: Location[] = [
  { id: '1', name: 'UAE', code: 'UAE', flag: '🇦🇪', active: true, sort_order: 1, created_at: '' },
  { id: '2', name: 'Singapore', code: 'Singapore', flag: '🇸🇬', active: true, sort_order: 2, created_at: '' },
  { id: '3', name: 'Germany', code: 'Germany', flag: '🇩🇪', active: true, sort_order: 3, created_at: '' },
]

// Intel Plans (Ryzen)
const fallbackPlans: HostingPlan[] = [
  { id: '1', name: 'Bronze', icon: 'Medal', ram: '2GB RAM', performance: '100%', location: 'UAE', price: 240, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'AMD Ryzen', 'Instant Setup'], popular: false, sort_order: 1, active: true, created_at: '' },
  { id: '2', name: 'Silver', icon: 'Star', ram: '4GB RAM', performance: '150%', location: 'UAE', price: 480, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'AMD Ryzen', 'Instant Setup'], popular: false, sort_order: 2, active: true, created_at: '' },
  { id: '3', name: 'Gold', icon: 'Crown', ram: '8GB RAM', performance: '250%', location: 'UAE', price: 960, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'AMD Ryzen', 'Instant Setup'], popular: false, sort_order: 3, active: true, created_at: '' },
  { id: '4', name: 'Platinum', icon: 'Award', ram: '10GB RAM', performance: '300%', location: 'UAE', price: 1200, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'AMD Ryzen', 'Priority Support'], popular: true, sort_order: 4, active: true, created_at: '' },
  { id: '5', name: 'Diamond', icon: 'Diamond', ram: '12GB RAM', performance: '350%', location: 'UAE', price: 1440, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'AMD Ryzen', 'Priority Support'], popular: false, sort_order: 5, active: true, created_at: '' },
  { id: '6', name: 'Emerald', icon: 'Gem', ram: '16GB RAM', performance: '500%', location: 'UAE', price: 1920, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'AMD Ryzen', 'Priority Support'], popular: false, sort_order: 6, active: true, created_at: '' },
  { id: '7', name: 'Diamond Plus', icon: 'Trophy', ram: '32GB RAM', performance: '1000%', location: 'UAE', price: 3840, currency: 'PKR', color_from: 'blue-400', color_to: 'cyan-600', features: ['24/7 Support', 'AMD Ryzen', 'Custom Plans'], popular: false, sort_order: 7, active: true, created_at: '' },
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
}

const priceColors: { [key: string]: string } = {
  'Medal': 'text-amber-400',
  'Star': 'text-gray-300', 
  'Crown': 'text-yellow-400', 
  'Award': 'text-slate-300',
  'Diamond': 'text-cyan-400', 
  'Gem': 'text-emerald-400',
  'Trophy': 'text-yellow-400',
  'Sparkles': 'text-pink-400',
}

const buttonStyles: { [key: string]: string } = {
  'Medal': 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400',
  'Star': 'bg-gradient-to-r from-gray-500 to-gray-400 hover:from-gray-400 hover:to-gray-300',
  'Crown': 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400',
  'Award': 'bg-gradient-to-r from-slate-500 to-slate-400 hover:from-slate-400 hover:to-slate-300',
  'Diamond': 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400',
  'Gem': 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400',
  'Trophy': 'bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-500 hover:to-amber-400',
  'Sparkles': 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400',
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
      
      // Fetch EPYC plans for first location
      const epycData = await getEpycPlansByLocation(locs[0]?.code || 'UAE')
      setEpycPlans(epycData.length > 0 ? epycData : fallbackEpycPlans.filter(p => p.location === (locs[0]?.code || 'UAE')))
      
      setLoading(false)
    }
    fetchInitialData()
  }, [])

  const handleLocationChange = async (locationCode: string) => {
    setSelectedLocation(locationCode)
    setPlansLoading(true)
    
    // Fetch both Ryzen and EPYC plans for selected location
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
          <motion.span initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="inline-block bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1 text-cyan-400 text-sm mb-4">
            Pricing
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">AMD Ryzen Plans</h2>
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

        {/* Ryzen Plans Grid */}
        <AnimatePresence mode="wait">
          {plansLoading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="h-10 w-10 text-cyan-400 animate-spin" />
            </motion.div>
          ) : (
            <motion.div key={selectedLocation} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
              {filteredPlans.map((plan, idx) => {
                const currentLoc = locations.find(l => l.code === selectedLocation) || fallbackLocations[0]
                return (
                <motion.div key={plan.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="group relative">
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      <span className="bg-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">Most Popular</span>
                    </div>
                  )}
                  <motion.div className={`aspect-square relative bg-slate-900/95 rounded-2xl p-6 border-2 border-slate-700/60 transition-all duration-300 group-hover:border-cyan-500/50 group-hover:shadow-2xl group-hover:shadow-cyan-500/10 flex flex-col justify-between ${plan.popular ? 'border-cyan-500/50' : ''}`}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                    <div>
                      <div className="flex justify-center mb-4">
                        <motion.div className={`w-16 h-16 rounded-xl ${iconBgColors[plan.icon] || 'bg-cyan-500'} flex items-center justify-center shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 5 }}>
                          <span className="text-3xl">{rankImages[plan.icon] || '⭐'}</span>
                        </motion.div>
                      </div>
                      <h3 className="text-lg font-bold text-center text-white mb-2 uppercase tracking-wider">{plan.name}</h3>
                      <div className="text-center mb-4">
                        <span className={`text-4xl font-bold ${priceColors[plan.icon] || 'text-cyan-400'}`}>{plan.price}</span>
                        <span className={`text-base ${priceColors[plan.icon] || 'text-cyan-400'} ml-1`}>{plan.currency}</span>
                        <p className="text-gray-500 text-sm mt-1">per month</p>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{plan.ram}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{plan.performance}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{currentLoc.flag} {currentLoc.name}</span>
                        </div>
                        {plan.features?.slice(0, 2).map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <motion.a href="https://discord.gg/pk8cmFNm6P" target="_blank" rel="noopener noreferrer"
                        className={`w-full py-3 rounded-xl font-semibold text-white text-center block transition-all duration-300 ${buttonStyles[plan.icon] || 'bg-cyan-500'}`}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        Buy Now
                      </motion.a>
                      <p className="text-center text-xs text-gray-500 mt-2">Create a ticket</p>
                    </div>
                  </motion.div>
                </motion.div>
              )})}
            </motion.div>
          )}
        </AnimatePresence>


        {/* AMD EPYC Section - Only show if there are EPYC plans for this location */}
        {epycPlans.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }} 
          className="mt-32"
        >
          {/* AMD EPYC Header */}
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-1 text-red-400 text-sm mb-4"
            >
              <Cpu className="h-4 w-4" />
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
                    transition={{ duration: 0.5, delay: idx * 0.1 }} 
                    className="group relative"
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                        <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">Best Value</span>
                      </div>
                    )}
                    <motion.div 
                      className={`aspect-square relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 border-2 ${plan.popular ? 'border-red-500/50' : 'border-red-900/30'} transition-all duration-300 group-hover:border-red-500/50 group-hover:shadow-2xl group-hover:shadow-red-500/10 flex flex-col justify-between`}
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                      <div>
                        <div className="flex justify-center mb-4">
                          <motion.div 
                            className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-500/30"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Cpu className="h-8 w-8 text-white" />
                          </motion.div>
                        </div>
                        <h3 className="text-lg font-bold text-center text-white mb-2 uppercase tracking-wider">{plan.name}</h3>
                        <div className="text-center mb-4">
                          <span className="text-4xl font-bold text-red-400">{plan.price}</span>
                          <span className="text-base text-red-400 ml-1">{plan.currency}</span>
                          <p className="text-gray-500 text-sm mt-1">per month</p>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-red-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{plan.ram}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-red-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{plan.performance}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-red-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{currentLoc.flag} {currentLoc.name} Location</span>
                          </div>
                          {plan.features?.slice(0, 2).map((feature, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-red-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <motion.a 
                          href="https://discord.gg/pk8cmFNm6P" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-3 rounded-xl font-semibold text-white text-center block transition-all duration-300 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400"
                          whileHover={{ scale: 1.02 }} 
                          whileTap={{ scale: 0.98 }}
                        >
                          Buy Now
                        </motion.a>
                        <p className="text-center text-xs text-gray-500 mt-2">Create a ticket</p>
                      </div>
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
          <motion.a href="https://discord.gg/pk8cmFNm6P" target="_blank" rel="noopener noreferrer"
            className="border border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-cyan-400 font-semibold py-3 px-8 rounded-xl transition-all duration-300 inline-block"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}