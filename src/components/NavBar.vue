<template>
  <header>
    <div class="container navbar">
      <!-- Left brand -->
      <router-link class="brand" to="/">Healthy Living</router-link>

      <!-- Center navigation links -->
      <nav class="nav-links">
        <router-link to="/" exact-active-class="active">Home</router-link>
        <router-link to="/recipes" active-class="active">Recipes</router-link>
        <router-link to="/meal-planner" active-class="active">Meal Planner</router-link>
        <router-link to="/education" active-class="active">Nutrition Education</router-link>
        <router-link to="/about" active-class="active">About</router-link>
        <router-link to="/contact" active-class="active">Contact</router-link>
      </nav>

      <!-- Right side button -->
      <router-link to="/login" class="btn">Login</router-link>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.brand {
  font-weight: 700;
  font-size: 18px;
  color: var(--brand);
}

.nav-links {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex: 1;
}

.nav-links a {
  padding: 6px 10px;
  font-weight: 500;
  color: var(--ink);
}

.nav-links a.active {
  color: var(--brand);
  border-bottom: 2px solid var(--brand);
}

.btn {
  padding: 6px 12px;
  border: 1px solid var(--brand);
  border-radius: 6px;
  font-weight: 600;
  color: var(--brand);
}
.btn:hover {
  background: var(--brand);
  color: #fff;
}
</style>
