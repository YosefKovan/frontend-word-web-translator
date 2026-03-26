import api from './axios'

export type QueueWord = {
  word_id: string
  word: string
  translation: string
  difficulty: string
  last_seen_date: string
}

export type SessionResponse = {
  session_id: string
  queue: QueueWord[]
}

const BASE_URL = "https://data2-training-e3251105-dev.apps.rm2.thpm.p1.openshiftapps.com";

export type SubmitResultPayload = {
  session_id: string
  word_id: string
  user_id: string
  result: 'correct' | 'incorrect'
  time_taken_ms: number
}

export async function startSession(userId : string, count : number): Promise<SessionResponse> {
  const res = await api.get(BASE_URL + `/api/training/queue?user_id=${userId}&count=${count}`);
  return res.data
}

export async function submitResult(payload: SubmitResultPayload): Promise<void> {
  await api.post(BASE_URL + '/api/training/results', payload)
}
