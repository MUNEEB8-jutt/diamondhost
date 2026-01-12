import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Minecraft Server Plans & Pricing - DiamondHost',
  description: 'Choose from our affordable Minecraft server hosting plans. Intel Platinum & AMD EPYC servers in UAE, India & Germany. 2GB to 64GB RAM options with instant setup. Best prices worldwide.',
  keywords: ['minecraft server plans', 'minecraft hosting price', 'cheap minecraft server', 'minecraft server pricing', 'diamondhost plans', 'gaming server pricing', 'affordable minecraft hosting'],
  openGraph: {
    title: 'Minecraft Server Plans & Pricing | DiamondHost',
    description: 'Affordable Minecraft hosting starting Rs 200/month. Choose your perfect plan today!',
    url: 'https://www.diamondhost.site/plans',
  },
  alternates: {
    canonical: 'https://www.diamondhost.site/plans',
  },
}

export default function PlansLayout({ children }: { children: React.ReactNode }) {
  return children
}
