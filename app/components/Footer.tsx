'use client'

import { motion } from 'framer-motion'
import { MessageCircle, MapPin } from 'lucide-react'

const DiamondLogo = () => (
  <svg viewBox="0 0 40 40" className="w-8 h-8">
    <defs>
      <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff"/>
        <stop offset="100%" stopColor="#0099cc"/>
      </linearGradient>
    </defs>
    <polygon points="20,4 36,16 36,32 20,38 4,32 4,16" fill="url(#footerLogoGrad)" stroke="#0088aa" strokeWidth="1"/>
    <polygon points="20,4 36,16 20,22 4,16" fill="#66e0ff" opacity="0.9"/>
  </svg>
)

export default function Footer() {
  return (
    <footer id="support" className="relative z-10 border-t border-slate-800/50 py-16 px-4">
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <DiamondLogo />
              <span className="text-xl font-bold text-cyan-400">Diamond Host</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-md leading-relaxed">
              Pakistan's premium Minecraft hosting service powered by AMD Ryzen processors. Experience next-level gaming with our high-performance UAE servers and 24/7 expert support.
            </p>
            <div className="flex items-center space-x-2 text-cyan-400 text-sm">
              <MapPin className="h-4 w-4" />
              <span>Pakistan's First Minecraft Hosting</span>
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
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="#plans" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Hosting Plans</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="#features" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Features</a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="https://discord.gg/tKDRWYNcuE" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Community</a>
              </motion.li>
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
            <div className="space-y-4">
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
            </div>
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
            <p className="text-gray-500 text-sm">
              © 2026 Diamond Host. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-xs text-gray-600">Powered by UAE Servers</span>
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
    </footer>
  )
}