import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Bseccure | Securing What Matters',
  description: 'Cybersecurity, data privacy and threat management services.',
  // Favicons are picked up automatically from app/favicon.ico, app/icon.png and app/apple-icon.png
}

export const viewport: Viewport = {
  themeColor: '#03111d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
