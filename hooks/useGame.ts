import {useQuery} from '@tanstack/react-query'
import {get} from '@/utils/api'
import type {GameRead} from '@/utils/apiTypes'

export function useGame(gameId?: number) {
  return useQuery<GameRead, Error>({
    queryKey: ['game', gameId ?? 'random'],
    queryFn: () =>
      typeof gameId === 'number'
        ? get<GameRead>(`/games/${gameId}/`)
        : get<GameRead>('/games/random/'),
    retry: false
  })
}
