'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from './nav.config'
import DropdownMenu from './DropdownMenu'
import PersistentAudioIndicator from '@/components/PersistentAudio/PersistentAudioIndicator'

type RGB = [number, number, number]

function parseColor(value: string): [number, number, number, number] | null {
  const match = value.match(/rgba?\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)(?:,\s*(\d*\.?\d+))?\)/)
  if (!match) return null

  return [Number(match[1]), Number(match[2]), Number(match[3]), match[4] === undefined ? 1 : Number(match[4])]
}

function getEffectiveBg(el: Element): RGB {
  const layers: [number, number, number, number][] = []
  let current: Element | null = el

  while (current) {
    const color = parseColor(window.getComputedStyle(current).backgroundColor)
    if (color && color[3] > 0) layers.push(color)
    current = current.parentElement
  }

  let result: RGB = [10, 10, 10]
  for (const [red, green, blue, alpha] of layers.reverse()) {
    result = [
      red * alpha + result[0] * (1 - alpha),
      green * alpha + result[1] * (1 - alpha),
      blue * alpha + result[2] * (1 - alpha),
    ]
  }

  return result
}

function isLight([red, green, blue]: RGB): boolean {
  const linearize = (value: number) => {
    const channel = value / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  }

  const luminance = 0.2126 * linearize(red) + 0.7152 * linearize(green) + 0.0722 * linearize(blue)
  return luminance > 0.35
}

function pathMatches(pathname: string, href: string): boolean {
  return href.startsWith('/') && (pathname === href || pathname.startsWith(`${href}/`))
}

export default function Nav() {
  const pathname = usePathname()
  const [lightDetection, setLightDetection] = useState({ pathname, light: false })
  const detectedLight = lightDetection.pathname === pathname ? lightDetection.light : false
  const navIsLight = pathname === '/design/circle-family' || detectedLight

  useEffect(() => {
    if (pathname === '/design/circle-family') return

    const update = () => {
      const els = document.elementsFromPoint(window.innerWidth / 2, 60)
      const el = els.find(e => !e.closest('header'))
      if (!el) return
      const nextLight = isLight(getEffectiveBg(el))
      setLightDetection(current =>
        current.pathname === pathname && current.light === nextLight
          ? current
          : { pathname, light: nextLight }
      )
    }

    let frame = 0
    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-2 px-3 py-5 transition-colors duration-100 sm:gap-4 sm:px-6 ${
        navIsLight
          ? 'bg-white/60 shadow-[0_1px_0_rgba(0,0,0,0.08)] backdrop-blur-xl'
          : 'bg-black/35 backdrop-blur-[6px]'
      }`}
    >
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] flex min-h-11 -translate-y-24 items-center bg-white px-4 py-2 text-sm text-black shadow-[0_0_0_1px_rgba(0,0,0,0.15)] transition-transform duration-150 focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-black motion-reduce:transition-none"
      >
        Skip to content
      </a>
      <Link
        href="/"
        className={`flex min-h-11 shrink-0 items-center font-serif text-xs transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current sm:text-sm ${
          navIsLight ? 'text-black/70 hover:text-black/95' : 'text-white/70 hover:text-white/95'
        }`}
      >
        kasra mikaili
      </Link>
      <PersistentAudioIndicator light={navIsLight} />
      <nav className="grid min-w-0 flex-1 grid-cols-4 items-center sm:flex sm:flex-none sm:gap-6 md:gap-8">
        {NAV_ITEMS.map((item, index) => {
          const active = pathMatches(pathname, item.href) || item.children.some(child => pathMatches(pathname, child.href))
          const mobileAlign = index === 0 ? 'left' : index === NAV_ITEMS.length - 1 ? 'right' : 'center'

          return (
            <DropdownMenu
              key={item.label}
              label={item.label}
              light={navIsLight}
              pathname={pathname}
              active={active}
              mobileAlign={mobileAlign}
            >
              {item.children}
            </DropdownMenu>
          )
        })}
      </nav>
    </header>
  )
}
