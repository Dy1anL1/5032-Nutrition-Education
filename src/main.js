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
// Bootstrap CSS and JavaScript for responsive components
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Includes Popper.js for dropdowns, popovers, tooltips

// Create the app
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize auth store
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')
