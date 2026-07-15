'use client'

import { getProgramDurationLabel } from '@/lib/radio'
import KasraRadioProgress from './KasraRadioProgress'
import { useKasraRadio } from './useKasraRadio'

function PlaySymbol({ playing }: { playing: boolean }) {
  return <span aria-hidden="true">{playing ? 'II' : '▶'}</span>
}

export default function KasraRadioWidget() {
  const {
    active,
    currentSegment,
    progress,
    status,
    hasPlayableAudio,
    togglePlayback,
    skipBack,
    skipNext,
  } = useKasraRadio()

  if (!active) return null

  const playing = status === 'playing'
  const unavailable = status === 'unavailable' || !hasPlayableAudio

  return (
    <aside className="radio-widget" aria-label="Kasra Radio player">
      <div className="radio-widget__signal" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="radio-widget__body">
        <div className="radio-widget__topline">
          <span className="radio-widget__brand">Kasra Radio</span>
          <span className="radio-widget__duration">{getProgramDurationLabel()}</span>
        </div>
        <KasraRadioProgress progress={progress} label={`Progress for ${currentSegment.title}`} />
        <div className="radio-widget__details">
          <span className="radio-widget__eyebrow">{currentSegment.eyebrow}</span>
          <strong>{currentSegment.title}</strong>
          <p>{unavailable ? 'audio file coming soon' : currentSegment.description}</p>
        </div>
        <div className="radio-widget__controls" aria-label="Kasra Radio controls">
          <button type="button" onClick={skipBack} aria-label="Back">
            ←
          </button>
          <button type="button" onClick={togglePlayback} aria-label={playing ? 'Pause Kasra Radio' : 'Play Kasra Radio'} disabled={unavailable}>
            <PlaySymbol playing={playing} />
          </button>
          <button type="button" onClick={skipNext} aria-label="Skip forward">
            →
          </button>
        </div>
      </div>
    </aside>
  )
}
