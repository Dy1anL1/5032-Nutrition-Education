<template>
  <div>
    <!-- Top Navigation -->
    <header class="topbar">
      <div class="nav-row">
        <div class="brand">Logo</div>

        <nav class="main-nav">
          <router-link to="/" exact>Home</router-link>
          <router-link to="/recipes">Recipes</router-link>
          <router-link to="/meal-planner">Meal Planner</router-link>
          <router-link to="/nutrition-education">Nutrition Education</router-link>
          <router-link to="/about">About</router-link>
        </nav>

        <router-link to="/login" class="cta">Login/Register</router-link>
      </div>
    </header>

    <!-- Main Content -->
    <main class="page">
      <router-view />
    </main>
  </div>
</template>

<style>
.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.nav-row {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.brand {
  font-weight: 600;
  font-size: 14px;
  padding: 6px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.main-nav {
  display: flex;
  gap: 24px;
  margin: 0 auto;
}

.main-nav a {
  text-decoration: none;
  color: #111827;
  font-size: 14px;
  padding: 6px 0;
}

.main-nav a.router-link-active {
  font-weight: 600;
  border-bottom: 2px solid #16a34a;
}

.cta {
  text-decoration: none;
  font-size: 14px;
  background: #111827;
  color: #fff;
  padding: 8px 14px;
  border-radius: 999px;
}

.page {
  padding: 28px 16px;
}
</style>
