// components/ScoreForm.tsx
'use client'

import {useState, useEffect} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {useSubmitScore} from '@/hooks/useSubmitScore'
import {useLeaderboard} from '@/hooks/useLeaderboard'
import {useRouter} from 'next/navigation'
import {useResult} from '@/context/ResultContext'
import {LEADERBOARD_SIZE} from '@/utils/game'
import confetti from 'canvas-confetti'

export default function ScoreForm() {
  const {gameId, score} = useResult()
  const [name, setName] = useState('')
  const router = useRouter()
  const mutation = useSubmitScore(gameId)
  const {data: leaderboard, isLoading: leaderboardLoading} = useLeaderboard()

  // Check if score is eligible for leaderboard
  const isEligibleForLeaderboard = () => {
    if (!leaderboard) return false

    // If leaderboard has fewer than LEADERBOARD_SIZE entries and score > 0, eligible
    if (leaderboard.length < LEADERBOARD_SIZE) return score > 0

    // Check if score is higher than the lowest score in leaderboard
    const lowestScore = leaderboard[leaderboard.length - 1]?.best || 0
    return score > lowestScore && score > 0
  }

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

  // Don't render if loading leaderboard data
  if (leaderboardLoading) {
    return null
  }

  // Don't render if not eligible for leaderboard
  if (!isEligibleForLeaderboard()) {
    return null
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-card/40 backdrop-blur-sm border border-border/40 rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4">🎉 Congratulations!</h2>
        <p className="text-lg text-foreground/80 mb-4">
          Your score qualifies for the leaderboard!
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

        <Button
          onClick={handleSubmit}
          disabled={mutation.isPending || !name}
          className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
        >
          {mutation.isPending ? 'Submitting...' : 'Submit Score'}
        </Button>

        {mutation.isError && (
          <p className="text-center text-red-600 mt-2">
            Error submitting score. Please try again.
          </p>
        )}
      </div>
    </div>
  )
}
