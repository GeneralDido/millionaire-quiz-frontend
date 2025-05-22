// components/HeroSection.tsx
'use client'

import Image from 'next/image'
import {useTranslations} from 'next-intl'

interface HeroSectionProps {
  className?: string
}

export function HeroSection({className = ""}: HeroSectionProps) {
  const t = useTranslations('HomePage')

  return (
    <div className={`text-center space-y-6 py-10 sm:py-0 ${className}`}>
      <Image
        src="/favicon.svg"
        alt="PeakPuzzler logo"
        width={96}
        height={96}
        className="mx-auto"
      />
      <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight">
        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          {t('title')}
        </span>
        <span className="block text-foreground">{t('subtitle')}</span>
      </h1>
      <p className="max-w-md mx-auto text-lg text-foreground/70">
        {t('description')}
      </p>
    </div>
  )
}
