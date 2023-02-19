import Axios from 'axios'
import type { AxiosInstance } from 'axios'
import { useAuthStore } from '@/stores/auth.store'

const axios: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

axios.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.getToken) {
      // Set the authentication bearer
      config.headers.Authorization = `Bearer ${authStore.getToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (res) => {
    /**
     * you can do something here
     */
    return res.data
  },
  (err) => {
    if (err.res && err.res.data) {
      // const code = err.res.status
      // const msg = err.res.data.message
      // ElMessage.err(`Code: ${code}, Message: ${msg}`)
      // eslint-disable-next-line no-console
      console.error(`[Axios err]`, err.res)
    } else {
      // ElMessage.err(`${err}`)
    }
    return Promise.reject(err)
  }
)

export default axios
