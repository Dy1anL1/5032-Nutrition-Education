<template>
  <section class="hero">
    <h1>Public health through nutrition education</h1>
    <p>Trusted recipes, practical meal planning, and easy-to-read nutrition guides.</p>
    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))">
      <router-link to="/recipes" class="btn primary">Browse Recipes</router-link>
      <router-link to="/meal-planner" class="btn">Open Meal Planner</router-link>
      <router-link to="/education" class="btn">Nutrition Education</router-link>
    </div>
  </section>

  <section>
    <SectionTitle title="Featured recipes" subtitle="Healthy choices to get started" />
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
