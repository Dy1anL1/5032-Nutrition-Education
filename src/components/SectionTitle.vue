<template>
  <div style="margin: 8px 0 16px">
    <h2 style="margin: 0">{{ title }}</h2>
    <p v-if="subtitle" style="color: var(--muted); margin: 6px 0 0">{{ subtitle }}</p>
  </div>
</template>
<script setup>
defineProps({ title: String, subtitle: String })
</script>
