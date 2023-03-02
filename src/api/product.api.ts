import BaseApi from '@/api/base.api'
import type { Product, Pagination } from '@/models/product.model'

class ProductApi extends BaseApi<Product, Pagination> {
  constructor() {
    super('/products')
  }
}

export default new ProductApi()
