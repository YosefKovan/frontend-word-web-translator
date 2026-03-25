import React from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../stor/useStore'

const NavBar: React.FC = () => {
  const user = useStore((s: any) => s.user)
  const logout = useStore((s: any) => s.logout)
  const navigate = useNavigate()
  return (
    <nav className="nav">
      {user?.role === 'admin' && <button onClick={() => navigate('/admin')}>Dashboard</button>}
      <button onClick={() => navigate('/library')}>Words</button>
      <button onClick={() => navigate('/import')}>Import</button>
      <button onClick={() => navigate('/practice')}>Practice</button>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
        {user ? (
          <button onClick={() => { logout(); navigate('/login') }}>
            <span className="material-symbols-outlined">logout</span>
            Sign out
          </button>
        ) : (
          <button onClick={() => navigate('/login')}>
            <span className="material-symbols-outlined">person</span>
            Sign in
          </button>
        )}
      </div>
    </nav>
  )
}

export default NavBar
