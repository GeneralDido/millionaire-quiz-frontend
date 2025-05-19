// components/question/HintDisplay.tsx
import {HelpCircle} from 'lucide-react';
import {useQuestion} from '@/context/QuestionContext';

export function HintDisplay() {
  const {question, showHint} = useQuestion();
  const hint = question.hint;
  if (!hint || !showHint) return null;

  return (
    <div className="mt-2 p-4 bg-accent/30 border border-accent/20 rounded-lg animate-fadeIn">
      <div className="flex gap-2 items-start">
        <HelpCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-accent-foreground/80"/>
        <p className="italic text-accent-foreground">{hint}</p>
      </div>
    </div>
  );
}
