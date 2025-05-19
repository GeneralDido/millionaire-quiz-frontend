// app/play/[gameId]/page.tsx
'use client'

import {useParams, useRouter} from 'next/navigation'
import {useGame} from '@/hooks/useGame'
import QuestionCard from '@/components/QuestionCard'
import {useGameState} from '@/hooks/useGameState'
import {useEffect, useState} from 'react'
import {Question} from '@/utils/apiTypes'
import {getQuestionPoints} from '@/utils/game'

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

  if (isLoading) return <p>Loading…</p>
  if (error) return <p className="text-red-600">Error: {error.message}</p>
  if (!game) return <p className="text-red-600">No quiz found.</p>

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

  return (
    <div className="px-4 py-8">
      <div className="max-w-lg mx-auto mb-4 flex justify-between items-center">
        <h2 className="font-medium">Quiz #{game.game_id}</h2>
        <p>Score: {score}</p>
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

      <p className="mt-4 text-center">
        Question {idx + 1} of {Math.min(game.questions.length, 15)}
      </p>
    </div>
  )
}
