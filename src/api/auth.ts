import api from './axios'

const BASE_URL = "https://admin-service-e3251105-dev.apps.rm2.thpm.p1.openshiftapps.com"

export async function login(credentials: { email: string; password: string }) {
  const res = await api.post(BASE_URL + '/api/auth/login', credentials)
  return res.data
}

export async function register(data: { name: string; email: string; password: string; role: string }) {
  const res = await api.post(BASE_URL + '/api/auth/register', data)
  return res.data
}
