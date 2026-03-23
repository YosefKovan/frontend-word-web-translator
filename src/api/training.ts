import api from './axios'

export async function getTrainingQueue(user_id: string, count = 10) {
  const res = await api.get('/training/queue', { params: { user_id, count } })
  return res.data
}

export async function postTrainingResult(payload: any) {
  const res = await api.post('/training/results', payload)
  return res.data
}
