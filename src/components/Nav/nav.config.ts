export const NAV_ITEMS = [
  {
    label: 'design',
    href: '/design',
    children: [
      { label: 'Circle Family', href: '/design/circle-family' },
      { label: 'Every Intelligence', href: '/design/every-intelligence' },
      { label: 'Project Telephone', href: '/design/project-telephone' },
      { label: 'music.txt', href: '/design/music-txt' },
    ],
  },
  {
    label: 'art',
    href: '/art',
    children: [
      { label: 'photography', href: '/art/photography' },
      { label: 'performance', href: '/art/performance' },
      { label: 'poetry', href: '/art/poetry' },
      { label: 'music', href: '/art/music' },
    ],
  },
  {
    label: 'about me',
    href: '/about',
    children: [
      { label: 'philosophy', href: '/about/philosophy' },
      { label: 'biography', href: '/about/biography' },
      { label: 'contact', href: '/about/contact' },
    ],
  },
] as const
