import { useQuery } from '@tanstack/react-query'
import { getProgress } from '../api/users'

export function useProgress(userId: string) {
  const { data, isPending, error } = useQuery({
    queryKey: ['userProgress', userId],
    queryFn: () => getProgress(userId),
    enabled: !!userId,
  })

  return { progress: data, isPending, error }
}
