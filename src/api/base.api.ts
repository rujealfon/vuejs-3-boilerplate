import Axios from '@/services/axios.service'

abstract class Base {
  protected axios = Axios

  constructor(protected base: string) {}

  search(params?: any): Promise<any> {
    return this.axios.get(`${this.base}`, { params })
  }

  detail(id: number) {
    return this.axios.get(`${this.base}/${id}`)
  }

  create(payload: any) {
    return this.axios.post(`${this.base}`, payload)
  }

  update(payload: any) {
    return this.axios.put(`${this.base}/${payload.id}`, payload)
  }

  delete(id: any) {
    return this.axios.delete(`${this.base}/${id}`)
  }
}

export default Base
