'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Mail, ExternalLink, Heart } from 'lucide-react'

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
    <footer id="support" className="relative z-10 bg-slate-950/80 border-t border-slate-800/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <DiamondLogo />
              <span className="text-xl font-bold">
                <span className="text-cyan-400">Diamond</span>
                <span className="text-white"> Host</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Elevating online experiences with premium Minecraft hosting solutions and unparalleled performance.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <motion.a
                href="https://discord.gg/tKDRWYNcuE"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="mailto:support@diamondhost.site"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Our Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-3">
              {[
                { label: 'Discord Server', href: 'https://discord.gg/tKDRWYNcuE', external: true },
                { label: 'Minecraft Hosting', href: '/plans' },
                { label: 'Intel Platinum', href: '/plans' },
                { label: 'AMD EPYC', href: '/plans' },
                { label: 'Contact Us', href: 'https://discord.gg/tKDRWYNcuE', external: true },
              ].map((item) => (
                <li key={item.label}>
                  <motion.a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-200 flex items-center gap-1"
                    whileHover={{ x: 3 }}
                  >
                    {item.label}
                    {item.external && <ExternalLink className="h-3 w-3" />}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {[
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Refund Policy', href: '/refund' },
              ].map((item) => (
                <li key={item.label}>
                  <motion.a
                    href={item.href}
                    className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-200"
                    whileHover={{ x: 3 }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact Us</h3>
            <motion.a
              href="mailto:support@diamondhost.site"
              className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200 group"
              whileHover={{ x: 3 }}
            >
              <div className="w-10 h-10 rounded-lg bg-slate-800/80 group-hover:bg-cyan-500/20 flex items-center justify-center transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <span className="text-sm">support@diamondhost.site</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-slate-800/50 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm flex items-center gap-1">
              © 2026 Diamond Host. Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> in Pakistan
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-600">Intel Platinum & AMD EPYC Powered</span>
              <div className="flex items-center gap-2">
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
