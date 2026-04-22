export const metadata = { title: 'photography' }

const PHOTOS = [
  { src: '/images/art/photography/01-conspiracy.png', alt: 'A conspiracy of silence' },
  { src: '/images/art/photography/06-statue.png', alt: '' },
  { src: '/images/art/photography/03-monitor.png', alt: '' },
  { src: '/images/art/photography/02-cat.png', alt: '' },
  { src: '/images/art/photography/07-extra.png', alt: '' },
  { src: '/images/art/photography/04-dog.png', alt: '' },
  { src: '/images/art/photography/05-pigeons.png', alt: '' },
]

export default function Photography() {
  return (
    <div className="bg-black min-h-screen">
      <div className="px-8 pt-32 pb-16">
        <h1 className="font-serif text-xs uppercase tracking-[0.3em] text-white/25">
          photography
        </h1>
      </div>

      <div className="flex flex-col items-center gap-1 pb-24">
        {PHOTOS.map((photo) => (
          <div
            key={photo.src}
            className="w-full flex items-center justify-center"
            style={{ height: '100svh' }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
