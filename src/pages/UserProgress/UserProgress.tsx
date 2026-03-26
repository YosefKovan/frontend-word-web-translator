import { Navigate, useNavigate } from 'react-router-dom'
import { useProgress } from '../../hooks/useProgress'
import Spinner from '../../components/Spinner/Spinner'
import './UserProgress.css'

export default function UserProgress() {
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()

  if (!userId) return <Navigate to="/login" replace />

  const { progress, isPending, error } = useProgress(userId)

  if (isPending) return <Spinner />
  if (error) return <p>Failed to load progress.</p>

  const stats = [
    { label: 'Total Words',      value: progress?.total_words      ?? '—', icon: 'library_books' },
    { label: 'Words Mastered',   value: progress?.words_mastered   ?? '—', icon: 'verified' },
    { label: 'In Progress',      value: progress?.words_in_progress ?? '—', icon: 'pending' },
    { label: 'Day Streak',       value: progress?.streak_days      ?? '—', icon: 'local_fire_department' },
    { label: 'Total Score',      value: progress?.total_score      ?? '—', icon: 'emoji_events' },
    { label: 'Last Session',     value: progress?.last_session_date ?? '—', icon: 'calendar_today' },
  ]

  return (
    <div className="user-progress">
      <div className="user-progress__header">
        <h1 className="user-progress__title">My Progress</h1>
        <button className="user-progress__practice-btn" onClick={() => navigate('/practice')}>
          <span className="material-symbols-outlined">play_arrow</span>
          Practice Now
        </button>
      </div>

      <div className="user-progress__grid">
        {stats.map(({ label, value, icon }) => (
          <div key={label} className="user-progress__card">
            <span className="material-symbols-outlined user-progress__card-icon">{icon}</span>
            <span className="user-progress__card-value">{value}</span>
            <span className="user-progress__card-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
