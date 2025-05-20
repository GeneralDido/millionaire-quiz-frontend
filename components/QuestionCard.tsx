// components/QuestionCard.tsx
'use client';

import {useState, useEffect, useMemo} from 'react';
import type {Question} from '@/utils/apiTypes';
import {Card, CardHeader, CardContent, CardFooter} from '@/components/ui/card';
import {QuestionProvider, QuestionContextType, GameLives} from '@/context/QuestionContext';
import {QuestionHeader} from '@/components/question/QuestionHeader';
import {AnswerOptions} from '@/components/question/AnswerOptions';
import {HintDisplay} from '@/components/question/HintDisplay';
import {LifelinesPanel} from '@/components/question/LifelinesPanel';
import {BONUS_TIME} from '@/utils/game';

export interface QuestionCardProps {
  question: Question;
  bonusQuestion?: Question | null;
  questionNumber: number;
  action: (choice: string) => void;
  lives: GameLives;
  onUseFiftyAction: () => void;
  onUseHintAction: () => void;
  onChangeQuestionAction: () => void;
  removedOptions: string[];
  startTime: number;
  pointValue: number;
}

export default function QuestionCard(props: QuestionCardProps) {
  const {
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
  } = props;

  // Single source of truth: always start at full BONUS_TIME
  const [timeLeft, setTimeLeft] = useState(
    startTime
      ? Math.max(BONUS_TIME - Math.floor((Date.now() - startTime) / 1000), 0)
      : BONUS_TIME
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // derive double–points purely from timeLeft
  const doublePointsActive = timeLeft > 0;

  // reset timer & UI flags whenever we load a new question
  useEffect(() => {
    setTimeLeft(BONUS_TIME);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setShowHint(false);
  }, [question]);

  // tick down the timer every second
  useEffect(() => {
    if (startTime > 0) {
      const id = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setTimeLeft(Math.max(BONUS_TIME - elapsed, 0));
      }, 1000);
      return () => clearInterval(id);
    }
  }, [startTime]);

  // true Fisher–Yates shuffle
  const answers = useMemo(() => {
    const opts = [question.correct, ...question.wrong];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [question]);

  // user chooses an answer
  const handleSelectAnswer = (ans: string) => {
    setSelectedAnswer(ans);
    setShowAnswer(true);
    // wait for the highlight animation
    setTimeout(() => action(ans), 500);
  };

  // hint lifeline
  const handleUseHint = () => {
    onUseHintAction();
    setShowHint(true);
  };

  // build context payload
  const contextValue: QuestionContextType = {
    question,
    questionNumber,
    pointValue,
    bonusTime: BONUS_TIME,
    timeLeft,
    doublePointsActive,
    answers,
    selectedAnswer,
    showAnswer,
    removedOptions,
    lives,
    showHint,
    bonusQuestionAvailable: !!bonusQuestion,
    handleSelectAnswer,
    handleUseFifty: onUseFiftyAction,
    handleUseHint,
    handleChangeQuestion: onChangeQuestionAction
  };

  return (
    <QuestionProvider value={contextValue}>
      <Card className="question-card max-w-2xl mx-auto overflow-hidden">
        <div className="absolute inset-0 millionaire-gradient opacity-10 pointer-events-none"/>

        <CardHeader className="bg-card/30 backdrop-blur-sm border-b border-border/30">
          <QuestionHeader/>
        </CardHeader>

        <CardContent className="space-y-5 p-6">
          <AnswerOptions/>
          <HintDisplay/>
        </CardContent>

        <CardFooter
          className="bg-card/30 backdrop-blur-sm border-t border-border/30 flex flex-col sm:flex-row justify-between gap-3 sm:gap-2">
          <LifelinesPanel/>
          {doublePointsActive && (
            <div className="text-money-gold font-medium text-sm animate-pulse text-center sm:text-right"
                 aria-live="polite">
              Double points available!
            </div>
          )}
        </CardFooter>
      </Card>
    </QuestionProvider>
  );
}

