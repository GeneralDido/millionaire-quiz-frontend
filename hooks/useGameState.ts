// hooks/useGameState.ts
import {useSessionState} from './useSessionState'

export interface GameLives {
  fifty: boolean
  hint: boolean
  change: boolean
}

interface GameState {
  idx: number
  score: number
  lives: GameLives
  removedOptions: string[]
  usedBonusQuestion: boolean
  startTime: number
}

const defaultGameState: GameState = {
  idx: 0,
  score: 0,
  lives: {fifty: true, hint: true, change: true},
  removedOptions: [],
  usedBonusQuestion: false,
  startTime: 0
}

export function useGameState(gameId: string | number) {
  const [gameState, setGameState, clearGameState] = useSessionState<GameState>(
    `game-${gameId}`,
    defaultGameState
  )

  const setIdx = (idx: number) =>
    setGameState(prev => ({...prev, idx}))

  const setScore = (score: number) =>
    setGameState(prev => ({...prev, score}))

  const setLives = (lives: GameLives) =>
    setGameState(prev => ({...prev, lives}))

  const setRemovedOptions = (removedOptions: string[]) =>
    setGameState(prev => ({...prev, removedOptions}))

  const setUsedBonusQuestion = (usedBonusQuestion: boolean) =>
    setGameState(prev => ({...prev, usedBonusQuestion}))

  const setStartTime = (startTime: number) =>
    setGameState(prev => ({...prev, startTime}))

  const resetGame = () => clearGameState()

  return {
    ...gameState,
    setIdx,
    setScore,
    setLives,
    setRemovedOptions,
    setUsedBonusQuestion,
    setStartTime,
    resetGame
  }
}
