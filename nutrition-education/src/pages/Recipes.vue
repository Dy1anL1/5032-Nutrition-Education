<template>
  <section class="wrap">
    <h1>Healthy Recipes</h1>

    <div class="filters">
      <input v-model="q" placeholder="Search by name or ingredient..." />
      <div class="chips">
        <label v-for="t in allTags" :key="t" class="chip">
          <input type="checkbox" :value="t" v-model="selectedTags" />
          <span>#{{ t }}</span>
        </label>
      </div>
    </div>

    <p class="muted" v-if="filtered.length === 0">No recipes found. Try another keyword or remove filters.</p>

    <div class="grid">
      <RecipeCard v-for="r in filtered" :key="r.id" :recipe="r" />
    </div>
  </section>
</template>

<script setup>
import RecipeCard from '../components/RecipeCard.vue'
import data from '../data/recipes.json'
import { computed, ref } from 'vue'

const q = ref('')
const selectedTags = ref([])

const allTags = [...new Set(data.flatMap(r => r.tags))]

const filtered = computed(() => {
  const text = q.value.trim().toLowerCase()
  return data.filter(r => {
    const textOk =
      !text ||
      r.title.toLowerCase().includes(text) ||
      r.ingredients.join(' ').toLowerCase().includes(text)

    const tagsOk =
      selectedTags.value.length === 0 ||
      selectedTags.value.every(t => r.tags.includes(t))

    return textOk && tagsOk
  })
})
</script>

<style scoped>
.wrap{ max-width:1100px; margin:0 auto; padding:16px; background:#fff; }
.filters{display:flex;flex-direction:column;gap:10px;margin:10px 0 16px}
.filters input{
  border:1px solid var(--border);
  border-radius:10px;
  padding:12px 14px;
  outline: none;
}
.filters input:focus{
  border-color: var(--brand);
  box-shadow: 0 0 0 3px rgba(22,163,74,.12);
}
input{padding:10px;border:1px solid #d1d5db;border-radius:8px;width:100%}
input{ background:#fff; color:var(--text); }
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{ background:#f9fafb; border:1px solid var(--border); }
.chip{display:flex;align-items:center;gap:6px;background:#f9fafb;border:1px solid #e5e7eb;padding:6px 10px;border-radius:999px;font-size:13px}
.grid{display:grid;grid-template-columns:1fr;gap:12px}
@media (min-width:640px){.grid{grid-template-columns:repeat(2,1fr)}}
@media (min-width:1024px){.grid{grid-template-columns:repeat(3,1fr)}}
.muted{color:#6b7280}
</style>
