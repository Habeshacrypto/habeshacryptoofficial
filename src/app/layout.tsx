import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Habesha Crypto — Making The Difference From Zero to Crypto Hero',
  description: 'Get exclusive access to real-time trading signals, alerts and 24/7 support with Habesha Crypto community.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="noise">
        {children}
      </body>
    </html>
  )
}
