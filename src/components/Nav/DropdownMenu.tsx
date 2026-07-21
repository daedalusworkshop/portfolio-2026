'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import AudioHandoffLink from '@/components/AudioHandoffLink'

type Item = { label: string; href: string; newTab?: boolean }
type Props = {
  label: string
  children: readonly Item[]
  light?: boolean
  pathname: string
  active?: boolean
  mobileAlign?: 'left' | 'center' | 'right'
}

export default function DropdownMenu({
  label,
  children,
  light,
  pathname,
  active = false,
  mobileAlign = 'right',
}: Props) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const canHover = () => window.matchMedia('(hover: hover)').matches

  useEffect(() => {
    if (!open) return

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsidePress)
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress)
  }, [open])

  return (
    <div
      ref={containerRef}
      className="relative min-w-0"
      onMouseEnter={() => {
        if (canHover()) setOpen(true)
      }}
      onMouseLeave={() => {
        if (canHover()) setOpen(false)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return
        setOpen(false)
        buttonRef.current?.focus()
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`flex min-h-11 min-w-11 w-full cursor-pointer items-center justify-center py-2 text-xs transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current sm:w-auto sm:text-sm ${
          light
            ? active ? 'text-black/90' : 'text-black/60 hover:text-black/90'
            : active ? 'text-white/90' : 'text-white/50 hover:text-white/90'
        }`}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        aria-current={active ? 'true' : undefined}
        onClick={() => {
          if (canHover()) setOpen(true)
          else setOpen((current) => !current)
        }}
      >
        {label}
      </button>

      {open && (
        <div
          className={`absolute top-full z-50 min-w-[160px] max-w-[calc(100vw-1.5rem)] pt-2 sm:left-auto sm:right-0 sm:translate-x-0 ${
            mobileAlign === 'left'
              ? 'left-0'
              : mobileAlign === 'center'
                ? 'left-1/2 -translate-x-1/2'
                : 'right-0'
          }`}
        >
          <ul id={menuId} className="bg-[#111] py-1 shadow-[0_0_0_1px_rgba(255,255,255,0.10)]">
            {children.map((item) => {
              const external = item.href.startsWith('http')
              const current = !external && (pathname === item.href || pathname.startsWith(`${item.href}/`))
              const className = 'block min-h-11 px-4 py-3 text-sm text-white/65 hover:bg-white/5 hover:text-white aria-[current=page]:text-white focus-visible:bg-white/5 focus-visible:text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white/80 transition-colors duration-100'

              return (
                <li key={item.href}>
                  {item.newTab ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}<span className="sr-only"> Opens in a new tab.</span>
                    </a>
                  ) : external ? (
                    <AudioHandoffLink
                      href={item.href}
                      className={className}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </AudioHandoffLink>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={current ? 'page' : undefined}
                      className={className}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
