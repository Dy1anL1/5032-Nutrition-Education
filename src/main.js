// Application entry point
// This file creates the Vue app, applies the router, and mounts it to the page.
// Styles are imported here so they are available globally.
import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

// Global styles
import './assets/base.css'
import './assets/main.css'
// Bootstrap utility classes (optional; added for convenience in some pages)
import 'bootstrap/dist/css/bootstrap.min.css'

// Create and mount the app
createApp(App).use(router).mount('#app')
