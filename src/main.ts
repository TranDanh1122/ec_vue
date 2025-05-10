import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { router } from './router'
import { queryClient } from "@/utls/tanstack-client"
const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.use(VueQueryPlugin, { queryClient })
app.mount('#app')
