<template>
  <section class="title-bar">
    <div class="title-inner">
      <h1 class="title">Admin Dashboard</h1>
      <p class="subtitle">Manage users, recipes, and view system statistics</p>
    </div>
    <div class="title-actions">
      <button @click="showEmailTestModal = true" class="btn-test-email">
        Test Email with Attachment
      </button>
    </div>
  </section>

  <!-- Email Test Modal -->
  <EmailTestModal :show="showEmailTestModal" @close="showEmailTestModal = false" />

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

    <!-- User Management - Interactive Table 1 -->
    <section class="management-section">
      <div class="section-header">
        <h2>User Management</h2>
        <button @click="exportUsersToCSV" class="export-btn" title="Export users to CSV">
          Export Users to CSV
        </button>
      </div>
      <Vue3EasyDataTable
        :headers="userHeaders"
        :items="filteredUsers"
        :rows-per-page="10"
        buttons-pagination
        alternating
        border-cell
        class="custom-data-table"
      >
        <template #header-name="header">
          <div class="filter-column">
            <div>{{ header.text }}</div>
          </div>
        </template>

        <template #header-email="header">
          <div class="filter-column">
            <div>{{ header.text }}</div>
            <input
              v-model="emailSearch"
              type="text"
              placeholder="Search email..."
              class="column-filter"
            />
          </div>
        </template>

        <template #header-role="header">
          <div class="filter-column">
            <div>{{ header.text }}</div>
            <select v-model="roleFilter" class="column-filter">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </template>

        <template #item-role="{ role }">
          <span class="role-badge" :class="role">
            {{ role === 'admin' ? 'Admin' : 'User' }}
          </span>
        </template>

        <template #item-createdAt="{ createdAt }">
          {{ formatDate(createdAt) }}
        </template>

        <template #item-actions="{ id, role }">
          <div class="actions">
            <button @click="toggleUserRoleById(id, role)" class="btn-small">
              {{ role === 'admin' ? 'Demote' : 'Promote' }}
            </button>
            <button
              @click="deleteUserById(id)"
              class="btn-small danger"
              v-if="id !== authStore.user?.uid"
            >
              Delete
            </button>
          </div>
        </template>
      </Vue3EasyDataTable>
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

    <!-- Rating Analytics - Interactive Table 2 -->
    <section class="management-section">
      <h2>Rating Analytics</h2>
      <Vue3EasyDataTable
        :headers="ratingHeaders"
        :items="filteredRatings"
        :rows-per-page="10"
        buttons-pagination
        alternating
        border-cell
        class="custom-data-table"
      >
        <template #header-recipeName="header">
          <div class="filter-column">
            <div>{{ header.text }}</div>
            <input
              v-model="recipeNameSearch"
              type="text"
              placeholder="Search recipe..."
              class="column-filter"
            />
          </div>
        </template>

        <template #header-userName="header">
          <div class="filter-column">
            <div>{{ header.text }}</div>
            <input
              v-model="userNameSearch"
              type="text"
              placeholder="Search user..."
              class="column-filter"
            />
          </div>
        </template>

        <template #header-rating="header">
          <div class="filter-column">
            <div>{{ header.text }}</div>
            <select v-model="ratingFilter" class="column-filter">
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </template>

        <template #item-rating="{ rating }">
          <span class="stars">{{ getStarDisplay(rating) }}</span>
        </template>

        <template #item-createdAt="{ createdAt }">
          {{ formatDate(createdAt) }}
        </template>

        <template #item-comment="{ comment }">
          <span class="comment-text">{{ comment || 'No comment' }}</span>
        </template>

        <template #item-actions="{ id }">
          <button @click="deleteRatingById(id)" class="btn-small danger">
            Remove
          </button>
        </template>
      </Vue3EasyDataTable>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { db } from '../firebase'
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import recipesData from '../data/recipes.json'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import EmailTestModal from '../components/EmailTestModal.vue'
import Papa from 'papaparse'

const authStore = useAuthStore()

const users = ref([])
const recipes = ref([])
const ratings = ref([])
const allRatings = ref([])
const showEmailTestModal = ref(false)

// Table headers for User Management
const userHeaders = [
  { text: 'Name', value: 'name', sortable: true },
  { text: 'Email', value: 'email', sortable: true },
  { text: 'Role', value: 'role', sortable: true },
  { text: 'Joined Date', value: 'createdAt', sortable: true },
  { text: 'Actions', value: 'actions', sortable: false }
]

// Table headers for Rating Analytics
const ratingHeaders = [
  { text: 'Recipe Name', value: 'recipeName', sortable: true },
  { text: 'User Name', value: 'userName', sortable: true },
  { text: 'Rating', value: 'rating', sortable: true },
  { text: 'Comment', value: 'comment', sortable: false },
  { text: 'Date', value: 'createdAt', sortable: true },
  { text: 'Actions', value: 'actions', sortable: false }
]

// Search and filter states
const emailSearch = ref('')
const roleFilter = ref('')
const recipeNameSearch = ref('')
const userNameSearch = ref('')
const ratingFilter = ref('')

// Computed filtered data
const filteredUsers = computed(() => {
  let filtered = users.value

  // Filter by email
  if (emailSearch.value) {
    filtered = filtered.filter(u =>
      u.email.toLowerCase().includes(emailSearch.value.toLowerCase())
    )
  }

  // Filter by role
  if (roleFilter.value) {
    filtered = filtered.filter(u => u.role === roleFilter.value)
  }

  return filtered
})

const filteredRatings = computed(() => {
  let filtered = allRatings.value

  // Filter by recipe name
  if (recipeNameSearch.value) {
    filtered = filtered.filter(r =>
      r.recipeName.toLowerCase().includes(recipeNameSearch.value.toLowerCase())
    )
  }

  // Filter by user name
  if (userNameSearch.value) {
    filtered = filtered.filter(r =>
      r.userName.toLowerCase().includes(userNameSearch.value.toLowerCase())
    )
  }

  // Filter by rating
  if (ratingFilter.value) {
    filtered = filtered.filter(r => r.rating === parseInt(ratingFilter.value))
  }

  return filtered
})

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

    // Load all ratings with full details
    const allRatingsSnapshot = await getDocs(collection(db, 'ratings'))
    allRatings.value = allRatingsSnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        recipeName: data.recipeName || 'Unknown Recipe',
        userName: data.userName || 'Anonymous',
        rating: data.rating || 0,
        comment: data.comment || '',
        createdAt: data.createdAt?.toDate() || new Date()
      }
    })

    // Get all ratings for stats
    ratings.value = allRatings.value

  } catch (error) {
    console.error('Error loading admin data:', error)
  }
}

// User management functions
async function toggleUserRoleById(userId, currentRole) {
  try {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    await updateDoc(doc(db, 'users', userId), { role: newRole })

    // Update local data
    const userIndex = users.value.findIndex(u => u.id === userId)
    if (userIndex !== -1) {
      users.value[userIndex].role = newRole
    }

    alert(`User role updated to ${newRole}`)
  } catch (error) {
    console.error('Error updating user role:', error)
    alert('Failed to update user role')
  }
}

async function deleteUserById(userId) {
  const user = users.value.find(u => u.id === userId)
  if (!confirm(`Are you sure you want to delete user ${user?.name || 'this user'}?`)) return

  try {
    await deleteDoc(doc(db, 'users', userId))
    users.value = users.value.filter(u => u.id !== userId)
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

// Rating management functions
async function deleteRatingById(ratingId) {
  if (!confirm('Are you sure you want to delete this rating?')) return

  try {
    await deleteDoc(doc(db, 'ratings', ratingId))
    allRatings.value = allRatings.value.filter(r => r.id !== ratingId)
    ratings.value = allRatings.value
    alert('Rating deleted successfully')
  } catch (error) {
    console.error('Error deleting rating:', error)
    alert('Failed to delete rating')
  }
}

// Utility functions
function formatDate(date) {
  if (!date) return 'Unknown'
  return new Date(date).toLocaleDateString()
}

function getStarDisplay(rating) {
  const filledStar = '\u2605'
  const emptyStar = '\u2606'
  return filledStar.repeat(rating) + emptyStar.repeat(5 - rating)
}

// Export users to CSV
function exportUsersToCSV() {
  if (users.value.length === 0) {
    alert('No users to export.')
    return
  }

  // Prepare user data for CSV
  const csvData = users.value.map((user) => ({
    ID: user.id,
    Email: user.email,
    'Display Name': user.displayName || user.name || '',
    Role: user.role || 'user',
    'Created Date': formatDate(user.createdAt),
    'Email Verified': user.emailVerified ? 'Yes' : 'No',
  }))

  // Convert to CSV
  const csv = Papa.unparse(csvData)

  // Create download link
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `users-export-${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
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

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.management-section h2 {
  font-size: 1.8rem;
  margin: 0;
  color: #1a202c;
}

.export-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s;
}

.export-btn:hover {
  background: #059669;
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

/* Custom DataTable Styles */
.custom-data-table {
  --easy-table-border: 1px solid #e5e7eb;
  --easy-table-row-border: 1px solid #f3f4f6;
  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #374151;
  --easy-table-header-background-color: #f8fafc;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;
  --easy-table-body-row-font-color: #1f2937;
  --easy-table-body-row-hover-font-color: #1f2937;
  --easy-table-body-row-hover-background-color: #f9fafb;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 0;
}

.column-filter {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.column-filter:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.1);
}

.comment-text {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}

.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.title-inner {
  flex: 1;
}

.title-actions {
  display: flex;
  gap: 12px;
}

.btn-test-email {
  padding: 10px 20px;
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-test-email:hover {
  background: #16a34a;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(34, 197, 94, 0.3);
}

@media (max-width: 768px) {
  .title-bar {
    flex-direction: column;
    align-items: flex-start;
  }

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

/* Increase font size for vue3-easy-data-table */
:deep(.vue3-easy-data-table__main) {
  font-size: 14px;
}

:deep(.vue3-easy-data-table__footer) {
  font-size: 14px;
}

:deep(.vue3-easy-data-table__body td) {
  font-size: 14px;
  padding: 12px 10px;
}

:deep(.vue3-easy-data-table__header th) {
  font-size: 14px;
  padding: 12px 10px;
}

:deep(.vue3-easy-data-table__message) {
  font-size: 15px;
  padding: 40px 20px;
}

:deep(.rows-per-page-selector) {
  font-size: 14px;
}

:deep(.pagination__rows-per-page) {
  font-size: 14px;
}

:deep(.pagination__items-index) {
  font-size: 14px;
}

/* Add spacing between sections */
.management-section:not(:last-child) {
  margin-bottom: 60px;
}
</style>