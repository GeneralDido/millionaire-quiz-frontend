// hooks/useGamesList.ts
import {useQuery} from '@tanstack/react-query'
import {get} from '@/utils/api'

// Define the type for a game list entry
export interface GameListEntry {
  game_id: number
  created_at: string
}

export function useGamesList() {
  return useQuery<GameListEntry[], Error>({
    queryKey: ['games-list'],
    queryFn: () => get<GameListEntry[]>('/games/list/')
  })
}
