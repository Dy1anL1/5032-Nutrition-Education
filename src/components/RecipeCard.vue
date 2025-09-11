<!--
  RecipeCard
  - Presentational component that shows a single recipe tile.
  - Props:
    - recipe: object (required) - the recipe data used to render title, image, summary and nutrition.
  - Clicking the CTA navigates to the recipe detail page.
-->
<template>
  <article class="rc-card">
    <div
      class="rc-hero"
      :style="{
        backgroundImage:
          'url(' + (recipe.image || 'https://via.placeholder.com/800x480?text=Recipe') + ')',
      }"
      role="img"
      :aria-label="recipe.title || 'Recipe image'"
    >
      <div class="cal-badge">{{ (recipe.nutrition && recipe.nutrition.kcal) || '-' }} cal</div>
      <div v-if="authStore.isAdmin" class="admin-controls">
        <button @click="editRecipe" class="admin-btn edit" title="Edit Recipe">✏️</button>
        <button @click="deleteRecipe" class="admin-btn delete" title="Delete Recipe">🗑️</button>
      </div>
    </div>

    <div class="rc-info">
      <div>
        <h3 class="rc-title">{{ recipe.title }}</h3>
        <p class="rc-summary">{{ recipe.summary }}</p>
      </div>

      <router-link class="rc-cta" :to="'/recipes/' + recipe.id">View Recipe</router-link>
    </div>
  </article>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

// Props
// `recipe` is expected to contain fields like id, title, image, summary and nutrition.
const props = defineProps({ recipe: { type: Object, required: true } })

// Emit events for parent components to handle
const emit = defineEmits(['edit-recipe', 'delete-recipe'])

function editRecipe() {
  emit('edit-recipe', props.recipe)
}

function deleteRecipe() {
  emit('delete-recipe', props.recipe)
}
</script>

<style scoped>
.rc-card {
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    filter 160ms ease;
  min-height: 360px; /* make card taller */
  display: flex;
  flex-direction: column;
}
.rc-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(18, 38, 63, 0.12);
  filter: brightness(1.03);
}

.rc-hero {
  height: 260px; /* bigger hero image */
  background-size: cover;
  background-position: center;
  position: relative;
}
.cal-badge {
  position: absolute;
  left: 12px;
  bottom: 12px;
  background: rgba(255, 255, 255, 0.85);
  color: #111;
  padding: 6px 10px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 13px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.rc-info {
  padding: 18px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center; /* center CTA */
  justify-content: space-between;
  flex: 1;
}
.rc-title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 800;
  color: #111;
  text-align: center;
}
.rc-summary {
  margin: 0 0 14px;
  color: var(--muted);
  font-size: 14px;
  text-align: center;
}
.rc-cta {
  display: inline-block;
  padding: 8px 100px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid #111; /* default black border */
  color: #111; /* default black text */
  font-weight: 700;
  text-decoration: none;
  transition:
    background 140ms ease,
    color 140ms ease,
    border-color 140ms ease;
  align-self: center;
}
.rc-cta:hover {
  background: #22c55e; /* green on hover */
  color: #fff;
  border-color: #22c55e;
}

.admin-controls {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
}

.admin-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.admin-btn.edit {
  background: rgba(59, 130, 246, 0.9);
  color: white;
}

.admin-btn.edit:hover {
  background: rgba(37, 99, 235, 1);
  transform: scale(1.1);
}

.admin-btn.delete {
  background: rgba(239, 68, 68, 0.9);
  color: white;
}

.admin-btn.delete:hover {
  background: rgba(220, 38, 38, 1);
  transform: scale(1.1);
}
</style>
