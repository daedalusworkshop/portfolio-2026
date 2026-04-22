import { notFound } from 'next/navigation'

// Add sub-project slugs here when they're ready
const PROJECTS: Record<string, { title: string; embedUrl?: string }> = {}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = PROJECTS[slug]
  if (!project) notFound()

  if (project.embedUrl) {
    return (
      <div className="min-h-screen pt-16">
        <iframe
          src={project.embedUrl}
          title={project.title}
          className="w-full border-0"
          style={{ height: 'calc(100vh - 64px)' }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-32">
      <h1 className="font-serif text-4xl text-white/90">{project.title}</h1>
    </div>
  )
}
