type Props = { poem: { slug: string; body: string } }

export default function PoetryReader({ poem }: Props) {
  const lines = poem.body.trimEnd().split('\n')
  const title = poem.slug.replace(/-/g, ' ')

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-32">
      <article className="max-w-lg w-full">
        <h1 className="font-serif text-xs uppercase tracking-[0.3em] text-white/25 mb-16">
          {title}
        </h1>
        <div className="font-serif text-lg leading-relaxed text-white/80">
          {lines.map((line, i) =>
            line.trim() === '' ? (
              <div key={i} className="h-6" />
            ) : (
              <p key={i}>{line}</p>
            )
          )}
        </div>
      </article>
    </div>
  )
}
