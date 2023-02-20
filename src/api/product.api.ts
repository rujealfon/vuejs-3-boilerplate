import BaseApi from '@/api/base.api'
import type { Product } from '@/models/product.model'

class ProductApi extends BaseApi<Product> {
  constructor() {
    super('/products')
  }

  paginate() {
    return this.$axios.post<Product[]>(`${this.resource}?_limit=2`)
  }
}

export default new ProductApi()
