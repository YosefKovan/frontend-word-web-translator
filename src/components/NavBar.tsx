import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import useStore from '../stor/useStore'

const NavBar: React.FC = () => {
  const user = useStore((s: any) => s.user)
  const logout = useStore((s: any) => s.logout)
  const navigate = useNavigate()

  return (
    <Disclosure as="nav" className="nav">
      {({ open, close }) => {
        const go = (path: string) => { navigate(path); close() }

        useEffect(() => {
          const mq = window.matchMedia('(min-width: 641px)')
          const handler = (e: MediaQueryListEvent) => { if (e.matches) close() }
          mq.addEventListener('change', handler)
          return () => mq.removeEventListener('change', handler)
        }, [close])

        return (
          <>
            <span className="material-symbols-outlined nav__logo">translate</span>

            {/* Desktop links */}
            <div className="nav__desktop">
              {user ? (
                <>
                  {user.role === 'admin' && <button onClick={() => navigate('/admin')}>Dashboard</button>}
                  <button onClick={() => navigate('/library')}>Words</button>
                  <button onClick={() => navigate('/import')}>Import</button>
                  <button onClick={() => navigate('/practice')}>Practice</button>
                  <button onClick={() => navigate('/progress')}>Progress</button>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button onClick={() => { logout(); navigate('/login') }}>
                      <span className="material-symbols-outlined">logout</span>
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ marginLeft: 'auto' }}>
                  <button onClick={() => navigate('/login')}>
                    <span className="material-symbols-outlined">person</span>
                    Sign in
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger button — only visible on mobile */}
            <DisclosureButton className="nav__hamburger">
              <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
            </DisclosureButton>

            {/* Mobile dropdown */}
            <DisclosurePanel className="nav__mobile">
              {user ? (
                <>
                  {user.role === 'admin' && <button onClick={() => go('/admin')}>Dashboard</button>}
                  <button onClick={() => go('/library')}>Words</button>
                  <button onClick={() => go('/import')}>Import</button>
                  <button onClick={() => go('/practice')}>Practice</button>
                  <button onClick={() => go('/progress')}>Progress</button>
                  <button onClick={() => { logout(); go('/login') }}>
                    <span className="material-symbols-outlined">logout</span>
                    Sign out
                  </button>
                </>
              ) : (
                <button onClick={() => go('/login')}>
                  <span className="material-symbols-outlined">person</span>
                  Sign in
                </button>
              )}
            </DisclosurePanel>
          </>
        )
      }}
    </Disclosure>
  )
}

export default NavBar
