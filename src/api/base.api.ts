import axios from '@/services/axios.service'

abstract class Base {
  protected $axios = axios

  constructor(protected resource: string) {}

  search(params?: any) {
    return this.$axios.get<Promise<any>>(`${this.resource}`, { params })
  }

  detail(id: number) {
    return this.$axios.get<Promise<any>>(`${this.resource}/${id}`)
  }

  create(payload: any) {
    return this.$axios.post<Promise<any>>(`${this.resource}`, payload)
  }

  update(payload: any) {
    return this.$axios.put<Promise<any>>(
      `${this.resource}/${payload.id}`,
      payload
    )
  }

  delete(id: number) {
    return this.$axios.delete<Promise<any>>(`${this.resource}/${id}`)
  }
}

export default Base
