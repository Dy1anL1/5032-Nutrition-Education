<template>
  <div v-if="show" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Send Bulk Email</h2>
        <button @click="closeModal" class="close-btn" aria-label="Close modal">&times;</button>
      </div>

      <form @submit.prevent="sendBulkEmail" class="modal-body">
        <div class="recipients-info">
          <p><strong>Recipients:</strong> {{ recipients.length }} user(s)</p>
          <div class="recipient-list">
            <span v-for="(email, index) in recipients" :key="index" class="recipient-tag">
              {{ email }}
            </span>
          </div>
        </div>

        <div class="form-group">
          <label for="bulk-subject">Subject:</label>
          <input
            id="bulk-subject"
            v-model="emailData.subject"
            type="text"
            required
            placeholder="Email subject"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="bulk-message">Message:</label>
          <textarea
            id="bulk-message"
            v-model="emailData.message"
            rows="6"
            required
            placeholder="Email message content"
            class="form-input"
          ></textarea>
        </div>

        <div v-if="successMessage" class="success-message" role="alert">
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="error-message" role="alert">
          {{ errorMessage }}
        </div>

        <div v-if="loading" class="progress-info">
          <p>Sending emails... {{ progress.sent }} / {{ progress.total }}</p>
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: (progress.sent / progress.total * 100) + '%' }"
            ></div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" @click="closeModal" class="btn-secondary" :disabled="loading">
            Cancel
          </button>
          <button type="submit" class="btn-primary" :disabled="loading || recipients.length === 0">
            {{ loading ? 'Sending...' : 'Send to All' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { sendBulkEmail as sendBulkEmailService } from '../services/emailService'

const props = defineProps({
  show: Boolean,
  recipients: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close'])

const emailData = reactive({
  subject: '',
  message: ''
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const progress = reactive({
  sent: 0,
  total: 0
})

function closeModal() {
  emit('close')
}

async function sendBulkEmail() {
  if (props.recipients.length === 0) {
    errorMessage.value = 'No recipients selected'
    return
  }

  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''
  progress.sent = 0
  progress.total = props.recipients.length

  try {
    const payload = {
      recipients: props.recipients,
      subject: emailData.subject,
      text: emailData.message,
      html: `<p>${emailData.message}</p>`
    }

    // Send emails with progress tracking
    let successCount = 0
    let failedCount = 0
    const errors = []

    for (let i = 0; i < props.recipients.length; i++) {
      try {
        await sendBulkEmailService({
          recipients: [props.recipients[i]],
          subject: payload.subject,
          text: payload.text,
          html: payload.html
        })
        successCount++
      } catch (error) {
        failedCount++
        errors.push({ email: props.recipients[i], error: error.message })
      }
      progress.sent = i + 1
    }

    if (failedCount === 0) {
      successMessage.value = `Successfully sent ${successCount} email(s)!`
    } else {
      successMessage.value = `Sent ${successCount} email(s). ${failedCount} failed.`
      if (errors.length > 0) {
        errorMessage.value = `Failed recipients: ${errors.map(e => e.email).join(', ')}`
      }
    }

    setTimeout(() => {
      if (failedCount === 0) {
        closeModal()
      }
    }, 3000)
  } catch (error) {
    console.error('Error sending bulk emails:', error)
    errorMessage.value = error.message || 'Failed to send bulk emails'
  } finally {
    loading.value = false
  }
}

// Clear form when modal opens
watch(() => props.show, (newVal) => {
  if (newVal) {
    emailData.subject = ''
    emailData.message = ''
    successMessage.value = ''
    errorMessage.value = ''
    progress.sent = 0
    progress.total = 0
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
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
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
  cursor: pointer;
  color: #6b7280;
  line-height: 1;
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
  color: #1f2937;
}

.modal-body {
  padding: 24px;
}

.recipients-info {
  margin-bottom: 20px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.recipients-info p {
  margin: 0 0 12px 0;
  color: #374151;
}

.recipient-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 120px;
  overflow-y: auto;
}

.recipient-tag {
  display: inline-block;
  padding: 4px 12px;
  background: #3b82f6;
  color: white;
  border-radius: 16px;
  font-size: 0.875rem;
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
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

textarea.form-input {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}

.progress-info {
  margin: 20px 0;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
}

.progress-info p {
  margin: 0 0 12px 0;
  font-weight: 600;
  color: #374151;
}

.progress-bar {
  width: 100%;
  height: 24px;
  background: #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  transition: width 0.3s ease;
}

.success-message {
  padding: 12px 16px;
  background: #d1fae5;
  border: 1px solid #6ee7b7;
  border-radius: 6px;
  color: #065f46;
  margin-bottom: 16px;
}

.error-message {
  padding: 12px 16px;
  background: #fee2e2;
  border: 1px solid #fca5a5;
  border-radius: 6px;
  color: #991b1b;
  margin-bottom: 16px;
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-size: 1rem;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover:not(:disabled) {
  background: #f3f4f6;
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
