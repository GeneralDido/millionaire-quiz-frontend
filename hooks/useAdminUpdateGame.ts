import {useMutation, useQueryClient} from '@tanstack/react-query'
import {GameRead} from '@/utils/apiTypes'


export function useAdminUpdateGame(gameId: number) {
  const qc = useQueryClient()

  return useMutation<GameRead, Error, { prompt: string }, unknown>({
    mutationFn: async ({prompt}: { prompt: string }) => {
      const res = await fetch(`/api/admin/games/${gameId}/update`, {
        method: 'PUT',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt})
      })
      if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw new Error(err?.error || `Update failed (${res.status})`)
      }
      return (await res.json()) as GameRead
    },
    onSuccess: () => {
      void qc.invalidateQueries({queryKey: ['game', gameId]})
      void qc.invalidateQueries({queryKey: ['games-list']})
    }
  })
}
