// app/play/[gameId]/page.tsx
'use client'

import {useParams, useRouter} from 'next/navigation'
import {useTranslations} from 'next-intl'
import {useGame} from '@/hooks/useGame'
import QuestionCard from '@/components/QuestionCard'
import QuestionCardSkeleton from '@/components/QuestionCardSkeleton'
import {useGameLogic} from '@/hooks/useGameLogic'
import {useEffect, useState} from 'react'
import {Question} from '@/utils/apiTypes'
import {GameHeader} from '@/components/play/GameHeader'
import {PrizeLadder} from '@/components/play/PrizeLadder'
import {ErrorState} from '@/components/ui/ErrorState'
import {EmptyState} from '@/components/ui/EmptyState'

export default function PlayPage() {
  const params = useParams()
  const gameId = params?.gameId ? String(params.gameId) : 'random'
  const router = useRouter()
  const t = useTranslations('GamePage')

  // If gameId === 'random' we fetch via /games/random; otherwise /games/{id}
  const parsedId = gameId === 'random' ? undefined : Number(gameId)
  const {data: game, isLoading, error} = useGame(parsedId)

  // Store questions in local state to avoid mutating React Query cache
  const [questions, setQuestions] = useState<Question[] | null>(null)

  // Initialize questions when game data loads
  useEffect(() => {
    if (game?.questions) {
      setQuestions([...game.questions])
    }
  }, [game])

  // Use our custom hook for game logic
  const {
    currentQuestion,
    idx,
    score,
    lives,
    removedOptions,
    startTime,
    pointValue,
    progressPercent,
    handleAnswer,
    handleUseFifty,
    handleUseHint,
    handleChangeQuestion,
    usedBonusQuestion,
    resetGame
  } = useGameLogic({
    gameId: game?.game_id ?? gameId,
    questions,
    bonusQuestion: game?.bonus_question || null,
    maxQuestions: 15
  })

  // Reset game state when transitioning from random to real gameId
  useEffect(() => {
    if (game && gameId === 'random') {
      // Reset all state and redirect to the real game ID
      resetGame()
      router.replace(`/play/${game.game_id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, gameId, router])

  // Handle change question action (replace current with bonus)
  const handleChangeQuestionAction = () => {
    if (handleChangeQuestion() && game?.bonus_question) {
      // Update our local questions array without mutating the cache
      setQuestions((qs) =>
        qs?.map((q, i) => (i === idx ? game.bonus_question! : q)) || null
      )
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="h-16 animate-pulse bg-muted/50 rounded-lg mb-3"></div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden"></div>
        </div>
        <QuestionCardSkeleton/>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <ErrorState
        title={t('errorLoadingQuiz')}
        message={error.message}
      />
    )
  }

  // No game found
  if (!game) {
    return (
      <EmptyState
        title={t('noQuizFound')}
      >
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          aria-label={t('returnHomeAriaLabel')}
        >
          {t('returnHome')}
        </button>
      </EmptyState>
    )
  }

  // Maximum number of questions
  const maxQuestions = Math.min(game.questions.length, 15)

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <GameHeader
        gameId={game.game_id}
        currentQuestion={idx + 1}
        totalQuestions={maxQuestions}
        score={score}
        progressPercent={progressPercent}
      />

      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          bonusQuestion={!usedBonusQuestion ? game.bonus_question : null}
          questionNumber={idx + 1}
          action={handleAnswer}
          lives={lives}
          onUseFiftyAction={handleUseFifty}
          onUseHintAction={handleUseHint}
          onChangeQuestionAction={handleChangeQuestionAction}
          removedOptions={removedOptions}
          startTime={startTime}
          pointValue={pointValue}
        />
      )}

      <PrizeLadder
        maxQuestions={maxQuestions}
        currentQuestionIndex={idx}
      />
    </div>
  )
}
