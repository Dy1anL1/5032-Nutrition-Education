<!--
  NavBar
  - Top-level site navigation. Uses <router-link> for client-side routing.
  - Responsive behaviour: center links are hidden on small viewports; actions remain visible.
  - To add a mobile menu, implement a toggle and show/hide the `.nav-links` block.
-->
<template>
  <header class="topbar" role="banner">
    <div class="navbar">
      <router-link class="brand" to="/" aria-label="Healthy Living - Home">
        Healthy Living
      </router-link>

      <nav class="nav-links" aria-label="Main navigation">
        <RouterLink to="/" aria-label="Go to Home page">Home</RouterLink>
        <RouterLink to="/recipes" aria-label="Browse Recipes">Recipes</RouterLink>
        <RouterLink to="/meal-planner" aria-label="Plan your Meals">Meal Planner</RouterLink>
        <RouterLink to="/healthy-places" aria-label="Find Healthy Places">Healthy Places</RouterLink>
        <RouterLink to="/education" aria-label="Learn about Nutrition">Education</RouterLink>
        <RouterLink to="/about" aria-label="About Us">About</RouterLink>
        <RouterLink to="/contact" aria-label="Contact Us">Contact</RouterLink>
        <RouterLink
          v-if="authStore.isAdmin"
          to="/admin"
          class="admin-link"
          aria-label="Access Admin Panel"
        >
          <span class="admin-icon" aria-hidden="true">⚙️</span>
          Admin Panel
        </RouterLink>
      </nav>

      <div class="actions" aria-label="User actions">
        <template v-if="!authStore.isAuthenticated">
          <router-link to="/login" class="login" aria-label="Login to your account">
            Login
          </router-link>
          <router-link to="/register" class="btn-signup" aria-label="Create a new account">
            Sign Up
          </router-link>
          <RouterLink to="/account" class="avatar" aria-label="Go to Account page">
            <svg
              viewBox="0 0 20 20"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="12" cy="8" r="4"></circle>
              <path d="M4 20c1.5-3.5 5-6 8-6s6.5 2.5 8 6"></path>
            </svg>
          </RouterLink>
        </template>
        <template v-else>
          <span class="user-info" aria-label="Current user">
            {{ authStore.userProfile?.name || authStore.user?.displayName || 'User' }}
            <span
              v-if="authStore.isAdmin"
              class="role-badge"
              role="status"
              aria-label="Administrator account"
            >
              Admin
            </span>
            <span
              v-else-if="!authStore.loading"
              class="role-badge"
              style="background: #3b82f6"
              role="status"
              :aria-label="`${authStore.userProfile?.role === 'admin' ? 'Administrator' : 'User'} account`"
            >
              {{ authStore.userProfile?.role === 'admin' ? 'Admin' : 'User' }}
            </span>
            <span
              v-else
              class="role-badge loading"
              style="background: #9ca3af"
              role="status"
              aria-label="Loading user information"
            >
              ...
            </span>
          </span>
          <button
            @click="handleLogout"
            class="logout-btn"
            aria-label="Logout from your account"
          >
            Logout
          </button>
          <RouterLink to="/account" class="avatar" aria-label="Go to Account page">
            <svg
              viewBox="0 0 20 20"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="12" cy="8" r="4"></circle>
              <path d="M4 20c1.5-3.5 5-6 8-6s6.5 2.5 8 6"></path>
            </svg>
          </RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  const result = await authStore.logout()
  if (result.success) {
    router.push('/')
  }
}
</script>

<style scoped>
:root {
  --green: #22c55e;
  --green-d: #16a34a;
  --ink: #1b1b1b;
  --muted: #4b5563; /* Darker for WCAG AA contrast */
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
  height: 80px;
  padding: 0 32px;
  width: 100%;
  box-sizing: border-box;
}

.brand {
  display: flex;
  align-items: center;
  font-weight: 800;
  font-size: 30px;
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
  gap: 60px;
  align-items: center;
}
.nav-links :deep(a) {
  font-weight: 600;
  font-size: 21px;
  color: #374151; /* Darker color for WCAG AA contrast (4.5:1+) */
  padding: 3px 2px;
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
  font-size: 21px;
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
  font-size: 21px;
  background: #16a34a !important; /* Darker green for WCAG AA contrast */
  color: #fff !important;
  border: none !important;
  text-decoration: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  transition: background 0.2s;
}
.btn-signup:hover,
.btn-signup:focus-visible {
  background: #15803d !important; /* Even darker on hover */
}

.user-info {
  font-weight: 600;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 8px;
}

.role-badge {
  background: var(--green);
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.logout-btn {
  color: var(--ink);
  font-weight: 600;
  font-size: 20px;
  background: none;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #f3f4f6;
}

.avatar {
  margin-left: 12px;
  opacity: 0.8;
  display: flex;
  align-items: center;
}

.admin-link {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%) !important;
  color: white !important;
  padding: 8px 12px !important;
  border-radius: 8px !important;
  font-weight: 700 !important;
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
  box-shadow: 0 2px 4px rgba(245, 158, 11, 0.2) !important;
  transition: all 0.2s ease !important;
}

.admin-link:hover {
  background: linear-gradient(135deg, #d97706 0%, #ea580c 100%) !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3) !important;
}

.admin-icon {
  font-size: 16px;
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
