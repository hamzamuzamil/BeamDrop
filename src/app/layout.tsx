import React from 'react'
import '../styles.css'
import { ThemeProvider } from '../components/ThemeProvider'
import AetherShareQueryClientProvider from '../components/QueryClientProvider'
import AuroraBackground from '../components/AuroraBackground'
import { Viewport } from 'next'
import { ViewTransitions } from 'next-view-transitions'

export const metadata = {
  title: 'BeamDrop • Drop it. Beam it. Done.',
  description: 'Peer-to-peer file transfers in your web browser. Drop it. Beam it. Done.',
  charSet: 'utf-8',
  icons: {
    icon: '/assets/favicon-beamdrop.svg',
    apple: '/assets/favicon-beamdrop.svg',
  },
  openGraph: {
    url: 'https://beamdrop.app',
    title: 'BeamDrop • Drop it. Beam it. Done.',
    description: 'Peer-to-peer file transfers in your web browser. Drop it. Beam it. Done.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning className="min-h-screen">
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <AuroraBackground />
            <AetherShareQueryClientProvider>
              <main className="relative z-10">{children}</main>
            </AetherShareQueryClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
