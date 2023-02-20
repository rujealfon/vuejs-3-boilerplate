import { defineStore } from 'pinia'
import AuthApi from '@/api/auth.api'
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
        const res = await AuthApi.login(payload)
        this.token = res.access_token
        return res
      } catch (err) {
        return err
      }
    },

    logout() {
      this.token = ''
    }
  },

  persist: {
    paths: ['token']
  }
})
