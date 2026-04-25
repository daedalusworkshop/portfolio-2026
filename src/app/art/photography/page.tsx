import Image from 'next/image'

export const metadata = { title: 'photography' }

const PHOTOS = [
  { src: '/images/art/photography/01-conspiracy.png', alt: 'A conspiracy of silence' },
  { src: '/images/art/photography/06-statue.png', alt: '' },
  { src: '/images/art/photography/03-monitor.png', alt: '' },
  { src: '/images/art/photography/02-cat.png', alt: '' },
  { src: '/images/art/photography/04-dog.png', alt: '' },
  { src: '/images/art/photography/05-pigeons.png', alt: '' },
]

export default function Photography() {
  return (
    <div className="bg-black min-h-screen">
      <div className="flex flex-col items-center gap-16 pt-16 pb-24">
        {PHOTOS.map((photo, i) => (
          <div
            key={photo.src}
            className="relative w-full"
            style={{ height: '100svh' }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
