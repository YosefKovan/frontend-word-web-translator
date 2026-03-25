import React, { useEffect, useState } from 'react'
import useStore from '../stor/useStore'
import { useToast } from './ToastProvider'
// styles consolidated into src/App.css

const PracticeRound: React.FC = () => {
  const user = useStore((s: any) => s.user)
  const queue = useStore((s: any) => s.queue)
  const fetchQueue = useStore((s: any) => s.fetchQueue)
  const submitResult = useStore((s: any) => s.submitResult)
  const fetchProgress = useStore((s: any) => s.fetchProgress)
  const { show } = useToast()
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (user) fetchQueue(user.id, 10)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (!user) return <div>Please sign in to practice</div>

  if (user.role && user.role !== 'user') {
    return <div>Your account does not have the user role and cannot practice.</div>
  }

  if (!queue || queue.length === 0) return <div>No items to practice</div>

  return (
    <div className="practice-round">
      <h3>Practice</h3>
      {queue.map((item: any, idx: number) => (
        <div key={idx} className="practice-item">
          <div>{item.word}</div>
          <div>
            <button
              disabled={!!loadingIds[item.id]}
              onClick={async () => {
                try {
                  setLoadingIds((s) => ({ ...s, [item.id]: true }))
                  await submitResult({ user_id: user.id, item_id: item.id, correct: true })
                  await fetchQueue(user.id, 10)
                  await fetchProgress(user.id)
                  show('Result sent', 'success')
                } catch (e) {
                  show('Submit failed', 'error')
                } finally {
                  setLoadingIds((s) => ({ ...s, [item.id]: false }))
                }
              }}
            >
              {loadingIds[item.id] ? 'Sending...' : 'I knew it'}
            </button>
            <button
              disabled={!!loadingIds[item.id]}
              onClick={async () => {
                try {
                  setLoadingIds((s) => ({ ...s, [item.id]: true }))
                  await submitResult({ user_id: user.id, item_id: item.id, correct: false })
                  await fetchQueue(user.id, 10)
                  await fetchProgress(user.id)
                  show('Result sent', 'success')
                } catch (e) {
                  show('Submit failed', 'error')
                } finally {
                  setLoadingIds((s) => ({ ...s, [item.id]: false }))
                }
              }}
            >
              {loadingIds[item.id] ? 'Sending...' : "I didn't know"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PracticeRound
