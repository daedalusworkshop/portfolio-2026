'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  getNextSegmentIndex,
  getPreviousSegmentIndex,
  getRadioSegment,
  KASRA_RADIO_PROGRAM,
} from '@/lib/radio'
import KasraRadioAudio from './KasraRadioAudio'
import KasraRadioWidget from './KasraRadioWidget'
import { KasraRadioContext, type RadioPlaybackStatus } from './useKasraRadio'

type Props = {
  children: React.ReactNode
}

export default function KasraRadioProvider({ children }: Props) {
  const [active, setActive] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [status, setStatus] = useState<RadioPlaybackStatus>('idle')
  const [progress, setProgress] = useState(0)

  const currentSegment = getRadioSegment(currentIndex)
  const hasPlayableAudio = Boolean(currentSegment.src)

  const startRadio = useCallback(() => {
    setActive(true)
    setStatus(currentSegment.src ? 'playing' : 'unavailable')
  }, [currentSegment.src])

  const togglePlayback = useCallback(() => {
    setActive(true)
    setStatus((previous) => {
      if (!currentSegment.src) return 'unavailable'
      return previous === 'playing' ? 'paused' : 'playing'
    })
  }, [currentSegment.src])

  const skipNext = useCallback(() => {
    const nextIndex = getNextSegmentIndex(currentIndex)
    const nextSegment = getRadioSegment(nextIndex)

    setCurrentIndex(nextIndex)
    setProgress(0)
    setActive(true)
    setStatus((previous) => {
      if (!nextSegment.src) return 'unavailable'
      return previous === 'idle' ? 'paused' : previous
    })
  }, [currentIndex])

  const skipBack = useCallback(() => {
    const previousIndex = getPreviousSegmentIndex(currentIndex)
    const previousSegment = getRadioSegment(previousIndex)

    setCurrentIndex(previousIndex)
    setProgress(0)
    setActive(true)
    setStatus((previous) => {
      if (!previousSegment.src) return 'unavailable'
      return previous === 'idle' ? 'paused' : previous
    })
  }, [currentIndex])

  const setAudioProgress = useCallback((nextProgress: number) => {
    setProgress(Math.max(0, Math.min(1, nextProgress)))
  }, [])

  const markUnavailable = useCallback(() => setStatus('unavailable'), [])
  const markPaused = useCallback(() => setStatus('paused'), [])
  const markPlaying = useCallback(() => setStatus('playing'), [])

  const value = useMemo(
    () => ({
      active,
      currentSegment,
      currentIndex,
      progress,
      status,
      hasPlayableAudio,
      startRadio,
      togglePlayback,
      skipNext,
      skipBack,
      setAudioProgress,
      markUnavailable,
      markPaused,
      markPlaying,
    }),
    [
      active,
      currentIndex,
      currentSegment,
      hasPlayableAudio,
      markPaused,
      markPlaying,
      markUnavailable,
      progress,
      setAudioProgress,
      skipBack,
      skipNext,
      startRadio,
      status,
      togglePlayback,
    ],
  )

  if (KASRA_RADIO_PROGRAM.length === 0) return children

  return (
    <KasraRadioContext.Provider value={value}>
      {children}
      <KasraRadioAudio />
      <KasraRadioWidget />
    </KasraRadioContext.Provider>
  )
}
