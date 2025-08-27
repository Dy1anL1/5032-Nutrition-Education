<template>
  <SectionTitle title="Login" subtitle="Access your saved plans and recipes" />
  <form @submit.prevent="onSubmit" class="grid" style="max-width: 420px">
    <label>Email</label>
    <input v-model.trim="email" class="input" type="email" autocomplete="email" />
    <p class="form-errors" v-if="errors.email">{{ errors.email }}</p>

    <label>Password</label>
    <input v-model="password" class="input" type="password" autocomplete="current-password" />
    <p class="form-errors" v-if="errors.password">{{ errors.password }}</p>

    <button class="btn primary">Login</button>
    <p class="toast-ok" v-if="ok">Login successful. Redirecting...</p>
    <p class="form-errors" v-if="fail">Incorrect email or password.</p>

    <p style="margin-top: 8px">No account? <router-link to="/register">Register</router-link></p>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import SectionTitle from '../components/SectionTitle.vue'

const email = ref('')
const password = ref('')
const ok = ref(false)
const fail = ref(false)
const errors = reactive({ email: '', password: '' })

function onSubmit() {
  errors.email = /^\S+@\S+\.\S+$/.test(email.value) ? '' : 'Enter a valid email address.'
  errors.password = password.value.length >= 8 ? '' : 'Password must be at least 8 characters.'
  if (!errors.email && !errors.password) {
    // V1 mock: fail when password !== 'password123'
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
