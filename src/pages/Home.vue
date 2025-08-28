<template>
  <!-- Page title bar (consistent with Recipes) -->
  <section class="title-bar">
    <div class="title-inner">
      <h1 class="title">Welcome to Healthy Living</h1>
      <p class="subtitle">Trusted recipes, practical meal planning, and easy-to-read nutrition guides.</p>
    </div>
  </section>

  <section class="hero">
    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))">
      <router-link to="/recipes" class="btn primary">Browse Recipes</router-link>
      <router-link to="/meal-planner" class="btn primary">Open Meal Planner</router-link>
      <router-link to="/education" class="btn primary">Nutrition Education</router-link>
    </div>
  </section>

  <section>
    <div class="cards">
      <RecipeCard v-for="r in featured" :key="r.id" :recipe="r" />
    </div>
  </section>
</template>

<script setup>
import SectionTitle from '../components/SectionTitle.vue'
import RecipeCard from '../components/RecipeCard.vue'
import recipes from '../data/recipes.json'
const featured = recipes.slice(0, 3)
</script>
