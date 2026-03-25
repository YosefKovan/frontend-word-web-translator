import api from './axios'

export async function login(credentials: { email: string; password: string }) {
  const res = await api.post('/admin/auth/login', credentials)
  return res.data
}

export async function register(data: { name: string; email: string; password: string; role: string }) {
  const res = await api.post('/admin/auth/register', data)
  return res.data
}
