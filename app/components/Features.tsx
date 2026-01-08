'use client'

import { motion } from 'framer-motion'
import { Server, Zap, Shield, Globe, Cpu, Clock } from 'lucide-react'

const features = [
  {
    icon: Cpu,
    title: 'AMD Ryzen & EPYC',
    subtitle: 'High Performance',
    description: 'All servers powered by AMD Ryzen & EPYC processors for maximum performance.',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'DDoS Protection',
    subtitle: 'Online, Always',
    description: 'Advanced security to keep your server safe from attacks.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'Lag Is No More',
    subtitle: 'Smooth Gameplay',
    description: 'Latest hardware for zero lag on your Minecraft server.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Globe,
    title: 'Multiple Locations',
    subtitle: 'UAE • Singapore • Germany',
    description: 'Choose from 3 global locations for best gaming experience.',
    color: 'from-purple-500 to-pink-500',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="container mx-auto relative">
        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
              SOME OF OUR MINECRAFT
              <br />
              HOSTING <span className="text-cyan-400">FEATURES</span>
            </h2>
            <p className="text-gray-400 mb-12 max-w-lg">
              Create your own Minecraft server with Diamond Host's powerful hardware, hundreds of features, and expert support.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group"
                  >
                    <div className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 h-full">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 flex-shrink-0`}>
                          <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white mb-0.5">{feature.title}</h3>
                          <p className="text-cyan-400 text-xs mb-2">{feature.subtitle}</p>
                          <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm mt-8 italic"
            >
              Included in every Minecraft server hosting plan.
            </motion.p>
          </motion.div>

          {/* Right Side - Minecraft Character */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex-1 relative hidden lg:flex justify-center items-center min-h-[500px]"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full scale-150" />
              
              {/* Minecraft Alex Character - SVG */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="w-[220px] h-[320px] relative">
                  {/* Alex Body SVG */}
                  <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-2xl">
                    {/* Head */}
                    <rect x="30" y="0" width="40" height="40" fill="#d4a574"/>
                    <rect x="30" y="0" width="40" height="18" fill="#c46210"/>
                    <rect x="35" y="22" width="8" height="8" fill="#63a63e"/>
                    <rect x="57" y="22" width="8" height="8" fill="#63a63e"/>
                    <rect x="45" y="32" width="10" height="4" fill="#a67c52"/>
                    {/* Body */}
                    <rect x="30" y="42" width="40" height="50" fill="#3d8c40"/>
                    <rect x="35" y="47" width="30" height="20" fill="#2d6b30"/>
                    {/* Arms */}
                    <rect x="12" y="42" width="16" height="48" fill="#d4a574"/>
                    <rect x="72" y="42" width="16" height="48" fill="#d4a574"/>
                    {/* Legs */}
                    <rect x="30" y="94" width="18" height="46" fill="#4a3728"/>
                    <rect x="52" y="94" width="18" height="46" fill="#4a3728"/>
                  </svg>
                </div>
              </motion.div>

              {/* Floating Sword */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [15, 25, 15] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 right-0"
              >
                <div className="text-6xl">⚔️</div>
              </motion.div>

              {/* Floating Pickaxe */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-15, -5, -15] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-10 -left-10"
              >
                <div className="text-5xl">⛏️</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '99.9%', label: 'Uptime' },
            { value: '24/7', label: 'Support' },
            { value: '<50ms', label: 'Latency' },
            { value: '500+', label: 'Happy Users' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
            >
              <p className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}