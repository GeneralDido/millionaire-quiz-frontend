// Modified app/play/[gameId]/page.tsx
'use client'

import {useParams, useRouter} from 'next/navigation'
import {useGame} from '@/hooks/useGame'
import QuestionCard from '@/components/QuestionCard'
import {useGameState} from '@/hooks/useGameState'
import {useEffect, useState} from 'react'
import {Question} from '@/utils/apiTypes'
import {getQuestionPoints, POINT_VALUES} from '@/utils/game'

export default function PlayPage() {
  const params = useParams();
  const gameId = params?.gameId ? String(params.gameId) : 'random';
  const router = useRouter()

  // If gameId === 'random' we fetch via /games/random; otherwise /games/{id}
  const parsedId = gameId === 'random' ? undefined : Number(gameId)
  const {data: game, isLoading, error} = useGame(parsedId)

  // Store questions in local state to avoid mutating React Query cache
  const [questions, setQuestions] = useState<Question[] | null>(null);

  // Initialize questions when game data loads
  useEffect(() => {
    if (game?.questions) {
      setQuestions([...game.questions]);
    }
  }, [game]);

  // Get all game state from our hook
  const {
    idx, setIdx,
    score, setScore,
    lives, setLives,
    removedOptions, setRemovedOptions,
    usedBonusQuestion, setUsedBonusQuestion,
    startTime, setStartTime,
    resetGame
  } = useGameState(game?.game_id ?? gameId)

  // Reset game state when transitioning from random to real gameId
  useEffect(() => {
    if (game && gameId === 'random') {
      // Reset all state when we get the real game ID
      resetGame();
      setIdx(0);
      setScore(0);
      setLives({fifty: true, hint: true, change: true});
      setRemovedOptions([]);
      setUsedBonusQuestion(false);
      setStartTime(0);
      router.replace(`/play/${game.game_id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, gameId, router]); // Only include external dependencies

  // Set the timer when a new question loads
  useEffect(() => {
    if (game && startTime === 0) {
      setStartTime(Date.now())
    }
  }, [game, idx, startTime, setStartTime])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading your quiz...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="p-3 rounded-full bg-destructive/10 text-destructive mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">Error Loading Quiz</h2>
        <p className="text-red-600 mb-4">{error.message}</p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Return Home
        </button>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-xl font-semibold mb-4">No quiz found</h2>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Return Home
        </button>
      </div>
    )
  }

  // Use our local questions state if available, otherwise fall back to game.questions
  const current = questions?.[idx] || game.questions[idx];
  const pointValue = getQuestionPoints(idx)

  const handleAnswer = (choice: string) => {
    const correct = choice === current.correct

    // Calculate time-based bonus
    const elapsed = Math.floor((Date.now() - startTime) / 1000)
    const doublePoints = elapsed <= 15
    const pointMultiplier = doublePoints && correct ? 2 : 1

    // Calculate new score
    const newScore = correct ? score + (pointValue * pointMultiplier) : score
    const nextIdx = idx + 1

    // Maximum number of questions is 15 (not including bonus)
    const maxQuestions = Math.min(game.questions.length, 15);

    if (!correct || nextIdx >= maxQuestions) {
      // Game over - either wrong answer or finished all questions
      resetGame();
      router.push(`/result/${game.game_id}?score=${newScore}`)
    } else {
      // Move to next question
      setScore(newScore)
      setIdx(nextIdx)
      setStartTime(Date.now()) // Reset timer for next question
      setRemovedOptions([]) // Reset removed options
    }
  }

  const handleUseFifty = () => {
    if (!lives.fifty) return

    // Get wrong answers only
    const wrongOptions = current.wrong

    // Randomly select 2 wrong answers to remove
    const shuffled = [...wrongOptions].sort(() => Math.random() - 0.5)
    const toRemove = shuffled.slice(0, 2)

    setRemovedOptions(toRemove)
    setLives({...lives, fifty: false})
  }

  const handleUseHint = () => {
    if (!lives.hint) return
    setLives({...lives, hint: false})
    // The QuestionCard component will handle showing the hint
  }

  const handleChangeQuestion = () => {
    if (!lives.change || !game.bonus_question || usedBonusQuestion) return

    // Update our local questions array without mutating the cache
    setQuestions((qs) =>
      qs
        ? qs.map((q, i) => (i === idx ? game.bonus_question! : q))
        : qs
    );

    setLives({...lives, change: false})
    setUsedBonusQuestion(true)
    setStartTime(Date.now()) // Reset timer for the new question
    setRemovedOptions([]) // Reset removed options
  }

  // Calculate percentage progress
  const maxQuestions = Math.min(game.questions.length, 15);
  const progressPercent = Math.round((idx / maxQuestions) * 100);

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-xl">Quiz #{game.game_id}</h2>
            <span className="text-sm px-2 py-1 bg-primary/10 text-primary rounded-full">
              Question {idx + 1} of {maxQuestions}
            </span>
          </div>
          <div className="money-text text-2xl font-mono">${score.toLocaleString()}</div>
        </div>

        <div className="relative h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
            style={{width: `${progressPercent}%`}}
          ></div>
        </div>
      </div>

      <QuestionCard
        question={current}
        bonusQuestion={!usedBonusQuestion ? game.bonus_question : null}
        questionNumber={idx + 1}
        action={handleAnswer}
        lives={lives}
        onUseFiftyAction={handleUseFifty}
        onUseHintAction={handleUseHint}
        onChangeQuestionAction={handleChangeQuestion}
        removedOptions={removedOptions}
        startTime={startTime}
        pointValue={pointValue}
      />

      <div className="mt-10 max-w-md mx-auto">
        <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-lg p-4">
          <h3 className="text-center font-medium mb-3">Prize Ladder</h3>
          <div className="space-y-1">
            {POINT_VALUES.slice(0, maxQuestions).reverse().map((value, i) => {
              const questionIdx = maxQuestions - 1 - i;
              const isCurrentQuestion = questionIdx === idx;
              const isPastQuestion = questionIdx < idx;

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
                >
                  <span>Question {questionIdx + 1}</span>
                  <span className={isPastQuestion ? '' : 'money-text'}>
                    ${value.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
