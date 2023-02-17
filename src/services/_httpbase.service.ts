import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

interface RefreshToken {
  status: number
  data: {
    hashToken: string
  }
}

export abstract class HTTPBaseService {
  protected instance: AxiosInstance
  protected token: string
  protected readonly baseURL: string

  public constructor(baseURL: string, token: string) {
    this.baseURL = baseURL
    this.instance = axios.create({
      baseURL,
    })
    this.token = token

    this.initializeRequestInterceptor()
    this.initializeResponseInterceptor()
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(undefined, this.handleRequest)
  }

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use((response) => {
      if (response.headers && response.headers.authorization) {
        const responseToken = (response.headers.authorization as string).split(
          ' '
        )[1]
        this.token = responseToken

        localStorage.setItem('hashToken', this.token)
      }
      return response
    }, this.handleError)
  }

  private handleRequest = (config: AxiosRequestConfig) => {
    config.headers!['Authorization'] = `Bearer ${this.token}`
    return config
  }

  private handleError = async (error: AxiosError) => {
    const originalRequest = error.config
    if (error.response?.status === 401) {
      const refreshToken = await this.refreshToken()
      if (refreshToken.status === 200) {
        this.token = refreshToken.data.hashToken
        localStorage.setItem('hashToken', this.token)
        return this.instance(undefined, originalRequest)
      }
    }
  }

  private async refreshToken(): Promise<RefreshToken> {
    const refreshTokenRequest = {
      hashToken: this.token,
    }

    const { data } = await this.addRequestOptionsForClientSecrect()
    const options: AxiosRequestConfig = {
      headers: {
        CLIENT_KEY: data.clientKey,
      },
    }

    return axios.post(
      `${this.baseURL}/User/RenewToken`,
      refreshTokenRequest,
      options
    )
  }

  private addRequestOptionsForClientSecrect() {
    return axios.get(`${this.baseURL}/Utility/GetSecrets`)
  }
}
