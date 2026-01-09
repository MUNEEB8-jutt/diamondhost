'use client'

import Header from '../components/Header'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Background from '../components/Background'

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-slate-950 relative">
      <Background />
      <div className="relative z-10">
        <Header />
        <div className="pt-20">
          <Features />
        </div>
        <Footer />
      </div>
    </main>
  )
}
