import { getAllPoemSlugs, getPoemBySlug } from '@/lib/poetry'
import PoetryReader from '@/components/PoetryReader'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllPoemSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return { title: slug.replace(/-/g, ' ') }
}

export default async function PoemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const slugs = getAllPoemSlugs()
  if (!slugs.includes(slug)) notFound()
  const poem = getPoemBySlug(slug)
  return <PoetryReader poem={poem} />
}
