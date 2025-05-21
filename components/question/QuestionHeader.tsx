// components/question/QuestionHeader.tsx
import {useTranslations} from 'next-intl';
import {useQuestion} from '@/context/QuestionContext';
import {Progress} from '@/components/ui/progress';

export function QuestionHeader() {
  const {
    questionNumber,
    pointValue,
    doublePointsActive,
    timeLeft,
    bonusTime,
    question
  } = useQuestion();
  const t = useTranslations('GamePage');

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{t('questionNumber', {number: questionNumber})}</h2>
        <div className="text-right">
          <p className="money-text text-xl sm:text-2xl font-medium">${pointValue.toLocaleString()}</p>
          {doublePointsActive && (
            <p className="text-money-gold text-sm font-medium animate-pulse">
              {t('doublePointsTime', {time: timeLeft})}
            </p>
          )}
        </div>
      </div>

      {doublePointsActive && (
        <Progress
          value={(timeLeft * 100) / bonusTime}
          className="h-2 bg-background/30 [&>div]:bg-gradient-to-r [&>div]:from-money-gold [&>div]:to-money-green"
        />
      )}

      <h3 className="mt-4 text-xl font-medium leading-relaxed">{question.q}</h3>
    </>
  );
}
