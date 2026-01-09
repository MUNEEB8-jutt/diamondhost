'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import PricingCards from './components/PricingCards'
import Features from './components/Features'
import Reviews from './components/Reviews'
import PaymentMethods from './components/PaymentMethods'
import Footer from './components/Footer'
import Background from './components/Background'
import LoadingScreen from './components/LoadingScreen'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <main className="min-h-screen bg-slate-950 relative">
        <Background />
        <div className="relative z-10">
          <Header />
          <Hero />
          <PricingCards />
          <Features />
          <Reviews />
          <PaymentMethods />
          <Footer />
        </div>
      </main>
    </>
  )
}