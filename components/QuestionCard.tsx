// Updated QuestionCard.tsx
'use client'

import {useState, useMemo, useEffect} from 'react'
import type {Question} from '@/utils/apiTypes'
import {Card, CardHeader, CardContent, CardFooter} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Progress} from '@/components/ui/progress'
import {SplitSquareVertical, HelpCircle, Shuffle} from 'lucide-react'

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
  const initialTimeLeft = startTime
    ? Math.max(15 - Math.floor((Date.now() - startTime) / 1000), 0)
    : 15;

  const [showHint, setShowHint] = useState(false)
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft)
  const [doublePointsActive, setDoublePointsActive] = useState(initialTimeLeft > 0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  // Reset states when question changes
  useEffect(() => {
    setShowHint(false);
    setSelectedAnswer(null);
    setShowAnswer(false);
  }, [question]);

  // Shuffle answers on component mount or question change
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
      }, 1000)

      return () => clearInterval(interval)
    }
    return undefined
  }, [startTime])

  // Handle answer selection with animation
  const handleSelectAnswer = (ans: string) => {
    setSelectedAnswer(ans);
    setShowAnswer(true);

    // Allow time for animation before proceeding
    setTimeout(() => {
      action(ans);
    }, 500);
  }

  return (
    <Card className="question-card max-w-2xl mx-auto overflow-hidden">
      <div className="absolute inset-0 millionaire-gradient opacity-10 pointer-events-none"/>

      <CardHeader className="bg-card/30 backdrop-blur-sm border-b border-border/30">
        <div className="flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Question {questionNumber}
          </h2>
          <div className="text-right">
            <p className="money-text text-xl sm:text-2xl">${pointValue.toLocaleString()}</p>
            {doublePointsActive && (
              <div className="text-money-gold text-sm font-medium animate-pulse">
                Double points: {timeLeft}s
              </div>
            )}
          </div>
        </div>

        {doublePointsActive && (
          <Progress
            value={timeLeft * 100 / 15}
            className="h-2 bg-background/30 [&>div]:bg-gradient-to-r [&>div]:from-money-gold [&>div]:to-money-green"
          />
        )}

        <h3 className="mt-4 text-xl sm:text-2xl font-medium leading-relaxed">{question.q}</h3>
      </CardHeader>

      <CardContent className="space-y-5 p-6">
        <div className="grid grid-cols-1 gap-3">
          {answers.map((ans) => (
            <Button
              key={ans}
              onClick={() => handleSelectAnswer(ans)}
              disabled={removedOptions.includes(ans) || selectedAnswer !== null}
              variant="outline"
              className={`
                answer-btn py-5 px-6 text-left justify-start text-lg h-auto
                ${selectedAnswer === ans ?
                ans === question.correct ?
                  'bg-green-500/20 dark:bg-green-500/30 border-green-500/40 text-green-700 dark:text-green-400' :
                  'bg-red-500/20 dark:bg-red-500/30 border-red-500/40 text-red-700 dark:text-red-400'
                : ''}
                ${showAnswer && ans === question.correct && selectedAnswer !== ans ?
                'bg-green-500/20 dark:bg-green-500/30 border-green-500/40 text-green-700 dark:text-green-400' :
                ''}
                ${removedOptions.includes(ans) ?
                'opacity-40 line-through' :
                'hover:border-primary/40 hover:bg-primary/5'}
              `}
            >
              {ans}
            </Button>
          ))}
        </div>

        {question.hint && showHint && (
          <div className="mt-2 p-4 bg-accent/30 border border-accent/20 rounded-lg animate-fadeIn">
            <div className="flex gap-2 items-start">
              <HelpCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-accent-foreground/80"/>
              <p className="italic text-accent-foreground">{question.hint}</p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="bg-card/30 backdrop-blur-sm border-t border-border/30 flex justify-between">
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onUseFiftyAction}
            disabled={!lives.fifty || removedOptions.length > 0 || selectedAnswer !== null}
            className={`lifeline-btn gap-1 ${!lives.fifty ? 'lifeline-btn-disabled' : ''}`}
          >
            <SplitSquareVertical className="h-4 w-4"/>
            <span className="hidden sm:inline">50:50</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              onUseHintAction();
              setShowHint(true);
            }}
            disabled={!lives.hint || showHint || selectedAnswer !== null}
            className={`lifeline-btn gap-1 ${!lives.hint ? 'lifeline-btn-disabled' : ''}`}
          >
            <HelpCircle className="h-4 w-4"/>
            <span className="hidden sm:inline">Hint</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onChangeQuestionAction}
            disabled={!lives.change || !bonusQuestion || selectedAnswer !== null}
            className={`lifeline-btn gap-1 ${!lives.change ? 'lifeline-btn-disabled' : ''}`}
          >
            <Shuffle className="h-4 w-4"/>
            <span className="hidden sm:inline">Change</span>
          </Button>
        </div>

        {doublePointsActive && (
          <div className="text-money-gold font-medium text-sm animate-pulse">
            Double points available!
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
