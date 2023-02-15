import type { AxiosRequestConfig } from 'axios'
// import { CreateUserBody } from './types';
import HttpService from '@/services/http.service'

export default class AuthService extends HttpService {
  private static classInstance?: AuthService

  public constructor() {
    super()

    this._initializeRequestInterceptor()
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AuthService()
    }

    return this.classInstance
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    )
  }

  private _handleRequest = (config: AxiosRequestConfig) => {
    // config.headers!['Authorization'] = `Bearer ${this.token}`
    config.headers!['Authorization'] = `Bearer . . . .`

    return config
  }

  // public createUser = (body: CreateUserBody) => this.instance.post('/users', body);
}
