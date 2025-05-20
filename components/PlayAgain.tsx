// components/PlayAgain.tsx
'use client'

import {Button} from '@/components/ui/button'
import {useRouter} from 'next/navigation'
import {useResult} from '@/context/ResultContext'

export default function PlayAgain() {
  const {score} = useResult()
  const router = useRouter()

  const getEncouragementMessage = (score: number) => {
    if (score === 0) return "Better luck next time!"
    if (score < 5000) return "Good effort!"
    if (score < 50000) return "Great job!"
    return "Outstanding performance!"
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-card/40 backdrop-blur-sm border border-border/40 rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Game Over!</h1>
        <div className="inline-block mb-4 px-6 py-3 rounded-lg millionaire-gradient">
          <span className="text-4xl font-bold text-white">${score.toLocaleString()}</span>
        </div>
        <p className="text-lg text-foreground/80">
          {getEncouragementMessage(score)}
        </p>
      </div>

      <Button
        onClick={() => router.push('/play/random')}
        className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-600/90 hover:to-blue-600/90"
      >
        Play Again
      </Button>
    </div>
  )
}
