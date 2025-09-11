<!--
  Home page
  - Landing page with three quick-action tiles and a featured recipes strip.
  - Uses `RecipeCard` to render the first few entries from the local recipes JSON.
  - Keep this page lightweight; move data and routing logic to dedicated stores/pages as needed.
-->
<template>
  <!-- Full-width title bar -->
  <section class="title-bar">
    <div class="title-inner">
      <h1 class="title">Welcome to Healthy Living</h1>
      <p class="subtitle">
        Trusted recipes, practical meal planning, and easy-to-read nutrition guides.
      </p>
    </div>
  </section>

  <section class="hero">
    <div class="grid home-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))">
      <article class="home-card">
        <div class="hc-info">
          <div>
            <h3>Browse Recipes</h3>
            <p>Explore a collection of healthy, diet-labelled recipes.</p>
          </div>
          <router-link class="hc-cta" to="/recipes">Browse</router-link>
        </div>
      </article>

      <article class="home-card">
        <div class="hc-info">
          <div>
            <h3>Meal Planner</h3>
            <p>Plan weekly meals and generate shopping lists.</p>
          </div>
          <router-link class="hc-cta" to="/meal-planner">Open</router-link>
        </div>
      </article>

      <article class="home-card">
        <div class="hc-info">
          <div>
            <h3>Nutrition Education</h3>
            <p>Read quick guides and learn why certain foods help health.</p>
          </div>
          <router-link class="hc-cta" to="/education">Learn</router-link>
        </div>
      </article>
    </div>
  </section>

  <section>
    <div class="cards">
      <RecipeCard v-for="r in featured" :key="r.id" :recipe="r" />
    </div>
  </section>
</template>

<script setup>
// Home page
// Shows three highlight tiles and a few featured recipe cards.
import RecipeCard from '../components/RecipeCard.vue'
import recipes from '../data/recipes.json'

// Featured subset used for the cards on the home page (first three entries)
const featured = recipes.slice(0, 3)
</script>

<style scoped>
.home-grid {
  gap: 24px;
}
.home-card {
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    filter 160ms ease;
  display: flex;
  flex-direction: column;
  min-height: 100px;
}
.home-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(18, 38, 63, 0.12);
  filter: brightness(1.03);
}
.hc-info {
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 12px;
  min-height: 200px;
}
.hc-info h3 {
  margin: 0;
  font-size: 20px;
}
.hc-info p {
  margin: 0;
  color: var(--muted);
}
.hc-cta {
  display: inline-block;
  padding: 10px 26px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid #111;
  color: #111;
  font-weight: 700;
  text-decoration: none;
}
.hc-cta:hover {
  background: #22c55e;
  color: #fff;
  border-color: #22c55e;
}
</style>
