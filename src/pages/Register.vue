<!--
  Register page
  - Simple client-side form demonstrating validation and a session-only preview card.
  - Fields: name, email, password, confirm. Validation runs on blur and on submit.
  - After successful submit a snapshot is shown (preview card). Passwords are masked by default.
-->
<template>
  <div class="simple-title">
    <h1>Register</h1>
    <p>Create an account to save your plans</p>
  </div>

  <form @submit.prevent="onSubmit" class="grid" style="max-width: 420px">
    <label>Name</label>
    <input
      v-model.trim="name"
      class="input"
      @blur="() => validateNameInput(true)"
      @input="() => validateNameInput(false)"
    />
    <p class="form-errors" v-if="errors.name">{{ errors.name }}</p>

    <label>Email</label>
    <input
      v-model.trim="email"
      class="input"
      type="email"
      @blur="() => validateEmailInput(true)"
      @input="() => validateEmailInput(false)"
    />
    <p class="form-errors" v-if="errors.email">{{ errors.email }}</p>

    <label>Password</label>
    <div class="password-field">
      <input
        v-model="password"
        class="input"
        :type="showPassword ? 'text' : 'password'"
        @blur="() => validatePasswordInput(true)"
        @input="() => validatePasswordInput(false)"
      />
      <button 
        type="button" 
        @click="showPassword = !showPassword" 
        class="password-toggle"
        :title="showPassword ? 'Hide password' : 'Show password'"
      >
        <svg v-if="showPassword" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </button>
    </div>
    <p class="form-errors" v-if="errors.password">{{ errors.password }}</p>

    <label>Confirm Password</label>
    <div class="password-field">
      <input
        v-model="confirm"
        class="input"
        :type="showPassword ? 'text' : 'password'"
        @blur="() => validateConfirmInput(true)"
        @input="() => validateConfirmInput(false)"
      />
      <button 
        type="button" 
        @click="showPassword = !showPassword" 
        class="password-toggle"
        :title="showPassword ? 'Hide password' : 'Show password'"
      >
        <svg v-if="showPassword" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </button>
    </div>
    <p class="form-errors" v-if="errors.confirm">{{ errors.confirm }}</p>

    <label>Account Type</label>
    <select v-model="role" class="input">
      <option value="user">Regular User</option>
      <option value="admin">Administrator</option>
    </select>

    <button class="btn primary" :disabled="loading">
      {{ loading ? 'Creating account...' : 'Create account' }}
    </button>
    <p class="toast-ok" v-if="ok">Account created. Redirecting...</p>
    <p class="form-errors" v-if="errorMessage">{{ errorMessage }}</p>

    <div class="divider">
      <span>OR</span>
    </div>

    <button type="button" @click="registerWithGoogle" class="btn google-btn" :disabled="loading">
      <svg class="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      Continue with Google
    </button>

    <p style="margin-top: 16px">Already have an account? <router-link to="/login">Login</router-link></p>
  </form>

  <!-- Info card displayed after submission (Week 3 style) -->
  <div v-if="showInfo" class="preview-card">
    <div class="preview-head">
      <h3>User Information</h3>
      <label class="showpass">
        <input type="checkbox" v-model="reveal" />
        Show password
      </label>
    </div>
    <div class="preview-body">
      <div class="row">
        <span class="key">Name</span><span class="val">{{ snapshot.name }}</span>
      </div>
      <div class="row">
        <span class="key">Email</span><span class="val">{{ snapshot.email }}</span>
      </div>
      <div class="row">
        <span class="key">Password</span>
        <span class="val">{{ reveal ? snapshot.password : maskedPassword }}</span>
      </div>
      <div class="row">
        <span class="key">Role</span>
        <span class="val">{{ snapshot.role === 'admin' ? 'Administrator' : 'Regular User' }}</span>
      </div>
    </div>
    <p class="disclaimer">* This card is for demonstration only.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { validateEmail, validatePassword, validateName, sanitizeInput } from '../utils/security'

// form model
const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const role = ref('user')

// UI state
const ok = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const showInfo = ref(false) // whether the preview card is visible
const reveal = ref(false) // toggle to show password in the preview
const showPassword = ref(false) // toggle to show/hide password input

// Snapshot for the preview card - keeps displayed values stable after submit
const snapshot = ref({ name: '', email: '', password: '', role: '' })

const router = useRouter()
const authStore = useAuthStore()

// Simple validation errors object
const errors = ref({
  name: null,
  email: null,
  password: null,
  confirm: null,
})

// Validation helpers - validate on blur and also during submit
function validateNameInput(blur) {
  const result = validateName(name.value)
  if (!result.isValid) {
    if (blur) errors.value.name = result.error
  } else {
    errors.value.name = null
    // Update the name with sanitized value
    if (result.value !== name.value) {
      name.value = result.value
    }
  }
  return result.isValid
}

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
  const result = validatePassword(password.value)
  if (!result.isValid) {
    if (blur) errors.value.password = result.error
  } else {
    errors.value.password = null
  }
  return result.isValid
}

function validateConfirmInput(blur) {
  if (password.value !== confirm.value) {
    if (blur) errors.value.confirm = 'Passwords do not match.'
    return false
  } else {
    errors.value.confirm = null
    return true
  }
}

// Masked password for the preview card
const maskedPassword = computed(() => '\u2022'.repeat(Math.max(8, password.value.length || 8)))

async function onSubmit() {
  const isNameValid = validateNameInput(true)
  const isEmailValid = validateEmailInput(true)
  const isPasswordValid = validatePasswordInput(true)
  const isConfirmValid = validateConfirmInput(true)

  if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmValid) {
    return
  }

  loading.value = true
  errorMessage.value = ''

  // Sanitize inputs before sending to Firebase
  const sanitizedName = sanitizeInput(name.value)
  const sanitizedEmail = email.value.toLowerCase().trim()

  console.log('Attempting to register with:', { email: sanitizedEmail, name: sanitizedName, role: role.value })

  const result = await authStore.register(sanitizedEmail, password.value, sanitizedName, role.value)

  console.log('Registration result:', result)

  if (result.success) {
    console.log('Registration successful, showing success UI')
    ok.value = true
    snapshot.value = {
      name: sanitizedName,
      email: sanitizedEmail,
      password: password.value,
      role: role.value
    }
    showInfo.value = true

    // Auto redirect after showing success
    setTimeout(() => {
      console.log('Redirecting to home page')
      router.push('/')
    }, 1500)
  } else {
    console.error('Registration failed:', result.error)
    errorMessage.value = result.error
    showInfo.value = false
  }

  loading.value = false
}

async function registerWithGoogle() {
  loading.value = true
  errorMessage.value = ''

  const result = await authStore.loginWithGoogle()

  if (result.success) {
    ok.value = true
    setTimeout(() => {
      router.push('/')
    }, 700)
  } else {
    errorMessage.value = result.error || 'Google sign-in failed. Please try again.'
  }

  loading.value = false
}
</script>

<style scoped>
.preview-card {
  max-width: 560px;
  margin: 18px auto 0;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.preview-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
}
.preview-head h3 {
  margin: 0;
  font-size: 18px;
}
.showpass {
  font-size: 14px;
  color: var(--muted);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.preview-body {
  padding: 12px 16px 6px;
  display: grid;
  gap: 10px;
}
.row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 10px;
  align-items: center;
}
.key {
  color: var(--muted);
}
.val {
  font-weight: 600;
}

.disclaimer {
  padding: 8px 16px 14px;
  color: #6a7483;
  font-size: 12px;
}

.password-field {
  position: relative;
  display: flex;
  align-items: center;
}

.password-field .input {
  padding-right: 45px; /* Make space for the toggle button */
}

.password-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.password-toggle:hover {
  color: #374151;
  background-color: #f3f4f6;
}

.password-toggle:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

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
