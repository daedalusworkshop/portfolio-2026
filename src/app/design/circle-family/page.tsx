import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Circle Family' }

export default function CircleFamilyPage() {
  return (
    <iframe
      src="https://logical-room-812924.framer.app/design/circle-family"
      title="Circle Family"
      className="fixed inset-0 w-full h-full border-0"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    />
  )
}
