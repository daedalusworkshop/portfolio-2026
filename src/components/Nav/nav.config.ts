export const NAV_ITEMS = [
  {
    label: 'design',
    href: '/design',
    children: [
      { label: 'Circle Family', href: '/design/circle-family' },
      { label: 'Lifeform', href: '/design/lifeform' },
      { label: 'Project Telephone', href: '/design/project-telephone' },
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
