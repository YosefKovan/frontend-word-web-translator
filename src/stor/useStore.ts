import { create } from 'zustand'
import { ingestWords, enrichWord, fetchWords } from '../api/words'
import { getTrainingQueue, postTrainingResult } from '../api/training'
import { getProgress } from '../api/users'
import { login as apiLogin } from '../api/auth'



export const useStore: any = create((set: any, get: any) => ({
  user: null,
  words: [],
  queue: [],
  progress: null,
  setUser: (user: { id: string; name?: string } | null) => set({ user }),
  loadWords: async (user_id: string) => {
    try {
      const data = await fetchWords(user_id)
      set({ words: data || [] })
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
    // expect { token: string, user: { id, name, role } }
    if (data?.token) {
      try {
        localStorage.setItem('token', data.token)
      } catch (e) {
        /* ignore */
      }
    }
    if (data?.user) set({ user: data.user })
    return data
  },
  logout: () => {
    try {
      localStorage.removeItem('token')
    } catch (e) {
      /* ignore */
    }
    set({ user: null })
  },
}))

export default useStore
