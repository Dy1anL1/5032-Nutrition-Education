<template>
  <SectionTitle title="Healthy Recipes" subtitle="Search and filter by dietary needs" />

  <div class="grid" style="grid-template-columns: 280px 1fr">
    <aside class="card" style="padding: 14px">
      <label class="kbd">Search</label>
      <input v-model="q" class="input" placeholder="pumpkin, low-gi..." />
      <div style="margin-top: 16px">
        <p class="kbd">Filter by tag</p>
        <label><input type="checkbox" value="low-gi" v-model="tags" /> Low-GI</label><br />
        <label><input type="checkbox" value="vegetarian" v-model="tags" /> Vegetarian</label><br />
        <label><input type="checkbox" value="budget" v-model="tags" /> Budget</label><br />
        <label><input type="checkbox" value="quick" v-model="tags" /> Quick</label>
      </div>
      <p style="margin-top: 10px; color: var(--muted)">Results: {{ filtered.length }}</p>
    </aside>

    <div class="cards">
      <RecipeCard v-for="r in filtered" :key="r.id" :recipe="r" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionTitle from '../components/SectionTitle.vue'
import RecipeCard from '../components/RecipeCard.vue'
import data from '../data/recipes.json'

const q = ref('')
const tags = ref([])

const filtered = computed(() => {
  const kw = q.value.trim().toLowerCase()
  return data.filter((r) => {
    const kwOk =
      !kw ||
      r.title.toLowerCase().includes(kw) ||
      r.ingredients.join(' ').toLowerCase().includes(kw)
    const tagOk = tags.value.length === 0 || tags.value.every((t) => r.tags.includes(t))
    return kwOk && tagOk
  })
})
</script>
