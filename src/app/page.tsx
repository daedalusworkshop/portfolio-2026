import Link from 'next/link'

const style = { fontSize: 'clamp(1.4rem, min(5.2vw, 5vh), 3rem)' }
const cls = "display-serif font-serif text-white/90 leading-[1.2] tracking-[-0.015em] [text-wrap:pretty]"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-8 pt-28 pb-16">
      <div className="w-full max-w-2xl flex flex-col gap-[1.25em]">
        <p className={cls} style={style}>
          If it moves like poetry, then the work is sound. Language is my primary interface with the world.
        </p>
        <p className={cls} style={style}>
          Poetry through words, objects, and computers.{' '}
          &ldquo;<Link href="/art/poetry/computergrass" className="underline underline-offset-4 decoration-1 transition-colors hover:text-white/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current">Computers can do so much more than work. They can grow in the grass. They can be softer than rubber.</Link>&rdquo;
        </p>
      </div>
    </div>
  )
}
