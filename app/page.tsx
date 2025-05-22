// app/page.tsx
'use client'

import {HeroSection} from '@/components/HeroSection'
import {GameSelector} from '@/components/GameSelector'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] -mt-16 space-y-12">
      <HeroSection/>
      <GameSelector/>
    </div>
  )
}
