<template>
  <section class="container">
    <div class="form-center">
      <div class="form-block">
        <h1>Register</h1>

        <!-- Success/Error Message -->
        <div v-if="successMsg" class="alert success">{{ successMsg }}</div>
        <div v-if="submitError" class="alert error">{{ submitError }}</div>

        <form @submit.prevent="submitForm" novalidate>
          <div class="form-field">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              v-model="form.name"
              @blur="() => validateName(true)"
              @input="() => validateName(false)"
            />
            <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
          </div>

          <div class="form-field">
            <label for="remail">Email</label>
            <input
              id="remail"
              type="email"
              placeholder="name@example.com"
              v-model="form.email"
              @blur="() => validateEmail(true)"
              @input="() => validateEmail(false)"
            />
            <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
          </div>

          <div class="form-field">
            <label for="rpassword">Password</label>
            <input
              id="rpassword"
              type="password"
              placeholder="********"
              v-model="form.password"
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
            />
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
          </div>

          <div class="form-field">
            <label for="confirm">Confirm Password</label>
            <input
              id="confirm"
              type="password"
              placeholder="********"
              v-model="form.confirmPassword"
              @blur="() => validateConfirm(true)"
              @input="() => validateConfirm(false)"
            />
            <div v-if="errors.confirmPassword" class="text-danger">
              {{ errors.confirmPassword }}
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn primary">Create Account</button>
            <router-link to="/login" class="btn">Back to Login</router-link>
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
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = ref({
  name: null,
  email: null,
  password: null,
  confirmPassword: null,
})

const successMsg = ref('')
const submitError = ref('')

const emailRx = /^\S+@\S+\.\S+$/

const validateName = (blur) => {
  if (!form.value.name || form.value.name.trim().length < 2) {
    if (blur) errors.value.name = 'Name must be at least 2 characters.'
  } else {
    errors.value.name = null
  }
}

const validateEmail = (blur) => {
  if (!form.value.email || !emailRx.test(form.value.email)) {
    if (blur) errors.value.email = 'Enter a valid email address.'
  } else {
    errors.value.email = null
  }
}

const validatePassword = (blur) => {
  const pwd = form.value.password
  const minLength = 8
  const hasUpper = /[A-Z]/.test(pwd)
  const hasLower = /[a-z]/.test(pwd)
  const hasNum = /\d/.test(pwd)

  if (!pwd || pwd.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters.`
  } else if (!hasUpper) {
    if (blur) errors.value.password = 'Include at least one uppercase letter.'
  } else if (!hasLower) {
    if (blur) errors.value.password = 'Include at least one lowercase letter.'
  } else if (!hasNum) {
    if (blur) errors.value.password = 'Include at least one number.'
  } else {
    errors.value.password = null
  }
}

const validateConfirm = (blur) => {
  if (!form.value.confirmPassword || form.value.confirmPassword !== form.value.password) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const submitForm = () => {
  // Trigger final validation
  validateName(true)
  validateEmail(true)
  validatePassword(true)
  validateConfirm(true)
  submitError.value = ''
  successMsg.value = ''

  if (
    errors.value.name ||
    errors.value.email ||
    errors.value.password ||
    errors.value.confirmPassword
  ) {
    submitError.value = 'Please fix the errors above and try again.'
    return
  }

  // Success state (V1: no backend, simulate success)
  successMsg.value = 'Account created! Redirecting to login...'
  setTimeout(() => {
    router.push('/login')
  }, 800)
}
</script>

<style scoped>
.form-center {
  display: flex;
  justify-content: center;
}
.text-danger {
  color: #dc2626;
  font-size: 13px;
}
.alert {
  padding: 10px 12px;
  border-radius: 8px;
  margin: 10px 0;
  font-size: 14px;
}
.alert.success {
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}
.alert.error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
</style>
