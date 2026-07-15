import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav/Nav'
import KasraRadioProvider from '@/components/KasraRadio/KasraRadioProvider'

export const metadata: Metadata = {
  title: { default: 'Kasra C. Mikaili', template: '%s | Kasra C. Mikaili' },
  description: 'New ways of living with computers, by industrial designer, poet, and technologist Kasra C. Mikaili.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <KasraRadioProvider>
          <Nav />
          <main>{children}</main>
        </KasraRadioProvider>
      </body>
    </html>
  )
}
