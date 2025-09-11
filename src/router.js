// Router setup
// Maps application pages to routes. Keep routes simple - each page is a component
// imported from the `pages/` folder.
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/auth'

// Pages
import Home from './pages/Home.vue'
import Recipes from './pages/Recipes.vue'
import RecipeDetail from './pages/RecipeDetail.vue'
import MealPlanner from './pages/MealPlanner.vue'
import Education from './pages/Education.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Contact from './pages/Contact.vue'
import About from './pages/About.vue'
import Account from './pages/Account.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/recipes', component: Recipes },
  // recipe detail accepts an `id` param (e.g. /recipes/2)
  { path: '/recipes/:id', component: RecipeDetail, props: true },
  { 
    path: '/meal-planner', 
    component: MealPlanner,
    meta: { requiresAuth: true }
  },
  { path: '/education', component: Education },
  { path: '/login', component: Login, meta: { guest: true } },
  { path: '/register', component: Register, meta: { guest: true } },
  { path: '/contact', component: Contact },
  { path: '/about', component: About },
  { 
    path: '/account', 
    component: Account,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Always scroll to top on navigation to avoid awkward scroll positions
  scrollBehavior() {
    return { top: 0 }
  },
})

// Navigation guards for authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Wait for auth initialization
  if (authStore.loading) {
    const unwatch = authStore.$subscribe(() => {
      if (!authStore.loading) {
        unwatch()
        checkRoute()
      }
    })
  } else {
    checkRoute()
  }
  
  function checkRoute() {
    // Check if route requires authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next('/login')
    }
    // Redirect authenticated users away from guest pages
    else if (to.meta.guest && authStore.isAuthenticated) {
      next('/')
    }
    // Check admin-only routes
    else if (to.meta.requiresAdmin && !authStore.isAdmin) {
      next('/')
    }
    else {
      next()
    }
  }
})

export default router
