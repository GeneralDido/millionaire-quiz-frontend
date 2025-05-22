// components/navigation/AppHeader.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useTranslations} from 'next-intl'
import ThemeToggle from '@/components/ThemeToggle'
import MobileNavigation from './MobileNavigation'
import {DesktopNavigation} from './DesktopNavigation'

export function AppHeader() {
  const t = useTranslations('Navigation')

  return (
    <header className="py-4 px-6 border-b border-border/50 backdrop-blur-sm bg-background/80 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/favicon.svg"
              alt="PeakPuzzler logo"
              width={24}
              height={24}
              className="mr-2"
            />
            <span
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              {t('PeakPuzzlerQuiz')}
            </span>
          </Link>
          <DesktopNavigation/>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle/>
          <MobileNavigation/>
        </div>
      </div>
    </header>
  )
}
