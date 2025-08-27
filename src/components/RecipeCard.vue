<template>
  <article class="card">
    <img :src="recipe.image || 'https://via.placeholder.com/800x480?text=Recipe'" alt="" />
    <div class="body">
      <h3 style="margin: 0 0 4px">{{ recipe.title }}</h3>
      <p class="muted" style="margin: 0 0 10px">{{ recipe.summary }}</p>
      <router-link class="btn" :to="`/recipes/${recipe.id}`">View Recipe</router-link>
    </div>
  </article>
</template>

<script setup>
defineProps({ recipe: { type: Object, required: true } })
</script>
