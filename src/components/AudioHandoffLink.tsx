'use client'

import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { usePersistentAudio } from '@/components/PersistentAudio/PersistentAudioProvider'

type AudioHandoffLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

export default function AudioHandoffLink({ onClick, ...props }: AudioHandoffLinkProps) {
  const { handoffPlayback } = usePersistentAudio()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    const opensInThisTab = !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
    if (!event.defaultPrevented && opensInThisTab) handoffPlayback()
  }

  return <a {...props} onClick={handleClick} />
}
