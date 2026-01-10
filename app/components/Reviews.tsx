'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'

const reviews = [
  {
    name: 'Ahmed Khan',
    role: 'Server Owner',
    rating: 5,
    text: 'Best hosting service I have ever used! The performance is incredible and support team is always helpful. My players love the low ping!',
    avatar: 'AK',
  },
  {
    name: 'Sarah Gaming',
    role: 'Content Creator',
    rating: 5,
    text: 'Diamond Host made setting up my Minecraft server so easy. The instant setup feature is amazing and the prices are very reasonable.',
    avatar: 'SG',
  },
  {
    name: 'Ali Raza',
    role: 'Community Manager',
    rating: 5,
    text: 'We switched from another provider and the difference is night and day. Zero lag, great uptime, and the DDoS protection actually works!',
    avatar: 'AR',
  },
  {
    name: 'Gaming Pro',
    role: 'Esports Team',
    rating: 5,
    text: 'Our team relies on Diamond Host for all our practice servers. The AMD EPYC performance is unmatched. Highly recommended!',
    avatar: 'GP',
  },
  {
    name: 'Minecraft Master',
    role: 'Server Network',
    rating: 5,
    text: 'Running multiple servers with Diamond Host. Their panel is intuitive and the support response time is incredible. 10/10 service!',
    avatar: 'MM',
  },
]

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const navigate = (dir: number) => {
    setDirection(dir)
    setCurrentIndex((prev) => {
      if (dir === 1) return (prev + 1) % reviews.length
      return prev === 0 ? reviews.length - 1 : prev - 1
    })
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  }

  return (
    <section id="reviews" className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-1.5 text-yellow-400 text-sm mb-4 italic"
          >
            <Star className="h-4 w-4 fill-yellow-400" />
            <span>Customer Reviews</span>
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span 
              className="text-white italic inline-block"
              style={{ fontFamily: "'Russo One', sans-serif", transform: 'skewX(-5deg)' }}
            >
              WHAT GAMERS{' '}
            </span>
            <span 
              className="italic inline-block"
              style={{ 
                fontFamily: "'Russo One', sans-serif", 
                transform: 'skewX(-5deg)',
                background: 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.5))'
              }}
            >
              SAY
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Join hundreds of satisfied gamers who trust Diamond Host
          </p>
        </motion.div>

        {/* Review Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation Buttons */}
            <motion.button
              onClick={() => navigate(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-12 h-12 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            <motion.button
              onClick={() => navigate(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-12 h-12 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>

            {/* Review Card */}
            <div className="overflow-hidden px-4">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-slate-700/50 relative"
                >
                  {/* Quote Icon */}
                  <Quote className="absolute top-6 right-6 h-12 w-12 text-cyan-500/20" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 italic">
                    "{reviews[currentIndex].text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg italic">
                      {reviews[currentIndex].avatar}
                    </div>
                    <div>
                      <p 
                        className="text-white font-bold text-lg italic"
                        style={{ fontFamily: "'Russo One', sans-serif" }}
                      >
                        {reviews[currentIndex].name}
                      </p>
                      <p className="text-cyan-400 text-sm italic">{reviews[currentIndex].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-600 hover:bg-slate-500'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
