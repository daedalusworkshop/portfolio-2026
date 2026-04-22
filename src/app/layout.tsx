import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav/Nav'

export const metadata: Metadata = {
  title: { default: 'kasra mikaili', template: '%s — kasra mikaili' },
  description: 'Design, art, and writing.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
