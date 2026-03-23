import api from './axios'

export async function getProgress(user_id: string) {
  const res = await api.get(`/users/${user_id}/progress`)
  return res.data
}
