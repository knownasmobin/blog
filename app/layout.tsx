import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Your Portfolio - Full Stack Developer & DevOps Engineer',
    template: '%s | Your Portfolio'
  },
  description: 'Full Stack Developer and DevOps Engineer specializing in modern web development, cloud infrastructure, and automation.',
  keywords: ['full stack developer', 'devops engineer', 'web development', 'cloud computing', 'portfolio', 'blog'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Your Portfolio - Full Stack Developer & DevOps Engineer',
    title: 'Your Portfolio - Full Stack Developer & DevOps Engineer',
    description: 'Full Stack Developer and DevOps Engineer specializing in modern web development, cloud infrastructure, and automation.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Your Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Portfolio - Full Stack Developer & DevOps Engineer',
    description: 'Full Stack Developer and DevOps Engineer specializing in modern web development, cloud infrastructure, and automation.',
    creator: '@yourusername',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-32x32.png'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
