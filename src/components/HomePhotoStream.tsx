import Image from 'next/image'
import InfiniteSlider from '@/components/InfiniteSlider'

const HOME_PHOTOS = [
  {
    src: '/images/design/lifeform/cube-in-sand.jpg',
    alt: 'Lifeform cube resting in raked sand.',
    className: 'object-[50%_52%]',
  },
  {
    src: '/images/art/photography/06-statue.png',
    alt: 'A sculptural figure photographed against a quiet ground.',
    className: 'object-[50%_42%]',
  },
  {
    src: '/images/design/lifeform/making-drill.jpg',
    alt: 'A maple block being drilled during the Lifeform making process.',
    className: 'object-[38%_60%]',
  },
  {
    src: '/images/art/photography/07-extra.png',
    alt: 'A close, abstract view through a textured circular form.',
    className: 'object-[55%_50%]',
  },
  {
    src: '/images/art/photography/01-conspiracy.png',
    alt: 'A black and white street photograph with a reflective, cinematic frame.',
    className: 'object-[50%_45%]',
  },
  {
    src: '/images/art/photography/03-monitor.png',
    alt: 'A monitor photographed with a stark graphic composition.',
    className: 'object-[50%_50%]',
  },
  {
    src: '/images/design/lifeform/sand-field.jpg',
    alt: 'Footprints and Lifeform impressions pressed into sand.',
    className: 'object-[50%_52%]',
  },
  {
    src: '/images/art/photography/02-cat.png',
    alt: 'A high-contrast vertical photograph from the photography series.',
    className: 'object-[50%_44%]',
  },
  {
    src: '/images/design/lifeform/original-image.jpg',
    alt: 'Original Lifeform material study photographed on a neutral ground.',
    className: 'object-[50%_48%]',
  },
  {
    src: '/images/art/photography/04-dog.png',
    alt: 'A vertical black and white photograph from the photography series.',
    className: 'object-[50%_44%]',
  },
  {
    src: '/images/design/lifeform/edited-image.jpg',
    alt: 'Edited Lifeform object study with a pale sculptural form.',
    className: 'object-[50%_48%]',
  },
  {
    src: '/images/DSC_0299.jpg',
    alt: 'A wide photographic portrait in warm light.',
    className: 'object-[50%_50%]',
  },
] satisfies Array<{ src: string; alt: string; className: string }>

export default function HomePhotoStream() {
  return (
    <aside
      className="home-photo-stream"
      aria-label="Selected photographs and project images"
    >
      <InfiniteSlider
        direction="vertical"
        gap={18}
        speed={34}
        speedOnHover={16}
        className="h-full"
      >
        {HOME_PHOTOS.map((photo, index) => (
          <figure className="home-photo-stream__frame" key={photo.src}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority={index < 2}
              sizes="(min-width: 1024px) 22vw, (min-width: 768px) 28vw, 82vw"
              className={`object-cover ${photo.className}`}
            />
          </figure>
        ))}
      </InfiniteSlider>
    </aside>
  )
}
