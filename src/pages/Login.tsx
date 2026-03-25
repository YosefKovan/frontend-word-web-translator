import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useStore from '../stor/useStore'
import { useToast } from '../components/ToastProvider'
// styles consolidated into src/App.css

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useStore((s: any) => s.login)
  const { show } = useToast()
  const navigate = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await login(email, password)
      if (res?.access_token) {
        show('Signed in', 'success')
        navigate('/')
      } else {
        show('Login failed', 'error')
      }
    } catch (err) {
      show('Login error', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="login-form">
      <div>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Signing...' : 'Sign in'}</button>
      <p style={{ marginTop: 12, fontSize: 14 }}>No account? <Link to="/register">Create one</Link></p>
    </form>
  )
}

export default Login
