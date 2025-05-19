// hooks/useSessionState.ts
import {useState, useEffect} from 'react'

export function useSessionState<T>(
  key: string,
  defaultValue: T
): [T, (v: T) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const json = sessionStorage.getItem(key)
      return json ? JSON.parse(json) : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
