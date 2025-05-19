import {useQuery} from '@tanstack/react-query'
import {get} from '@/utils/api'
import type {LeaderboardEntry} from '@/utils/apiTypes'

export function useLeaderboard(limit = 10) {
  return useQuery<LeaderboardEntry[], Error>({
    queryKey: ['leaderboard', limit],
    queryFn: () => get<LeaderboardEntry[]>(`/leaderboard?limit=${limit}`),
    staleTime: 1000 * 60 * 5
  })
}
