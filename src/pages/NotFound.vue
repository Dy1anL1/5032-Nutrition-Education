<template>
  <section class="title-bar">
    <div class="title-inner">
      <h1 class="title">Page Not Found</h1>
      <p class="subtitle">The page you're looking for doesn't exist</p>
    </div>
  </section>
  
  <div class="not-found-content">
    <div class="error-card">
      <div class="error-icon">🔍</div>
      <h2>404 - Page Not Found</h2>
      <p>The page you're trying to access doesn't exist or has been moved.</p>
      <div class="error-actions">
        <router-link to="/" class="btn primary">Go to Home</router-link>
        <button @click="goBack" class="btn secondary">Go Back</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.not-found-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 48px 24px;
  text-align: center;
}

.error-card {
  background: white;
  border-radius: 12px;
  padding: 48px 32px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 24px;
}

.error-card h2 {
  font-size: 2rem;
  color: #1a202c;
  margin: 0 0 16px;
}

.error-card p {
  color: #6b7280;
  font-size: 1.1rem;
  margin: 0 0 32px;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn.primary {
  background: #22c55e;
  color: white;
}

.btn.primary:hover {
  background: #16a34a;
}

.btn.secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn.secondary:hover {
  background: #e5e7eb;
}
</style>