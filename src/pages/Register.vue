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
    </div>
    <p class="disclaimer">
      * This card is for demonstration only. Do not display passwords in production.
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionTitle from '../components/SectionTitle.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const ok = ref(false)
const showInfo = ref(false)
const reveal = ref(false)

// Snapshot for info card (prevents user edits from affecting displayed info)
const snapshot = ref({ name: '', email: '', password: '' })

const errors = ref({
  name: null,
  email: null,
  password: null,
  confirm: null,
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

const maskedPassword = computed(() => '\u2022'.repeat(Math.max(8, password.value.length || 8)))

function onSubmit() {
  validateName(true)
  validateEmail(true)
  validatePassword(true)
  validateConfirm(true)

  const valid =
    !errors.value.name && !errors.value.email && !errors.value.password && !errors.value.confirm

  if (valid) {
    ok.value = true
    snapshot.value = { name: name.value, email: email.value, password: password.value }
    showInfo.value = true
  } else {
    ok.value = false
    showInfo.value = false
  }
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
</style>
