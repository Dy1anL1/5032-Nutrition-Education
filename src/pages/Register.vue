<template>
  <SectionTitle title="Register" subtitle="Create an account to save your plans" />
  <form @submit.prevent="onSubmit" class="grid" style="max-width: 420px">
    <label>Name</label>
    <input
      v-model.trim="name"
      class="input"
      @blur="() => validateName(true)"
      @input="() => validateName(false)"
    />
    <p class="form-errors" v-if="errors.name">{{ errors.name }}</p>

    <label>Email</label>
    <input
      v-model.trim="email"
      class="input"
      type="email"
      @blur="() => validateEmail(true)"
      @input="() => validateEmail(false)"
    />
    <p class="form-errors" v-if="errors.email">{{ errors.email }}</p>

    <label>Password</label>
    <input
      v-model="password"
      class="input"
      type="password"
      @blur="() => validatePassword(true)"
      @input="() => validatePassword(false)"
    />
    <p class="form-errors" v-if="errors.password">{{ errors.password }}</p>

    <label>Confirm Password</label>
    <input
      v-model="confirm"
      class="input"
      type="password"
      @blur="() => validateConfirm(true)"
      @input="() => validateConfirm(false)"
    />
    <p class="form-errors" v-if="errors.confirm">{{ errors.confirm }}</p>

    <button class="btn primary">Create account</button>
    <p class="toast-ok" v-if="ok">Account created.</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import SectionTitle from '../components/SectionTitle.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const ok = ref(false)
const errors = ref({
  name: null,
  email: null,
  password: null,
  confirm: null
})

function validateName(blur) {
  if (name.value.length < 3) {
    if (blur) errors.value.name = 'Name must be at least 3 characters'
  } else {
    errors.value.name = null
  }
}

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

function validateConfirm(blur) {
  if (password.value !== confirm.value) {
    if (blur) errors.value.confirm = 'Passwords do not match.'
  } else {
    errors.value.confirm = null
  }
}

function onSubmit() {
  validateName(true)
  validateEmail(true)
  validatePassword(true)
  validateConfirm(true)
  if (!errors.value.name && !errors.value.email && !errors.value.password && !errors.value.confirm) {
    ok.value = true
  }
}
</script>
