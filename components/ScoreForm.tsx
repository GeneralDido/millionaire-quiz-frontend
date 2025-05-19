// components/ScoreForm.tsx
'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {useSubmitScore} from '@/hooks/useSubmitScore'
import {useRouter} from 'next/navigation'

interface ScoreFormProps {
  gameId: number
  score: number
}

export default function ScoreForm({gameId, score}: ScoreFormProps) {
  const [name, setName] = useState('')
  const router = useRouter()
  const mutation = useSubmitScore(gameId)

  const handleSubmit = () => {
    if (!name) return
    mutation.mutate({player_name: name, score})
    router.push('/leaderboard')
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-lg font-medium">Your final score: {score}</h2>
      <Input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={mutation.isPending}>
        Submit Score
      </Button>
      {mutation.isError && (
        <p className="text-red-600">Error submitting score. Try again.</p>
      )}
    </div>
  )
}
