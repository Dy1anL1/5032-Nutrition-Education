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

    <button class="btn primary" :disabled="loading">
      {{ loading ? 'Sending...' : 'Send' }}
    </button>
    <p class="toast-ok" v-if="ok">Message sent successfully! Check your email for confirmation.</p>
    <p class="form-errors" v-if="err">{{ err }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { sendContactEmail } from '../services/emailService'

const name = ref('')
const email = ref('')
const msg = ref('')
const ok = ref(false)
const err = ref('')
const loading = ref(false)

async function onSubmit() {
  ok.value = false
  err.value = ''
  loading.value = true

  // Client-side validation
  const emailOk = /^\S+@\S+\.\S+$/.test(email.value)
  if (!name.value || !emailOk || msg.value.length < 10) {
    err.value = 'Please complete all fields (message >= 10 characters) with a valid email.'
    loading.value = false
    return
  }

  try {
    // Send email via Cloud Function
    await sendContactEmail({
      name: name.value,
      email: email.value,
      message: msg.value
    })

    ok.value = true
    // Clear form
    name.value = ''
    email.value = ''
    msg.value = ''

    // Hide success message after 5 seconds
    setTimeout(() => {
      ok.value = false
    }, 5000)
  } catch (error) {
    console.error('Contact form error:', error)
    err.value = 'Failed to send message. Please try again later.'
  } finally {
    loading.value = false
  }
}
</script>
