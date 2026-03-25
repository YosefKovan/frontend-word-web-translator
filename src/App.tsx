import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'
import WordsLibrary from './pages/WordsLibrary'
import ImportWords from './pages/ImportWords'
import Practice from './pages/Practice'
import Login from './pages/Login'
import ToastProvider from './components/ToastProvider'
import useStore from './stor/useStore'
import AdminPage from "./pages/AdminPage/AdminPage";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()

function App() {
  const [page, setPage] = useState<'dashboard' | 'library' | 'import' | 'practice' | 'login' | 'admin'>('login')
  const user = useStore((s: any) => s.user)

  // If a user is already present in the store, go to dashboard
  useEffect(() => {
    if (user) setPage('dashboard')
  }, [user])

  // Listen for auth logout events dispatched by the axios interceptor
  useEffect(() => {
    const onLogout = () => setPage('login')
    window.addEventListener('auth:logout', onLogout as EventListener)
    return () => window.removeEventListener('auth:logout', onLogout as EventListener)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
    <ToastProvider>
      <div className="app-root">
        <NavBar onNavigate={(p) => setPage(p as any)} />
        <main style={{ padding: 16 }}>
          {page === 'dashboard' && <Dashboard />}
          {page === 'library' && <WordsLibrary />}
          {page === 'import' && <ImportWords />}
          {page === 'practice' && <Practice />}
          {page === 'login' && <Login onSuccess={() => setPage('dashboard')} />}
          {page === 'admin' && <AdminPage />}  
          <ToastContainer position="top-right" autoClose={5000} />
        </main>
      </div>
    </ToastProvider>
     </QueryClientProvider>
  )
}



export default App;

