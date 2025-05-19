// hooks/useGameState.ts
import {useSessionState} from './useSessionState';

interface GameLives {
  fifty: boolean;
  hint: boolean;
  change: boolean;
}

export function useGameState(gameId: string | number) {
  const key = String(gameId);
  const [idx, setIdx] = useSessionState(`quiz-${key}-idx`, 0);
  const [score, setScore] = useSessionState(`quiz-${key}-score`, 0);
  const [lives, setLives] = useSessionState<GameLives>(`quiz-${key}-lives`, {
    fifty: true,
    hint: true,
    change: true
  });
  const [removedOptions, setRemovedOptions] = useSessionState<string[]>(`quiz-${key}-removed`, []);
  const [usedBonusQuestion, setUsedBonusQuestion] = useSessionState(`quiz-${key}-used-bonus`, false);
  const [startTime, setStartTime] = useSessionState(`quiz-${key}-start-time`, 0);

  const resetGame = () => {
    // Clear all game state from sessionStorage
    sessionStorage.removeItem(`quiz-${key}-idx`);
    sessionStorage.removeItem(`quiz-${key}-score`);
    sessionStorage.removeItem(`quiz-${key}-lives`);
    sessionStorage.removeItem(`quiz-${key}-removed`);
    sessionStorage.removeItem(`quiz-${key}-used-bonus`);
    sessionStorage.removeItem(`quiz-${key}-start-time`);
  };

  return {
    idx, setIdx,
    score, setScore,
    lives, setLives,
    removedOptions, setRemovedOptions,
    usedBonusQuestion, setUsedBonusQuestion,
    startTime, setStartTime,
    resetGame
  };
}
