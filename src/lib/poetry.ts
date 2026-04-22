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

export function getPoemBySlug(slug: string): { slug: string; body: string } {
  const filePath = path.join(POETRY_DIR, `${slug}.txt`)
  const body = fs.readFileSync(filePath, 'utf-8')
  return { slug, body }
}
