// hooks/useLeaderboard.ts
import {useQuery} from '@tanstack/react-query'
import {get} from '@/utils/api'
import {LEADERBOARD_SIZE} from '@/utils/game'
import type {LeaderboardEntry} from '@/utils/apiTypes'

export function useLeaderboard(limit = LEADERBOARD_SIZE) {
  return useQuery<LeaderboardEntry[], Error>({
    queryKey: ['leaderboard', limit],
    queryFn: () => get<LeaderboardEntry[]>(`/leaderboard/?limit=${limit}`),
    staleTime: 1000 * 60 * 5
  })
}
