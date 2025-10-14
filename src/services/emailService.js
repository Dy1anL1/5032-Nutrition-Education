import { getFunctions, httpsCallable } from 'firebase/functions'
import app from '../firebase'

const functions = getFunctions(app)

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
