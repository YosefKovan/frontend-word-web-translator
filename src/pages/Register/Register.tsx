import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../../api/auth'
import ErrorBox from '../../components/ErrorBox/ErrorBox'
import './Register.css'

const Register: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const submit = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register({ name, email, password, role })
      navigate('/login')
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-card__header">
          <h1 className="register-card__title">Create account</h1>
          <p className="register-card__subtitle">Join and start learning today</p>
        </div>

        <ErrorBox message={error} />

        <form className="register-card__form" onSubmit={submit}>
          <div className="register-card__field">
            <label className="register-card__label">Name</label>
            <input
              className="register-card__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>
          <div className="register-card__field">
            <label className="register-card__label">Email</label>
            <input
              className="register-card__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="register-card__field">
            <label className="register-card__label">Password</label>
            <div className="register-card__input-wrapper">
              <input
                className="register-card__input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button type="button" className="register-card__eye" onClick={() => setShowPassword(v => !v)}>
                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>
          <div className="register-card__field">
            <label className="register-card__label">Role</label>
            <select
              className="register-card__select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="register-card__button" type="submit" disabled={loading}>
            <span className="material-symbols-outlined">person_add</span>
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <p className="register-card__footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
