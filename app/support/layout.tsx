import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support Center - DiamondHost 24/7 Customer Support',
  description: 'Get help from DiamondHost support team. 24/7 customer support via tickets and Discord. Fast response time for all your Minecraft server hosting questions.',
  keywords: ['diamondhost support', 'minecraft hosting support', 'customer service', '24/7 support', 'help center', 'contact diamondhost'],
  openGraph: {
    title: 'Support Center | DiamondHost',
    description: '24/7 customer support for all your Minecraft hosting needs.',
    url: 'https://www.diamondhost.site/support',
  },
  alternates: {
    canonical: 'https://www.diamondhost.site/support',
  },
}

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children
}
