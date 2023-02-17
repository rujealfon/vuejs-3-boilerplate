import Base from '@/api/base.api'
// import axios from '@/services/axios.service'

class User extends Base {
  constructor() {
    super('/users')
  }
}

export default new User()
