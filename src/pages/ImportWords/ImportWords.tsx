import React, { useState, useRef } from 'react'
import useStore from '../../stor/useStore'
import { useToast } from '../../components/ToastProvider'
import './ImportWords.css'

const ImportWords: React.FC = () => {
  const ingest = useStore((s: any) => s.ingest)
  const user = useStore((s: any) => s.user)
  const { show } = useToast()

  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => setText(e.target?.result as string)
    reader.readAsText(file)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) loadFile(file)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) loadFile(file)
  }

  const parsedResult = (() => {
    if (!text.trim()) return null
    try {
      const parsed = JSON.parse(text)
      return { data: parsed, count: Array.isArray(parsed) ? parsed.length : 1, error: null }
    } catch {
      return { data: null, count: 0, error: 'Invalid JSON' }
    }
  })()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return show('No user', 'error')
    if (!parsedResult?.data) return show('Invalid JSON', 'error')
    setLoading(true)
    try {
      await ingest(user.id, parsedResult.data)
      show('Imported successfully', 'success')
      setText('')
    } catch {
      show('Import failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="import-page">
      <div>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.875rem', fontWeight: 800, color: '#181c23', margin: 0 }}>
          Import Words
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#414754', marginTop: 4 }}>
          Upload a JSON file or paste your JSON below to import words.
        </p>
      </div>

      <form className="import-card" onSubmit={onSubmit}>
        {/* Drop zone */}
        <div
          className={`import-dropzone${dragging ? ' import-dropzone--active' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <span className="import-dropzone__icon material-symbols-outlined">upload_file</span>
          <p className="import-dropzone__text">Drop your JSON file here or <strong>click to browse</strong></p>
          <p className="import-dropzone__subtext">.json files only</p>
          <input
            ref={fileInputRef}
            className="import-dropzone__input"
            type="file"
            accept=".json"
            onChange={onFileChange}
          />
        </div>

        <div className="import-divider">or paste JSON manually</div>

        {/* Textarea */}
        <textarea
          className="import-textarea"
          rows={10}
          placeholder={'[\n  { "word": "example", "translation": "דוגמה" }\n]'}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Preview */}
        {parsedResult && (
          <div className="import-preview">
            <span className="import-preview__label">Preview</span>
            {parsedResult.error
              ? <span className="import-preview__error">{parsedResult.error}</span>
              : <span className="import-preview__count">{parsedResult.count} word{parsedResult.count !== 1 ? 's' : ''} ready to import</span>
            }
          </div>
        )}

        <button className="import-button" type="submit" disabled={loading || !parsedResult?.data}>
          {loading ? 'Importing…' : 'Import'}
        </button>
      </form>
    </div>
  )
}

export default ImportWords
