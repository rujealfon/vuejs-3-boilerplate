import { defineStore } from 'pinia'
import Auth from '@/api/auth.api'
import type { LoginRequest } from '@/models/auth.model'

export const useAuthStore = defineStore({
  id: 'auth',

  state: () => ({
    token: ''
  }),

  getters: {
    getToken: (state) => state.token
  },

  actions: {
    async login(payload: LoginRequest) {
      try {
        const res = await Auth.login(payload)
        this.token = res.access_token
        return res
      } catch (err) {
        return err
      }
    }
  },

  persist: {
    paths: ['token']
  }
})
