<template>
  <footer style="border-top: 1px solid var(--line); margin-top: 40px">
    <div
      class="container"
      style="display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap"
    >
      <p>© {{ year }} Healthy Living</p>
      <p><a href="/about">About</a> · <a href="/contact">Contact</a></p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
