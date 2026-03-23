import React, { useState } from 'react'
import useStore from '../stor/useStore'
import { useToast } from './ToastProvider'
// styles consolidated into src/App.css

const ImportForm: React.FC = () => {
  const ingest = useStore((s: any) => s.ingest)
  const user = useStore((s: any) => s.user)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const { show } = useToast()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return show('No user', 'error')
    setLoading(true)
    try {
      const parsed = JSON.parse(text)
      await ingest(user.id, parsed)
      show('Imported', 'success')
    } catch (err) {
      show('Invalid JSON', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="import-form">
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} />
      <button type="submit" disabled={loading}>{loading ? 'Importing...' : 'Import JSON'}</button>
    </form>
  )
}

export default ImportForm
