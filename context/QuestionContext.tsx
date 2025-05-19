// context/QuestionContext.tsx
import React, {createContext, useContext} from 'react';
import type {Question} from '@/utils/apiTypes';

export interface GameLives {
  fifty: boolean;
  hint: boolean;
  change: boolean;
}

export interface QuestionContextType {
  question: Question;
  questionNumber: number;
  pointValue: number;
  bonusTime: number;
  timeLeft: number;
  doublePointsActive: boolean;
  answers: string[];
  selectedAnswer: string | null;
  showAnswer: boolean;
  removedOptions: string[];
  lives: GameLives;
  showHint: boolean;
  bonusQuestionAvailable: boolean;
  handleSelectAnswer: (ans: string) => void;
  handleUseFifty: () => void;
  handleUseHint: () => void;
  handleChangeQuestion: () => void;
}

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

export function useQuestion() {
  const ctx = useContext(QuestionContext);
  if (!ctx) {
    throw new Error('useQuestion must be used within a QuestionProvider');
  }
  return ctx;
}

export function QuestionProvider({
                                   value,
                                   children
                                 }: {
  value: QuestionContextType;
  children: React.ReactNode;
}) {
  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}
