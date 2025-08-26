<template>
  <article class="card" @click="$router.push(`/recipes/${recipe.id}`)">
    <img v-if="recipe.image" :src="recipe.image" :alt="recipe.title" />
    <h3>{{ recipe.title }}</h3>
    <p class="muted">{{ recipe.short }}</p>
    <ul class="tags">
      <li v-for="t in recipe.tags" :key="t">#{{ t }}</li>
    </ul>
  </article>
</template>

<script setup>
defineProps({ recipe: { type: Object, required: true } })
</script>

<style scoped>
.card{border:1px solid #e5e7eb;border-radius:10px;padding:12px;cursor:pointer;background:#fff;display:flex;flex-direction:column;gap:8px}
.card img{width:100%;height:150px;object-fit:cover;border-radius:8px;background:#f3f4f6}
h3{margin:0}
.muted{color:#6b7280;font-size:0.9rem}
.tags{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 0;padding:0;list-style:none}
.tags li{background:#f3f4f6;padding:2px 8px;border-radius:999px;font-size:12px}
</style>
