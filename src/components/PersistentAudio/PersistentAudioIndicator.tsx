'use client'

import { type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { usePersistentAudio } from './PersistentAudioProvider'

type IndicatorStyle = CSSProperties & {
  '--persistent-audio-progress': string
}

type Props = {
  light?: boolean
}

export default function PersistentAudioIndicator({ light = false }: Props) {
  const pathname = usePathname()
  const { track, status, currentTime, duration } = usePersistentAudio()

  if (!track || (status !== 'playing' && status !== 'loading') || pathname === track.href) return null

  const progress = duration > 0 ? currentTime / duration : 0
  const indicatorStyle: IndicatorStyle = {
    '--persistent-audio-progress': `${Math.max(0, Math.min(100, progress * 100))}%`,
  }

  return (
    <Link
      href={track.href}
      className="nav-audio__progress-link"
      aria-label={`Return to the ${track.title} audio player`}
    >
      <span
        className={`nav-audio__progress${light ? ' is-light' : ''}`}
        style={indicatorStyle}
        role="progressbar"
        aria-label={`${track.title} playing in the background`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      />
    </Link>
  )
}
