// components/question/LifelinesPanel.tsx
import {Button} from '@/components/ui/button';
import {SplitSquareVertical, HelpCircle, Shuffle} from 'lucide-react';
import {useQuestion} from '@/context/QuestionContext';

export function LifelinesPanel() {
  const {
    lives,
    handleUseFifty,
    handleUseHint,
    handleChangeQuestion,
    selectedAnswer,
    bonusQuestionAvailable
  } = useQuestion();

  return (
    <div className="flex space-x-2">
      <Button
        size="sm"
        variant="outline"
        onClick={handleUseFifty}
        disabled={!lives.fifty || selectedAnswer !== null}
        className={`lifeline-btn gap-1 ${!lives.fifty ? 'lifeline-btn-disabled' : ''}`}
      >
        <SplitSquareVertical className="h-4 w-4"/>
        <span className="hidden sm:inline">50:50</span>
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handleUseHint}
        disabled={!lives.hint || selectedAnswer !== null}
        className={`lifeline-btn gap-1 ${!lives.hint ? 'lifeline-btn-disabled' : ''}`}
      >
        <HelpCircle className="h-4 w-4"/>
        <span className="hidden sm:inline">Hint</span>
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handleChangeQuestion}
        disabled={!lives.change || !bonusQuestionAvailable || selectedAnswer !== null}
        className={`lifeline-btn gap-1 ${!lives.change ? 'lifeline-btn-disabled' : ''}`}
      >
        <Shuffle className="h-4 w-4"/>
        <span className="hidden sm:inline">Change</span>
      </Button>
    </div>
  );
}
