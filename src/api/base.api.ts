import axios from '@/services/axios.service'

abstract class BaseApi<T> {
  protected $axios = axios

  constructor(protected resource: string) {}

  search(params?: Record<string, string | number>) {
    return this.$axios.get<T[]>(`${this.resource}`, { params })
  }

  detail(id: number) {
    return this.$axios.get<T>(`${this.resource}/${id}`)
  }

  create(payload: Omit<T, 'id'>) {
    return this.$axios.post<T>(`${this.resource}`, payload)
  }

  update(payload: Partial<Omit<T, 'id'>>) {
    return this.$axios.put<T>(`${this.resource}`, payload)
  }

  delete(id: number) {
    return this.$axios.delete<Promise<void>>(`${this.resource}/${id}`)
  }
}

export default BaseApi
