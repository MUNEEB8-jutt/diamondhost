import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Minecraft Server Plans & Pricing - DiamondHost Pakistan',
  description: 'Choose from our affordable Minecraft server hosting plans. Starting Rs 200/month. Intel Platinum & AMD EPYC servers in UAE, India & Germany. 2GB to 64GB RAM options with instant setup.',
  keywords: ['minecraft server plans', 'minecraft hosting price', 'cheap minecraft server', 'minecraft server pakistan price', 'diamondhost plans', 'gaming server pricing'],
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
