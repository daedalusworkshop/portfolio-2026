import type { Metadata } from 'next'
import './globals.css'
import './persistent-audio.css'
import './tech.css'
import Nav from '@/components/Nav/Nav'
import KasraRadioProvider from '@/components/KasraRadio/KasraRadioProvider'
import PersistentAudioProvider from '@/components/PersistentAudio/PersistentAudioProvider'

export const metadata: Metadata = {
  title: { default: 'Kasra C. Mikaili', template: '%s | Kasra C. Mikaili' },
  description: 'New ways of living with computers, by industrial designer, poet, and technologist Kasra C. Mikaili.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <PersistentAudioProvider>
          <KasraRadioProvider>
            <Nav />
            <main id="main-content" tabIndex={-1}>{children}</main>
          </KasraRadioProvider>
        </PersistentAudioProvider>
      </body>
    </html>
  )
}
