'use client'

import { createContext, useContext } from 'react'
import type { RadioSegment } from '@/lib/radio'

export type RadioPlaybackStatus = 'idle' | 'playing' | 'paused' | 'unavailable'

export type KasraRadioContextValue = {
  active: boolean
  currentSegment: RadioSegment
  currentIndex: number
  progress: number
  status: RadioPlaybackStatus
  hasPlayableAudio: boolean
  startRadio: () => void
  togglePlayback: () => void
  skipNext: () => void
  skipBack: () => void
  setAudioProgress: (progress: number) => void
  markUnavailable: () => void
  markPaused: () => void
  markPlaying: () => void
}

export const KasraRadioContext = createContext<KasraRadioContextValue | null>(null)

export function useKasraRadio() {
  const context = useContext(KasraRadioContext)

  if (!context) {
    throw new Error('useKasraRadio must be used inside KasraRadioProvider')
  }

  return context
}
