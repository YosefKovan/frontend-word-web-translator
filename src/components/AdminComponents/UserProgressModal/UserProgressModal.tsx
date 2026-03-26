import { useQuery } from '@tanstack/react-query'
import type { User } from '../../../types/user'
import { getTrainingResult } from '../../../api/training'
import Spinner from '../../Spinner/Spinner'
import './UserProgressModal.css'

interface UserProgressModalProps {
  user: User
  onClose: () => void
}

const STATS = [
  { key: 'total_words',       label: 'Total Words',     icon: 'library_books' },
  { key: 'words_mastered',    label: 'Words Mastered',  icon: 'verified' },
  { key: 'words_in_progress', label: 'In Progress',     icon: 'pending' },
  { key: 'streak_days',       label: 'Day Streak',      icon: 'local_fire_department' },
  { key: 'total_score',       label: 'Total Score',     icon: 'emoji_events' },
  { key: 'last_session_date', label: 'Last Session',    icon: 'calendar_today' },
]

export default function UserProgressModal({ user, onClose }: UserProgressModalProps) {
  const { data, isPending, error } = useQuery({
    queryKey: ['trainingResult', user.user_id],
    queryFn: () => getTrainingResult(user.user_id),
  })

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal upm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{user.name}'s Progress</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="modal__body">
          {isPending && <Spinner />}
          {error && <p className="upm-error">Failed to load progress.</p>}
          {data && (
            <div className="upm-grid">
              {STATS.map(({ key, label, icon }) => (
                <div key={key} className="upm-card">
                  <span className="material-symbols-outlined upm-card__icon">{icon}</span>
                  <span className="upm-card__value">{(data[key] as string | number) ?? '—'}</span>
                  <span className="upm-card__label">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
