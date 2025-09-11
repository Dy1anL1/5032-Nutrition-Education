<!--
  Login page
  - Simple demo login used for local testing. Validates email and password client-side.
  - Includes one test account (development only). Remove or secure before production.
  - Fields: email, password; shows success/failure UI flags.
-->
<template>
  <div class="simple-title">
    <h1>Login</h1>
    <p>Access your saved plans and recipes</p>
  </div>
  <form @submit.prevent="onSubmit" class="grid" style="max-width: 420px">
    <label>Email</label>
    <input
      v-model.trim="email"
      class="input"
      type="email"
      autocomplete="email"
      @blur="() => validateEmailInput(true)"
      @input="() => validateEmailInput(false)"
    />
    <p class="form-errors" v-if="errors.email">{{ errors.email }}</p>

    <label>Password</label>
    <input
      v-model="password"
      class="input"
      type="password"
      autocomplete="current-password"
      @blur="() => validatePasswordInput(true)"
      @input="() => validatePasswordInput(false)"
    />
    <p class="form-errors" v-if="errors.password">{{ errors.password }}</p>

    <button class="btn primary" :disabled="loading">
      {{ loading ? 'Signing in...' : 'Login' }}
    </button>
    <p class="toast-ok" v-if="ok">Login successful. Redirecting...</p>
    <p class="form-errors" v-if="fail">{{ errorMessage || 'Login failed. Please try again.' }}</p>

    <p style="margin-top: 8px">No account? <router-link to="/register">Register</router-link></p>
  </form>
  <p class="muted" style="margin-top: 12px; font-size: 14px">
    Create an account to test the authentication system.
  </p>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { validateEmail, createRateLimiter } from '../utils/security'

const email = ref('')
const password = ref('')
const ok = ref(false)
const fail = ref(false)
const errorMessage = ref('')
const loading = ref(false)
const errors = ref({
  email: null,
  password: null,
})

const router = useRouter()
const authStore = useAuthStore()

// Rate limiting for login attempts
const rateLimiter = createRateLimiter(5, 15 * 60 * 1000) // 5 attempts per 15 minutes

function validateEmailInput(blur) {
  const result = validateEmail(email.value)
  if (!result.isValid) {
    if (blur) errors.value.email = result.error
  } else {
    errors.value.email = null
  }
  return result.isValid
}

function validatePasswordInput(blur) {
  // For login, we use simpler validation (just check if not empty)
  // Full password validation is done during registration
  if (!password.value || password.value.length === 0) {
    if (blur) errors.value.password = 'Password is required'
    return false
  } else {
    errors.value.password = null
    return true
  }
}

async function onSubmit() {
  const isEmailValid = validateEmailInput(true)
  const isPasswordValid = validatePasswordInput(true)
  
  if (!isEmailValid || !isPasswordValid) {
    return
  }
  
  // Check rate limiting
  const rateLimitCheck = rateLimiter.checkLimit(email.value)
  if (!rateLimitCheck.allowed) {
    fail.value = true
    errorMessage.value = rateLimitCheck.error
    return
  }
  
  loading.value = true
  fail.value = false
  errorMessage.value = ''
  
  const result = await authStore.login(email.value, password.value)
  
  if (result.success) {
    ok.value = true
    rateLimiter.reset(email.value) // Reset rate limit on successful login
    setTimeout(() => {
      router.push('/')
    }, 700)
  } else {
    fail.value = true
    errorMessage.value = result.error
  }
  
  loading.value = false
}
</script>

<style scoped>
.simple-title {
  text-align: center;
  margin-bottom: 32px;
}

.simple-title h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 12px;
  color: #1a202c;
}

.simple-title p {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
}
</style>
