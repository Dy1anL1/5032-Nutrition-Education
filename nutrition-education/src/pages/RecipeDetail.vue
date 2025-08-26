<template>
  <section class="wrap" v-if="recipe">
    <h1>{{ recipe.title }}</h1>
    <img v-if="recipe.image" :src="recipe.image" :alt="recipe.title" class="hero" />

    <div class="meta">
      <ul class="tags"><li v-for="t in recipe.tags" :key="t">#{{ t }}</li></ul>
      <div class="nutri">
        <span>{{ recipe.nutrition.kcal }} kcal</span>
        <span>{{ recipe.nutrition.carbs }}g carbs</span>
        <span>{{ recipe.nutrition.protein }}g protein</span>
        <span>{{ recipe.nutrition.fat }}g fat</span>
      </div>
    </div>

    <h2>Ingredients</h2>
    <ul>
      <li v-for="(ing,i) in recipe.ingredients" :key="i">{{ ing }}</li>
    </ul>

    <h2>Steps</h2>
    <ol>
      <li v-for="(s,i) in recipe.steps" :key="i">{{ s }}</li>
    </ol>
  </section>

  <section v-else class="wrap">
    <p>Recipe not found.</p>
  </section>
</template>

<script setup>
import data from '../data/recipes.json'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const id = Number(route.params.id)

const recipe = computed(() => data.find(r => r.id === id))
</script>

<style scoped>
.wrap{max-width:900px;margin:0 auto;padding:16px}
.hero{width:100%;height:260px;object-fit:cover;border-radius:12px;background:#f3f4f6;margin:10px 0}
.tags{display:flex;gap:8px;flex-wrap:wrap;list-style:none;padding:0;margin:0}
.tags li{background:#eef2ff;color:#3730a3;border-radius:999px;padding:2px 10px;font-size:12px}
.meta{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:8px 0 16px}
.nutri{display:flex;gap:12px;flex-wrap:wrap;font-size:14px;color:#374151}
h1,h2{margin:8px 0}
</style>
