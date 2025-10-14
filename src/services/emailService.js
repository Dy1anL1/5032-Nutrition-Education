import { getFunctions, httpsCallable } from 'firebase/functions'
import app from '../firebase'

const functions = getFunctions(app)

/**
 * Send a single email with optional attachment
 * @param {Object} emailData - Email data
 * @param {string} emailData.to - Recipient email
 * @param {string} emailData.subject - Email subject
 * @param {string} emailData.text - Plain text content
 * @param {string} emailData.html - HTML content
 * @param {string} emailData.attachmentBase64 - Base64 encoded attachment (optional)
 * @param {string} emailData.attachmentFilename - Attachment filename (optional)
 * @param {string} emailData.attachmentType - MIME type (optional, default: application/pdf)
 * @returns {Promise<Object>} Result object
 */
export async function sendEmail(emailData) {
  try {
    const sendEmailFunction = httpsCallable(functions, 'sendEmail')
    const result = await sendEmailFunction(emailData)
    return result.data
  } catch (error) {
    console.error('Error calling sendEmail function:', error)
    throw new Error(error.message || 'Failed to send email')
  }
}

/**
 * Send bulk emails to multiple recipients (admin only)
 * @param {Object} bulkData - Bulk email data
 * @param {string[]} bulkData.recipients - Array of recipient emails
 * @param {string} bulkData.subject - Email subject
 * @param {string} bulkData.text - Plain text content
 * @param {string} bulkData.html - HTML content
 * @returns {Promise<Object>} Result object
 */
export async function sendBulkEmail(bulkData) {
  try {
    const sendBulkEmailFunction = httpsCallable(functions, 'sendBulkEmail')
    const result = await sendBulkEmailFunction(bulkData)
    return result.data
  } catch (error) {
    console.error('Error calling sendBulkEmail function:', error)
    throw new Error(error.message || 'Failed to send bulk email')
  }
}

/**
 * Send contact form email
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - Sender name
 * @param {string} contactData.email - Sender email
 * @param {string} contactData.message - Message content
 * @returns {Promise<Object>} Result object
 */
export async function sendContactEmail(contactData) {
  try {
    const sendContactEmailFunction = httpsCallable(functions, 'sendContactEmail')
    const result = await sendContactEmailFunction(contactData)
    return result.data
  } catch (error) {
    console.error('Error calling sendContactEmail function:', error)
    throw new Error(error.message || 'Failed to send contact email')
  }
}
