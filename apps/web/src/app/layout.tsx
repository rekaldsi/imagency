import type { Metadata } from 'next'
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
      <body>{children}</body>
    </html>
  )
}
