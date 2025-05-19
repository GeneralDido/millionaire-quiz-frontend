// app/play/[gameId]/page.tsx
'use client'

import {useParams, useRouter} from 'next/navigation'
import {useGame} from '@/hooks/useGame'
import QuestionCard from '@/components/QuestionCard'
import {useGameState} from '@/hooks/useGameState'
import {useEffect} from 'react'

export default function PlayPage() {
  const params = useParams();
  const gameId = params?.gameId ? String(params.gameId) : 'random';
  const router = useRouter()

  // If gameId === 'random' we fetch via /games/random; otherwise /games/{id}
  const parsedId = gameId === 'random' ? undefined : Number(gameId)
  const {data: game, isLoading, error} = useGame(parsedId)

  // Once we've got back a real game from "random", swap the URL
  useEffect(() => {
    if (gameId === 'random' && game?.game_id) {
      // replace without full reload, so refresh stays on the same quiz
      router.replace(`/play/${game.game_id}`)
    }
  }, [gameId, game, router])

  // Use our game state hook for all the game mechanics
  const {
    idx, setIdx,
    score, setScore,
    lives, setLives,
    removedOptions, setRemovedOptions,
    usedBonusQuestion, setUsedBonusQuestion,
    startTime, setStartTime,
    getQuestionPoints,
    resetGame
  } = useGameState(game?.game_id ?? gameId)

  // Set the timer when a new question loads
  useEffect(() => {
    if (game && startTime === 0) {
      setStartTime(Date.now())
    }
  }, [game, idx, startTime, setStartTime])

  if (isLoading) return <p>Loading…</p>
  if (error) return <p className="text-red-600">Error: {error.message}</p>
  if (!game) return <p className="text-red-600">No quiz found.</p>

  const current = game.questions[idx]
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

    if (!correct || nextIdx >= game.questions.length) {
      // Game over - either wrong answer or finished all questions
      resetGame()
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

    // Replace current question with bonus question
    const newQuestions = [...game.questions]
    newQuestions[idx] = game.bonus_question
    game.questions = newQuestions

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
        Question {idx + 1} of {game.questions.length}
      </p>
    </div>
  )
}
