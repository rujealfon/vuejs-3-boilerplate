import axios from '@/services/axios.service'
import type { LoginRequest, LoginResponse } from '@/models/auth.model'

class Auth {
  private resource: string = '/auth'

  login(payload: LoginRequest) {
    return axios.post<LoginResponse>(`${this.resource}/login`, payload)
  }

  register(payload: any) {
    return axios.post<Promise<any>>(`${this.resource}/register`, payload)
  }
}

export default new Auth()
