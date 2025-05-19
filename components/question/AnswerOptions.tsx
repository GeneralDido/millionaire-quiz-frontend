// components/question/AnswerOptions.tsx
import {useMemo} from 'react';
import {Button} from '@/components/ui/button';
import {useQuestion} from '@/context/QuestionContext';

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function AnswerOptions() {
  const {
    question,
    removedOptions,
    selectedAnswer,
    showAnswer,
    handleSelectAnswer
  } = useQuestion();

  const answers = useMemo(
    () => shuffle([question.correct, ...question.wrong]),
    [question]
  );

  return (
    <div className="grid grid-cols-1 gap-3">
      {answers.map((ans) => (
        <Button
          key={ans}
          onClick={() => handleSelectAnswer(ans)}
          disabled={removedOptions.includes(ans) || selectedAnswer !== null}
          variant="outline"
          className={`
            answer-btn py-5 px-6 text-left justify-start text-lg h-auto
            ${selectedAnswer === ans
            ? ans === question.correct
              ? 'bg-green-500/20 dark:bg-green-500/30 border-green-500/40 text-green-700 dark:text-green-400'
              : 'bg-red-500/20 dark:bg-red-500/30 border-red-500/40 text-red-700 dark:text-red-400'
            : ''}
            ${showAnswer && ans === question.correct && selectedAnswer !== ans
            ? 'bg-green-500/20 dark:bg-green-500/30 border-green-500/40 text-green-700 dark:text-green-400'
            : ''}
            ${removedOptions.includes(ans)
            ? 'opacity-40 line-through'
            : 'hover:border-primary/40 hover:bg-primary/5'}
          `}
          aria-disabled={removedOptions.includes(ans) || selectedAnswer !== null}
          aria-pressed={selectedAnswer === ans}
        >
          {ans}
        </Button>
      ))}
    </div>
  );
}

