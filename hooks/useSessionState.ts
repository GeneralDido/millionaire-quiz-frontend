// hooks/useSessionState.ts
import {useState, useEffect, useCallback} from 'react'

export function useSessionState<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue

    try {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error)
      return defaultValue
    }
  })

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setState((prev) => {
      const newValue = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value

      try {
        sessionStorage.setItem(key, JSON.stringify(newValue))
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error)
      }

      return newValue
    })
  }, [key])

  const clearValue = useCallback(() => {
    try {
      sessionStorage.removeItem(key)
      setState(defaultValue)
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error)
    }
  }, [key, defaultValue])

  // Sync with sessionStorage on key change
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const item = sessionStorage.getItem(key)
      if (item !== null) {
        setState(JSON.parse(item))
      }
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error)
    }
  }, [key])

  return [state, setValue, clearValue]
}
