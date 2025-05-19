import {useMutation, useQueryClient} from '@tanstack/react-query'
import {post} from '@/utils/api'

export function useAdminGenerate() {
  const qc = useQueryClient()
  return useMutation<void, Error>({
    mutationFn: () => post<void>('/games/'),
    onSuccess: () => qc.invalidateQueries({queryKey: ['games-list']})
  })
}
