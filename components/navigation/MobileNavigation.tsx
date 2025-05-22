// components/navigation/MobileNavigation.tsx
'use client'

import {useState} from 'react'
import Link from 'next/link'
import {useTranslations} from 'next-intl'
import {Menu, X} from 'lucide-react'
import {Button} from '@/components/ui/button'

const navigationLinks = [
  {href: '/', key: 'home'},
  {href: '/leaderboard', key: 'leaderboard'},
  {href: '/how-to-play', key: 'howToPlay'},
  {href: '/admin', key: 'admin'}
] as const

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('Navigation')

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Mobile menu button - only visible on small screens */}
      <div className="sm:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMenu}
          className="p-2"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
        </Button>
      </div>

      {/* Mobile menu overlay - only visible when menu is open */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            onClick={closeMenu}
          />

          {/* Menu content */}
          <div
            className="fixed top-[73px] left-0 right-0 bg-background border-b border-border/50 shadow-lg z-50 sm:hidden">
            <nav className="flex flex-col p-4 space-y-3">
              {navigationLinks.map(({href, key}) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="text-foreground/80 hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-secondary/50"
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  )
}
