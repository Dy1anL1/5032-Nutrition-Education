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
          <router-link to="/contact">Contact</router-link>
          <router-link to="/my-account">My Account</router-link>
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
  width: 1250px;
  margin: 0;
  padding: 0 16px;
  height: 70px;
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
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
  gap: 28px;
  margin: 0;
}

.main-nav a {
  text-decoration: none;
  color: #111827;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.3px;
  padding: 6px 0;
}

.main-nav a.router-link-active {
  font-weight: 600;
  border-bottom: 2px solid #16a34a;
}

.cta {
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
  background: #111827;
  color: #fff;
  padding: 8px 14px;
  border-radius: 999px;
}

.page {
  padding: 28px 16px;
}
</style>
