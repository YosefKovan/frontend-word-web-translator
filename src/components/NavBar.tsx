import React from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../stor/useStore'

const NavBar: React.FC = () => {
  const user = useStore((s: any) => s.user)
  const logout = useStore((s: any) => s.logout)
  const navigate = useNavigate()
  return (
    <nav className="nav">
      <button onClick={() => navigate('/admin')}>Dashboard</button>
      <button onClick={() => navigate('/library')}>Words</button>
      <button onClick={() => navigate('/import')}>Import</button>
      <button onClick={() => navigate('/practice')}>Practice</button>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
        {user ? (
          <>
            <div>{`Hi, ${user.name || user.id}`} {user.role ? `(${user.role})` : ''}</div>
            <button onClick={() => { logout(); navigate('/login') }}>Sign out</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')}>Sign in</button>
        )}
      </div>
    </nav>
  )
}

export default NavBar
