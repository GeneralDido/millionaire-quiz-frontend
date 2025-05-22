// components/play/GameHeader.tsx
'use client'

import {useTranslations} from 'next-intl'

interface GameHeaderProps {
  gameId: number
  currentQuestion: number
  totalQuestions: number
  score: number
  progressPercent: number
}

export function GameHeader({
                             gameId,
                             currentQuestion,
                             totalQuestions,
                             score,
                             progressPercent
                           }: GameHeaderProps) {
  const t = useTranslations('GamePage')

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-xl">{t('quizNumber', {id: gameId})}</h2>
          <span className="text-sm px-2 py-1 bg-primary/10 text-primary rounded-full">
            {t('questionProgress', {current: currentQuestion, total: totalQuestions})}
          </span>
        </div>
        <div className="money-text text-2xl font-mono" aria-label={t('currentScore', {score})}>
          ${score.toLocaleString()}
        </div>
      </div>

      <div
        className="relative h-2 w-full bg-secondary rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t('quizProgress', {progress: progressPercent})}
      >
        <div
          className="absolute h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
          style={{width: `${progressPercent}%`}}
        ></div>
      </div>
    </div>
  )
}
