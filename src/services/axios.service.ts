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
  (err) => {
    return Promise.reject(err)
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
    const authStore = useAuthStore()
    if (err.response && err.response.data) {
      const code = err.response.status
      // const msg = err.res.data.message
      // ElMessage.err(`Code: ${code}, Message: ${msg}`)
      // eslint-disable-next-line no-console
      console.error(`[Axios err]`, err.response)

      if (code === 401) {
        authStore.logout()
      }
    } else {
      // ElMessage.err(`${err}`)
    }
    return Promise.reject(err)
  }
)

export default axios
