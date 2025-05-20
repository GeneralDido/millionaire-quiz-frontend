import {useMutation, useQueryClient} from '@tanstack/react-query'
import {post} from '@/utils/api'
import type {ScoreCreate} from '@/utils/apiTypes'

export function useSubmitScore(gameId: number) {
  const qc = useQueryClient()

  return useMutation<void, Error, ScoreCreate>({
    mutationFn: (data) => post<void>(`/games/${gameId}/score/`, data),
    onSuccess: () => {
      void qc.invalidateQueries({queryKey: ['leaderboard']})
    }
  })
}
