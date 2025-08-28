<!--
  NavBar
  - Top-level site navigation. Uses <router-link> for client-side routing.
  - Responsive behaviour: center links are hidden on small viewports; actions remain visible.
  - To add a mobile menu, implement a toggle and show/hide the `.nav-links` block.
-->
<template>
  <header class="topbar">
    <div class="navbar">
      <router-link class="brand" to="/"> Healthy Living </router-link>

      <nav class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/recipes">Recipes</RouterLink>
        <RouterLink to="/meal-planner">Meal Planner</RouterLink>
        <RouterLink to="/education">Education</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>

      <div class="actions">
        <router-link to="/login" class="login">Login</router-link>
        <router-link to="/register" class="btn-signup">Sign Up</router-link>
        <RouterLink to="/account" class="avatar" aria-label="Account">
          <svg
            viewBox="0 0 20 20"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M4 20c1.5-3.5 5-6 8-6s6.5 2.5 8 6"></path>
          </svg>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
// NavBar is intentionally presentation-first. Add JS here only if you implement
// a mobile menu toggle or other interactive behaviour.
</script>

<style scoped>
:root {
  --green: #22c55e;
  --green-d: #16a34a;
  --ink: #1b1b1b;
  --muted: #586174;
  --line: #e6e6e6;
}

.topbar {
  background: #fff;
  border-bottom: 1px solid var(--line);
}

.navbar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  height: 64px;
  padding: 0 32px;
  width: 100%;
  box-sizing: border-box;
}

.brand {
  display: flex;
  align-items: center;
  font-weight: 800;
  font-size: 22px;
  color: var(--ink);
  letter-spacing: 0.2px;
  text-decoration: none;
  gap: 10px;
}
.logo-icon {
  display: flex;
  align-items: center;
  margin-right: 2px;
}

.nav-links {
  justify-self: center;
  display: flex;
  gap: 48px;
  align-items: center;
}
.nav-links :deep(a) {
  font-weight: 600;
  font-size: 19px;
  color: var(--muted);
  padding: 6px 2px;
  position: relative;
  text-decoration: none;
  transition: color 0.18s ease;
}

.actions {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 18px;
}

.login {
  color: var(--ink);
  font-weight: 600;
  font-size: 18px;
  background: none;
  border: none;
  padding: 0 8px;
  text-decoration: none;
  transition: color 0.2s;
}
.login:hover {
  color: var(--green);
}

.btn-signup {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 88px;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 19px;
  background: #22c55e !important;
  color: #fff !important;
  border: none !important;
  text-decoration: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  transition: background 0.2s;
}
.btn-signup:hover,
.btn-signup:focus-visible {
  background: var(--green-d);
}

.avatar {
  margin-left: 50px;
  opacity: 0.8;
  display: flex;
  align-items: center;
}

@media (max-width: 960px) {
  .nav-links {
    gap: 20px;
  }
  .nav-links a {
    font-size: 16px;
  }
}
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .actions {
    gap: 14px;
  }
}
</style>
