export const NAV_ITEMS = [
  {
    label: 'design',
    href: '/design',
    children: [
      { label: 'Circle Family', href: '/design/circle-family' },
      { label: 'Project Telephone', href: 'https://telephone.kasra.world/portfolio.html' },
    ],
  },
  {
    label: 'art',
    href: '/art',
    children: [
      { label: 'photography', href: '/art/photography' },
      { label: 'poetry', href: '/art/poetry' },
    ],
  },
  {
    label: 'about me',
    href: '/about',
    children: [
      { label: 'philosophy', href: '/about/philosophy' },
      { label: 'contact', href: '/about/contact' },
    ],
  },
] as const
