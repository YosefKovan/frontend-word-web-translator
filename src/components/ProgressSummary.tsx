import React from 'react'
import useStore from '../stor/useStore'
// styles consolidated into src/App.css

const ProgressSummary: React.FC = () => {
  const progress = useStore((s: any) => s.progress)

  if (!progress) return <div>No progress yet</div>

  return (
    <div className="progress-summary">
      <h3>Progress</h3>
      <div>Level: {progress.level ?? '—'}</div>
      <div>Completed: {progress.completed ?? 0}</div>
      <div>Streak: {progress.streak ?? 0}</div>
    </div>
  )
}

export default ProgressSummary
