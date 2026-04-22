import Link from 'next/link'

const style = { fontSize: 'clamp(1.4rem, min(5.2vw, 9vh), 5.5rem)' }
const cls = "font-serif text-white/90 leading-[1.25] [text-wrap:pretty]"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center px-16 pt-28 pb-16 gap-[0.75em]">
      <p className={cls} style={style}>
        If it moves like{' '}
        <Link href="/art/poetry" className="underline underline-offset-4 decoration-1 hover:text-white/60 transition-colors">poetry</Link>
        , then the work is sound. Language is my primary interface with the world.
      </p>
      <p className={cls} style={style}>
        It&apos;s in{' '}
        <Link href="/design/circle-family" className="underline underline-offset-4 decoration-1 hover:text-white/60 transition-colors">the lamp I designed to feel like family</Link>
        . It&apos;s in{' '}
        <Link href="/design/project-telephone" className="underline underline-offset-4 decoration-1 hover:text-white/60 transition-colors">the telephone booth which brings out the blues</Link>
        . It&apos;s in{' '}
        <Link href="/art/photography" className="underline underline-offset-4 decoration-1 hover:text-white/60 transition-colors">the photos I take</Link>
        {' '}and{' '}
        <Link href="/art/music" className="underline underline-offset-4 decoration-1 hover:text-white/60 transition-colors">the music I make</Link>
        .{' '}
        <Link href="/about/philosophy" className="underline underline-offset-4 decoration-1 hover:text-white/60 transition-colors">There is casual magic everywhere.</Link>
      </p>
    </div>
  )
}
