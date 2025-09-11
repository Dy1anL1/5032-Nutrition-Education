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

  <section class="info-section">
    <div class="info-content">
      <h2>Why Choose Healthy Living?</h2>
      <div class="benefits-grid">
        <div class="benefit-item">
          <div class="benefit-icon">🍎</div>
          <h3>Nutritious Choices</h3>
          <p>Every recipe is carefully curated with balanced nutrition in mind</p>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">📚</div>
          <h3>Educational Content</h3>
          <p>Learn about nutrition science and make informed food choices</p>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">⏰</div>
          <h3>Time-Saving Tools</h3>
          <p>Efficient meal planning to save time and reduce food waste</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Home page
// Shows three highlight tiles and benefits section
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

.info-section {
  margin-top: 60px;
  padding: 40px 0;
  background: #f8fafc;
}

.info-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
}

.info-content h2 {
  font-size: 32px;
  margin-bottom: 40px;
  color: #1e293b;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 40px;
}

.benefit-item {
  background: white;
  padding: 32px 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.benefit-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.benefit-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.benefit-item h3 {
  font-size: 20px;
  margin: 16px 0 8px 0;
  color: #1e293b;
}

.benefit-item p {
  color: #64748b;
  line-height: 1.6;
}
</style>
