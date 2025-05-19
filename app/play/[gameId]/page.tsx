// app/play/[gameId]/page.tsx
'use client'

import {useParams, useRouter} from 'next/navigation'
import {useGame} from '@/hooks/useGame'
import QuestionCard from '@/components/QuestionCard'
import {useSessionState} from '@/hooks/useSessionState'
import {useEffect} from 'react'

export default function PlayPage() {
  const params = useParams();
  const gameId = params?.gameId ? String(params.gameId) : 'random';
  const router = useRouter()

  // If gameId === 'random' we fetch via /games/random; otherwise /games/{id}
  const parsedId = gameId === 'random' ? undefined : Number(gameId)
  const {data: game, isLoading, error} = useGame(parsedId)

  // Once we’ve got back a real game from “random”, swap the URL to lock in its ID
  useEffect(() => {
    if (gameId === 'random' && game?.game_id) {
      // replace without full reload, so refresh stays on the same quiz
      router.replace(`/play/${game.game_id}`)
    }
  }, [gameId, game, router])

  // pick a stable key for session state: use the real game_id once known
  const key = game?.game_id?.toString() ?? gameId
  const [idx, setIdx] = useSessionState(`quiz-${key}-idx`, 0)
  const [score, setScore] = useSessionState(`quiz-${key}-score`, 0)

  if (isLoading) return <p>Loading…</p>
  if (error) return <p className="text-red-600">Error: {error.message}</p>
  if (!game) return <p className="text-red-600">No quiz found.</p>

  const current = game.questions[idx]
  const handleAnswer = (choice: string) => {
    const correct = choice === current.correct
    const newScore = correct ? score + (idx + 1) * 100 : score
    const next = idx + 1

    if (!correct || next >= game.questions.length) {
      // clear out in-progress state
      sessionStorage.removeItem(`quiz-${key}-idx`)
      sessionStorage.removeItem(`quiz-${key}-score`)
      router.push(`/result/${game.game_id}?score=${newScore}`)
    } else {
      setScore(newScore)
      setIdx(next)
    }
  }

  return (
    <div className="px-4 py-8">
      <h2 className="text-center text-lg font-medium">
        Quiz #{game.game_id}
      </h2>
      <QuestionCard
        question={current}
        action={handleAnswer}
      />
      <p className="mt-4 text-center">
        Question {idx + 1} of {game.questions.length}
      </p>
    </div>
  )
}
