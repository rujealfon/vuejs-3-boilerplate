import { defineStore } from 'pinia'
import AuthService from '@/api/auth.api'
import type { ILoginRequest } from '@/models/auth.model'

export const useAuthStore = defineStore({
  id: 'auth',

  state: () => ({
    token: ''
  }),

  getters: {
    getToken: (state) => state.token
  },

  actions: {
    async login(payload: ILoginRequest) {
      try {
        const response = await AuthService.login(payload)

        this.token = response.data.access_token

        return response.data.access_token
      } catch (error) {
        return error
      }
    }
  },

  persist: {
    paths: ['token']
  }
})
