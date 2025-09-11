<template>
  <div class="rating-component">
    <div class="rating-display">
      <div class="stars">
        <button
          v-for="star in 5"
          :key="star"
          @click="submitRating(star)"
          :disabled="!canRate"
          class="star"
          :class="{ 
            'filled': star <= currentRating,
            'user-rated': star <= userRating,
            'disabled': !canRate
          }"
          :title="canRate ? `Rate ${star} star${star > 1 ? 's' : ''}` : 'Login to rate'"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </button>
      </div>
      
      <div class="rating-info">
        <span class="average">{{ formattedAverage }}</span>
        <span class="count" v-if="stats.totalRatings > 0">
          ({{ stats.totalRatings }} rating{{ stats.totalRatings === 1 ? '' : 's' }})
        </span>
        <span class="no-ratings" v-else>No ratings yet</span>
      </div>
    </div>
    
    <div v-if="userRating > 0" class="user-rating">
      Your rating: {{ userRating }} star{{ userRating === 1 ? '' : 's' }}
      <button v-if="authStore.isAdmin" @click="clearUserRating" class="admin-clear-btn">
        Clear Rating
      </button>
    </div>
    
    <div v-if="authStore.isAdmin && stats.totalRatings > 0" class="admin-actions">
      <button @click="clearAllRatings" class="admin-btn danger">
        🗑️ Clear All Ratings
      </button>
    </div>
    
    <div v-if="loading" class="loading">Updating...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRatingStore } from '../stores/rating'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  itemId: {
    type: String,
    required: true
  },
  itemType: {
    type: String,
    default: 'recipe'
  }
})

const ratingStore = useRatingStore()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')

const stats = computed(() => ratingStore.getRatingStats(props.itemId))
const userRating = computed(() => ratingStore.getUserRating(props.itemId))
const canRate = computed(() => authStore.isAuthenticated)

const currentRating = computed(() => {
  return userRating.value > 0 ? userRating.value : stats.value.averageRating
})

const formattedAverage = computed(() => {
  return stats.value.averageRating > 0 ? stats.value.averageRating.toFixed(1) : '0.0'
})

const submitRating = async (rating) => {
  if (!canRate.value) return
  
  loading.value = true
  error.value = ''
  
  const result = await ratingStore.submitRating(props.itemId, rating, props.itemType)
  
  if (!result.success) {
    error.value = result.error
  }
  
  loading.value = false
}

// Load rating data when component mounts or itemId changes
onMounted(() => {
  ratingStore.loadItemData(props.itemId)
})

watch(() => props.itemId, () => {
  ratingStore.loadItemData(props.itemId)
})

// Reload user rating when auth state changes
watch(() => authStore.isAuthenticated, () => {
  if (authStore.isAuthenticated) {
    ratingStore.loadUserRating(props.itemId)
  }
})

// Admin functions
async function clearUserRating() {
  if (!confirm('Are you sure you want to clear this user rating?')) return
  
  loading.value = true
  error.value = null
  
  // For admin: clear current user's rating for this item
  const result = await ratingStore.submitRating(props.itemId, 0, props.itemType)
  
  if (!result.success) {
    error.value = result.error
  }
  
  loading.value = false
}

async function clearAllRatings() {
  if (!confirm('Are you sure you want to clear ALL ratings for this item? This cannot be undone.')) return
  
  loading.value = true
  error.value = null
  
  try {
    const result = await ratingStore.clearAllRatings(props.itemId)
    if (!result.success) {
      error.value = result.error
    }
  } catch (err) {
    error.value = 'Failed to clear all ratings'
  }
  
  loading.value = false
}
</script>

<style scoped>
.rating-component {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  background: none;
  border: none;
  cursor: pointer;
  color: #e5e7eb;
  transition: color 0.2s ease;
  padding: 2px;
  border-radius: 2px;
}

.star:hover:not(.disabled) {
  color: #fbbf24;
}

.star.filled {
  color: #fbbf24;
}

.star.user-rated {
  color: #f59e0b;
}

.star.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.rating-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.average {
  font-weight: 600;
  color: #374151;
}

.count {
  color: #6b7280;
}

.no-ratings {
  color: #9ca3af;
  font-style: italic;
}

.user-rating {
  font-size: 12px;
  color: #059669;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.admin-clear-btn {
  background: #fef3c7;
  color: #d97706;
  border: 1px solid #fcd34d;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-clear-btn:hover {
  background: #fef2e8;
  border-color: #f59e0b;
}

.admin-actions {
  margin-top: 8px;
}

.admin-btn {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fca5a5;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;
}

.admin-btn:hover {
  background: #fee2e2;
  border-color: #f87171;
}

.admin-btn.danger:hover {
  background: #dc2626;
  color: white;
}

.loading {
  font-size: 12px;
  color: #6b7280;
  font-style: italic;
}

.error {
  font-size: 12px;
  color: #dc2626;
  font-weight: 500;
}
</style>