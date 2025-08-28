<template>
  <!-- Full-width title bar -->
  <section class="title-bar">
    <div class="title-inner">
      <h1 class="title">Healthy Recipe Collection</h1>
      <p class="subtitle">
        Discover nutritious, delicious recipes designed to support your health journey. Every recipe
        includes detailed nutritional information and dietary labels.
      </p>
    </div>
  </section>

  <!-- Filter bar -->
  <section class="filters-wrap">
    <div class="filters">
      <!-- Search -->
      <div class="search-box">
        <svg class="search-ico" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" fill="none" />
          <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" stroke-width="2" />
        </svg>
        <input
          v-model="q"
          class="input-ghost"
          placeholder="Search recipes..."
          aria-label="Search recipes"
        />
      </div>

      <!-- Category -->
      <div class="select-wrap">
        <select id="category" v-model="category" class="select">
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
        <select id="diet" v-model="diet" class="select">
          <option value="">All Diets</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten-Free</option>
          <option value="low-carb">Low-Carb</option>
          <option value="dairy-free">Dairy-Free</option>
        </select>
      </div>
    </div>

    <p class="result-count">Showing {{ filtered.length }} recipes</p>
  </section>

  <!-- Recipe Card grid -->
  <section class="grid-wrap">
    <div class="cards">
      <RecipeCard v-for="r in filtered" :key="r.id" :recipe="r" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionTitle from '../components/SectionTitle.vue'
import RecipeCard from '../components/RecipeCard.vue'
import data from '../data/recipes.json'

const q = ref('')
const category = ref('')
const diet = ref('')

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
</script>

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
  width: 100vw;
  height: 9vw;
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
.title {
  font-size: 48px;
  line-height: 1.5;
  margin: 0 0 12px;
  font-weight: 800;
  color: #1b1b1b;
}
.subtitle {
  max-width: 900px;
  margin: 0 auto;
  color: #5a6676;
  font-size: 18px;
}

/* ========= Filter Bar ========= */
.filters-wrap {
  /* Center the filter bar and make it occupy ~80% of the page width (but don't exceed page max) */
  width: min(80%, var(--page-max));
  margin: 0 auto;
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
  height: 48px; /* same as input/select height */
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
  height: 44px; /* ensure same height as selects */
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
  height: 44px;
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

/* Result count */
.result-count {
  margin: 14px 2px 6px;
  color: #6a7483;
}

/* ========= Card Grid Area ========= */
.grid-wrap {
  max-width: var(--page-max);
  margin: 0 auto;
  padding-inline: var(--pad-inline-grid);
  padding-bottom: 28px;
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
