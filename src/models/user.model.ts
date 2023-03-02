import type { Pagination as Paginate } from './pagination.model'

export interface User {
  name: string
}

export interface Pagination extends Paginate {
  users: User[]
}
