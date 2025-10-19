// Application entry point
// This file creates the Vue app, applies the router, and mounts it to the page.
// Styles are imported here so they are available globally.
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router.js'
import { useAuthStore } from './stores/auth.js'

// Global styles
import './assets/base.css'
import './assets/main.css'
import './assets/accessibility.css' // WCAG 2.1 AA accessibility styles
// Bootstrap utility classes (optional; added for convenience in some pages)
import 'bootstrap/dist/css/bootstrap.min.css'

// Create the app
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize auth store
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')
