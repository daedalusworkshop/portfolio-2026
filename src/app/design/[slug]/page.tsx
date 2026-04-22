import { getAllDesignSlugs, getDesignProject } from '@/lib/content'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllDesignSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const slugs = getAllDesignSlugs()
  if (!slugs.includes(slug)) return {}
  const { meta } = getDesignProject(slug)
  return { title: meta.title }
}

export default async function DesignProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const slugs = getAllDesignSlugs()
  if (!slugs.includes(slug)) notFound()
  const { meta, body } = getDesignProject(slug)

  return (
    <div className="min-h-screen px-6 py-32 max-w-3xl mx-auto">
      <p className="font-serif text-xs uppercase tracking-[0.3em] text-white/25 mb-6">
        {meta.year ?? ''}
      </p>
      <h1 className="font-serif text-4xl md:text-6xl text-white/90 mb-12">{meta.title}</h1>
      {meta.description && (
        <p className="text-white/50 text-base mb-16 max-w-lg">{meta.description}</p>
      )}
      <article
        className="prose prose-invert prose-lg font-serif max-w-none"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  )
}
