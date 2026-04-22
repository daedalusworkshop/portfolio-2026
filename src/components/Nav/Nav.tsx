import Link from 'next/link'
import { NAV_ITEMS } from './nav.config'
import DropdownMenu from './DropdownMenu'

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between mix-blend-difference">
      <Link
        href="/"
        className="font-serif text-sm text-white/70 hover:text-white/40 transition-colors outline-none"
      >
        kasra mikaili
      </Link>
      <nav className="flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <DropdownMenu key={item.label} label={item.label} children={item.children} />
        ))}
      </nav>
    </header>
  )
}
