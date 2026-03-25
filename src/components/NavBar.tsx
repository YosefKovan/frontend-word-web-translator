import React from 'react'
import useStore from '../stor/useStore'
// styles consolidated into src/App.css

const NavBar: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const user = useStore((s: any) => s.user)
  const logout = useStore((s: any) => s.logout)
  return (
    <nav className="nav">
      <button onClick={() => onNavigate('admin')}>Dashboard</button>
      <button onClick={() => onNavigate('library')}>Words</button>
      <button onClick={() => onNavigate('import')}>Import</button>
      <button onClick={() => onNavigate('practice')}>Practice</button>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
        {user ? (
          <>
            <div>{`Hi, ${user.name || user.id}`} {user.role ? `(${user.role})` : ''}</div>
            <button onClick={() => { logout(); onNavigate('login') }}>Sign out</button>
          </>
        ) : (
          <button onClick={() => onNavigate('login')}>Sign in</button>
        )}
      </div>
    </nav>
  )
}

export default NavBar
