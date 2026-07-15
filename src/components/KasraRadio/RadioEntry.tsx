'use client'

import { useKasraRadio } from './useKasraRadio'

export default function RadioEntry() {
  const { startRadio, active, currentSegment } = useKasraRadio()

  return (
    <button
      type="button"
      className="radio-entry"
      onClick={startRadio}
      aria-label={active ? `Kasra Radio is open, now playing ${currentSegment.title}` : 'Start Kasra Radio'}
    >
      <span className="radio-entry__glyph" aria-hidden="true">
        ◉
      </span>
      <span>
        <span className="radio-entry__title">Kasra Radio</span>
        <span className="radio-entry__sub">poetry, music, performance</span>
      </span>
    </button>
  )
}
