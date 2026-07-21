import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Percy',
  description: 'A screenless recording device for talking out loud while doing the things that ground you.',
}

export default function PercyPage() {
  return (
    <article className="tech-percy min-h-screen overflow-x-hidden bg-[#0a0a0a] text-white">
      <header className="mx-auto max-w-6xl px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44">
        <p className="mb-12 font-serif text-xs uppercase tracking-[0.3em] text-white/30">
          tech · in progress
        </p>

        <h1 className="display-serif font-serif text-[clamp(5rem,15vw,11rem)] leading-[0.82] tracking-[-0.035em] text-white/95 [text-wrap:balance]">
          Percy
        </h1>

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-2 md:gap-20">
          <p className="display-serif max-w-xl font-serif text-[clamp(2rem,4.5vw,4rem)] leading-[1.04] tracking-[-0.025em] text-white/90 [text-wrap:pretty]">
            Percy is a screenless recording device.
          </p>
          <div className="max-w-lg space-y-6 self-end font-serif text-[clamp(1.2rem,2.2vw,1.55rem)] leading-[1.35] text-white/70 [text-wrap:pretty]">
            <p>
              Most small recorders are designed around meetings and productivity. Percy begins with a different question: <em className="text-white/90">What else could a computer become?</em>
            </p>
          </div>
        </div>
      </header>

      <figure className="mx-auto max-w-6xl px-3 md:px-12">
        <div className="grid grid-cols-2 gap-1.5 md:gap-4">
          <div className="relative aspect-[3/4] overflow-hidden bg-white/5 outline outline-1 -outline-offset-1 outline-white/10">
            <Image
              src="/portfolio/percy-dog.jpg"
              alt="A dog wearing an early Percy form-factor test on its collar"
              fill
              sizes="(min-width: 1152px) 552px, 50vw"
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden bg-white/5 outline outline-1 -outline-offset-1 outline-white/10">
            <Image
              src="/portfolio/percy-cat.jpg"
              alt="A cat wearing an early Percy form-factor test on its collar"
              fill
              sizes="(min-width: 1152px) 552px, 50vw"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
        <figcaption className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-white/35">
          Testing form factor on an existing PLAUD NotePin.
        </figcaption>
      </figure>

      <section className="mx-auto grid min-h-[80svh] max-w-6xl content-center gap-14 px-6 py-28 md:grid-cols-2 md:gap-20 md:px-12 md:py-40">
        <div>
          <p className="mb-8 font-serif text-xs uppercase tracking-[0.3em] text-white/30">The idea</p>
          <p className="display-serif max-w-xl font-serif text-[clamp(2rem,4vw,3.7rem)] leading-[1.08] tracking-[-0.025em] text-white/90 [text-wrap:pretty]">
            When I think about the future of work, I don&apos;t want to be in a room by myself, talking to an AI. I&apos;d rather be in a field of grass talking to my dog.
          </p>
        </div>
        <div className="max-w-lg self-end font-serif text-[clamp(1.2rem,2.2vw,1.55rem)] leading-[1.45] text-white/65 [text-wrap:pretty]">
          <p>
            Place Percy on something that grounds you: your dog, cat, guitar, or favorite tree. Talk out loud as you spend time with it. Each recording is saved locally on your computer. In that way it becomes a grounded moment you can use as computational material.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-4">
          <figure className="relative aspect-[3/4] w-full overflow-hidden bg-white/5 outline outline-1 -outline-offset-1 outline-white/10">
            <Image
              src="/portfolio/percy-soldering.jpg"
              alt="The XIAO board being assembled for the Percy prototype"
              fill
              sizes="(min-width: 1152px) 552px, (min-width: 768px) 50vw, 100vw"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </figure>
          <div>
            <p className="mb-10 font-serif text-xs uppercase tracking-[0.3em] text-white/30">
              What making it has taught me
            </p>
            <p className="display-serif max-w-3xl font-serif text-[clamp(2rem,4vw,3.8rem)] leading-[1.08] tracking-[-0.025em] text-white/90 [text-wrap:pretty]">
              I learned how to solder and design an enclosure around real electronics. I also programmed the XIAO board to capture audio, write playable WAV files, and save them locally. I debugged the firmware and hardware together until the whole system worked.
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}
