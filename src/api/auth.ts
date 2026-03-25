import api from './axios'

export async function login(credentials: { email: string; password: string }) {
  const res = await api.post('/auth/login', credentials)
  return res.data
}
