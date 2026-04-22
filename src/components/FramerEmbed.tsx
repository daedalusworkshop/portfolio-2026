'use client'

type Props = { src: string; title: string; aspectRatio?: string }

export default function FramerEmbed({ src, title, aspectRatio = '16/9' }: Props) {
  return (
    <div className="w-full relative overflow-hidden" style={{ aspectRatio }}>
      <iframe
        src={src}
        title={title}
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
        allow="fullscreen"
      />
    </div>
  )
}
