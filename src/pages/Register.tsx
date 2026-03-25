import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../api/auth'
import { useToast } from '../components/ToastProvider'

const Register: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [loading, setLoading] = useState(false)
  const { show } = useToast()
  const navigate = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register({ name, email, password, role })
      show('Account created — please sign in', 'success')
      navigate('/login')
    } catch (err) {
      show('Registration failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="login-form">
      <h2>Create account</h2>
      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: 4, marginBottom: 8 }}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
      <p style={{ marginTop: 12, fontSize: 14 }}>Already have an account? <Link to="/login">Sign in</Link></p>
    </form>
  )
}

export default Register
