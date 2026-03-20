'use client'

import Navbar from '../components/Navbar'
import AboutUs from '../components/AboutUs'
import Footer from '../components/Footer'
import Background from '../components/Background'

export default function AboutPage() {
  return (
    <main className="site-shell relative">
      <Background />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20">
          <AboutUs />
        </div>
        <Footer />
      </div>
    </main>
  )
}
