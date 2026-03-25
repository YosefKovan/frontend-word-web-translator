import React from 'react'
import useStore from '../stor/useStore'
import { useToast } from './ToastProvider'
// styles consolidated into src/App.css

const WordCard: React.FC<{ word: any }> = ({ word }) => {
  const enrich = useStore((s: any) => s.enrich)
  const { show } = useToast()

  return (
    <div className="word-card">
      <h3>{word.text || word.word}</h3>
      <div>{word.definition || word.meaning || ''}</div>
      <button
        onClick={async () => {
          try {
            const enriched = await enrich(word.text || word.word)
            show('Enriched word received', 'success')
            // optionally show details in console for now
            // eslint-disable-next-line no-console
            console.log('enriched', enriched)
          } catch (e) {
            show('Enrich failed', 'error')
          }
        }}
      >
        Enrich
      </button>
    </div>
  )
}

export default WordCard
