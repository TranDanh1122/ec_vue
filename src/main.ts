import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { router } from './router'
import { queryClient } from "@/utls/tanstack-client"
import Toast , {useToast} from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.use(VueQueryPlugin, { queryClient })
app.use(Toast);
app.mount('#app')
const toast = useToast()

app.config.errorHandler = (err: any) => {
    console.error('[ERROR]', err)
    toast.error(err.message || err)
}
window.addEventListener('error', (event) => {
    console.error('[RUNTIME ERROR]', event.message, event.error)
    toast.error(`Runtime Error: ${event.message}`)
})
window.addEventListener('unhandledrejection', (event) => {
    console.error('[UNHANDLED PROMISE]', event.reason)
    toast.error(`Unhandled Promise: ${event.reason}`)
})

