// hooks/useGameLogic.ts
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Question} from '@/utils/apiTypes';
import {useGameState} from './useGameState';
import {BONUS_TIME, getQuestionPoints} from '@/utils/game';

interface UseGameLogicParams {
  gameId: string | number;
  questions: Question[] | null;
  bonusQuestion: Question | null;
  maxQuestions?: number;
}

export function useGameLogic({
                               gameId,
                               questions,
                               bonusQuestion,
                               maxQuestions = 15
                             }: UseGameLogicParams) {
  const router = useRouter();
  const {
    idx,
    score,
    lives,
    removedOptions,
    usedBonusQuestion,
    startTime,
    setIdx,
    setScore,
    setLives,
    setRemovedOptions,
    setUsedBonusQuestion,
    setStartTime,
    resetGame
  } = useGameState(gameId);

  // Current question
  const currentQuestion = questions?.[idx] || null;
  const pointValue = getQuestionPoints(idx);
  const actualMaxQuestions = Math.min(questions?.length || 0, maxQuestions);

  // Progress calculation
  const progressPercent = questions ? Math.round((idx / actualMaxQuestions) * 100) : 0;

  // Set the timer when a new question loads
  useEffect(() => {
    // If we have questions but startTime is not set, initialize it immediately
    if (currentQuestion && startTime === 0) {
      setStartTime(Date.now());
    }
  }, [currentQuestion, startTime, setStartTime]);


  // Handle answer selection
  const handleAnswer = (choice: string) => {
    if (!currentQuestion) return;

    const correct = choice === currentQuestion.correct;

    // Calculate time-based bonus
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const doublePoints = elapsed <= BONUS_TIME;
    const pointMultiplier = doublePoints && correct ? 2 : 1;

    // Calculate new score
    const newScore = correct ? score + (pointValue * pointMultiplier) : score;
    const nextIdx = idx + 1;

    if (!correct || nextIdx >= actualMaxQuestions) {
      // Game over - either wrong answer or finished all questions
      resetGame();
      router.push(`/result/${gameId}?score=${newScore}`);
    } else {
      // Move to next question
      setScore(newScore);
      setIdx(nextIdx);
      setStartTime(Date.now()); // Reset timer for next question
      setRemovedOptions([]); // Reset removed options
    }
  };

  // Fifty-fifty lifeline
  const handleUseFifty = () => {
    if (!lives.fifty || !currentQuestion) return;

    // Get wrong answers only
    const wrongOptions = currentQuestion.wrong;

    // Randomly select 2 wrong answers to remove
    const shuffled = [...wrongOptions].sort(() => Math.random() - 0.5);
    const toRemove = shuffled.slice(0, Math.min(2, wrongOptions.length));

    setRemovedOptions(toRemove);
    setLives({...lives, fifty: false});
  };

  // Hint lifeline
  const handleUseHint = () => {
    if (!lives.hint) return;
    setLives({...lives, hint: false});
  };

  // Change question lifeline
  const handleChangeQuestion = () => {
    if (!lives.change || !bonusQuestion || usedBonusQuestion) return false;

    setLives({...lives, change: false});
    setUsedBonusQuestion(true);
    setStartTime(Date.now()); // Reset timer for the new question
    setRemovedOptions([]); // Reset removed options

    return true; // Indicate success
  };

  return {
    currentQuestion,
    idx,
    score,
    lives,
    removedOptions,
    startTime,
    pointValue,
    progressPercent,
    handleAnswer,
    handleUseFifty,
    handleUseHint,
    handleChangeQuestion,
    usedBonusQuestion,
    resetGame
  };
}
