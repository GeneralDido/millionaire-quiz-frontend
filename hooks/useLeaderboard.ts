// hooks/useLeaderboard.ts
import {useQuery} from '@tanstack/react-query'
import {get} from '@/utils/api'
import {LEADERBOARD_SIZE} from '@/utils/game'
import type {LeaderboardEntry} from '@/utils/apiTypes'

export function useLeaderboard() {
  return useQuery<LeaderboardEntry[], Error>({
    queryKey: ['leaderboard', LEADERBOARD_SIZE],
    queryFn: () => get<LeaderboardEntry[]>(`/leaderboard/?limit=${LEADERBOARD_SIZE}`),
    staleTime: 1000 * 60 * 5
  })
}
