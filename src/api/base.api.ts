import axios from '@/services/axios.service'

abstract class BaseApi<TResource, TPagination> {
  protected $axios = axios

  constructor(protected resource: string) {}
  get(params?: Record<string, string | number>) {
    return this.$axios.get<TPagination>(`${this.resource}`, { params })
  }

  search(params: Record<string, string | number>) {
    return this.$axios.get<TPagination>(`${this.resource}/search`, { params })
  }

  create(payload: Omit<TResource, 'id'>) {
    return this.$axios.post<TResource>(`${this.resource}`, payload)
  }

  read(id: number) {
    return this.$axios.get<TResource>(`${this.resource}/${id}`)
  }

  update(payload: Partial<Omit<TResource, 'id'>>) {
    return this.$axios.put<TResource>(`${this.resource}`, payload)
  }

  delete(id: number) {
    return this.$axios.delete<Promise<void>>(`${this.resource}/${id}`)
  }
}

export default BaseApi
