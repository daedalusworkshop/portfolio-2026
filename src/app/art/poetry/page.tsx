import Link from 'next/link'
import { getAllPoemSlugs } from '@/lib/poetry'

export const metadata = { title: 'poetry' }

export default function PoetryIndex() {
  const slugs = getAllPoemSlugs()

  return (
    <div className="min-h-screen px-6 py-32">
      <h1 className="font-serif text-xs uppercase tracking-[0.3em] text-white/25 mb-16">poetry</h1>
      {slugs.length === 0 ? (
        <p className="text-white/30 text-sm font-serif italic">no poems yet</p>
      ) : (
        <ul className="space-y-4">
          {slugs.map((slug) => (
            <li key={slug}>
              <Link
                href={`/art/poetry/${slug}`}
                className="font-serif text-xl text-white/70 hover:text-white transition-colors"
              >
                {slug.replace(/-/g, ' ')}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
