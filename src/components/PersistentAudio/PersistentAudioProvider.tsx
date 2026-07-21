'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export type PersistentAudioTrack = {
  id: string
  title: string
  src: string
  href: string
}

export type PersistentAudioStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error'

type PersistentAudioContextValue = {
  track: PersistentAudioTrack | null
  status: PersistentAudioStatus
  currentTime: number
  duration: number
  muted: boolean
  prepareTrack: (track: PersistentAudioTrack) => void
  playTrack: (track: PersistentAudioTrack) => Promise<void>
  handoffPlayback: () => void
  togglePlayback: () => Promise<void>
  seek: (time: number) => void
  toggleMuted: () => void
}

const PersistentAudioContext = createContext<PersistentAudioContextValue | null>(null)
const HANDOFF_STORAGE_KEY = 'kasra-world-audio-handoff'

function normalizeDuration(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0
}

export function usePersistentAudio() {
  const context = useContext(PersistentAudioContext)

  if (!context) {
    throw new Error('usePersistentAudio must be used inside PersistentAudioProvider')
  }

  return context
}

export default function PersistentAudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const trackRef = useRef<PersistentAudioTrack | null>(null)
  const pendingRestoreTimeRef = useRef<number | null>(null)
  const playAttemptRef = useRef(0)
  const [track, setTrack] = useState<PersistentAudioTrack | null>(null)
  const [status, setStatus] = useState<PersistentAudioStatus>('idle')
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [muted, setMuted] = useState(false)

  const clearMatchingHandoff = useCallback((trackId: string) => {
    try {
      const savedHandoff = JSON.parse(sessionStorage.getItem(HANDOFF_STORAGE_KEY) || 'null') as {
        trackId?: unknown
      } | null

      if (savedHandoff?.trackId === trackId) sessionStorage.removeItem(HANDOFF_STORAGE_KEY)
    } catch {}
  }, [])

  const loadTrack = useCallback((nextTrack: PersistentAudioTrack, forceReload = false) => {
    const audio = audioRef.current
    if (!audio || (!forceReload && trackRef.current?.id === nextTrack.id)) return audio

    playAttemptRef.current += 1
    pendingRestoreTimeRef.current = null
    trackRef.current = nextTrack
    setTrack(nextTrack)
    setStatus('idle')
    setCurrentTime(0)
    setDuration(0)
    audio.src = nextTrack.src
    audio.load()

    try {
      const savedHandoff = JSON.parse(sessionStorage.getItem(HANDOFF_STORAGE_KEY) || 'null') as {
        trackId?: unknown
        currentTime?: unknown
      } | null

      if (
        savedHandoff?.trackId === nextTrack.id
        && typeof savedHandoff.currentTime === 'number'
        && Number.isFinite(savedHandoff.currentTime)
      ) {
        pendingRestoreTimeRef.current = Math.max(0, savedHandoff.currentTime)
      }
    } catch {}

    return audio
  }, [])

  const prepareTrack = useCallback((nextTrack: PersistentAudioTrack) => {
    const audio = audioRef.current
    if (trackRef.current && audio && !audio.paused) return
    loadTrack(nextTrack)
  }, [loadTrack])

  const playTrack = useCallback(async (nextTrack: PersistentAudioTrack) => {
    const currentAudio = audioRef.current
    const forceReload = trackRef.current?.id === nextTrack.id && Boolean(currentAudio?.error)
    const audio = loadTrack(nextTrack, forceReload)
    if (!audio) return

    if (audio.ended) audio.currentTime = 0
    setStatus('loading')
    const attempt = ++playAttemptRef.current

    try {
      await audio.play()
    } catch (error) {
      if (attempt !== playAttemptRef.current) return
      if (error instanceof DOMException && error.name === 'AbortError' && audio.paused) {
        setStatus('paused')
        return
      }
      setStatus('error')
    }
  }, [loadTrack])

  const togglePlayback = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !trackRef.current) return

    if (!audio.paused) {
      playAttemptRef.current += 1
      audio.pause()
      return
    }

    if (audio.ended) audio.currentTime = 0
    setStatus('loading')
    const attempt = ++playAttemptRef.current

    try {
      await audio.play()
    } catch (error) {
      if (attempt !== playAttemptRef.current) return
      if (error instanceof DOMException && error.name === 'AbortError' && audio.paused) {
        setStatus('paused')
        return
      }
      setStatus('error')
    }
  }, [])

  const handoffPlayback = useCallback(() => {
    const audio = audioRef.current
    const activeTrack = trackRef.current

    if (audio && activeTrack) {
      try {
        sessionStorage.setItem(HANDOFF_STORAGE_KEY, JSON.stringify({
          trackId: activeTrack.id,
          currentTime: audio.currentTime,
        }))
      } catch {}
    }

    playAttemptRef.current += 1
    if (audio && !audio.paused) audio.pause()
  }, [])

  const handleLoadedMetadata = useCallback((audio: HTMLAudioElement) => {
    setDuration(normalizeDuration(audio.duration))

    const restoreTime = pendingRestoreTimeRef.current
    if (restoreTime === null) return

    const restoredTime = Math.min(restoreTime, normalizeDuration(audio.duration) || restoreTime)
    audio.currentTime = restoredTime
    setCurrentTime(restoredTime)
    pendingRestoreTimeRef.current = null
    clearMatchingHandoff(trackRef.current?.id || '')
  }, [clearMatchingHandoff])

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      const activeTrack = trackRef.current
      const audio = audioRef.current
      if (!event.persisted || !activeTrack || !audio?.currentSrc) return
      clearMatchingHandoff(activeTrack.id)
    }

    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [clearMatchingHandoff])

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(time)) return

    const nextTime = Math.max(0, Math.min(audio.duration || 0, time))
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }, [])

  const toggleMuted = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !audio.muted
    setMuted(audio.muted)
  }, [])

  const value = useMemo(
    () => ({
      track,
      status,
      currentTime,
      duration,
      muted,
      prepareTrack,
      playTrack,
      handoffPlayback,
      togglePlayback,
      seek,
      toggleMuted,
    }),
    [
      currentTime,
      duration,
      handoffPlayback,
      muted,
      playTrack,
      prepareTrack,
      seek,
      status,
      toggleMuted,
      togglePlayback,
      track,
    ],
  )

  return (
    <PersistentAudioContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        aria-hidden="true"
        preload="metadata"
        onLoadedMetadata={(event) => handleLoadedMetadata(event.currentTarget)}
        onDurationChange={(event) => setDuration(normalizeDuration(event.currentTarget.duration))}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setStatus('playing')}
        onPause={(event) => {
          if (!event.currentTarget.ended) setStatus('paused')
        }}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        onError={() => setStatus('error')}
        onEnded={(event) => {
          event.currentTarget.currentTime = 0
          setCurrentTime(0)
          setStatus('idle')
        }}
      />
    </PersistentAudioContext.Provider>
  )
}
