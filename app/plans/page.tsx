import type { Metadata } from 'next'

import Navbar from '../components/Navbar'
import PricingCards from '../components/PricingCards'
import Footer from '../components/Footer'
import Background from '../components/Background'

export const metadata: Metadata = {
  title: 'Minecraft Hosting Plans',
  description:
    'Explore Diamond Host Minecraft hosting plans with Intel Platinum and AMD EPYC options across UAE, India, and Germany. Eid sale visuals, polished plan cards, and fast order flow included.',
  alternates: {
    canonical: 'https://www.diamondhost.site/plans',
  },
}

export default function PlansPage() {
  return (
    <main className="site-shell relative">
      <Background />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20">
          <PricingCards />
        </div>
        <Footer />
      </div>
    </main>
  )
}
