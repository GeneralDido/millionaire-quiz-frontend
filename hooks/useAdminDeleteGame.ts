// hooks/useAdminDeleteGame.ts
import {useMutation, useQueryClient} from '@tanstack/react-query'

export function useAdminDeleteGame() {
  const qc = useQueryClient()
  return useMutation<void, Error, number>({
    mutationFn: async (gameId: number) => {
      const res = await fetch(`/api/admin/games/${gameId}`, {
        method: 'DELETE',
        credentials: 'include'       // ← send cookies along
      })
      if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw new Error(err?.error || `Delete failed (${res.status})`)
      }
    },
    onSuccess: (_data, gameId) => {
      void qc.invalidateQueries({queryKey: ['games-list']})
      void qc.invalidateQueries({queryKey: ['game', gameId]})
    }
  })
}
