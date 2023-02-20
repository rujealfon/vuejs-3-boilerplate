import type { Base } from '@/models/base.model'

export interface Product extends Base {
  name: string
  cost: number
  quantity: number
  locationId: number
  familyId: number
}
