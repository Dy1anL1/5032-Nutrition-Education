<!--
  Recipe detail modal
  - Opens as a centered overlay. Shows title, image, tags and nutrition on the left,
    and Ingredients + Instructions on the right.
  - The close() helper uses router.back() when possible; otherwise it navigates to /recipes.
-->
<template>
  <div>
    <div v-if="recipe" class="rd-overlay" @click.self="close">
      <div class="rd-modal" role="dialog" aria-modal="true">
        <button class="rd-close" @click="close" aria-label="Close">×</button>

        <div class="rd-grid">
          <!-- LEFT: title, image, tags, nutrition -->
          <div class="rd-left">
            <header class="rd-header">
              <div class="rd-title-wrap">
                <svg class="rd-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#22c55e" d="M12 2c1 0 2 .5 2 1.5S13 6 12 7s-2-1.5-2-3.5S11 2 12 2z" />
                  <circle cx="12" cy="14" r="6" fill="#22c55e" opacity="0.12" />
                </svg>
                <h1 class="rd-title">{{ recipe.title }}</h1>
              </div>
            </header>

            <div class="rd-image-wrap">
              <img :src="recipe.image" alt="" class="rd-image" />
            </div>

            <div class="rd-meta">
              <div class="rd-meta-item">
                <svg class="ico" viewBox="0 0 24 24"><path d="M12 7v6l4 2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span>30 min</span>
              </div>
              <div class="rd-meta-item">
                <svg class="ico" viewBox="0 0 24 24"><path d="M12 2a4 4 0 00-4 4v4a4 4 0 004 4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span>2 servings</span>
              </div>
              <div class="rd-meta-item">
                <svg class="ico" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#f59e0b"/></svg>
                <span>4.5</span>
              </div>
            </div>

            <p class="rd-summary">{{ recipe.summary }}</p>

            <div class="rd-tags">
              <span v-for="(t, i) in recipe.tags" :key="i" class="pill">{{ t }}</span>
            </div>

            <div class="nutrition-card">
              <div class="nut-left">
                <div class="kcal">{{ (recipe.nutrition && recipe.nutrition.kcal) || '-' }}</div>
                <div class="kcal-label">Calories</div>
              </div>
              <div class="nut-right">
                <div class="nut-row"><span>Protein</span><strong>{{ recipe.nutrition?.protein || '-' }}g</strong></div>
                <div class="nut-row"><span>Carbs</span><strong>{{ recipe.nutrition?.carbs || '-' }}g</strong></div>
                <div class="nut-row"><span>Fat</span><strong>{{ recipe.nutrition?.fat || '-' }}g</strong></div>
                <div class="nut-row"><span>Fiber</span><strong>{{ recipe.nutrition?.fiber || '-' }}g</strong></div>
              </div>
            </div>
          </div>

          <!-- RIGHT: Ingredients & Instructions -->
          <div class="rd-right">
            <section class="card-block">
              <h3>Ingredients</h3>
              <ul class="ing-list">
                <li v-for="(it, i) in recipe.ingredients" :key="i">{{ it }}</li>
              </ul>
            </section>

            <section class="card-block">
              <h3>Instructions</h3>
              <ol class="inst-list">
                <li v-for="(s, i) in recipe.steps" :key="i">{{ s }}</li>
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="muted center">Recipe not found.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import data from '../data/recipes.json'

const route = useRoute()
const router = useRouter()

// Find the recipe by id from the local JSON. Using a computed keeps the template reactive.
const recipe = computed(() => data.find((r) => String(r.id) === route.params.id))

// Close the modal: prefer history.back() so the user's navigation is preserved.
function close() {
  if (window.history.length > 1) router.back()
  else router.push('/recipes')
}
</script>

<style scoped>
/* Overlay and modal */
.rd-overlay {
  position: fixed;
  inset: 0;
  background: rgba(12, 16, 22, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  padding: 24px;
}
.rd-modal {
  width: min(1100px, 96%);
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 18px 60px rgba(2, 6, 23, 0.45);
  position: relative;
  padding: 22px;
}
.rd-close {
  position: absolute;
  right: 12px;
  top: 10px;
  border: 0;
  background: transparent;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
}

.rd-grid {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 22px;
}
.rd-left { padding-right: 8px }
.rd-right { padding-left: 8px }

.rd-header { display:flex; align-items:center; gap:12px }
.rd-title-wrap { display:flex; align-items:center; gap:12px }
.rd-icon { width:36px; height:36px }
.rd-title { font-size: 28px; margin:0; color:#0b1220 }

.rd-image-wrap { display:flex; justify-content:center; margin:16px 0 }
.rd-image { width:100%; max-height:320px; object-fit:cover; border-radius:12px }

.rd-meta { display:flex; gap:18px; color:#6a7483; font-size:14px; margin-bottom:12px }
.rd-meta-item { display:flex; gap:8px; align-items:center }
.rd-meta .ico { width:18px; height:18px; color:#6a7483 }

.rd-summary { color:#6a7483; margin:10px 0 }
.rd-tags { display:flex; gap:8px; flex-wrap:wrap }
.pill { background:#fff4eb; color:#b45309; padding:6px 10px; border-radius:999px; font-weight:600; font-size:13px }

.nutrition-card { display:flex; gap:16px; background:#fff; border:1px solid #e6e9ee; border-radius:10px; padding:12px; margin-top:18px; align-items:center }
.nut-left { width:100px; text-align:center }
.kcal { font-size:28px; color:#16a34a; font-weight:800 }
.kcal-label { color:#6a7483; font-size:13px }
.nut-right { flex:1 }
.nut-row { display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f3f5f7 }
.nut-row strong { color:#0b1220 }

.card-block { background:#fff; border:1px solid #eef1f6; border-radius:10px; padding:14px; margin-bottom:16px }
.card-block h3 { margin:0 0 8px }

.ing-list { list-style:none; padding-left:0; margin:0 }
.ing-list li { padding:6px 0; position:relative; padding-left:20px }
.ing-list li:before { content:''; width:8px; height:8px; background:#16a34a; border-radius:50%; position:absolute; left:6px; top:12px }

.inst-list { counter-reset:step; list-style:none; padding-left:0; margin:0 }
.inst-list li { padding:10px 0; position:relative; padding-left:44px }
.inst-list li:before { counter-increment:step; content:counter(step); width:28px; height:28px; border-radius:50%; background:#16a34a; color:#fff; display:flex; align-items:center; justify-content:center; position:absolute; left:0; top:6px; font-weight:700 }

.muted { color:#6a7483 }
.center { text-align:center }

@media (max-width: 880px) {
  .rd-grid { grid-template-columns: 1fr; }
  .rd-image { max-height:220px }
}
</style>
