import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useStore from '../../stor/useStore'
import ErrorBox from '../../components/ErrorBox/ErrorBox'
import './Login.css'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const login = useStore((s: any) => s.login)
  const navigate = useNavigate()

  const submit = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await login(email, password)
      if (res?.access_token) {
        navigate('/')
      } else {
        setError('Invalid email or password.')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__header">
          <h1 className="login-card__title">Welcome back</h1>
          <p className="login-card__subtitle">Sign in to continue to your account</p>
        </div>

        <ErrorBox message={error} />

        <form className="login-card__form" onSubmit={submit}>
          <div className="login-card__field">
            <label className="login-card__label">Email</label>
            <input
              className="login-card__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="login-card__field">
            <label className="login-card__label">Password</label>
            <div className="login-card__input-wrapper">
              <input
                className="login-card__input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button type="button" className="login-card__eye" onClick={() => setShowPassword(v => !v)}>
                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>
          <button className="login-card__button" type="submit" disabled={loading}>
            <span className="material-symbols-outlined">login</span>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="login-card__footer">
          No account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
