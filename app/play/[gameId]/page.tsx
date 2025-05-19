// app/play/[gameId]/page.tsx
'use client'

import {use, useState} from 'react'
import {useRouter} from 'next/navigation'
import QuestionCard from '@/components/QuestionCard'
import {useGame} from '@/hooks/useGame'

interface PlayPageProps {
  params: Promise<{ gameId: string }>
}

export default function PlayPage({params}: PlayPageProps) {
  const router = useRouter()
  const {gameId} = use(params)
  const parsedId = gameId === 'random' ? undefined : Number(gameId)
  const {data: game, isLoading, error} = useGame(parsedId)
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)

  if (isLoading) return <p className="text-center">Loading quiz…</p>
  if (error || !game) return <p className="text-center text-red-500">Error loading quiz.</p>

  const current = game.questions[idx]
  const handleAnswer = (choice: string) => {
    const correct = choice === current.correct
    const newScore = correct ? score + (idx + 1) * 100 : score
    const next = idx + 1
    if (!correct || next >= game.questions.length) {
      router.push(`/result/${game.game_id}?score=${newScore}`)
    } else {
      setScore(newScore)
      setIdx(next)
    }
  }

  return (
    <div className="px-4 py-8">
      <QuestionCard question={current} action={handleAnswer}/>
      <p className="mt-4 text-center">
        Question {idx + 1} of {game.questions.length}
      </p>
    </div>
  )
}

