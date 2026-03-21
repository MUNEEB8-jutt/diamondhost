import type { Metadata } from 'next'

import Navbar from '../components/Navbar'
import AboutUs from '../components/AboutUs'
import Footer from '../components/Footer'
import Background from '../components/Background'

export const metadata: Metadata = {
  title: 'About Diamond Host',
  description:
    'Learn about Diamond Host, our premium Minecraft hosting experience, our focus on reliability and performance, and the refreshed Eid-themed public frontend.',
  alternates: {
    canonical: 'https://www.diamondhost.site/about',
  },
}

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
