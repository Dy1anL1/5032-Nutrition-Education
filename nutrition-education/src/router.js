// src/router.js
import { createRouter, createWebHistory } from 'vue-router'

// import pages
import Home from './pages/home.vue'
import Recipes from './pages/Recipes.vue'
import RecipeDetail from './pages/RecipeDetail.vue'
import MealPlanner from './pages/MealPlanner.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Contact from './pages/Contact.vue'
import About from './pages/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/recipes', component: Recipes },
  { path: '/recipes/:id', component: RecipeDetail, props: true },
  { path: '/meal-planner', component: MealPlanner },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/contact', component: Contact },
  { path: '/about', component: About },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
