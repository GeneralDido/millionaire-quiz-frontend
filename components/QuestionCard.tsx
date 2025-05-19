// components/QuestionCard.tsx
'use client'

import {useState, useMemo} from 'react'
import type {Question} from '@/utils/apiTypes'
import {Card, CardHeader, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'

interface QuestionCardProps {
  question: Question
  action: (choice: string) => void
}

export default function QuestionCard({question, action}: QuestionCardProps) {
  const [showHint, setShowHint] = useState(false)
  const answers = useMemo(() => {
    const opts = [question.correct, ...question.wrong]
    return opts.sort(() => Math.random() - 0.5)
  }, [question])

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold">{question.q}</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {answers.map((ans) => (
            <Button key={ans} onClick={() => action(ans)}>
              {ans}
            </Button>
          ))}
        </div>
        {question.hint && (
          <div>
            <Button variant="link" onClick={() => setShowHint((v) => !v)}>
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
            {showHint && <p className="mt-2 italic text-sm">{question.hint}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
