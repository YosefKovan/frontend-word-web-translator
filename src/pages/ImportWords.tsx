import React from 'react'
import ImportForm from '../components/ImportForm'
// styles consolidated into src/App.css

const ImportWords: React.FC = () => {
  return (
    <div className="import-page">
      <h2>Import Words</h2>
      <p>Paste JSON array of word objects below.</p>
      <ImportForm />
    </div>
  )
}

export default ImportWords
