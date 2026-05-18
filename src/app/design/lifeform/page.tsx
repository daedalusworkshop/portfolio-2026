import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lifeform',
  description: 'A sand-marking object for open-ended traces, instructions, and play.',
}

const base = '/images/design/lifeform'

export default function LifeformPage() {
  return (
    <main className="overflow-x-hidden bg-white text-[#0a0a0a]">

      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-black px-6 pb-10 md:px-12 md:pb-14">
        <img
          src={`${base}/cube-in-sand.jpg`}
          alt="Lifeform cube resting in raked sand, instructions engraved on its face."
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />
        <div className="relative z-10 w-full">
          <h1 className="display-serif font-serif text-[clamp(4.5rem,18vw,14rem)] leading-none tracking-[-0.02em] text-white/90">
            Lifeform
          </h1>
        </div>
      </section>

      {/* Prompt / Intent */}
      <section className="mx-auto grid min-h-[80svh] max-w-6xl grid-cols-1 items-start gap-16 px-6 py-28 md:grid-cols-2 md:gap-20 md:px-12 md:py-36">
        <div>
          <p className="mb-8 font-serif text-xs uppercase tracking-[0.3em] text-black/35">Prompt</p>
          <div className="space-y-5 font-serif text-[clamp(1.35rem,2.6vw,2.1rem)] leading-[1.22] tracking-[-0.015em] text-black/75 [text-wrap:pretty]">
            <p>
              Inspired by dry garden landscapes, design a maple tool that creates patterns in sand.
            </p>
            <p>
              Its function is open to interpretation: it may rake, drag, press, stamp, disturb, or invent an unconventional way of marking the ground.
            </p>
          </div>
        </div>
        <div>
          <p className="mb-8 font-serif text-xs uppercase tracking-[0.3em] text-black/35">Intent</p>
          <div className="space-y-5 font-serif text-[clamp(1.35rem,2.6vw,2.1rem)] leading-[1.22] tracking-[-0.015em] text-black/75 [text-wrap:pretty]">
            <p>
              Even if I create the most beautiful pattern ever, it will inevitably mix back into the sand. This is true of life too.
            </p>
            <p>
              How can I make a pattern that directly <em>feels</em> into this?
            </p>
            <p className="text-[#b8864e]">
              My masterpiece is ever-fleeting marks in the sand. The bittersweet impermanence of sand & all things.
            </p>
          </div>
        </div>
      </section>

      {/* Sketches & thinking */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
        <p className="mb-12 font-serif text-xs uppercase tracking-[0.3em] text-black/35">Sketches & thinking</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[
            { n: 1, alt: 'Conceptual notes on impermanence and sensory presence.' },
            { n: 2, alt: 'Early form explorations and pattern thinking.' },
            { n: 3, alt: 'Existence and human experience as pattern.' },
            { n: 4, alt: 'Making: Life cube form sketches and usage.' },
          ].map(({ n, alt }) => (
            <div key={n} className="aspect-[3/4] overflow-hidden">
              <img
                src={`${base}/mark-${n}.jpg`}
                alt={alt}
                className="h-full w-full object-cover object-top"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Making — Maple slabs */}
      <section className="mx-auto flex min-h-[65svh] max-w-6xl flex-col items-center gap-12 px-6 py-20 md:flex-row md:gap-16 md:px-12 md:py-28">
        <div className="md:w-[48%]">
          <p className="mb-7 font-serif text-xs uppercase tracking-[0.3em] text-black/35">Making</p>
          <p className="display-serif font-serif text-[clamp(1.6rem,min(3.5vw,4.5vh),3rem)] leading-[1.04] tracking-[-0.04em] text-black/80 [text-wrap:pretty]">
            Processed, chopped up, glued <em>maple slabs</em>
          </p>
        </div>
        <div className="md:w-[52%]">
          <img
            src={`${base}/generated-tool.jpg`}
            alt="Exploded view of stacked maple slabs, processed and glued."
            className="w-full object-contain"
          />
        </div>
      </section>

      {/* Making — Drill (full-bleed) */}
      <section className="relative flex min-h-[80svh] items-end overflow-hidden bg-black px-6 pb-10 md:px-12 md:pb-14">
        <img
          src={`${base}/making-drill.jpg`}
          alt="Drilling the maple block on a drill press using three sizes of bits."
          className="absolute inset-0 h-full w-full object-cover object-[30%_50%] opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <p className="relative z-10 display-serif max-w-2xl font-serif text-[clamp(1.6rem,min(3.5vw,4.5vh),3rem)] leading-[1.04] tracking-[-0.04em] text-white/88 [text-wrap:pretty]">
          Drilled, using three sizes of bits
        </p>
      </section>

      {/* Making — The object + Instructions */}
      <section className="mx-auto flex min-h-[65svh] max-w-6xl flex-col items-center gap-12 px-6 py-20 md:flex-row-reverse md:gap-16 md:px-12 md:py-28">
        <div className="md:w-[48%]">
          <p className="display-serif font-serif text-[clamp(1.6rem,min(3.5vw,4.5vh),3rem)] leading-[1.04] tracking-[-0.04em] text-black/80 [text-wrap:pretty]">
            Laser-engraved{' '}
            <span className="text-[#b8864e]">meditative instructions</span>{' '}
            for using <em>Lifeform</em>
          </p>
        </div>
        <div className="md:w-[52%]">
          <img
            src={`${base}/cube-in-sand.jpg`}
            alt="Lifeform cube resting in raked sand, instructions engraved on its face."
            className="w-full object-contain"
          />
        </div>
      </section>

      {/* Instructions text */}
      <section className="mx-auto max-w-xl px-6 py-24 md:px-8 md:py-40">
        <p className="mb-16 font-serif text-xs uppercase tracking-[0.3em] text-black/35">Instructions</p>
        <ol className="font-serif text-[clamp(1.15rem,2vw,1.5rem)] leading-[1.6] tracking-[-0.01em] text-black/70">
          {[
            'Take off your shoes.',
            'Take a few breaths to settle yourself.',
            'Consider your life, everything that\'s progressed until now.',
            'Once you feel ready, you may step into the sand.',
            'Press your first memory into the sand.',
            'Walk very slowly. Each step is some of your years going by.',
            'Press your next core memory.',
            'Keep walking and pressing until the sand knows your story.',
            'Take a few breaths and consider everything you\'ve ever wanted.',
            'Walk again, this time into your future.',
            'Press moments you want to live through. Press your dreams.',
            'Once your life is complete, you must leave the sand behind.',
            'Watch as others enjoy the sand.',
            'Watch as your life fades away.',
            'Your life will always be somewhere in the sand.',
          ].map((line, i) => (
            <li key={i} className="flex gap-6 py-6 border-t border-black/10">
              <span className="shrink-0 font-serif text-xs tabular-nums text-black/25 mt-[0.45em]">{String(i + 1).padStart(2, '0')}</span>
              <span>{line}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Payoff */}
      <section className="bg-white">
        <img
          src={`${base}/sand-field.jpg`}
          alt="Footprints and Lifeform impressions pressed into sand."
          className="w-full"
        />
      </section>

    </main>
  )
}
