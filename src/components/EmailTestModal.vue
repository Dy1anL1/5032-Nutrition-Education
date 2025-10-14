<template>
  <div v-if="show" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Send Test Email with Attachment</h2>
        <button @click="closeModal" class="close-btn">&times;</button>
      </div>

      <form @submit.prevent="sendTestEmail" class="modal-body">
        <div class="form-group">
          <label>To Email:</label>
          <input
            v-model="emailData.to"
            type="email"
            required
            placeholder="recipient@example.com"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label>Subject:</label>
          <input
            v-model="emailData.subject"
            type="text"
            required
            placeholder="Email subject"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label>Message:</label>
          <textarea
            v-model="emailData.message"
            rows="4"
            required
            placeholder="Email message content"
            class="form-input"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Attachment (PDF):</label>
          <input
            type="file"
            accept=".pdf"
            @change="handleFileUpload"
            class="form-input"
          />
          <small v-if="fileName">Selected: {{ fileName }}</small>
        </div>

        <div class="modal-footer">
          <button type="button" @click="closeModal" class="btn-secondary">
            Cancel
          </button>
          <button type="submit" :disabled="loading" class="btn-primary">
            {{ loading ? 'Sending...' : 'Send Email' }}
          </button>
        </div>

        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { sendEmail } from '../services/emailService'

const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['close'])

const emailData = ref({
  to: '',
  subject: 'Test Email with Attachment',
  message: 'This is a test email with a PDF attachment.',
})

const fileName = ref('')
const fileBase64 = ref('')
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

function closeModal() {
  emit('close')
  // Reset form
  setTimeout(() => {
    emailData.value = {
      to: '',
      subject: 'Test Email with Attachment',
      message: 'This is a test email with a PDF attachment.',
    }
    fileName.value = ''
    fileBase64.value = ''
    successMessage.value = ''
    errorMessage.value = ''
  }, 300)
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    fileName.value = file.name

    // Convert file to base64
    const reader = new FileReader()
    reader.onload = (e) => {
      // Remove the data:application/pdf;base64, prefix
      fileBase64.value = e.target.result.split(',')[1]
    }
    reader.readAsDataURL(file)
  }
}

async function sendTestEmail() {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const payload = {
      to: emailData.value.to,
      subject: emailData.value.subject,
      text: emailData.value.message,
      html: `<p>${emailData.value.message}</p>`,
    }

    // Add attachment if file was selected
    if (fileBase64.value && fileName.value) {
      payload.attachmentBase64 = fileBase64.value
      payload.attachmentFilename = fileName.value
      payload.attachmentType = 'application/pdf'
    }

    await sendEmail(payload)

    successMessage.value = 'Email sent successfully!'
    setTimeout(() => {
      closeModal()
    }, 2000)
  } catch (error) {
    console.error('Error sending test email:', error)
    errorMessage.value = error.message || 'Failed to send email'
  } finally {
    loading.value = false
  }
}

// Clear messages when modal opens
watch(() => props.show, (newVal) => {
  if (newVal) {
    successMessage.value = ''
    errorMessage.value = ''
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #1a202c;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #1a202c;
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

.form-group small {
  display: block;
  margin-top: 4px;
  color: #6b7280;
  font-size: 12px;
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn-primary {
  background: #22c55e;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #16a34a;
}

.btn-primary:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.success-message {
  margin-top: 16px;
  padding: 12px;
  background: #d1fae5;
  color: #065f46;
  border-radius: 6px;
  font-size: 14px;
}

.error-message {
  margin-top: 16px;
  padding: 12px;
  background: #fee2e2;
  color: #991b1b;
  border-radius: 6px;
  font-size: 14px;
}
</style>
