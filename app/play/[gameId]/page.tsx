// app/play/[gameId]/page.tsx (updated)
'use client';

import {useParams, useRouter} from 'next/navigation';
import {useGame} from '@/hooks/useGame';
import QuestionCard from '@/components/QuestionCard';
import QuestionCardSkeleton from '@/components/QuestionCardSkeleton';
import {useGameLogic} from '@/hooks/useGameLogic';
import {useEffect, useState} from 'react';
import {Question} from '@/utils/apiTypes';
import {POINT_VALUES} from '@/utils/game';

export default function PlayPage() {
  const params = useParams();
  const gameId = params?.gameId ? String(params.gameId) : 'random';
  const router = useRouter();

  // If gameId === 'random' we fetch via /games/random; otherwise /games/{id}
  const parsedId = gameId === 'random' ? undefined : Number(gameId);
  const {data: game, isLoading, error} = useGame(parsedId);

  // Store questions in local state to avoid mutating React Query cache
  const [questions, setQuestions] = useState<Question[] | null>(null);

  // Initialize questions when game data loads
  useEffect(() => {
    if (game?.questions) {
      setQuestions([...game.questions]);
    }
  }, [game]);

  // Use our custom hook for game logic
  const {
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
  } = useGameLogic({
    gameId: game?.game_id ?? gameId,
    questions,
    bonusQuestion: game?.bonus_question || null,
    maxQuestions: 15
  });

  // Reset game state when transitioning from random to real gameId
  useEffect(() => {
    if (game && gameId === 'random') {
      // Reset all state and redirect to the real game ID
      resetGame();
      router.replace(`/play/${game.game_id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, gameId, router]);

  // Handle change question action (replace current with bonus)
  const handleChangeQuestionAction = () => {
    if (handleChangeQuestion() && game?.bonus_question) {
      // Update our local questions array without mutating the cache
      setQuestions((qs) =>
        qs?.map((q, i) => (i === idx ? game.bonus_question! : q)) || null
      );
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="h-16 animate-pulse bg-muted/50 rounded-lg mb-3"></div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden"></div>
        </div>
        <QuestionCardSkeleton/>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="p-3 rounded-full bg-destructive/10 text-destructive mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">Error Loading Quiz</h2>
        <p className="text-red-600 mb-4">{error.message}</p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          aria-label="Return to home page"
        >
          Return Home
        </button>
      </div>
    );
  }

  // No game found
  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-xl font-semibold mb-4">No quiz found</h2>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          aria-label="Return to home page"
        >
          Return Home
        </button>
      </div>
    );
  }

  // Maximum number of questions
  const maxQuestions = Math.min(game.questions.length, 15);

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-xl">Quiz #{game.game_id}</h2>
            <span className="text-sm px-2 py-1 bg-primary/10 text-primary rounded-full">
              Question {idx + 1} of {maxQuestions}
            </span>
          </div>
          <div className="money-text text-2xl font-mono" aria-label={`Current score: ${score} dollars`}>
            ${score.toLocaleString()}
          </div>
        </div>

        <div
          className="relative h-2 w-full bg-secondary rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Quiz progress: ${progressPercent}%`}
        >
          <div
            className="absolute h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
            style={{width: `${progressPercent}%`}}
          ></div>
        </div>
      </div>

      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          bonusQuestion={!usedBonusQuestion ? game.bonus_question : null}
          questionNumber={idx + 1}
          action={handleAnswer}
          lives={lives}
          onUseFiftyAction={handleUseFifty}
          onUseHintAction={handleUseHint}
          onChangeQuestionAction={handleChangeQuestionAction}
          removedOptions={removedOptions}
          startTime={startTime}
          pointValue={pointValue}
        />
      )}

      <div className="mt-10 max-w-md mx-auto">
        <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-lg p-4">
          <h3 className="text-center font-medium mb-3">Prize Ladder</h3>
          <div className="space-y-1">
            {POINT_VALUES.slice(0, maxQuestions).reverse().map((value, i) => {
              const questionIdx = maxQuestions - 1 - i;
              const isCurrentQuestion = questionIdx === idx;
              const isPastQuestion = questionIdx < idx;

              return (
                <div
                  key={i}
                  className={`flex justify-between py-1 px-2 rounded ${
                    isCurrentQuestion
                      ? 'bg-primary text-primary-foreground font-medium'
                      : isPastQuestion
                        ? 'text-foreground/50'
                        : ''
                  }`}
                  aria-current={isCurrentQuestion ? 'true' : 'false'}
                >
                  <span>Question {questionIdx + 1}</span>
                  <span className={isPastQuestion ? '' : 'money-text'}>
                    ${value.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
