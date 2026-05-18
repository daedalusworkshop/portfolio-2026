'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { NAV_ITEMS } from './nav.config'
import DropdownMenu from './DropdownMenu'

function getEffectiveBg(el: Element): string {
  let current: Element | null = el
  while (current) {
    const bg = window.getComputedStyle(current).backgroundColor
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg
    current = current.parentElement
  }
  return 'rgb(10, 10, 10)'
}

function isLight(rgb: string): boolean {
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!m) return false
  const luminance = (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255
  return luminance > 0.5
}

export default function Nav() {
  const [light, setLight] = useState(false)

  useEffect(() => {
    const update = () => {
      const els = document.elementsFromPoint(window.innerWidth / 2, 60)
      const el = els.find(e => !e.closest('header'))
      if (!el) return
      setLight(isLight(getEffectiveBg(el)))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between">
      <Link
        href="/"
        className={`font-serif text-sm transition-colors duration-100 outline-none ${
          light ? 'text-black/70 hover:text-black/40' : 'text-white/70 hover:text-white/40'
        }`}
      >
        kasra mikaili
      </Link>
      <nav className="flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <DropdownMenu key={item.label} label={item.label} children={item.children} light={light} />
        ))}
      </nav>
    </header>
  )
}
