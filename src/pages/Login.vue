<!--
  Login page
  - Simple demo login used for local testing. Validates email and password client-side.
  - Includes one test account (development only). Remove or secure before production.
  - Fields: email, password; shows success/failure UI flags.
-->
<template>
  <!-- Bootstrap responsive container -->
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="simple-title">
          <h1 id="login-heading">Login</h1>
          <p id="login-description">Access your saved plans and recipes</p>
        </div>
        <form
          @submit.prevent="onSubmit"
          class="grid"
          aria-labelledby="login-heading"
          aria-describedby="login-description"
          novalidate
        >
    <label for="email-input">
      Email
      <span class="required-indicator" aria-label="required">*</span>
    </label>
    <input
      id="email-input"
      v-model.trim="email"
      class="input"
      type="email"
      autocomplete="email"
      required
      aria-required="true"
      aria-invalid="!!errors.email"
      aria-describedby="email-error"
      @blur="() => validateEmailInput(true)"
      @input="() => validateEmailInput(false)"
    />
    <p
      id="email-error"
      class="form-errors"
      v-if="errors.email"
      role="alert"
      aria-live="polite"
    >
      {{ errors.email }}
    </p>

    <label for="password-input">
      Password
      <span class="required-indicator" aria-label="required">*</span>
    </label>
    <input
      id="password-input"
      v-model="password"
      class="input"
      type="password"
      autocomplete="current-password"
      required
      aria-required="true"
      aria-invalid="!!errors.password"
      aria-describedby="password-error"
      @blur="() => validatePasswordInput(true)"
      @input="() => validatePasswordInput(false)"
    />
    <p
      id="password-error"
      class="form-errors"
      v-if="errors.password"
      role="alert"
      aria-live="polite"
    >
      {{ errors.password }}
    </p>

    <button
      type="submit"
      class="btn primary"
      :disabled="loading"
      :aria-busy="loading"
      aria-label="Login to your account"
    >
      {{ loading ? 'Signing in...' : 'Login' }}
    </button>

    <p
      class="toast-ok"
      v-if="ok"
      role="status"
      aria-live="polite"
    >
      Login successful. Redirecting...
    </p>

    <p
      class="form-errors"
      v-if="fail"
      role="alert"
      aria-live="assertive"
    >
      {{ errorMessage || 'Login failed. Please try again.' }}
    </p>

    <div class="divider" role="separator" aria-label="or">
      <span>OR</span>
    </div>

    <button
      type="button"
      @click="loginWithGoogle"
      class="btn google-btn"
      :disabled="loading"
      :aria-busy="loading"
      aria-label="Continue with Google authentication"
    >
      <svg
        class="google-icon"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      <span>Continue with Google</span>
    </button>

    <p style="margin-top: 8px">
      No account?
      <router-link
        to="/register"
        aria-label="Go to registration page"
      >
        Register
      </router-link>
    </p>
        </form>
        <p class="muted" style="margin-top: 12px; font-size: 14px">
          Create an account to test the authentication system.
        </p>
      </div>
    </div>
  </div>
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

async function loginWithGoogle() {
  loading.value = true
  fail.value = false
  errorMessage.value = ''

  const result = await authStore.loginWithGoogle()

  if (result.success) {
    ok.value = true
    setTimeout(() => {
      router.push('/')
    }, 700)
  } else {
    fail.value = true
    errorMessage.value = result.error || 'Google sign-in failed. Please try again.'
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

/* Required field indicator */
.required-indicator {
  color: #dc2626;
  margin-left: 4px;
  font-weight: 600;
}

/* Enhanced focus indicators for accessibility */
.input:focus {
  outline: 3px solid #22c55e;
  outline-offset: 2px;
  border-color: #22c55e;
}

.btn:focus {
  outline: 3px solid #22c55e;
  outline-offset: 2px;
}

.google-btn:focus {
  outline: 3px solid #4285F4;
  outline-offset: 2px;
}

a:focus {
  outline: 3px solid #22c55e;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Invalid input styling */
.input[aria-invalid="true"] {
  border-color: #dc2626;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0;
  color: #9ca3af;
  font-size: 14px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e5e7eb;
}

.divider span {
  padding: 0 12px;
}

.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 12px 24px;
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.google-btn:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #9ca3af;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.google-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.google-icon {
  width: 20px;
  height: 20px;
}
</style>
