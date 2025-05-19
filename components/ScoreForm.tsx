// Improved ScoreForm.tsx
'use client'

import {useState, useEffect} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {useSubmitScore} from '@/hooks/useSubmitScore'
import {useRouter} from 'next/navigation'
import confetti from 'canvas-confetti'

interface ScoreFormProps {
  gameId: number
  score: number
}

export default function ScoreForm({gameId, score}: ScoreFormProps) {
  const [name, setName] = useState('')
  const router = useRouter()
  const mutation = useSubmitScore(gameId)

  // Celebration effect for high scores
  useEffect(() => {
    if (score > 10000) {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const runConfetti = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: {x: 0},
          colors: ['#60a5fa', '#8b5cf6', '#10b981']
        });

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: {x: 1},
          colors: ['#60a5fa', '#8b5cf6', '#10b981']
        });

        if (Date.now() < end) {
          requestAnimationFrame(runConfetti);
        }
      };

      runConfetti();
    }
  }, [score]);

  const handleSubmit = () => {
    if (!name) return
    mutation.mutate({player_name: name, score})
    router.push('/leaderboard')
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-card/40 backdrop-blur-sm border border-border/40 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3">Game Over!</h1>
        <div className="inline-block mb-2 px-6 py-3 rounded-lg millionaire-gradient">
          <span className="text-4xl font-bold text-white">${score.toLocaleString()}</span>
        </div>
        <p className="text-lg text-foreground/80">
          {score === 0
            ? "Better luck next time!"
            : score < 5000
              ? "Good effort!"
              : score < 50000
                ? "Great job!"
                : "Outstanding performance!"}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="player-name" className="block text-sm font-medium">
            Enter your name to join the leaderboard
          </label>
          <Input
            id="player-name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 text-lg"
          />
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={handleSubmit}
            disabled={mutation.isPending || !name}
            className="flex-1 h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          >
            {mutation.isPending ? 'Submitting...' : 'Submit Score'}
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="h-12"
          >
            Play Again
          </Button>
        </div>

        {mutation.isError && (
          <p className="text-center text-red-600 mt-2">
            Error submitting score. Please try again.
          </p>
        )}
      </div>
    </div>
  )
}
