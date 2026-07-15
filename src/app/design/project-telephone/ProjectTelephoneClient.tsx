'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'

type Recording = {
  label: string
  src: string
  cues?: string
}

type CueBlock = {
  time: string
  text: string
}

type Phase = 'playing' | 'prompt' | 'more'

const ASSET_BASE = '/project-telephone'
const QUESTION = 'What do you need the most right now?'

const FEATURED: Recording[] = [
  { label: 'Gabriel', src: `${ASSET_BASE}/featured/gabriel.wav` },
  { label: 'Ben', src: `${ASSET_BASE}/featured/ben.wav` },
  { label: 'Wren', src: `${ASSET_BASE}/featured/wren.wav` },
]

const MORE: Recording[] = [
  { label: 'Kess', src: `${ASSET_BASE}/featured/kess.wav` },
  { label: 'Kate', src: `${ASSET_BASE}/featured/kate.wav` },
  { label: 'Justin', src: `${ASSET_BASE}/featured/justin.wav` },
]

function mssToSec(mss: string): number {
  const match = mss.match(/^(\d+):(\d{2})$/)
  return match ? parseInt(match[1], 10) * 60 + parseInt(match[2], 10) : NaN
}

function parseMd(md: string): CueBlock[] {
  return md
    .trim()
    .split(/\n\s*\n/)
    .flatMap((block) => {
      const lines = block.trim().split('\n')
      if (lines.length < 2) return []
      return [{ time: lines[0].trim(), text: lines.slice(1).join('\n').trim() }]
    })
}

function ListenSequence({
  recordings,
  moreRecordings,
  onClose,
}: {
  recordings: Recording[]
  moreRecordings: Recording[]
  onClose: () => void
}) {
  const [phase, setPhase] = useState<Phase>('playing')
  const [playlist, setPlaylist] = useState(recordings)
  const [index, setIndex] = useState(0)
  const [blocks, setBlocks] = useState<CueBlock[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const indexRef = useRef(index)
  const phaseRef = useRef(phase)

  indexRef.current = index
  phaseRef.current = phase

  const rec = playlist[index]

  const advance = useCallback(() => {
    if (phaseRef.current !== 'playing' && phaseRef.current !== 'more') return

    const next = indexRef.current + 1
    if (next >= playlist.length) {
      if (phaseRef.current === 'playing' && moreRecordings.length > 0) {
        setPhase('prompt')
      } else {
        onClose()
      }
    } else {
      setIndex(next)
    }
  }, [moreRecordings.length, onClose, playlist.length])

  useEffect(() => {
    if (phase === 'prompt' || !rec) return

    setBlocks([])
    setActiveIndex(-1)
    setProgress(0)

    const audio = new Audio(rec.src)
    audioRef.current = audio
    audio.onended = advance
    audio.play().catch(() => {})

    return () => {
      audio.pause()
      audio.onended = null
      audioRef.current = null
    }
  }, [advance, index, phase, rec])

  useEffect(() => {
    if (phase === 'prompt' || !rec?.cues) return

    fetch(`${ASSET_BASE}/cues/${rec.cues}.md`)
      .then((response) => (response.ok ? response.text() : ''))
      .then((md) => {
        if (md) setBlocks(parseMd(md))
      })
      .catch(() => {})
  }, [phase, rec?.cues])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration)

      let nextActive = -1
      for (let i = 0; i < blocks.length; i += 1) {
        const seconds = mssToSec(blocks[i].time)
        if (!Number.isNaN(seconds) && seconds <= audio.currentTime) nextActive = i
        else break
      }
      setActiveIndex(nextActive)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate)
  }, [blocks, index])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault()
        if (phaseRef.current === 'prompt') {
          setPhase('more')
          setPlaylist(moreRecordings)
          setIndex(0)
        } else {
          advance()
        }
      }

      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [advance, moreRecordings, onClose])

  const seek = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return

    const rect = event.currentTarget.getBoundingClientRect()
    audio.currentTime = ((event.clientX - rect.left) / rect.width) * audio.duration
  }, [])

  const activeText = blocks[activeIndex]?.text ?? ''

  return (
    <div className="fixed inset-0 z-50 flex animate-[telephoneFadeIn_1.2s_ease_forwards] flex-col bg-black font-serif text-white">
      <div className="flex shrink-0 items-start justify-between px-6 pt-8 md:px-10 md:pt-10">
        <p className="max-w-xs text-sm italic leading-relaxed text-white/60">
          To bring out the soulful blues we feel, every day. To give it a shared voice. To share it
          is to say it&apos;s okay.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer text-sm lowercase tracking-[0.28em] text-white/30 transition-colors duration-300 hover:text-white/70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60"
        >
          esc
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-8 text-center md:px-16">
        {phase === 'prompt' ? (
          <button
            type="button"
            onClick={() => {
              setPhase('more')
              setPlaylist(moreRecordings)
              setIndex(0)
            }}
            className="border border-white/20 px-8 py-5 text-xl italic tracking-wide text-white/80 transition-colors duration-300 hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60 md:px-12 md:py-6"
          >
            press space to listen to more
          </button>
        ) : (
          <p key={rec?.label} className="animate-[telephoneFadeIn_1s_ease_forwards] text-4xl tracking-wide text-white/80 md:text-5xl">
            {rec?.label}
          </p>
        )}

        {activeText && phase !== 'prompt' && (
          <p
            key={activeText}
            className="max-w-xl animate-[telephoneFadeIn_1.5s_ease_forwards] text-xl leading-relaxed tracking-wide text-white/75 md:text-2xl"
          >
            {activeText}
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-col gap-3 px-6 pb-8 md:px-10 md:pb-10">
        <div className="flex flex-col gap-2 text-sm lowercase tracking-[0.22em] text-white/45 md:flex-row md:items-baseline md:justify-between">
          <span>
            Who do you wish to call? <span className="mx-1 text-white/20">/</span> {QUESTION}
          </span>
          <span>{phase === 'prompt' ? 'space to play more' : 'space to skip'}</span>
        </div>
        <div
          className="group relative h-3 cursor-pointer"
          onClick={phase !== 'prompt' ? seek : undefined}
          role={phase !== 'prompt' ? 'slider' : undefined}
          aria-label={phase !== 'prompt' ? 'Audio progress' : undefined}
          aria-valuemin={phase !== 'prompt' ? 0 : undefined}
          aria-valuemax={phase !== 'prompt' ? 100 : undefined}
          aria-valuenow={phase !== 'prompt' ? Math.round(progress * 100) : undefined}
        >
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
          <div
            className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-white/40 transition-[width] duration-1000 ease-linear"
            style={{ width: phase === 'prompt' ? '100%' : `${progress * 100}%` }}
          />
          <div
            className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50 opacity-0 transition-opacity group-hover:opacity-100"
            style={{ left: phase === 'prompt' ? '100%' : `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default function ProjectTelephoneClient() {
  const [listening, setListening] = useState(false)

  useEffect(() => {
    if (!listening) return

    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
    }
  }, [listening])

  return (
    <div className="min-h-screen bg-black font-serif text-white/80 selection:bg-white/10">
      <div className="mx-auto max-w-2xl px-8 py-24 md:py-32">
        <p className="mb-5 text-xs uppercase tracking-[0.32em] text-white/30">Design installation</p>
        <h1 className="mb-3 text-4xl leading-none tracking-wide text-white md:text-6xl">
          Project Telephone
        </h1>
        <p className="mb-16 text-sm tracking-[0.28em] text-white/45">Spring 2026</p>

        <section className="mb-20 space-y-5 animate-[telephoneFadeIn_1.2s_ease_forwards]">
          <p className="text-xs lowercase tracking-[0.28em] text-white/45">the idea</p>
          <p className="text-2xl italic leading-relaxed text-white/90 md:text-3xl">
            An honest installation. A telephone booth on a college drillfield. Pick up a telephone
            and leave a message.
          </p>
        </section>

        <section className="mb-20 animate-[telephoneFadeIn_1.8s_ease_forwards]">
          <p className="mb-4 text-xs lowercase tracking-[0.28em] text-white/45">the question</p>
          <p className="text-2xl italic tracking-wide text-white/90 md:text-3xl">
            {QUESTION} Who do you wish to call?
          </p>
        </section>

        <section className="mb-24 animate-[telephoneFadeIn_2.4s_ease_forwards]">
          <p className="mb-4 text-xs lowercase tracking-[0.28em] text-white/45">the recordings</p>
          <button
            type="button"
            onClick={() => setListening(true)}
            className="group cursor-pointer text-left text-2xl italic tracking-wide text-white/90 transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-white/60"
          >
            <span className="relative">
              Hear their answers
              <span className="absolute -bottom-1 left-0 h-px w-full bg-white/40 transition-colors duration-300 group-hover:bg-white/70" />
            </span>
          </button>
        </section>

        <p className="animate-[telephoneFadeIn_2.8s_ease_forwards] text-[13px] italic tracking-wide text-white/25">
          Real humans recorded on a digital proof of concept.
        </p>
      </div>

      {listening && (
        <ListenSequence
          recordings={FEATURED}
          moreRecordings={MORE}
          onClose={() => setListening(false)}
        />
      )}
    </div>
  )
}
