import Link from 'next/link'

const style = { fontSize: 'clamp(1.4rem, min(5.2vw, 5vh), 3rem)' }
const cls = "display-serif font-serif text-white/90 leading-[1.2] tracking-[-0.015em] [text-wrap:pretty]"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-8 pt-28 pb-16">
      <div className="w-full max-w-2xl flex flex-col gap-[1.25em]">
        <p className={cls} style={style}>
          If it moves like{' '}
          <Link href="/art/poetry" className="underline underline-offset-4 decoration-1 hover:text-white/60 transition-colors">poetry</Link>
          , then the work is sound. Language is my primary interface with the world.
        </p>
        <p className={cls} style={style}>
          It&rsquo;s in{' '}
          <Link href="/design/circle-family" className="underline underline-offset-4 decoration-1 hover:text-white/60 transition-colors">the lamp I designed to feel like family</Link>
          . It&rsquo;s in{' '}
          <a href="https://telephone.kasra.world/portfolio.html" className="underline underline-offset-4 decoration-1 hover:text-white/60 transition-colors">the telephone booth that brings out our blues</a>
          . It&rsquo;s in{' '}
          <Link href="/art/photography" className="underline underline-offset-4 decoration-1 hover:text-white/60 transition-colors">the photos I take</Link>
          {' '}and{' '}
          <Link href="/art/music" className="underline underline-offset-4 decoration-1 hover:text-white/60 transition-colors">the music I make</Link>
          .{' '}
          <Link href="/about/philosophy" className="underline underline-offset-4 decoration-1 hover:text-white/60 transition-colors">There is casual magic everywhere.</Link>
        </p>
      </div>
    </div>
  )
}
