// hooks/useGameState.ts
import {useSessionState} from './useSessionState'

export function useGameState(gameId: string | number) {
  const key = String(gameId)
  const [idx, setIdx] = useSessionState(`quiz-${key}-idx`, 0)
  const [score, setScore] = useSessionState(`quiz-${key}-score`, 0)
  const [lives, setLives] = useSessionState(`quiz-${key}-lives`, {
    fifty: true,
    hint: true,
    change: true
  })
  const [removedOptions, setRemovedOptions] = useSessionState(`quiz-${key}-removed`, [] as string[])
  const [usedBonusQuestion, setUsedBonusQuestion] = useSessionState(`quiz-${key}-used-bonus`, false)
  const [startTime, setStartTime] = useSessionState(`quiz-${key}-start-time`, 0)

  // Calculate points based on question index (similar to Who Wants to Be a Millionaire)
  const getQuestionPoints = (questionIndex: number) => {
    const pointValues = [
      100, 200, 300, 500, 1000,
      2000, 4000, 8000, 16000, 32000,
      64000, 125000, 250000, 500000, 1000000
    ]
    return pointValues[questionIndex] || 100
  }

  const resetGame = () => {
    // Clear all game state
    sessionStorage.removeItem(`quiz-${key}-idx`)
    sessionStorage.removeItem(`quiz-${key}-score`)
    sessionStorage.removeItem(`quiz-${key}-lives`)
    sessionStorage.removeItem(`quiz-${key}-removed`)
    sessionStorage.removeItem(`quiz-${key}-used-bonus`)
    sessionStorage.removeItem(`quiz-${key}-start-time`)
  }

  return {
    idx, setIdx,
    score, setScore,
    lives, setLives,
    removedOptions, setRemovedOptions,
    usedBonusQuestion, setUsedBonusQuestion,
    startTime, setStartTime,
    getQuestionPoints,
    resetGame
  }
}
