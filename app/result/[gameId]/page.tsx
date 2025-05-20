// app/result/[gameId]/page.tsx
'use client'

import {use} from 'react'
import {useSearchParams} from 'next/navigation'
import {ResultProvider} from '@/context/ResultContext'
import ScoreForm from '@/components/ScoreForm'
import PlayAgain from '@/components/PlayAgain'

interface ResultPageProps {
  params: Promise<{
    gameId: string
  }>
}

export default function ResultPage({params}: ResultPageProps) {
  const resolvedParams = use(params)
  const searchParams = useSearchParams()
  const score = parseInt(searchParams.get('score') || '0', 10)
  const gameId = parseInt(resolvedParams.gameId, 10)

  return (
    <ResultProvider value={{gameId, score}}>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="space-y-6 w-full max-w-lg">
          {/* Always show PlayAgain component */}
          <PlayAgain/>

          {/* Only show ScoreForm if eligible for leaderboard */}
          <ScoreForm/>
        </div>
      </div>
    </ResultProvider>
  )
}
