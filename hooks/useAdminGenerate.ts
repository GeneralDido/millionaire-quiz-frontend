// hooks/useAdminGenerate.ts
import {useMutation, useQueryClient} from '@tanstack/react-query'
import type {GameRead} from '@/utils/apiTypes'

export function useAdminGenerate() {
  const qc = useQueryClient()

  return useMutation<GameRead, Error>({
    // call Next.js API (no baseURL override)
    mutationFn: async () => {
      const res = await fetch('/api/admin/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({}) // your empty JSON payload
      })
      if (!res.ok) {
        // pull out the error message if there is one
        const err = await res.json().catch(() => null)
        throw new Error(err?.error || `Generate failed (${res.status})`)
      }
      return (await res.json()) as GameRead
    },
    onSuccess: () => {
      qc.invalidateQueries({queryKey: ['games-list']})
    }
  })
}
