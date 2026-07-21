import type { Metadata } from 'next'
import DataSoundPlayer from '@/components/DataSoundPlayer'

export const metadata: Metadata = {
  title: 'Data+Sound',
  description: 'Twenty years of earthquake data from Akutan Volcano were sonified into a one-minute piece.',
}

export default function DataSoundPage() {
  return (
    <article className="tech-data-sound min-h-screen bg-[#0a0a0a] text-white">
      <header className="mx-auto max-w-6xl px-6 pb-8 pt-36 md:px-12 md:pb-8 md:pt-44">
        <p className="mb-12 font-serif text-xs uppercase tracking-[0.3em] text-white/50">
          tech · data sonification
        </p>

        <h1 className="display-serif font-serif text-[clamp(3.5rem,13vw,10rem)] leading-[0.86] tracking-[-0.035em] text-white/95 [text-wrap:balance]">
          Data+Sound
        </h1>

        <p className="display-serif mt-12 max-w-3xl font-serif text-[clamp(2rem,4.5vw,4rem)] leading-[1.04] tracking-[-0.025em] text-white/90 [text-wrap:pretty] md:mt-16">
          Twenty years of earthquake data from Akutan Volcano were sonified into a one-minute piece.
        </p>
      </header>

      <section aria-label="Akutan audio player">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-6 md:px-12 md:pb-14 md:pt-6">
          <DataSoundPlayer src="/portfolio/akutan.wav" title="Akutan" />
        </div>
      </section>
    </article>
  )
}
