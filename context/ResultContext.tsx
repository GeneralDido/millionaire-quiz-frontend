// context/ResultContext.tsx
import React, {createContext, useContext} from 'react';

export interface ResultContextType {
  gameId: number;
  score: number;
}

const ResultContext = createContext<ResultContextType | undefined>(undefined);

export function useResult() {
  const ctx = useContext(ResultContext);
  if (!ctx) {
    throw new Error('useResult must be used within a ResultProvider');
  }
  return ctx;
}

export function ResultProvider({
                                 value,
                                 children
                               }: {
  value: ResultContextType;
  children: React.ReactNode;
}) {
  return (
    <ResultContext.Provider value={value}>
      {children}
    </ResultContext.Provider>
  );
}
