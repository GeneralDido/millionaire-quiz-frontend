// components/PlayAgain.tsx
'use client'

import {useTranslations} from 'next-intl'
import {Button} from '@/components/ui/button'
import {useRouter} from 'next/navigation'
import {useResult} from '@/context/ResultContext'

export default function PlayAgain() {
  const {score} = useResult()
  const router = useRouter()
  const t = useTranslations('PlayAgain')

  const getEncouragementMessage = (score: number) => {
    if (score === 0) return t('encouragement.betterLuck')
    if (score < 5000) return t('encouragement.goodEffort')
    if (score < 50000) return t('encouragement.greatJob')
    return t('encouragement.outstanding')
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-card/40 backdrop-blur-sm border border-border/40 rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-4">{t('gameOver')}</h1>
        <div className="inline-block mb-4 px-6 py-3 rounded-lg peak-puzzler-gradient">
          <span className="text-4xl font-bold text-white">{score.toLocaleString()}</span>
        </div>
        <p className="text-lg text-foreground/80">
          {getEncouragementMessage(score)}
        </p>
      </div>

      <Button
        onClick={() => router.push('/play/random')}
        className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-600/90 hover:to-blue-600/90"
      >
        {t('playAgain')}
      </Button>
    </div>
  )
}
