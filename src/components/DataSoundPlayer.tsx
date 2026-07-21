'use client'

import { type CSSProperties, useEffect } from 'react'
import { usePersistentAudio } from '@/components/PersistentAudio/PersistentAudioProvider'

type PlayerStyle = CSSProperties & {
  '--audio-progress': string
}

type Props = {
  src: string
  title: string
}

function formatTime(value: number) {
  if (!Number.isFinite(value)) return '0:00'

  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function DataSoundPlayer({ src, title }: Props) {
  const {
    track,
    status,
    currentTime,
    duration,
    prepareTrack,
    playTrack,
    togglePlayback,
    seek,
  } = usePersistentAudio()
  const trackId = `data-sound:${src}`
  const isCurrentTrack = track?.id === trackId
  const playerTime = isCurrentTrack ? currentTime : 0
  const playerDuration = isCurrentTrack ? duration : 0
  const progress = playerDuration > 0 ? (playerTime / playerDuration) * 100 : 0
  const playerStyle: PlayerStyle = { '--audio-progress': `${progress}%` }
  const ready = playerDuration > 0
  const playing = isCurrentTrack && status === 'playing'

  useEffect(() => {
    prepareTrack({
      id: trackId,
      title,
      src,
      href: '/tech/data-sound',
    })
  }, [prepareTrack, src, title, trackId])

  const handlePlayback = () => {
    if (isCurrentTrack && status === 'error') {
      void playTrack({
        id: trackId,
        title,
        src,
        href: '/tech/data-sound',
      })
      return
    }

    if (isCurrentTrack) {
      void togglePlayback()
      return
    }

    void playTrack({
      id: trackId,
      title,
      src,
      href: '/tech/data-sound',
    })
  }

  return (
    <div className="data-sound-player" style={playerStyle}>
      <div className="data-sound-player__controls">
        <button
          type="button"
          className="data-sound-player__play"
          onClick={handlePlayback}
          aria-label={status === 'error' ? `Retry ${title}` : playing ? `Pause ${title}` : `Play ${title}`}
        >
          <span className="data-sound-player__icon" aria-hidden="true">
            <span className={playing ? 'is-hidden' : ''}>
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M7.5 4.8v14.4L19 12 7.5 4.8Z" />
              </svg>
            </span>
            <span className={playing ? '' : 'is-hidden'}>
              <svg viewBox="0 0 24 24" focusable="false">
                <rect x="6.5" y="5" width="4" height="14" rx="0.75" />
                <rect x="13.5" y="5" width="4" height="14" rx="0.75" />
              </svg>
            </span>
          </span>
        </button>

        <div className="data-sound-player__timeline">
          <label>
            <span className="sr-only">Seek through {title}</span>
            <input
              type="range"
              min={0}
              max={playerDuration || 0}
              step="1"
              value={playerTime}
              disabled={!ready}
              onChange={(event) => seek(Number(event.currentTarget.value))}
              aria-valuetext={`${formatTime(playerTime)} of ${formatTime(playerDuration)}`}
            />
          </label>
        </div>
      </div>

      <dl className="data-sound-player__key">
        <div>
          <dt>Time</dt>
          <dd>controls when a voice enters</dd>
        </div>
        <div>
          <dt>Magnitude</dt>
          <dd>controls the loudness of the voice</dd>
        </div>
        <div>
          <dt>Depth</dt>
          <dd>controls the pitch of the voice</dd>
        </div>
      </dl>
    </div>
  )
}
