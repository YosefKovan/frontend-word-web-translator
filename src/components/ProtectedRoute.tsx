import { Navigate } from 'react-router-dom'
import useStore from '../stor/useStore'

interface ProtectedRouteProps {
  children: React.ReactNode
  role?: string
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const token = useStore((s: any) => s.token)
  const user = useStore((s: any) => s.user)
  if (!token) return <Navigate to="/login" replace />
  if (role && user?.role !== role) return <Navigate to="/" replace />
  return <>{children}</>
}
