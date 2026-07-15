'use client'

import { useEffect, useRef } from 'react'
import { useKasraRadio } from './useKasraRadio'

export default function KasraRadioAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const {
    active,
    currentSegment,
    status,
    setAudioProgress,
    markPaused,
    markPlaying,
    markUnavailable,
    skipNext,
  } = useKasraRadio()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.pause()
    audio.currentTime = 0
    setAudioProgress(0)
  }, [currentSegment.id, setAudioProgress])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !active) return

    if (!currentSegment.src) {
      audio.pause()
      markUnavailable()
      return
    }

    if (status === 'playing') {
      audio.play().then(markPlaying).catch(markPaused)
      return
    }

    audio.pause()
  }, [active, currentSegment.src, markPaused, markPlaying, markUnavailable, status])

  if (!currentSegment.src) return null

  return (
    <audio
      ref={audioRef}
      src={currentSegment.src}
      preload="metadata"
      onTimeUpdate={(event) => {
        const audio = event.currentTarget
        if (!audio.duration) return
        setAudioProgress(audio.currentTime / audio.duration)
      }}
      onEnded={skipNext}
      onError={markUnavailable}
    />
  )
}
