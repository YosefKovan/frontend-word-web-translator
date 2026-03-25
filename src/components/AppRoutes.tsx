import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import WordsLibrary from '../pages/WordsLibrary'
import ImportWords from '../pages/ImportWords/ImportWords'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import AdminPage from '../pages/AdminPage/AdminPage'
import Practice from '../pages/Practice'
import { ProtectedRoute } from './ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import useStore from '../stor/useStore'

export default function AppRoutes() {
  const navigate = useNavigate()
  const user = useStore((s: any) => s.user)

  useEffect(() => {
    const onLogout = () => navigate('/login')
    window.addEventListener('auth:logout', onLogout as EventListener)
    return () => window.removeEventListener('auth:logout', onLogout as EventListener)
  }, [navigate])

  return (
    <div className="app-root">
      <NavBar />
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={!user ? <Navigate to="/login" replace /> : user.role === "admin" ? <AdminPage /> : <WordsLibrary />} />
          <Route path="/library" element={<ProtectedRoute><WordsLibrary /></ProtectedRoute>} />
          <Route path="/import" element={<ProtectedRoute><ImportWords /></ProtectedRoute>} />
          <Route path="/practice" element={<ProtectedRoute><Practice /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>} />
          <Route path="*" element={!user ? <Navigate to="/login" replace /> : user.role === "admin" ? <AdminPage /> : <WordsLibrary />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={5000} />
      </main>
    </div>
  )
}
