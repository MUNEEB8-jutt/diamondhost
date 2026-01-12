import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - DiamondHost Premium Minecraft Hosting',
  description: 'Learn about DiamondHost - A leading global Minecraft server hosting provider. Our mission is to provide affordable, high-performance gaming servers with exceptional support worldwide.',
  keywords: ['about diamondhost', 'minecraft hosting company', 'global hosting provider', 'gaming server company', 'who is diamondhost'],
  openGraph: {
    title: 'About Us | DiamondHost',
    description: 'Leading global Minecraft server hosting provider since 2024.',
    url: 'https://www.diamondhost.site/about',
  },
  alternates: {
    canonical: 'https://www.diamondhost.site/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
