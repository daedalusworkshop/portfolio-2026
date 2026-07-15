'use client'

import {
  Children,
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

type InfiniteSliderProps = {
  children: ReactNode
  className?: string
  direction?: 'horizontal' | 'vertical'
  gap?: number
  reverse?: boolean
  speed?: number
  speedOnHover?: number
}

type SliderStyle = CSSProperties & {
  '--slider-distance': string
  '--slider-duration': string
  '--slider-gap': string
  '--slider-hover-duration'?: string
}

export default function InfiniteSlider({
  children,
  className = '',
  direction = 'horizontal',
  gap = 16,
  reverse = false,
  speed = 100,
  speedOnHover,
}: InfiniteSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const childArray = Children.toArray(children)

  useEffect(() => {
    const track = trackRef.current

    if (!track) return

    const measure = () => {
      const nextDistance =
        direction === 'vertical' ? track.scrollHeight / 2 : track.scrollWidth / 2

      setDistance(nextDistance)
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(track)

    return () => observer.disconnect()
  }, [direction, childArray.length])

  const duration = distance > 0 ? distance / speed : 1
  const hoverDuration =
    distance > 0 && speedOnHover ? distance / speedOnHover : undefined
  const style: SliderStyle = {
    '--slider-distance': `${distance}px`,
    '--slider-duration': `${duration}s`,
    '--slider-gap': `${gap}px`,
  }

  if (hoverDuration) {
    style['--slider-hover-duration'] = `${hoverDuration}s`
  }

  return (
    <div
      className={`infinite-slider infinite-slider--${direction} ${className}`}
      data-reverse={reverse || undefined}
      data-hover-speed={speedOnHover ? true : undefined}
      style={style}
    >
      <div ref={trackRef} className="infinite-slider__track">
        {childArray.map((child, index) => (
          <div className="infinite-slider__item" key={`original-${index}`}>
            {child}
          </div>
        ))}
        {childArray.map((child, index) => (
          <div
            className="infinite-slider__item"
            key={`duplicate-${index}`}
            aria-hidden="true"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
