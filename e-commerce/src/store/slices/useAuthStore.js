import { create } from 'zustand'
import { getCurrentUser, loginUser, logoutUser, signupUser } from '../../api'

export const useAuthStore = create((set) => ({
  error: '',
  isAuthenticated: false,
  isLoading: false,
  user: null,
  bootstrap: async () => {
    set({ isLoading: true, error: '' })

    try {
      const response = await getCurrentUser()
      set({
        isAuthenticated: Boolean(response.data),
        isLoading: false,
        user: response.data,
      })
    } catch (error) {
      console.error(error)
      set({
        error: error.message || 'Unable to restore session.',
        isAuthenticated: false,
        isLoading: false,
        user: null,
      })
    }
  },
  clearError: () => set({ error: '' }),
  login: async (payload) => {
    set({ error: '', isLoading: true })

    try {
      const response = await loginUser(payload)
      set({
        isAuthenticated: true,
        isLoading: false,
        user: response.data,
      })
      return response.data
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return null
    }
  },
  logout: async () => {
    await logoutUser()
    set({ error: '', isAuthenticated: false, user: null })
  },
  signup: async (payload) => {
    set({ error: '', isLoading: true })

    try {
      const response = await signupUser(payload)
      set({
        isAuthenticated: true,
        isLoading: false,
        user: response.data,
      })
      return response.data
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return null
    }
  },
}))
