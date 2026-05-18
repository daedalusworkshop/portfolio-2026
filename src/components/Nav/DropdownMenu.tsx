'use client'

import { useState } from 'react'
import Link from 'next/link'

type Item = { label: string; href: string }
type Props = { label: string; children: readonly Item[]; light?: boolean }

export default function DropdownMenu({ label, children, light }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`flex items-center gap-1 text-sm transition-colors duration-100 py-2 cursor-default ${
          light ? 'text-black/60 hover:text-black/90' : 'text-white/50 hover:text-white/90'
        }`}
        aria-expanded={open}
      >
        {label}
      </button>

      {open && (
        <div className="absolute top-full right-0 pt-2 z-50 min-w-[160px]">
          <ul className="bg-[#111] border border-[#222] py-1">
            {children.map((item) => {
              const external = item.href.startsWith('http')
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors duration-100"
                    onClick={() => setOpen(false)}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
