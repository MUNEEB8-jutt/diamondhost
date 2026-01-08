'use client'

import { motion } from 'framer-motion'
import { Server, Zap, Shield, Globe, Cpu, HardDrive, Clock, Headphones } from 'lucide-react'

const features = [
  {
    icon: Cpu,
    title: 'AMD EPYC Powered',
    subtitle: 'Premium Performance',
    description: 'All servers powered by AMD EPYC processors for ultimate performance.',
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
  {
    icon: Clock,
    title: 'Instant Setup',
    subtitle: '60 Seconds',
    description: 'Your server is ready in under a minute after purchase.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    subtitle: 'Always Available',
    description: 'Expert support team ready to help you anytime.',
    color: 'from-indigo-500 to-purple-500',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 relative z-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] opacity-5"
        >
          <div className="w-full h-full border border-cyan-500 rounded-full" />
          <div className="absolute inset-10 border border-cyan-500 rounded-full" />
          <div className="absolute inset-20 border border-cyan-500 rounded-full" />
        </motion.div>
      </div>

      <div className="container mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1 text-cyan-400 text-sm mb-4"
          >
            Why Choose Us
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Powerful <span className="text-cyan-400">Features</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need for the perfect Minecraft server experience
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* Left - Server Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 relative hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full scale-150" />
              
              {/* Data Center SVG */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="w-[350px] h-[400px] relative">
                  <svg viewBox="0 0 240 280" className="w-full h-full drop-shadow-2xl">
                    {/* Main Server Cabinet */}
                    <rect x="40" y="20" width="160" height="240" rx="10" fill="#0f172a" stroke="#1e40af" strokeWidth="2"/>
                    
                    {/* Cabinet Top */}
                    <rect x="40" y="20" width="160" height="30" rx="10" fill="#1e293b"/>
                    <text x="120" y="40" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">DIAMOND HOST</text>
                    
                    {/* Server Blades */}
                    {[0, 1, 2, 3].map((i) => (
                      <g key={i}>
                        <rect x="50" y={60 + i * 50} width="140" height="42" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
                        
                        {/* Status LEDs */}
                        <circle cx="65" cy={81 + i * 50} r="5" fill="#22c55e">
                          <animate attributeName="opacity" values="1;0.4;1" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite"/>
                        </circle>
                        <circle cx="82" cy={81 + i * 50} r="5" fill="#3b82f6">
                          <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.2 + i * 0.3}s`} repeatCount="indefinite"/>
                        </circle>
                        <circle cx="99" cy={81 + i * 50} r="5" fill="#f59e0b">
                          <animate attributeName="opacity" values="1;0.6;1" dur={`${2 + i * 0.1}s`} repeatCount="indefinite"/>
                        </circle>
                        
                        {/* Ventilation */}
                        <g fill="#475569">
                          <rect x="115" y={68 + i * 50} width="65" height="2" rx="1"/>
                          <rect x="115" y={74 + i * 50} width="65" height="2" rx="1"/>
                          <rect x="115" y={80 + i * 50} width="65" height="2" rx="1"/>
                          <rect x="115" y={86 + i * 50} width="65" height="2" rx="1"/>
                          <rect x="115" y={92 + i * 50} width="65" height="2" rx="1"/>
                        </g>
                      </g>
                    ))}
                  </svg>
                </div>
              </motion.div>

              {/* Floating Icons */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 right-0"
              >
                <div className="bg-gradient-to-br from-red-500 to-orange-500 p-4 rounded-2xl shadow-xl shadow-red-500/30">
                  <Cpu className="h-10 w-10 text-white" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-10 -left-8"
              >
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-xl shadow-blue-500/30">
                  <HardDrive className="h-10 w-10 text-white" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-12"
              >
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl shadow-xl shadow-green-500/30">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
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
                          <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-transparent transition-colors">
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
            { value: '99.9%', label: 'Uptime', icon: Server },
            { value: '24/7', label: 'Support', icon: Headphones },
            { value: '<50ms', label: 'Latency', icon: Zap },
            { value: '500+', label: 'Happy Users', icon: Globe },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all group"
            >
              <stat.icon className="h-8 w-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
