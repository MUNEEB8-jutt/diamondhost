import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Servers - DiamondHost Server Dashboard',
  description: 'Manage your Minecraft servers on DiamondHost. View server status, panel access, and server details all in one place.',
  keywords: ['my servers', 'server dashboard', 'minecraft server panel', 'diamondhost dashboard', 'manage server'],
  openGraph: {
    title: 'My Servers | DiamondHost',
    description: 'Manage your Minecraft servers from the DiamondHost dashboard.',
    url: 'https://www.diamondhost.site/servers',
  },
  alternates: {
    canonical: 'https://www.diamondhost.site/servers',
  },
}

export default function ServersLayout({ children }: { children: React.ReactNode }) {
  return children
}
