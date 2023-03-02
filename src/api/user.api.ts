import Base from '@/api/base.api'
import type { User, Pagination } from '@/models/user.model'

class UserApi extends Base<User, Pagination> {
  constructor() {
    super('/users')
  }
}

export default new UserApi()
