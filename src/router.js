import { createRouter, createWebHistory } from 'vue-router'

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
  { path: '/recipes/:id', component: RecipeDetail, props: true },
  { path: '/meal-planner', component: MealPlanner },
  { path: '/education', component: Education },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/contact', component: Contact },
  { path: '/about', component: About },
  { path: '/account', component: Account },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
