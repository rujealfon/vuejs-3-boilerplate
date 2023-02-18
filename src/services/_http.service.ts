import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export default abstract class HttpService {
  protected readonly instance: AxiosInstance

  public constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL
    })

    this._initializeResponseInterceptor()
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    )
  }

  private _handleResponse = ({ data }: AxiosResponse) => data

  protected _handleError = (error: any) => Promise.reject(error)
}
