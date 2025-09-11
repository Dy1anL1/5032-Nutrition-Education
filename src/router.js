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
import AdminDashboard from './pages/AdminDashboard.vue'
import NotFound from './pages/NotFound.vue'

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
  { 
    path: '/admin', 
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  // Catch-all 404 route (must be last)
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFound 
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
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Wait for auth initialization with timeout
  const maxWaitTime = 3000 // 3 seconds max wait
  const startTime = Date.now()
  
  while (authStore.loading && (Date.now() - startTime) < maxWaitTime) {
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  // If still loading after timeout, assume not authenticated and continue
  if (authStore.loading) {
    console.warn('Auth initialization timeout, proceeding with navigation')
  }
  
  // Check route requirements
  try {
    // Check if route requires authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      console.log('Redirecting to login - auth required')
      next('/login')
      return
    }
    
    // Redirect authenticated users away from guest pages
    if (to.meta.guest && authStore.isAuthenticated) {
      console.log('Redirecting to home - user already authenticated')
      next('/')
      return
    }
    
    // Check admin-only routes
    if (to.meta.requiresAdmin && !authStore.isAdmin) {
      console.log('Redirecting to home - admin access required')
      next('/')
      return
    }
    
    // Allow navigation
    next()
  } catch (error) {
    console.error('Router guard error:', error)
    // On error, allow navigation to prevent getting stuck
    next()
  }
})

export default router
