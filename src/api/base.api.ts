import axios from '@/services/axios.service'

abstract class Base {
  constructor(protected base: string) {}

  search(params?: any): Promise<any> {
    return axios.get(`${this.base}`, { params })
  }

  detail(id: number) {
    return axios.get(`${this.base}/${id}`)
  }

  create(payload: any) {
    return axios.post(`${this.base}`, payload)
  }

  update(payload: any) {
    return axios.put(`${this.base}/${payload.id}`, payload)
  }

  delete(id: any) {
    return axios.delete(`${this.base}/${id}`)
  }
}

export default Base
