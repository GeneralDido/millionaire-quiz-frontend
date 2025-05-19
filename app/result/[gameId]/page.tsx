// app/result/[gameId]/page.tsx
'use client'

import {useSearchParams} from 'next/navigation'
import ScoreForm from '@/components/ScoreForm'
import {use} from 'react'

interface ResultPageProps {
  params: Promise<{ gameId: string }>
}

export default function ResultPage({params}: ResultPageProps) {
  const {gameId} = use(params)
  const search = useSearchParams()
  const scoreParam = search.get('score')
  const score = scoreParam ? Number(scoreParam) : 0

  return (
    <div className="px-4 py-8">
      <ScoreForm gameId={Number(gameId)} score={score}/>
    </div>
  )
}
