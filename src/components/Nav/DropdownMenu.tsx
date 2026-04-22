'use client'

import { useState } from 'react'
import Link from 'next/link'

type Item = { label: string; href: string }
type Props = { label: string; children: readonly Item[] }

export default function DropdownMenu({ label, children }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors duration-150 py-2 cursor-default"
        aria-expanded={open}
      >
        {label}
        <span className="text-[10px] opacity-40">↓</span>
      </button>

      {open && (
        <div className="absolute top-full left-0 pt-2 z-50 min-w-[160px]">
          <ul className="bg-[#111] border border-[#222] py-1">
            {children.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors duration-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
