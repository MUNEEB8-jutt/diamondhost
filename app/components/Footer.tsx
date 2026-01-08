'use client'

import { motion } from 'framer-motion'
import { MessageCircle, MapPin, Headphones, Clock, Shield, Zap, Heart, ExternalLink } from 'lucide-react'

const DiamondLogo = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10">
    <defs>
      <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff"/>
        <stop offset="100%" stopColor="#0099cc"/>
      </linearGradient>
    </defs>
    <polygon points="20,2 38,14 38,30 20,38 2,30 2,14" fill="url(#footerLogoGrad)" stroke="#00d4ff" strokeWidth="1"/>
    <polygon points="20,2 38,14 20,20 2,14" fill="#66e0ff" opacity="0.9"/>
    <polygon points="20,20 38,14 38,30 20,38" fill="#0099cc" opacity="0.7"/>
  </svg>
)

export default function Footer() {
  return (
    <footer id="support" className="relative z-10">
      {/* Support Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
        
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
              className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1 text-cyan-400 text-sm mb-4"
            >
              <Headphones className="h-4 w-4" />
              <span>24/7 Support</span>
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Need <span className="text-cyan-400">Help?</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our expert support team is available around the clock to assist you with any questions or issues.
            </p>
          </motion.div>

          {/* Support Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: MessageCircle,
                title: 'Discord Support',
                description: 'Join our Discord server and create a ticket for instant help from our team.',
                action: 'Join Discord',
                link: 'https://discord.gg/tKDRWYNcuE',
                color: 'from-indigo-500 to-purple-500',
              },
              {
                icon: Clock,
                title: 'Quick Response',
                description: 'Average response time under 5 minutes. We value your time and gaming experience.',
                action: 'Get Support',
                link: 'https://discord.gg/tKDRWYNcuE',
                color: 'from-cyan-500 to-blue-500',
              },
              {
                icon: Shield,
                title: 'Expert Team',
                description: 'Our support team consists of experienced Minecraft server administrators.',
                action: 'Contact Us',
                link: 'https://discord.gg/tKDRWYNcuE',
                color: 'from-green-500 to-emerald-500',
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 h-full flex flex-col">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} p-0.5 mb-4`}>
                    <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-transparent transition-colors">
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-1">{card.description}</p>
                  <motion.a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                    whileHover={{ x: 5 }}
                  >
                    {card.action}
                    <ExternalLink className="h-4 w-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 p-8 md:p-12"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-cyan-500 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl" />
            </div>
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Ready to Start Your Server?
                </h3>
                <p className="text-gray-400">
                  Join hundreds of happy gamers with Diamond Host today!
                </p>
              </div>
              <motion.a
                href="https://discord.gg/tKDRWYNcuE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="h-5 w-5" />
                Get Started Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Bottom */}
      <div className="border-t border-slate-800/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="col-span-1 md:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-4">
                <DiamondLogo />
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Diamond Host</span>
                  <p className="text-xs text-gray-500">Premium Minecraft Hosting</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6 max-w-md leading-relaxed">
                Pakistan's premium Minecraft hosting service powered by Intel Platinum & AMD EPYC processors. Experience next-level gaming with our global servers and 24/7 expert support.
              </p>
              <div className="flex items-center space-x-2 text-cyan-400 text-sm">
                <MapPin className="h-4 w-4" />
                <span>UAE • Singapore • Germany</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold mb-4 text-white uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { href: '#plans', label: 'Hosting Plans' },
                  { href: '#features', label: 'Features' },
                  { href: 'https://discord.gg/tKDRWYNcuE', label: 'Community', external: true },
                ].map((link) => (
                  <motion.li key={link.label} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a 
                      href={link.href} 
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-1"
                    >
                      {link.label}
                      {link.external && <ExternalLink className="h-3 w-3" />}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold mb-4 text-white uppercase tracking-wider">Get Support</h3>
              <motion.a
                href="https://discord.gg/tKDRWYNcuE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-400 hover:text-cyan-400 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Discord Support</p>
                  <p className="text-xs text-gray-500">Create a ticket</p>
                </div>
              </motion.a>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="border-t border-slate-800/50 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-500 text-sm flex items-center gap-1">
                © 2026 Diamond Host. Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> in Pakistan
              </p>
              <div className="flex items-center space-x-6">
                <span className="text-xs text-gray-600">Intel Platinum & AMD EPYC Powered</span>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                  </div>
                  <span className="text-xs text-green-400">All Systems Operational</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
