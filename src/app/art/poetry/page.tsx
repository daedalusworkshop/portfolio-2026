import Link from 'next/link'
import { getAllPoemSlugs } from '@/lib/poetry'

export const metadata = { title: 'poetry' }

const ORDER = [
  'in-my-world',
  'on-growing-up',
  'cabin',
  'falconer-and-i',
  'grandma',
  'it-threw-me-in-so-fast',
  'moving-in-water',
  'worlds-most-beautiful-sunset',
]

export default function PoetryIndex() {
  const available = new Set(getAllPoemSlugs())
  const slugs = [
    ...ORDER.filter((s) => available.has(s)),
    ...getAllPoemSlugs().filter((s) => !ORDER.includes(s)),
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-32">

      {slugs.length === 0 ? (
        <p className="text-white/30 text-sm font-serif italic">no poems yet</p>
      ) : (
        <ul className="space-y-3">
          {slugs.map((slug) => {
            const title = slug
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase())
            return (
              <li key={slug}>
                <Link
                  href={`/art/poetry/${slug}`}
                  className="group flex items-center gap-3 font-serif text-xl text-white/70 hover:text-white transition-colors duration-200"
                >
                  <svg width="24" height="1" viewBox="0 0 24 1" aria-hidden="true" className="shrink-0">
                    <line x1="0" y1="0.5" x2="24" y2="0.5" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  {title}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
      <p className="font-serif text-sm italic text-white/30 mt-16">ask me for more, I'd love to share</p>
    </div>
  )
}
