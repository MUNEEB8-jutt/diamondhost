'use client'

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Footer from './components/Footer'
import Background from './components/Background'
import LoadingScreen from './components/LoadingScreen'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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
          <Navbar />
          <Hero />
          <AboutUs />
          <Footer />
        </div>
      </main>
    </>
  )
}
