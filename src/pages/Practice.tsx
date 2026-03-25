import { useState, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { usePractice } from '../hooks/usePractice'
import Spinner from '../components/Spinner/Spinner'

export default function Practice() {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  if (!userId) return <Navigate to="/login" replace />

  const { queue, sessionId, isPending, error, submit, progress, isProgressPending, fetchProgress } = usePractice(userId)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(false)
  const startTimeRef = useRef<number>(Date.now())

  if (!token) return <Navigate to="/login" replace />
  if (isPending) return <Spinner />
  if (error) return <p>Failed to load session. Please try again.</p>
  if (queue.length === 0) return <p>No words in queue.</p>

  const total = queue.length
  const current = queue[currentIndex]

  const advance = (result: 'correct' | 'incorrect') => {
    submit({
      session_id: sessionId!,
      word_id: current.word_id,
      user_id: userId,
      result,
      time_taken_ms: Date.now() - startTimeRef.current,
    })

    if (currentIndex < total - 1) {
      setFlipped(false)
      startTimeRef.current = Date.now()
      setCurrentIndex(currentIndex + 1)
    } else {
      fetchProgress()
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="practice-container">
        {isProgressPending ? <Spinner /> : (
          <div className="practice-results-card">
            <h2 className="practice-results__title">Session Complete!</h2>
            {progress ? (
              <div className="practice-results__stats">
                <div className="practice-results__stat">
                  <span className="practice-results__stat-value">{progress.total_words ?? '—'}</span>
                  <span className="practice-results__stat-label">Total Words</span>
                </div>
                <div className="practice-results__stat">
                  <span className="practice-results__stat-value">{progress.words_learned ?? '—'}</span>
                  <span className="practice-results__stat-label">Words Learned</span>
                </div>
                <div className="practice-results__stat">
                  <span className="practice-results__stat-value">{progress.accuracy != null ? `${Math.round(progress.accuracy * 100)}%` : '—'}</span>
                  <span className="practice-results__stat-label">Accuracy</span>
                </div>
                <div className="practice-results__stat">
                  <span className="practice-results__stat-value">{progress.streak ?? '—'}</span>
                  <span className="practice-results__stat-label">Day Streak</span>
                </div>
              </div>
            ) : (
              <p style={{ color: '#888' }}>Could not load progress.</p>
            )}
            <button className="btn-know" onClick={() => window.location.reload()}>
              Practice Again
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="practice-container">
      <h1>Flashcard Practice Game</h1>

      <div className="practice-progress-bar-wrapper">
        <div
          className="practice-progress-bar"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>
      <p className="practice-progress-label">
        Session Progress: {currentIndex + 1}/{total} Cards
      </p>

      <div className="practice-card-scene">
        <div className={`practice-card${flipped ? ' practice-card--flipped' : ''}`}>
          <div className="practice-card__face practice-card__front">
            <span className="practice-word">{current.word}</span>
          </div>
          <div className="practice-card__face practice-card__back">
            <span className="practice-translation">{current.translation}</span>
          </div>
        </div>
      </div>

      {!flipped ? (
        <div className="practice-actions">
          <button className="btn-know" onClick={() => advance('correct')}>I Know It</button>
          <button className="btn-dont-know" onClick={() => setFlipped(true)}>I Don't Know It</button>
        </div>
      ) : (
        <div className="practice-actions">
          <button className="btn-next" onClick={() => advance('incorrect')}>Next</button>
        </div>
      )}
    </div>
  )
}
