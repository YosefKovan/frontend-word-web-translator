import React, { createContext, useCallback, useContext, useState } from 'react'
// styles consolidated into src/App.css

type Toast = { id: string; message: string; type?: 'info' | 'success' | 'error' }

const ToastContext = createContext<{ show: (msg: string, type?: Toast['type']) => void } | null>(null)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const show = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = String(Date.now()) + Math.random().toString(16).slice(2)
    const t: Toast = { id, message, type }
    setToasts((s) => [...s, t])
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div style={{ position: 'fixed', right: 16, top: 16, zIndex: 9999 }}>
        {toasts.map((t) => (
          <div key={t.id} style={{
            marginBottom: 8,
            padding: '8px 12px',
            borderRadius: 6,
            color: '#fff',
            background: t.type === 'error' ? '#e53e3e' : t.type === 'success' ? '#2f855a' : '#3182ce',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}>{t.message}</div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export default ToastProvider
