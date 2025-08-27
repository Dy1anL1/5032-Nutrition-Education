<template>
  <div v-if="recipe">
    <SectionTitle :title="recipe.title" subtitle="Ingredients, steps & nutrition" />
    <div class="grid" style="grid-template-columns: 1fr 360px">
      <div>
        <img :src="recipe.image" alt="" style="width: 100%; border-radius: 12px" />
        <h3>Ingredients</h3>
        <ul>
          <li v-for="(it, i) in recipe.ingredients" :key="i">{{ it }}</li>
        </ul>
        <h3>Steps</h3>
        <ol>
          <li v-for="(s, i) in recipe.steps" :key="i">{{ s }}</li>
        </ol>
      </div>
      <aside class="card">
        <div class="body">
          <h4 style="margin: 0 0 8px">Nutrition</h4>
          <p>
            kcal: {{ recipe.nutrition.kcal }}, carbs: {{ recipe.nutrition.carbs }}g, protein:
            {{ recipe.nutrition.protein }}g, fat: {{ recipe.nutrition.fat }}g
          </p>
          <p class="muted">Tags: {{ recipe.tags.join(', ') }}</p>
        </div>
      </aside>
    </div>
  </div>
  <p v-else>Recipe not found.</p>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SectionTitle from '../components/SectionTitle.vue'
import data from '../data/recipes.json'

const route = useRoute()
const recipe = computed(() => data.find((r) => String(r.id) === route.params.id))
</script>
