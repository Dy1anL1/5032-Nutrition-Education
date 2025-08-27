<template>
  <SectionTitle title="Register" subtitle="Create an account to save your plans" />
  <form @submit.prevent="onSubmit" class="grid" style="max-width: 420px">
    <label>Name</label>
    <input v-model.trim="name" class="input" />

    <label>Email</label>
    <input v-model.trim="email" class="input" type="email" />
    <p class="form-errors" v-if="errors.email">{{ errors.email }}</p>

    <label>Password</label>
    <input v-model="password" class="input" type="password" />
    <label>Confirm Password</label>
    <input v-model="confirm" class="input" type="password" />
    <p class="form-errors" v-if="errors.password">{{ errors.password }}</p>

    <button class="btn primary">Create account</button>
    <p class="toast-ok" v-if="ok">Account created.</p>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import SectionTitle from '../components/SectionTitle.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const ok = ref(false)
const errors = reactive({ email: '', password: '' })

function onSubmit() {
  errors.email = /^\S+@\S+\.\S+$/.test(email.value) ? '' : 'Enter a valid email address.'
  errors.password =
    password.value.length >= 8
      ? password.value === confirm.value
        ? ''
        : 'Passwords do not match.'
      : 'Password must be at least 8 characters.'
  if (!errors.email && !errors.password) ok.value = true
}
</script>
