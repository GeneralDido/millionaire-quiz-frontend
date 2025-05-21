// components/MobileNavigation.tsx
'use client'

import {useState} from 'react'
import Link from 'next/link'
import {Menu, X} from 'lucide-react'
import {Button} from '@/components/ui/button'

const navLinks = [
  {href: '/', label: 'Home'},
  {href: '/leaderboard', label: 'Leaderboard'},
  {href: '/how-to-play', label: 'How to Play'},
  {href: '/admin', label: 'Admin'}
]

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)

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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-foreground/80 hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-secondary/50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  )
}
