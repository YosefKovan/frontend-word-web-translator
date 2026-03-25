import React, { useState } from 'react'
import useStore from '../stor/useStore'
import { useToast } from '../components/ToastProvider'
// styles consolidated into src/App.css

const Login: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useStore((s: any) => s.login)
  const { show } = useToast()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await login(email, password)
      if (res?.user) {
        show('Signed in', 'success')
        if (onSuccess) onSuccess()
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
    </form>
  )
}

export default Login
