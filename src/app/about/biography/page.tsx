export const metadata = { title: 'biography' }

export default function Biography() {
  return (
    <div className="min-h-screen px-6 py-32 max-w-2xl mx-auto">
      <h1 className="font-serif text-xs uppercase tracking-[0.3em] text-white/25 mb-16">
        biography
      </h1>
      <article className="prose prose-invert prose-xl font-serif max-w-none">
        <p className="text-white/50 italic">bio coming soon</p>
      </article>
    </div>
  )
}
