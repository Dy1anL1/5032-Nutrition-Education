<template>
  <SectionTitle title="Login" subtitle="Access your saved plans and recipes" />
  <form @submit.prevent="onSubmit" class="grid" style="max-width: 420px">
    <label>Email</label>
    <input
      v-model.trim="email"
      class="input"
      type="email"
      autocomplete="email"
      @blur="() => validateEmail(true)"
      @input="() => validateEmail(false)"
    />
    <p class="form-errors" v-if="errors.email">{{ errors.email }}</p>

    <label>Password</label>
    <input
      v-model="password"
      class="input"
      type="password"
      autocomplete="current-password"
      @blur="() => validatePassword(true)"
      @input="() => validatePassword(false)"
    />
    <p class="form-errors" v-if="errors.password">{{ errors.password }}</p>

    <button class="btn primary">Login</button>
    <p class="toast-ok" v-if="ok">Login successful. Redirecting...</p>
    <p class="form-errors" v-if="fail">Incorrect email or password.</p>

    <p style="margin-top: 8px">No account? <router-link to="/register">Register</router-link></p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import SectionTitle from '../components/SectionTitle.vue'

const email = ref('')
const password = ref('')
const ok = ref(false)
const fail = ref(false)
const errors = ref({
  email: null,
  password: null
})

function validateEmail(blur) {
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    if (blur) errors.value.email = 'Enter a valid email address.'
  } else {
    errors.value.email = null
  }
}

function validatePassword(blur) {
  if (password.value.length < 8) {
    if (blur) errors.value.password = 'Password must be at least 8 characters.'
  } else {
    errors.value.password = null
  }
}

function onSubmit() {
  validateEmail(true)
  validatePassword(true)
  if (!errors.value.email && !errors.value.password) {
    if (password.value === 'password123') {
      ok.value = true
      fail.value = false
    } else {
      ok.value = false
      fail.value = true
    }
  }
}
</script>
