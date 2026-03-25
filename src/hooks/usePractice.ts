import { useQuery, useMutation } from '@tanstack/react-query'
import { startSession, submitResult, type SubmitResultPayload } from '../api/training'
import { getProgress } from '../api/users'

export function usePractice(userId: string, count: number = 10) {
  const { data, isPending, error } = useQuery({
    queryKey: ['practiceSession'],
    queryFn: () => startSession(userId, count),
  })

  const { mutate: submit, isPending: isSubmitting } = useMutation({
    mutationFn: (payload: SubmitResultPayload) => submitResult(payload),
  })

  const { data: progress, isPending: isProgressPending, refetch: fetchProgress } = useQuery({
    queryKey: ['userProgress', userId],
    queryFn: () => getProgress(userId),
    enabled: false,
  })

  return {
    sessionId: data?.session_id,
    queue: data?.queue ?? [],
    isPending,
    error,
    submit,
    isSubmitting,
    progress,
    isProgressPending,
    fetchProgress,
  }
}
