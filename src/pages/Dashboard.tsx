import React, { useEffect } from 'react'
import ProgressSummary from '../components/ProgressSummary'
import useStore from '../stor/useStore'
// styles consolidated into src/App.css

const Dashboard: React.FC = () => {
  const user = useStore((s: any) => s.user)
  const fetchProgress = useStore((s: any) => s.fetchProgress)

  useEffect(() => {
    if (user) fetchProgress(user.id)
  }, [user])

  return (
    <div>
      <h2>Dashboard</h2>
      <ProgressSummary />
    </div>
  )
}

export default Dashboard
