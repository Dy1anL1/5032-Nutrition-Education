<template>
  <section class="title-bar">
    <div class="title-inner">
      <h1 class="title">Admin Dashboard</h1>
      <p class="subtitle">Manage users, recipes, and view system statistics</p>
    </div>
  </section>

  <div class="admin-content">
    <!-- Quick Stats -->
    <section class="stats-section">
      <h2>System Overview</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <h3>{{ userStats.total }}</h3>
          <p>Total Users</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🍳</div>
          <h3>{{ recipeStats.total }}</h3>
          <p>Total Recipes</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <h3>{{ ratingStats.total }}</h3>
          <p>Total Ratings</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <h3>{{ ratingStats.average }}</h3>
          <p>Avg Rating</p>
        </div>
      </div>
    </section>

    <!-- User Management -->
    <section class="management-section">
      <h2>User Management</h2>
      <div class="users-table">
        <div class="table-header">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Joined</span>
          <span>Actions</span>
        </div>
        <div v-for="user in users" :key="user.id" class="table-row">
          <span>{{ user.name }}</span>
          <span>{{ user.email }}</span>
          <span>
            <span class="role-badge" :class="user.role">
              {{ user.role === 'admin' ? 'Admin' : 'User' }}
            </span>
          </span>
          <span>{{ formatDate(user.createdAt) }}</span>
          <div class="actions">
            <button @click="toggleUserRole(user)" class="btn-small">
              {{ user.role === 'admin' ? 'Demote' : 'Promote' }}
            </button>
            <button @click="deleteUser(user)" class="btn-small danger" v-if="user.id !== authStore.user?.uid">
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Recipe Management -->
    <section class="management-section">
      <h2>Recipe Management</h2>
      <div class="recipes-grid">
        <div v-for="recipe in recipes" :key="recipe.id" class="recipe-admin-card">
          <img :src="recipe.image" :alt="recipe.name" />
          <div class="recipe-info">
            <h3>{{ recipe.name }}</h3>
            <p>{{ recipe.description }}</p>
            <div class="recipe-stats">
              <span>⭐ {{ recipe.averageRating || 'No ratings' }}</span>
              <span>👥 {{ recipe.ratingCount || 0 }} ratings</span>
            </div>
            <div class="recipe-actions">
              <button @click="editRecipe(recipe)" class="btn-small">Edit</button>
              <button @click="deleteRecipe(recipe)" class="btn-small danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rating Analytics -->
    <section class="management-section">
      <h2>Rating Analytics</h2>
      <div class="ratings-list">
        <div v-for="rating in recentRatings" :key="rating.id" class="rating-item">
          <div class="rating-info">
            <strong>{{ rating.recipeName }}</strong>
            <div class="rating-details">
              <span class="stars">{{ '★'.repeat(rating.rating) }}{{ '☆'.repeat(5-rating.rating) }}</span>
              <span class="user">by {{ rating.userName }}</span>
              <span class="date">{{ formatDate(rating.createdAt) }}</span>
            </div>
          </div>
          <button @click="deleteRating(rating)" class="btn-small danger">Remove</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRatingStore } from '../stores/rating'
import { db } from '../firebase'
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy, limit } from 'firebase/firestore'
import recipesData from '../data/recipes.json'

const authStore = useAuthStore()
const ratingStore = useRatingStore()

const users = ref([])
const recipes = ref([])
const ratings = ref([])
const recentRatings = ref([])

// Computed stats
const userStats = computed(() => ({
  total: users.value.length,
  admins: users.value.filter(u => u.role === 'admin').length,
  regularUsers: users.value.filter(u => u.role === 'user').length
}))

const recipeStats = computed(() => ({
  total: recipes.value.length,
  withRatings: recipes.value.filter(r => r.ratingCount > 0).length
}))

const ratingStats = computed(() => ({
  total: ratings.value.length,
  average: ratings.value.length > 0 
    ? (ratings.value.reduce((sum, r) => sum + r.rating, 0) / ratings.value.length).toFixed(1)
    : '0.0'
}))

onMounted(async () => {
  await loadData()
})

async function loadData() {
  try {
    // Load users
    const usersSnapshot = await getDocs(collection(db, 'users'))
    users.value = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date()
    }))

    // Load recipes from local data (since they're not in Firestore)
    recipes.value = recipesData

    // Load recent ratings
    const ratingsQuery = query(
      collection(db, 'ratings'), 
      orderBy('createdAt', 'desc'), 
      limit(20)
    )
    const ratingsSnapshot = await getDocs(ratingsQuery)
    recentRatings.value = ratingsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date()
    }))

    // Get all ratings for stats
    const allRatingsSnapshot = await getDocs(collection(db, 'ratings'))
    ratings.value = allRatingsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

  } catch (error) {
    console.error('Error loading admin data:', error)
  }
}

async function toggleUserRole(user) {
  try {
    const newRole = user.role === 'admin' ? 'user' : 'admin'
    await updateDoc(doc(db, 'users', user.id), { role: newRole })
    user.role = newRole
    alert(`User role updated to ${newRole}`)
  } catch (error) {
    console.error('Error updating user role:', error)
    alert('Failed to update user role')
  }
}

async function deleteUser(user) {
  if (!confirm(`Are you sure you want to delete user ${user.name}?`)) return
  
  try {
    await deleteDoc(doc(db, 'users', user.id))
    users.value = users.value.filter(u => u.id !== user.id)
    alert('User deleted successfully')
  } catch (error) {
    console.error('Error deleting user:', error)
    alert('Failed to delete user')
  }
}

function editRecipe(recipe) {
  alert(`Edit functionality for "${recipe.name}" would be implemented here.`)
}

function deleteRecipe(recipe) {
  if (!confirm(`Are you sure you want to delete recipe "${recipe.name}"?`)) return
  
  recipes.value = recipes.value.filter(r => r.id !== recipe.id)
  alert('Recipe deleted successfully (local only - would need backend implementation)')
}

async function deleteRating(rating) {
  if (!confirm('Are you sure you want to delete this rating?')) return
  
  try {
    await deleteDoc(doc(db, 'ratings', rating.id))
    recentRatings.value = recentRatings.value.filter(r => r.id !== rating.id)
    alert('Rating deleted successfully')
    
    // Refresh stats
    await loadData()
  } catch (error) {
    console.error('Error deleting rating:', error)
    alert('Failed to delete rating')
  }
}

function formatDate(date) {
  if (!date) return 'Unknown'
  return new Date(date).toLocaleDateString()
}
</script>

<style scoped>
.admin-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.stats-section {
  margin-bottom: 48px;
}

.stats-section h2 {
  font-size: 2rem;
  margin-bottom: 24px;
  color: #1a202c;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.stat-card h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #22c55e;
  margin: 0 0 8px;
}

.stat-card p {
  color: #6b7280;
  margin: 0;
}

.management-section {
  margin-bottom: 48px;
}

.management-section h2 {
  font-size: 1.8rem;
  margin-bottom: 24px;
  color: #1a202c;
}

.users-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1.5fr;
  gap: 16px;
  padding: 16px 24px;
  background: #f8fafc;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1.5fr;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #f3f4f6;
  align-items: center;
}

.table-row:last-child {
  border-bottom: none;
}

.role-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.role-badge.admin {
  background: #fef3c7;
  color: #92400e;
}

.role-badge.user {
  background: #e0f2fe;
  color: #0369a1;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-small {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-small:hover {
  background: #f3f4f6;
}

.btn-small.danger {
  border-color: #fca5a5;
  color: #dc2626;
}

.btn-small.danger:hover {
  background: #fef2f2;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.recipe-admin-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.recipe-admin-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.recipe-info {
  padding: 16px;
}

.recipe-info h3 {
  margin: 0 0 8px;
  font-size: 1.2rem;
  color: #1a202c;
}

.recipe-info p {
  color: #6b7280;
  margin: 0 0 12px;
  font-size: 0.9rem;
}

.recipe-stats {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 0.875rem;
  color: #6b7280;
}

.recipe-actions {
  display: flex;
  gap: 8px;
}

.ratings-list {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  max-height: 400px;
  overflow-y: auto;
}

.rating-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f3f4f6;
}

.rating-item:last-child {
  border-bottom: none;
}

.rating-details {
  display: flex;
  gap: 16px;
  margin-top: 4px;
  font-size: 0.875rem;
  color: #6b7280;
}

.stars {
  color: #fbbf24;
}

@media (max-width: 768px) {
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .table-header {
    display: none;
  }
  
  .table-row {
    display: block;
    padding: 16px;
  }
  
  .table-row > span {
    display: block;
    margin-bottom: 8px;
  }
}
</style>