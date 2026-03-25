import api from './axios'


export async function getTrainingQueue(user_id: string, count = 10) {
  const res = await api.get('/api/data1/training/queue', { params: { user_id, count } })
  return res;
}

export async function postTrainingResult(payload: any) {
  const res = await api.post('/training/results', payload)
  return res.data
}
