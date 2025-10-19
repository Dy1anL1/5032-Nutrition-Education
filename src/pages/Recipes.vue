<!--
  Recipes page
  - Shows a searchable, filterable list of recipes loaded from local JSON.
  - Controls: search box (q), category select, diet select.
  - The `filtered` computed returns the visible recipes based on those controls.
-->
<template>
  <!-- Full-width title bar -->
  <section class="title-bar" aria-labelledby="page-title">
    <div class="title-inner">
      <h1 id="page-title" class="title">Healthy Recipe Collection</h1>
      <p class="subtitle">
        Discover nutritious, delicious recipes designed to support your health journey. Every recipe
        includes detailed nutritional information and dietary labels.
      </p>
    </div>
  </section>

  <!-- Filter bar -->
  <section class="filters-wrap" aria-label="Recipe filters">
    <div class="filters" role="search">
      <!-- Search -->
      <div class="search-box">
        <label for="recipe-search" class="sr-only">Search recipes</label>
        <svg class="search-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" fill="none" />
          <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" stroke-width="2" />
        </svg>
        <input
          id="recipe-search"
          v-model="q"
          class="input-ghost"
          type="search"
          placeholder="Search recipes..."
          aria-label="Search recipes by name or ingredient"
        />
      </div>

      <!-- Category -->
      <div class="select-wrap">
        <label for="category" class="sr-only">Filter by category</label>
        <select
          id="category"
          v-model="category"
          class="select"
          aria-label="Filter recipes by category"
        >
          <option value="">All Categories</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snacks">Snacks</option>
          <option value="healthy">Healthy Foods</option>
        </select>
      </div>

      <!-- Diet -->
      <div class="select-wrap">
        <label for="diet" class="sr-only">Filter by diet</label>
        <select
          id="diet"
          v-model="diet"
          class="select"
          aria-label="Filter recipes by dietary preference"
        >
          <option value="">All Diets</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten-Free</option>
          <option value="low-carb">Low-Carb</option>
          <option value="dairy-free">Dairy-Free</option>
        </select>
      </div>
    </div>

    <div class="results-bar">
      <p class="result-count" role="status" aria-live="polite" aria-atomic="true">
        Showing {{ filtered.length }} {{ filtered.length === 1 ? 'recipe' : 'recipes' }}
      </p>
      <button @click="exportToCSV" class="export-btn" title="Export all recipes to CSV">
        Export to CSV
      </button>
    </div>
  </section>

  <!-- Recipe Card grid -->
  <section class="grid-wrap" aria-label="Recipe results">
    <div class="cards" role="list">
      <RecipeCard
        v-for="r in filtered"
        :key="r.id"
        :recipe="r"
        role="listitem"
        @edit-recipe="handleEditRecipe"
        @delete-recipe="handleDeleteRecipe"
      />
    </div>
    <p v-if="filtered.length === 0" class="no-results" role="status">
      No recipes found. Try adjusting your filters.
    </p>
  </section>
</template>

<script setup>
// Local state used for filtering
import { ref, computed } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import data from '../data/recipes.json'
import Papa from 'papaparse'

// Query string for free-text search (matches title and ingredients)
const q = ref('')

// Category and diet selectors - match against recipe fields and tags
const category = ref('')
const diet = ref('')

// `filtered` - computed list derived from the data file and the three controls above.
// Keeps filtering logic local and easy to test.
const filtered = computed(() => {
  const kw = q.value.trim().toLowerCase()
  return data.filter((r) => {
    const title = (r.title || '').toString().toLowerCase()
    const ingredients = (
      Array.isArray(r.ingredients) ? r.ingredients.join(' ') : r.ingredients || ''
    ).toLowerCase()
    const kwOk = !kw || title.includes(kw) || ingredients.includes(kw)

    const cat = category.value
    let categoryOk = true
    if (cat) {
      const rcat = (r.category || r.meal || r.mealType || '').toString().toLowerCase()
      const tags = Array.isArray(r.tags) ? r.tags.map((t) => t.toString().toLowerCase()) : []
      categoryOk = rcat === cat || tags.includes(cat)
    }

    const d = diet.value
    let dietOk = true
    if (d) {
      const rdiet = (r.diet || '').toString().toLowerCase()
      const tags = Array.isArray(r.tags) ? r.tags.map((t) => t.toString().toLowerCase()) : []
      dietOk = rdiet === d || tags.includes(d)
    }

    return kwOk && categoryOk && dietOk
  })
})

// Admin functions for recipe management
function handleEditRecipe(recipe) {
  alert(`Edit functionality for "${recipe.title}" would open an edit modal/form.`)
}

function handleDeleteRecipe(recipe) {
  if (!confirm(`Are you sure you want to delete "${recipe.title}"?`)) return

  // Find and remove recipe from data
  const index = data.findIndex(r => r.id === recipe.id)
  if (index !== -1) {
    data.splice(index, 1)
    alert(`Recipe "${recipe.title}" deleted successfully!`)
  }
}

// Export to CSV
function exportToCSV() {
  // Prepare data for CSV export
  const csvData = data.map((recipe) => ({
    ID: recipe.id,
    Title: recipe.title,
    Category: recipe.category || recipe.meal || '',
    'Diet Type': recipe.diet || (recipe.tags ? recipe.tags.join('; ') : ''),
    'Calories (kcal)': recipe.nutrition?.kcal || 0,
    'Protein (g)': recipe.nutrition?.protein || 0,
    'Carbs (g)': recipe.nutrition?.carbs || 0,
    'Fat (g)': recipe.nutrition?.fat || 0,
    'Fiber (g)': recipe.nutrition?.fiber || 0,
    'Prep Time': recipe.prepTime || '',
    Summary: recipe.summary || '',
    Ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.join('; ') : '',
  }))

  // Convert to CSV
  const csv = Papa.unparse(csvData)

  // Create download link
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `recipes-export-${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
/* No results message */
.no-results {
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;
  font-size: 1.1rem;
  grid-column: 1 / -1;
}
</style>

<style scoped>
:host,
.filters-wrap,
.grid-wrap {
  /* Page side paddings */
  --pad-inline-filters: 24px; /* filter bar horizontal padding */
  --pad-inline-grid: 24px; /* Card grid horizontal padding */
  --title-pad-inline: 24px; /* Title area horizontal padding */
  --title-pad-block: 56px; /* Title area vertical padding */
  --page-max: var(--max-width); /* Maximum content width */
}

/* ========= Title Bar ========= */
.title-bar {
  /* full-bleed visual while staying flush under the nav */
  width: 100vw;
  height: 20vw;
  margin: 20px; /* remove any top/bottom gap so title-bar touches NavBar */
  margin-top: -25px; /* cover the 1px border line from the nav header */
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  background: linear-gradient(90deg, #e9f9ec 0%, #fff4eb 100%);
  border-bottom: 1px solid var(--line);
}
.title-inner {
  max-width: var(--page-max);
  margin: 0 auto;
  padding: var(--title-pad-block) var(--title-pad-inline);
  text-align: center;
}

/* ========= Filter Bar ========= */
.filters-wrap {
  /* Center the filter bar and make it occupy 100% of the page width (constrained by page max) */
  width: 100%;
  max-width: var(--page-max);
  margin: 30px auto;
  padding-inline: var(--pad-inline-filters);
  box-sizing: border-box;
}
.filters {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  align-items: center;
  margin-top: 20px;
}

/* Ensure each filter column's content (search box / select-wrap) aligns vertically
   and uses a uniform height so all controls sit on the same horizontal plane */
.filters > * {
  display: flex;
  align-items: center;
  height: auto; /* allow inner controls to size naturally */
  min-height: 48px; /* visually match control height while avoiding clipping */
}

/* Search input (with icon) */
.search-box {
  position: relative;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02);
  display: flex;
  align-items: center;
}
.search-ico {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: #8a97a5;
}
.input-ghost {
  width: 100%;
  padding: 12px 14px 12px 38px;
  border: 0;
  outline: none;
  background: transparent;
  font-size: 15px;
  height: 48px; /* ensure same height as selects */
  box-sizing: border-box;
  line-height: 20px;
}

/* Make the select elements match the input height and styles */
.select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  padding: 12px 36px 12px 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02);
  height: 48px;
  box-sizing: border-box;
}

/* Dropdown pill style */
.select-wrap {
  position: relative;
}
.select-ghost {
  appearance: none;
  width: 100%;
  padding: 12px 36px 12px 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02);
}
.chev {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #7a8896;
  pointer-events: none;
}

/* Results bar */
.results-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 2px 6px;
}

.result-count {
  color: #6a7483;
}

.export-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s;
}

.export-btn:hover {
  background: #059669;
}

/* ========= Card Grid Area ========= */
.grid-wrap {
  max-width: var(--page-max);
  margin: 0 auto;
  padding-inline: var(--pad-inline-grid);
  padding-bottom: 40px;
}

/* Responsive: stack on small screens */
@media (max-width: 900px) {
  .filters {
    grid-template-columns: 1fr;
  }
  .title {
    font-size: 36px;
  }
  .title-inner {
    padding: 40px var(--title-pad-inline);
  }
  /* On small screens make the filters bar full width */
  .filters-wrap {
    width: 100%;
    padding-inline: 12px;
  }
}
</style>
