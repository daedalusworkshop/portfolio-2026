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
