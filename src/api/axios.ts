import axios from 'axios'
import useStore from '../stor/useStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach token from localStorage if present
api.interceptors.request.use((config: any) => {
  try {
    const token = localStorage.getItem('token')
    if (token && config && config.headers) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (e) {
    // ignore
  }
  return config
})

// Response interceptor: on 401, clear auth and attempt client-side logout
api.interceptors.response.use(
  (res: any) => res,
  (err: any) => {
    try {
      const status = err?.response?.status
      if (status === 401) {
        const st = useStore.getState ? useStore.getState() : null
        try {
          st?.logout && st.logout()
        } catch (e) {
          // ignore
        }
        try {
          localStorage.removeItem('token')
        } catch (e) {}
        // dispatch an event so the app can navigate to login without a full reload
        try {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('auth:logout'))
          }
        } catch (e) {
          if (typeof window !== 'undefined') window.location.reload()
        }
      }
    } catch (e) {
      // ignore
    }
    return Promise.reject(err)
  }
)

export default api
