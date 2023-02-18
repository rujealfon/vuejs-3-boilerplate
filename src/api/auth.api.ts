import Base from '@/api/base.api'
import axios from '@/services/axios.service'
import type { ILoginRequest, ILoginResponse } from '@/models/auth.model'

class Auth extends Base {
  constructor() {
    super('/auth')
  }

  login(payload: ILoginRequest): Promise<ILoginResponse> {
    return axios.post(`${this.base}/login`, payload)
  }
  register(payload: any): Promise<any> {
    return axios.post(`${this.base}/register`, payload)
  }
}

export default new Auth()
