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
      <router-view />
    </main>
    <FooterBar />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'

// Root App - minimal bootstrapper. Avoid adding business logic directly here; use
// composables or state management for app-wide behaviour.
</script>
