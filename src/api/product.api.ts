import Base from '@/api/base.api'

class Product extends Base {
  constructor() {
    super('/products')
  }

  paginate() {
    return this.$axios.post<Promise<any>>(`${this.resource}?_limit=2`)
  }
}

export default new Product()
