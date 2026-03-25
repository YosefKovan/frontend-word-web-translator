import { create } from 'zustand'
import { ingestWords, enrichWord, fetchWords } from '../api/words'
import { getTrainingQueue, postTrainingResult } from '../api/training'
import { getProgress } from '../api/users'
import { login as apiLogin } from '../api/auth'
import api from '../api/axios'



export const useStore: any = create((set: any, get: any) => ({
  // auth
  token: (() => {
    try { return localStorage.getItem('token') } catch { return null }
  })(),
  user: (() => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return null
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  })(),
  loading: true,
  isAuthenticated: (() => {
    try { return Boolean(localStorage.getItem('token')) } catch { return false }
  })(),
  setUser: (user: { id: string; name?: string } | null) => {
    set({ user, isAuthenticated: Boolean(user) })
  },
  loadWords: async (user_id: string) => {
    try {
      const data = await fetchWords(user_id)
      const words = Array.isArray(data) ? data : (data?.words ?? data?.items ?? [])
      set({ words })
    } catch (e) {
      console.error('loadWords failed', e)
    }
  },
  ingest: async (user_id: string, words: any[]) => {
    try {
      const data = await ingestWords({ user_id, words })
      // reload
      await get().loadWords(user_id)
      return data
    } catch (e) {
      console.error('ingest failed', e)
      throw e
    }
  },
  enrich: async (word: string, lang = 'en') => {
    try {
      return await enrichWord(word, lang)
    } catch (e) {
      console.error('enrich failed', e)
      throw e
    }
  },
  fetchQueue: async (user_id: string, count = 10) => {
    try {
      const data = await getTrainingQueue(user_id, count)
      set({ queue: data || [] })
      return data
    } catch (e) {
      console.error('fetchQueue failed', e)
      throw e
    }
  },
  submitResult: async (result: any) => {
    try {
      const data = await postTrainingResult(result)
      return data
    } catch (e) {
      console.error('submitResult failed', e)
      throw e
    }
  },
  fetchProgress: async (user_id: string) => {
    try {
      const data = await getProgress(user_id)
      set({ progress: data })
      return data
    } catch (e) {
      console.error('fetchProgress failed', e)
      throw e
    }
  },
  login: async (email: string, password: string) => {
    const data = await apiLogin({ email, password })
    // server returns { access_token, user_id, role, expires_at }
    const token = data?.access_token
    const user = token ? { id: data.user_id, role: data.role } : null
    if (token) {
      try {
        localStorage.setItem('token', token)
      } catch { /* ignore */ }
      set({ token })
    }
    if (user) {
      try {
        localStorage.setItem('user', JSON.stringify(user))
      } catch { /* ignore */ }
      set({ user })
    }
    set({ isAuthenticated: Boolean(token) })
    return data
  },
  logout: () => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } catch { /* ignore */ }
    set({ user: null, token: null, isAuthenticated: false })
  },
  // initialize auth state on app start
  init: async () => {
    const { token } = get()

    // no token -> not authenticated
    if (!token) {
      set({ loading: false, isAuthenticated: false })
      return
    }

    try {
      const res = await api.get('/auth/me')
      const data = res?.data
      // normalize: prefer data.user if present
      const user = data?.user ?? data

      set({ user, loading: false, isAuthenticated: Boolean(user) })
    } catch (err) {
      try {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      } catch { /* ignore */ }

      set({ user: null, token: null, loading: false, isAuthenticated: false })
    }
  },
}))

export default useStore
