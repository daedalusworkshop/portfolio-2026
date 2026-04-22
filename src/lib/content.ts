import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const DESIGN_DIR = path.join(process.cwd(), 'content', 'design')

export type ProjectMeta = {
  title: string
  year?: string
  tags?: string[]
  cover?: string
  description?: string
}

export function getAllDesignSlugs(): string[] {
  if (!fs.existsSync(DESIGN_DIR)) return []
  return fs
    .readdirSync(DESIGN_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getDesignProject(slug: string): { meta: ProjectMeta; body: string } {
  const raw = fs.readFileSync(path.join(DESIGN_DIR, `${slug}.md`), 'utf-8')
  const { data, content } = matter(raw)
  return { meta: data as ProjectMeta, body: content }
}

export function getMarkdownPage(filePath: string): { meta: Record<string, string>; body: string } {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { meta: data as Record<string, string>, body: content }
}
