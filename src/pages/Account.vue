<template>
  <section class="title-bar">
    <div class="title-inner">
      <h1 class="title">My Account</h1>
      <p class="subtitle">Manage your profile and settings</p>
    </div>
  </section>
  
  <div class="account-content">
    <div class="profile-card">
      <h2>Profile Information</h2>
      <div class="profile-info">
        <div class="info-row">
          <span class="label">Name:</span>
          <span class="value">{{ authStore.userProfile?.name || authStore.user?.displayName || 'User' }}</span>
        </div>
        <div class="info-row">
          <span class="label">Email:</span>
          <span class="value">{{ authStore.user?.email || 'No email' }}</span>
        </div>
        <div class="info-row">
          <span class="label">Role:</span>
          <span class="value">
            <span class="role-badge" :class="authStore.userProfile?.role">
              {{ authStore.userProfile?.role === 'admin' ? 'Administrator' : 'Regular User' }}
            </span>
          </span>
        </div>
        <div class="info-row">
          <span class="label">Member Since:</span>
          <span class="value">{{ formatDate(authStore.userProfile?.createdAt) }}</span>
        </div>
      </div>
      
      <!-- Temporary admin promotion button -->
      <div v-if="authStore.userProfile?.role !== 'admin'" class="admin-promotion">
        <h3>Account Issue Fix</h3>
        <p style="color: #6b7280; margin-bottom: 16px;">
          If you registered as an admin but showing as regular user, use this button to fix your role:
        </p>
        <button @click="promoteToAdmin" class="btn-promote" :disabled="promoting">
          {{ promoting ? 'Promoting...' : 'Promote to Admin' }}
        </button>
        <p v-if="promotionMessage" :class="promotionSuccess ? 'success-msg' : 'error-msg'">
          {{ promotionMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const promoting = ref(false)
const promotionMessage = ref('')
const promotionSuccess = ref(false)

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString()
}

const promoteToAdmin = async () => {
  promoting.value = true
  promotionMessage.value = ''
  
  const result = await authStore.promoteToAdmin()
  
  if (result.success) {
    promotionMessage.value = 'Successfully promoted to admin! The page will refresh shortly.'
    promotionSuccess.value = true
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  } else {
    promotionMessage.value = result.error || 'Failed to promote to admin'
    promotionSuccess.value = false
  }
  
  promoting.value = false
}
</script>

<style scoped>
.account-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}

.profile-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.profile-card h2 {
  margin: 0 0 24px;
  font-size: 1.5rem;
  color: #1a202c;
}

.profile-info {
  display: grid;
  gap: 16px;
  margin-bottom: 32px;
}

.info-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  align-items: center;
  gap: 16px;
}

.label {
  font-weight: 600;
  color: #374151;
}

.value {
  color: #1a202c;
}

.role-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.875rem;
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

.admin-promotion {
  border-top: 1px solid #e5e7eb;
  padding-top: 24px;
}

.admin-promotion h3 {
  margin: 0 0 12px;
  font-size: 1.2rem;
  color: #1a202c;
}

.btn-promote {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.btn-promote:hover:not(:disabled) {
  background: linear-gradient(135deg, #d97706 0%, #ea580c 100%);
  transform: translateY(-1px);
}

.btn-promote:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.success-msg {
  color: #22c55e;
  font-weight: 600;
  margin-top: 12px;
}

.error-msg {
  color: #dc2626;
  font-weight: 600;
  margin-top: 12px;
}
</style>
