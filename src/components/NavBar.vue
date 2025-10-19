<!--
  NavBar - Bootstrap Responsive Navigation
  - Uses Bootstrap 5 navbar component with collapsible menu for mobile
  - Fully responsive with hamburger menu on small screens
  - Maintains original styling with Bootstrap structure
-->
<template>
  <header class="topbar" role="banner">
    <!-- Bootstrap Navbar: navbar-expand-lg means collapse on screens < 992px -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container-fluid px-4">
        <!-- Brand -->
        <router-link class="navbar-brand brand" to="/" aria-label="Healthy Living - Home">
          Healthy Living
        </router-link>

        <!-- Hamburger Toggle Button for Mobile -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapsible Content -->
        <div class="collapse navbar-collapse" id="navbarContent" :class="{ show: menuOpen }">
          <!-- Center Navigation Links -->
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 nav-links" aria-label="Main navigation">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/" aria-label="Go to Home page" @click="closeMenu">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/recipes" aria-label="Browse Recipes" @click="closeMenu">Recipes</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/meal-planner" aria-label="Plan your Meals" @click="closeMenu">Meal Planner</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/healthy-places" aria-label="Find Healthy Places" @click="closeMenu">Healthy Places</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/education" aria-label="Learn about Nutrition" @click="closeMenu">Education</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about" aria-label="About Us" @click="closeMenu">About</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/contact" aria-label="Contact Us" @click="closeMenu">Contact</RouterLink>
            </li>
            <li v-if="authStore.isAdmin" class="nav-item">
              <RouterLink class="nav-link admin-link" to="/admin" aria-label="Access Admin Panel" @click="closeMenu">
                <span class="admin-icon" aria-hidden="true">&#9881;</span>
                Admin Panel
              </RouterLink>
            </li>
          </ul>

          <!-- Right-side Actions -->
          <div class="d-flex align-items-center actions gap-3">
            <template v-if="!authStore.isAuthenticated">
              <router-link to="/login" class="login" aria-label="Login to your account" @click="closeMenu">
                Login
              </router-link>
              <router-link to="/register" class="btn-signup" aria-label="Create a new account" @click="closeMenu">
                Sign Up
              </router-link>
              <RouterLink to="/account" class="avatar" aria-label="Go to Account page" @click="closeMenu">
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
              <span class="user-info d-none d-lg-flex" aria-label="Current user">
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
              <RouterLink to="/account" class="avatar" aria-label="Go to Account page" @click="closeMenu">
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
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const handleLogout = async () => {
  closeMenu()
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
  --muted: #4b5563;
  --line: #e6e6e6;
}

.topbar {
  background: #fff;
  border-bottom: 1px solid var(--line);
}

/* Override Bootstrap navbar styles to match original design */
.navbar {
  min-height: 80px;
  padding-top: 0;
  padding-bottom: 0;
}

.brand {
  font-weight: 800;
  font-size: 30px;
  color: var(--ink) !important;
  letter-spacing: 0.2px;
  text-decoration: none !important;
}

.brand:hover {
  color: var(--ink) !important;
}

/* Navigation links styling */
.nav-links {
  gap: 2rem;
}

.nav-links .nav-link {
  font-weight: 600;
  font-size: 18px;
  color: #374151 !important;
  padding: 0.5rem 0.25rem;
  text-decoration: none;
  transition: color 0.18s ease;
}

.nav-links .nav-link:hover,
.nav-links .nav-link.router-link-active {
  color: var(--green) !important;
}

.actions {
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

/* Mobile responsiveness - Bootstrap handles collapse, we just need to adjust styles */
@media (max-width: 991px) {
  .navbar {
    min-height: 60px;
  }

  .brand {
    font-size: 24px;
  }

  .nav-links {
    margin-top: 1rem;
    gap: 0.5rem;
  }

  .nav-links .nav-item {
    width: 100%;
  }

  .nav-links .nav-link {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .actions {
    margin-top: 1rem;
    padding-bottom: 1rem;
    flex-wrap: wrap;
    gap: 12px;
  }

  .btn-signup {
    font-size: 18px;
    padding: 8px 16px;
  }
}

@media (max-width: 576px) {
  .brand {
    font-size: 20px;
  }

  .user-info {
    font-size: 14px;
  }

  .logout-btn {
    font-size: 16px;
  }
}
</style>
