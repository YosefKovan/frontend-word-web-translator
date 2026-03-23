import React, { useEffect } from 'react'
import useStore from '../stor/useStore'
import WordCard from '../components/WordCard'
// styles consolidated into src/App.css

const WordsLibrary: React.FC = () => {
  const user = useStore((s: any) => s.user)
  const words = useStore((s: any) => s.words)
  const loadWords = useStore((s: any) => s.loadWords)

  useEffect(() => {
    if (user) loadWords(user.id)
  }, [user])

  return (
    <div>
      <h2>Words Library</h2>
      <div className="words-grid">
        {words?.map((w: any, i: number) => (
          <WordCard key={i} word={w} />
        ))}
      </div>
    </div>
  )
}

export default WordsLibrary
