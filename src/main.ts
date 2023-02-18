import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from '@/App.vue'
import router from '@/router'

// Add interceptor through side effects
// https://github.com/vuejs/pinia/discussions/687
// import axios from '@/services/axios.service'

import '@/assets/main.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)
app.mount('#app')
