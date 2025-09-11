<!--
  App root component
  - Provides the global layout shell: NavBar at the top, FooterBar at the bottom,
    and a `router-view` in the middle for page content.
  - Keep the root component minimal. Application-level state and providers belong
    in dedicated modules (stores, composables, or plugins).
-->
<template>
  <div class="app">
    <NavBar />
    <main class="container">
      <!-- Show loading spinner during initial auth -->
      <div v-if="authStore.loading && showInitialLoader" class="initial-loader">
        <div class="loader-spinner"></div>
        <p>Loading...</p>
      </div>
      <!-- Main content -->
      <router-view v-else />
    </main>
    <FooterBar />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const showInitialLoader = ref(true)

// Hide loader after a maximum of 3 seconds to prevent infinite loading
onMounted(() => {
  setTimeout(() => {
    showInitialLoader.value = false
  }, 3000)
})
</script>

<style>
.initial-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.loader-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #22c55e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.initial-loader p {
  color: #6b7280;
  font-size: 1.1rem;
  margin: 0;
}
</style>
