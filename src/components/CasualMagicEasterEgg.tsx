'use client'

import { useEffect, useMemo, useState } from 'react'

type Fragment = {
  id: string
  word: string
  x: number
  y: number
  delay: number
  duration: number
  size: 'sm' | 'md' | 'lg'
}

const FRAGMENTS: Fragment[] = [
  { id: 'poetry', word: 'poetry', x: 14, y: 23, delay: 0.1, duration: 9.5, size: 'lg' },
  { id: 'family', word: 'family', x: 72, y: 18, delay: 0.8, duration: 11, size: 'md' },
  { id: 'blues', word: 'blues', x: 39, y: 69, delay: 1.3, duration: 10, size: 'sm' },
  { id: 'photos', word: 'photos', x: 78, y: 64, delay: 0.3, duration: 12, size: 'lg' },
  { id: 'music', word: 'music', x: 21, y: 78, delay: 1.6, duration: 9, size: 'md' },
  { id: 'interface', word: 'interface', x: 53, y: 32, delay: 0.5, duration: 13, size: 'sm' },
  { id: 'magic', word: 'magic', x: 46, y: 48, delay: 2.1, duration: 10.5, size: 'lg' },
]

const sizeClass = {
  sm: 'text-sm sm:text-base',
  md: 'text-base sm:text-xl',
  lg: 'text-xl sm:text-3xl',
}

export default function CasualMagicEasterEgg() {
  const [open, setOpen] = useState(false)
  const [collected, setCollected] = useState<string[]>([])
  const [pulse, setPulse] = useState(false)

  const collectedSet = useMemo(() => new Set(collected), [collected])
  const won = collected.length === FRAGMENTS.length

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  function collect(id: string) {
    setCollected((current) => (current.includes(id) ? current : [...current, id]))
    setPulse(true)
    window.setTimeout(() => setPulse(false), 220)
  }

  function reset() {
    setCollected([])
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open hidden casual magic game"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[60] h-8 w-8 rounded-full border border-white/10 bg-white/[0.03] text-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-white/30 hover:text-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        ✦
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Casual magic minigame"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/85 px-4 py-6 backdrop-blur-xl sm:px-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_30%)]" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:42px_42px]" />

          <section className="relative h-[min(760px,calc(100svh-2rem))] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/12 bg-black/55 shadow-2xl shadow-black/80">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
            <div className="relative z-10 flex items-start justify-between gap-4 p-5 sm:p-7">
              <div>
                <p className="font-serif text-sm italic text-white/45">secret study no. 1</p>
                <h2 className="mt-1 font-serif text-3xl leading-none tracking-[-0.04em] text-white sm:text-5xl">
                  Catch the casual magic.
                </h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/55 sm:text-base">
                  Tap the drifting fragments before your attention explains them away.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 px-3 py-2 text-sm text-white/55 transition-colors hover:border-white/30 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                close
              </button>
            </div>

            <div className="absolute inset-x-5 bottom-5 z-20 sm:inset-x-7">
              <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-black/45 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
                <p className={`font-serif text-xl tracking-[-0.03em] text-white transition-transform duration-200 sm:text-2xl ${pulse ? 'scale-[1.02]' : 'scale-100'}`}>
                  {won ? 'language found a hidden door.' : `${collected.length}/${FRAGMENTS.length} fragments held`}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/55 transition-colors hover:border-white/30 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    reset
                  </button>
                  <div className="h-2 w-28 overflow-hidden rounded-full bg-white/10 sm:w-40">
                    <div
                      className="h-full rounded-full bg-white/70 transition-all duration-500"
                      style={{ width: `${(collected.length / FRAGMENTS.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 pt-36 pb-32">
              {FRAGMENTS.map((fragment) => {
                const isCollected = collectedSet.has(fragment.id)
                return (
                  <button
                    key={fragment.id}
                    type="button"
                    disabled={isCollected}
                    onClick={() => collect(fragment.id)}
                    className={`magic-fragment absolute rounded-full border px-4 py-2 font-serif italic tracking-[-0.03em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${sizeClass[fragment.size]} ${
                      isCollected
                        ? 'pointer-events-none scale-50 border-white/0 bg-white/0 text-white/0 blur-md'
                        : 'border-white/15 bg-white/[0.055] text-white/75 shadow-[0_0_50px_rgba(255,255,255,0.12)] hover:scale-110 hover:border-white/40 hover:bg-white/[0.1] hover:text-white active:scale-95'
                    }`}
                    style={{
                      left: `${fragment.x}%`,
                      top: `${fragment.y}%`,
                      animationDelay: `${fragment.delay}s`,
                      animationDuration: `${fragment.duration}s`,
                    }}
                  >
                    {fragment.word}
                  </button>
                )
              })}
            </div>

            {won && (
              <div className="absolute inset-0 z-30 flex items-center justify-center p-6">
                <div className="max-w-2xl rounded-[2rem] border border-white/15 bg-black/75 p-6 text-center backdrop-blur-xl sm:p-10">
                  <p className="font-serif text-3xl leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl">
                    The point was never to explain the magic.
                  </p>
                  <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/55 sm:text-base">
                    It was to build an interface gentle enough that it could arrive on its own.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-7 rounded-full border border-white/20 px-5 py-3 text-sm text-white/75 transition-colors hover:border-white/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    scatter it again
                  </button>
                </div>
              </div>
            )}
          </section>

          <style jsx>{`
            .magic-fragment {
              transform: translate(-50%, -50%);
              animation-name: float-fragment;
              animation-timing-function: ease-in-out;
              animation-iteration-count: infinite;
              touch-action: manipulation;
            }

            @keyframes float-fragment {
              0%, 100% {
                transform: translate(-50%, -50%) rotate(-3deg);
              }
              33% {
                transform: translate(calc(-50% + 14px), calc(-50% - 18px)) rotate(4deg);
              }
              66% {
                transform: translate(calc(-50% - 16px), calc(-50% + 12px)) rotate(-1deg);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .magic-fragment {
                animation: none;
              }
            }
          `}</style>
        </div>
      )}
    </>
  )
}
