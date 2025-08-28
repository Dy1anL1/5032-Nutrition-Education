<!--
  Login page
  - Simple demo login used for local testing. Validates email and password client-side.
  - Includes one test account (development only). Remove or secure before production.
  - Fields: email, password; shows success/failure UI flags.
-->
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
  <p class="muted" style="margin-top: 12px; font-size: 14px">
    Test account: <strong>123@example.com</strong> / <strong>Pass123!</strong>
  </p>
</template>

<script setup>
import { ref } from 'vue'
import SectionTitle from '../components/SectionTitle.vue'

// Test account (development only): update or remove before shipping to production.
const TEST_USER = { email: '123@example.com', password: 'Pass123!' }

// Reactive UI state
// - `email` and `password` are bound to the form inputs.
// - `ok` and `fail` control simple feedback messages shown to the tester.
// - `errors` stores per-field validation messages.
const email = ref(TEST_USER.email)
const password = ref('')
const ok = ref(false)
const fail = ref(false)
const errors = ref({
  email: null,
  password: null,
})

function validateEmail(blur) {
  // Basic client-side email format check. We only set an error message when the
  // user blurs the field to avoid noisy inline errors while typing.
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    if (blur) errors.value.email = 'Enter a valid email address.'
  } else {
    errors.value.email = null
  }
}

function validatePassword(blur) {
  // Simple length check for demo purposes. Production rules should be stronger
  // and authentication handled server-side.
  if (password.value.length < 8) {
    if (blur) errors.value.password = 'Password must be at least 8 characters.'
  } else {
    errors.value.password = null
  }
}

function onSubmit() {
  // Validate and perform the mock auth check against the TEST_USER.
  // Replace with real auth flow when backend integration is available.
  validateEmail(true)
  validatePassword(true)
  if (!errors.value.email && !errors.value.password) {
    if (email.value === TEST_USER.email && password.value === TEST_USER.password) {
      ok.value = true
      fail.value = false
    } else {
      ok.value = false
      fail.value = true
    }
  }
}
</script>
