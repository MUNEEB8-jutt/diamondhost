'use client'

import { motion } from 'framer-motion'
import { Diamond, Shield, Zap, Globe, Users, Heart, Rocket, Server, Headphones } from 'lucide-react'
import Reviews from './Reviews'
import PaymentMethods from './PaymentMethods'

const stats = [
  { icon: Users, value: '500+', label: 'Happy Gamers' },
  { icon: Server, value: '99.9%', label: 'Uptime' },
  { icon: Globe, value: '3', label: 'Global Locations' },
  { icon: Headphones, value: '24/7', label: 'Support' },
]

const values = [
  {
    icon: Shield,
    title: 'RELIABILITY',
    description: 'Your server stays online with our enterprise-grade infrastructure and DDoS protection.',
  },
  {
    icon: Zap,
    title: 'PERFORMANCE',
    description: 'AMD EPYC & Intel Platinum processors ensure lag-free gaming experience.',
  },
  {
    icon: Heart,
    title: 'CUSTOMER FIRST',
    description: 'We prioritize your needs with responsive support and flexible plans.',
  },
  {
    icon: Rocket,
    title: 'INNOVATION',
    description: 'Constantly upgrading our systems to deliver cutting-edge hosting solutions.',
  },
]

export default function AboutUs() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
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
              className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 text-blue-400 text-sm mb-6"
            >
              <Diamond className="h-4 w-4" />
              <span>About Diamond Host</span>
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span 
                className="block text-white uppercase mb-2"
                style={{ fontFamily: "'Russo One', sans-serif", letterSpacing: '0.1em', display: 'inline-block' }}
              >
                PREMIUM HOSTING,
              </span>
              <br />
              <span 
                className="uppercase inline-block"
                style={{ 
                  fontFamily: "'Russo One', sans-serif", 
                  letterSpacing: '0.1em',
                  background: 'linear-gradient(180deg, #67e8f9 0%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.5))'
                }}
              >
                EXCEPTIONAL EXPERIENCE
              </span>
            </h1>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
              Diamond Host was founded with a simple mission: to provide gamers with the most reliable, 
              high-performance Minecraft server hosting at affordable prices. We believe every player 
              deserves a lag-free, seamless gaming experience.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 text-center group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <p 
                  className="text-3xl md:text-4xl font-bold text-white mb-1 uppercase"
                  style={{ fontFamily: "'Russo One', sans-serif", letterSpacing: '0.05em' }}
                >
                  {stat.value}
                </p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Our Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 text-cyan-400 text-sm mb-4"
              >
                <Heart className="h-4 w-4" />
                <span>What We Stand For</span>
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span 
                  className="text-white uppercase inline-block"
                  style={{ fontFamily: "'Russo One', sans-serif", letterSpacing: '0.1em' }}
                >
                  OUR CORE{' '}
                </span>
                <span 
                  className="uppercase inline-block"
                  style={{ 
                    fontFamily: "'Russo One', sans-serif", 
                    letterSpacing: '0.1em',
                    background: 'linear-gradient(180deg, #67e8f9 0%, #06b6d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))'
                  }}
                >
                  VALUES
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 group-hover:from-blue-600 group-hover:to-cyan-600 transition-all">
                      <value.icon className="h-6 w-6 text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 
                        className="text-xl font-bold text-white mb-2 uppercase"
                        style={{ fontFamily: "'Russo One', sans-serif", letterSpacing: '0.05em' }}
                      >
                        {value.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* Payment Methods Section */}
      <PaymentMethods />
    </>
  )
}
