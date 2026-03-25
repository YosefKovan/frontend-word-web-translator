import api from './axios'

export type IngestResult = { success: boolean; importedCount?: number }

export async function ingestWords(payload: { user_id: string; words: any[] }) {
  const res = await api.post('/words/ingest', payload)
  return res.data as IngestResult
}

export async function enrichWord(word: string, lang = 'en') {
  const res = await api.get(`/words/enrich`, { params: { word, lang } })
  return res.data
}

export async function fetchWords(user_id: string) {
  const res = await api.get(`/words`, { params: { user_id } })
  return res.data
}
