// hooks/useGameState.ts
import {useState, useEffect} from 'react';

interface GameState {
  idx: number;
  score: number;
  lives: {
    fifty: boolean;
    hint: boolean;
    change: boolean;
  };
  removedOptions: string[];
  usedBonusQuestion: boolean;
  startTime: number;
}

const defaultGameState: GameState = {
  idx: 0,
  score: 0,
  lives: {
    fifty: true,
    hint: true,
    change: true
  },
  removedOptions: [],
  usedBonusQuestion: false,
  startTime: 0
};

export function useGameState(gameId: string | number) {
  const key = `quiz-${String(gameId)}`;

  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      // Try to get from sessionStorage on initial load
      const json = typeof window !== 'undefined' ? sessionStorage.getItem(key) : null;
      return json ? JSON.parse(json) : defaultGameState;
    } catch {
      return defaultGameState;
    }
  });

  // Update sessionStorage when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(key, JSON.stringify(gameState));
    }
  }, [key, gameState]);

  // Provide individual setters for each property to maintain similar API
  const setIdx = (idx: number) => setGameState(prev => ({...prev, idx}));
  const setScore = (score: number) => setGameState(prev => ({...prev, score}));
  const setLives = (lives: GameState['lives']) => setGameState(prev => ({...prev, lives}));
  const setRemovedOptions = (removedOptions: string[]) => setGameState(prev => ({...prev, removedOptions}));
  const setUsedBonusQuestion = (usedBonusQuestion: boolean) => setGameState(prev => ({...prev, usedBonusQuestion}));
  const setStartTime = (startTime: number) => setGameState(prev => ({...prev, startTime}));

  const resetGame = () => {
    // Clear game state from sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(key);
    }
    // Reset state to defaults
    setGameState(defaultGameState);
  };

  return {
    // Destructure the state for easier access
    ...gameState,
    // Provide setters
    setIdx,
    setScore,
    setLives,
    setRemovedOptions,
    setUsedBonusQuestion,
    setStartTime,
    resetGame
  };
}
