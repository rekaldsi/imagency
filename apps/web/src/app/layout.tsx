import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Imagency — Likeness Rights Management',
  description: 'Register your likeness. Set your terms. Earn royalties when brands and studios use AI-generated representations of you.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-warm-white text-charcoal">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
