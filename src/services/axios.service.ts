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
    return res
  },
  (err) => {
    if (err.response && err.response.status) {
      const authStore = useAuthStore()
      const status = err.response.status

      switch (status) {
        case 401:
          authStore.logout()
          break
        case 403:
          // Handle 403 here
          break
        case 410:
          // Handle 410 here
          break
        case 412:
          // Handle 412 here
          break
        case 500:
          // Add toastr here
          console.log(err)
          break
        default:
          break
      }
    }

    return Promise.reject(err)
  }
)

export default axios
