'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const reviews = [
  {
    id: 1,
    name: 'Ahmed Khan',
    avatar: '🎮',
    rating: 5,
    review: 'They provide excellent service at affordable prices. The plans are budget-friendly but the performance is top-notch. My server runs smoothly with zero lag. Support team responds quickly and solves issues fast. Highly recommended for anyone looking for quality hosting!',
  },
  {
    id: 2,
    name: 'Ali Hassan',
    avatar: '⚡',
    rating: 5,
    review: 'Switched from another host and the difference is amazing. Low price does not mean low quality here. Intel Platinum servers are blazing fast and my players love the low ping. Best hosting service I have used so far!',
  },
  {
    id: 3,
    name: 'Usman Malik',
    avatar: '🎯',
    rating: 4,
    review: 'Running a 100+ player server without any issues. DDoS protection works great and saved us multiple times. The control panel is easy to use. Only wish they had more payment options but overall very satisfied with the service.',
  },
  {
    id: 4,
    name: 'Bilal Ahmed',
    avatar: '🚀',
    rating: 5,
    review: 'Professional service with enterprise-grade hardware. The AMD EPYC servers are incredibly powerful. Support team is available 24/7 and they actually know what they are doing. Best decision for our gaming community!',
  },
  {
    id: 5,
    name: 'Hamza Raza',
    avatar: '💎',
    rating: 4,
    review: 'Great hosting with excellent uptime. The prices are very competitive and the performance is solid. I hope this community grows larger. Overall my experience with Diamond Host has been very good and I recommend them to everyone.',
  },
]

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section id="reviews" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14] via-[#0a1525] to-[#070b14]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 tracking-wider">
            <span className="text-white">CUSTOMER </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">REVIEWS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See what our community has to say about their experience with DIAMOND HOST
          </p>
        </motion.div>

        {/* Reviews Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation Arrows */}
            <motion.button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 w-12 h-12 rounded-full bg-slate-800/80 border border-blue-500/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            <motion.button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 w-12 h-12 rounded-full bg-slate-800/80 border border-blue-500/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>

            {/* Review Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-blue-500/20 relative overflow-hidden"
              >
                {/* Opening Quote */}
                <div className="text-blue-500/30 text-6xl font-serif absolute top-4 left-6">"</div>

                {/* Stars - Centered */}
                <div className="flex justify-center gap-1 mb-8 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-6 w-6 ${i < reviews[currentIndex].rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-600 text-gray-600'}`} 
                    />
                  ))}
                </div>

                {/* Review Text - Centered */}
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 text-center px-4">
                  "{reviews[currentIndex].review}"
                </p>

                {/* Author - Centered */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-2xl">
                    {reviews[currentIndex].avatar}
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-lg">{reviews[currentIndex].name}</p>
                    <p className="text-blue-400 text-sm flex items-center gap-1 justify-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-[10px]">✓</span>
                      Verified Customer
                    </p>
                  </div>
                </div>

                {/* Closing Quote */}
                <div className="text-blue-500/30 text-6xl font-serif absolute bottom-4 right-6">"</div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'bg-blue-500 w-8' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
