import Base from '@/api/base.api'
import type { User } from '@/models/user.model'

class UserApi extends Base<User> {
  constructor() {
    super('/users')
  }
}

export default new UserApi()
