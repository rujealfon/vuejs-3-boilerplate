import Axios from 'axios'
import type { AxiosInstance } from 'axios'
// import { useAuthStore } from '@/stores/auth.store';

const axios: AxiosInstance = Axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: 'https://jsonplaceholder.typicode.com'
})

axios.interceptors.request.use(
  (config) => {
    /**
     * you can do something here
     */
    // const authStore = useAuthStore()

    if (sessionStorage.getItem('access_token')) {
      // set the authentication bearer
      config.headers.common.Authorization =
        sessionStorage.getItem('access_token')
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    /**
     * you can do something here
     */
    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      // ElMessage.error(`Code: ${code}, Message: ${msg}`)
      // eslint-disable-next-line no-console
      console.error(`[Axios Error]`, error.response)
    } else {
      // ElMessage.error(`${error}`)
    }
    return Promise.reject(error)
  }
)

export default axios
