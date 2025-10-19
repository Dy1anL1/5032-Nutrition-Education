<template>
  <Transition name="slide-down">
    <div v-if="!isOnline" class="offline-banner" role="alert" aria-live="polite">
      <div class="offline-content">
        <span class="offline-icon">📡</span>
        <div class="offline-text">
          <strong>You're offline</strong>
          <p>Some features may be limited. Showing cached data.</p>
        </div>
        <button @click="retry" class="retry-btn" aria-label="Retry connection">
          Retry
        </button>
      </div>
    </div>
  </Transition>

  <Transition name="fade">
    <div v-if="showReconnected" class="reconnected-toast">
      <span class="success-icon">✓</span>
      Back online!
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { isOnline as checkOnline, listenToNetworkStatus } from '../services/offlineService'

const isOnline = ref(navigator.onLine)
const showReconnected = ref(false)
let cleanupListener = null

onMounted(() => {
  // Initial check
  isOnline.value = checkOnline()

  // Listen to network status changes
  cleanupListener = listenToNetworkStatus(
    () => {
      isOnline.value = true
      showReconnectedNotification()
    },
    () => {
      isOnline.value = false
    }
  )
})

onUnmounted(() => {
  if (cleanupListener) {
    cleanupListener()
  }
})

function showReconnectedNotification() {
  showReconnected.value = true
  setTimeout(() => {
    showReconnected.value = false
  }, 3000)
}

function retry() {
  // Force a connection check
  isOnline.value = navigator.onLine
  if (isOnline.value) {
    showReconnectedNotification()
  }
}
</script>

<style scoped>
.offline-banner {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: #78350f;
  z-index: 999;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.offline-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.offline-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.offline-text {
  flex: 1;
}

.offline-text strong {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 4px;
  color: #78350f;
}

.offline-text p {
  margin: 0;
  font-size: 0.9rem;
  color: #92400e;
}

.retry-btn {
  background: white;
  color: #f59e0b;
  border: 2px solid white;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.retry-btn:hover {
  background: #f59e0b;
  color: white;
  transform: translateY(-1px);
}

.reconnected-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  z-index: 1000;
}

.success-icon {
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.3);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

/* Animations */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 768px) {
  .offline-content {
    padding: 12px 16px;
    gap: 12px;
  }

  .offline-icon {
    font-size: 1.5rem;
  }

  .offline-text strong {
    font-size: 1rem;
  }

  .offline-text p {
    font-size: 0.85rem;
  }

  .retry-btn {
    padding: 6px 16px;
    font-size: 0.9rem;
  }

  .reconnected-toast {
    bottom: 16px;
    right: 16px;
    padding: 12px 20px;
    font-size: 0.9rem;
  }
}
</style>
