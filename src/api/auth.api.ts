import Base from '@/api/base.api'
import axios from '@/services/axios.service'

class Auth extends Base {
  constructor() {
    super('/auth')
  }

  login(payload: any): Promise<any> {
    return axios.post(`${this.base}/login`, payload)
  }

  register(payload: any): Promise<any> {
    return axios.post(`${this.base}/register`, payload)
  }
}

export default new Auth()
