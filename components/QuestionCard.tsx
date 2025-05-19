// components/QuestionCard.tsx
'use client'

import {useState, useMemo, useEffect} from 'react'
import type {Question} from '@/utils/apiTypes'
import {Card, CardHeader, CardContent, CardFooter} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Progress} from '@/components/ui/progress'


interface GameLives {
  fifty: boolean
  hint: boolean
  change: boolean
}

interface QuestionCardProps {
  question: Question
  bonusQuestion?: Question | null
  questionNumber: number
  action: (choice: string) => void
  lives: GameLives
  onUseFiftyAction: () => void
  onUseHintAction: () => void
  onChangeQuestionAction: () => void
  removedOptions: string[]
  startTime: number
  pointValue: number
}

export default function QuestionCard({
                                       question,
                                       bonusQuestion,
                                       questionNumber,
                                       action,
                                       lives,
                                       onUseFiftyAction,
                                       onUseHintAction,
                                       onChangeQuestionAction,
                                       removedOptions,
                                       startTime,
                                       pointValue
                                     }: QuestionCardProps) {
  const [showHint, setShowHint] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [doublePointsActive, setDoublePointsActive] = useState(true)

  // Reset showHint when question changes
  useEffect(() => {
    setShowHint(false);
  }, [question]);

  // Shuffle answers on component mount
  const answers = useMemo(() => {
    const opts = [question.correct, ...question.wrong]
    return opts.sort(() => Math.random() - 0.5)
  }, [question])

  // Timer for double points
  useEffect(() => {
    if (startTime > 0) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000)
        const remaining = Math.max(15 - elapsed, 0)
        setTimeLeft(remaining)

        if (remaining === 0) {
          setDoublePointsActive(false)
          clearInterval(interval)
        }
      }, 100)

      return () => clearInterval(interval)
    }

    return undefined
  }, [startTime])

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Question {questionNumber}</h2>
          <div className="text-right">
            <p className="font-bold">{pointValue} points</p>
            {doublePointsActive && (
              <p className="text-green-600 text-sm">Double points: {timeLeft}s</p>
            )}
          </div>
        </div>
        {doublePointsActive && (
          <Progress value={timeLeft * 100 / 15} className="h-2"/>
        )}
        <h3 className="text-lg mt-4">{question.q}</h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {answers.map((ans) => (
            <Button
              key={ans}
              onClick={() => action(ans)}
              disabled={removedOptions.includes(ans)}
              variant={removedOptions.includes(ans) ? "outline" : "default"}
              className={removedOptions.includes(ans) ? "opacity-50" : ""}
            >
              {ans}
            </Button>
          ))}
        </div>

        {question.hint && showHint && (
          <div className="mt-2 p-3 bg-accent rounded-md">
            <p className="italic">{question.hint}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onUseFiftyAction}
            disabled={!lives.fifty || removedOptions.length > 0}
          >
            50:50
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              onUseHintAction();
              setShowHint(true);
            }}
            disabled={!lives.hint || showHint}
          >
            Hint
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onChangeQuestionAction}
            disabled={!lives.change || !bonusQuestion}
          >
            Change
          </Button>
        </div>

        {doublePointsActive && (
          <div className="text-green-600 font-medium">
            Double points available!
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
