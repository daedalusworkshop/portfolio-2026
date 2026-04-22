import fs from 'fs'
import path from 'path'

const POETRY_DIR = path.join(process.cwd(), 'content', 'poetry')

export function getAllPoemSlugs(): string[] {
  if (!fs.existsSync(POETRY_DIR)) return []
  return fs
    .readdirSync(POETRY_DIR)
    .filter((f) => f.endsWith('.txt'))
    .map((f) => f.replace(/\.txt$/, ''))
    .sort()
}

export function getPoemBySlug(slug: string): { slug: string; title: string; body: string } {
  const filePath = path.join(POETRY_DIR, `${slug}.txt`)
  const raw = fs.readFileSync(filePath, 'utf-8')

  const firstLine = raw.split('\n')[0]
  if (firstLine.startsWith('title:')) {
    const title = firstLine.replace('title:', '').trim()
    const body = raw.split('\n').slice(1).join('\n').trimStart()
    return { slug, title, body }
  }

  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  return { slug, title, body: raw }
}
