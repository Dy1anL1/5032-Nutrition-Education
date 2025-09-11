<!--
  Contact page
  - Small contact form used as a mock for demo purposes.
  - Basic client-side validation: name required, valid email, and message length >= 10.
  - Replace with server-side submission when integrating a backend.
-->
<template>
  <section class="title-bar">
    <div class="title-inner">
      <h1 class="title">Contact Us</h1>
      <p class="subtitle">Send us a message - we'll get back to you.</p>
    </div>
  </section>

  <form @submit.prevent="onSubmit" class="grid" style="max-width: 520px">
    <label>Name</label>
    <input v-model.trim="name" class="input" />
    <label>Email</label>
    <input v-model.trim="email" class="input" type="email" />
    <label>Message</label>
    <textarea v-model.trim="msg" rows="4"></textarea>

    <button class="btn primary">Send</button>
    <p class="toast-ok" v-if="ok">Message sent.</p>
    <p class="form-errors" v-if="err">{{ err }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const name = ref(''),
  email = ref(''),
  msg = ref('')
const ok = ref(false),
  err = ref('')

// Simple submit handler with basic validation. Keep this client-side check as
// a UX convenience; submissions should be posted to a server endpoint in real apps.
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
