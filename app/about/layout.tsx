import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - DiamondHost Pakistan Minecraft Hosting',
  description: 'Learn about DiamondHost - Pakistan\'s leading Minecraft server hosting provider. Our mission is to provide affordable, high-performance gaming servers with exceptional support.',
  keywords: ['about diamondhost', 'minecraft hosting company', 'pakistan hosting provider', 'gaming server company', 'who is diamondhost'],
  openGraph: {
    title: 'About Us | DiamondHost',
    description: 'Pakistan\'s leading Minecraft server hosting provider since 2024.',
    url: 'https://www.diamondhost.site/about',
  },
  alternates: {
    canonical: 'https://www.diamondhost.site/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
