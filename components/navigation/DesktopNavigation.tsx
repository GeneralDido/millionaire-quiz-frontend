// components/navigation/DesktopNavigation.tsx
'use client'

import Link from 'next/link'
import {useTranslations} from 'next-intl'

const navigationLinks = [
  {href: '/', key: 'home'},
  {href: '/leaderboard', key: 'leaderboard'},
  {href: '/how-to-play', key: 'howToPlay'},
  {href: '/admin', key: 'admin'}
] as const

export function DesktopNavigation() {
  const t = useTranslations('Navigation')

  return (
    <nav className="hidden sm:flex space-x-6 ml-8">
      {navigationLinks.map(({href, key}) => (
        <Link
          key={href}
          href={href}
          className="text-foreground/80 hover:text-primary transition-colors"
        >
          {t(key)}
        </Link>
      ))}
    </nav>
  )
}
