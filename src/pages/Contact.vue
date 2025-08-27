<template>
  <SectionTitle title="Contact" subtitle="Send us a message" />
  <form @submit.prevent="onSubmit" class="grid" style="max-width: 520px">
    <label>Name</label>
    <input v-model.trim="name" class="input" />
    <label>Email</label>
    <input v-model.trim="email" class="input" type="email" />
    <label>Message</label>
    <textarea v-model.trim="msg" rows="4"></textarea>

    <button class="btn primary">Send</button>
    <p class="toast-ok" v-if="ok">Message sent (mock).</p>
    <p class="form-errors" v-if="err">{{ err }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import SectionTitle from '../components/SectionTitle.vue'
const name = ref(''),
  email = ref(''),
  msg = ref('')
const ok = ref(false),
  err = ref('')
function onSubmit() {
  ok.value = false
  err.value = ''
  const emailOk = /^\S+@\S+\.\S+$/.test(email.value)
  if (!name.value || !emailOk || msg.value.length < 10) {
    err.value = 'Please complete all fields (message >= 10 characters) with a valid email.'
    return
  }
  ok.value = true
}
</script>
