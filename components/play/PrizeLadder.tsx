// components/play/PrizeLadder.tsx
'use client'

import {useTranslations} from 'next-intl'
import {POINT_VALUES} from '@/utils/game'

interface PrizeLadderProps {
  maxQuestions: number
  currentQuestionIndex: number
}

export function PrizeLadder({maxQuestions, currentQuestionIndex}: PrizeLadderProps) {
  const t = useTranslations('GamePage')

  return (
    <div className="mt-10 max-w-md mx-auto">
      <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-lg p-4">
        <h3 className="text-center font-medium mb-3">{t('prizeLadder')}</h3>
        <div className="space-y-1">
          {POINT_VALUES.slice(0, maxQuestions).reverse().map((value, i) => {
            const questionIdx = maxQuestions - 1 - i
            const isCurrentQuestion = questionIdx === currentQuestionIndex
            const isPastQuestion = questionIdx < currentQuestionIndex

            return (
              <div
                key={i}
                className={`flex justify-between py-1 px-2 rounded ${
                  isCurrentQuestion
                    ? 'bg-primary text-primary-foreground font-medium'
                    : isPastQuestion
                      ? 'text-foreground/50'
                      : ''
                }`}
                aria-current={isCurrentQuestion ? 'true' : 'false'}
              >
                <span>{t('questionNumber', {number: questionIdx + 1})}</span>
                <span className={isPastQuestion ? '' : 'money-text'}>
                  {value.toLocaleString()}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
