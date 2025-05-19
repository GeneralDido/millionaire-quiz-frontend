import {useQuery} from '@tanstack/react-query'
import {get} from '@/utils/api'

export function useGamesList() {
  return useQuery<number[], Error>({
    queryKey: ['games-list'],
    queryFn: () => get<number[]>('/games/list')
  })
}
