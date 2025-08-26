<template>
  <section class="container">
    <div class="form-center">
      <div class="form-block">

        <h1>Login</h1>

        <!-- Success/Error Message -->  
        <div v-if="successMsg" class="alert success">{{ successMsg }}</div>
        <div v-if="submitError" class="alert error">{{ submitError }}</div>

        <form @submit.prevent="submitForm" novalidate>
          <div class="form-field">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              v-model="form.email"
              @blur="() => validateEmail(true)"
              @input="() => validateEmail(false)"
              aria-describedby="emailHelp"
            />
            <div v-if="errors.email" class="text-danger" id="emailHelp">{{ errors.email }}</div>
          </div>

          <div class="form-field">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              v-model="form.password"
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
              aria-describedby="pwdHelp"
            />
            <div v-if="errors.password" class="text-danger" id="pwdHelp">{{ errors.password }}</div>
          </div>

          <div class="form-actions">
            <span class="helper" @click="mockForgot">Forgot password?</span>
            <button type="submit" class="btn primary">Log in</button>
            <div class="divider"><span>or</span></div>
            <router-link to="/register" class="btn">Register</router-link>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  email: '',
  password: '',
})

const errors = ref({
  email: null,
  password: null
})

const successMsg = ref('')
const submitError = ref('')

const emailRx = /^\S+@\S+\.\S+$/

const validateEmail = (blur) => {
  if (!form.value.email || !emailRx.test(form.value.email)) {
    if (blur) errors.value.email = 'Enter a valid email address.'
  } else {
    errors.value.email = null
  }
}

const validatePassword = (blur) => {
  const pwd = form.value.password
  if (!pwd || pwd.length < 8) {
    if (blur) errors.value.password = 'Password must be at least 8 characters.'
  } else {
    errors.value.password = null
  }
}

const submitForm = () => {
  // Trigger final validation
  validateEmail(true)
  validatePassword(true)
  submitError.value = ''
  successMsg.value = ''

  if (errors.value.email || errors.value.password) {
    submitError.value = 'Please fix the errors above and try again.'
    return
  }

  // Success state (Version 1: no backend, just simulate success)
  successMsg.value = 'Login successful! Redirecting...'
  setTimeout(() => {
    router.push('/') 
  }, 800)
}

const mockForgot = () => {
  alert('In Version 1, this is a placeholder.')
}
</script>

<style scoped>
.form-center { display:flex; justify-content:center; }
.text-danger { color:#dc2626; font-size: 13px; }
.alert { padding:10px 12px; border-radius:8px; margin:10px 0; font-size:14px; }
.alert.success { background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0; }
.alert.error { background:#fef2f2; color:#991b1b; border:1px solid #fecaca; }
.divider { display:flex; align-items:center; gap:10px; margin:12px 0; }
.divider::before, .divider::after { content:""; flex:1; height:1px; background:#e5e7eb; }
.divider span { font-size:12px; color:#6b7280; }
</style>
