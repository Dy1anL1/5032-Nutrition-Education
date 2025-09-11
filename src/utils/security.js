// Security utilities for XSS protection and input validation

// XSS Protection: HTML sanitization
export const sanitizeHtml = (input) => {
  if (typeof input !== 'string') return input
  
  // Create a temporary div element to leverage browser's built-in HTML parsing
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}

// XSS Protection: Remove dangerous characters and script tags
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
    .trim()
}

// Email validation with security considerations
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email is required' }
  }
  
  // Basic length check to prevent DoS
  if (email.length > 254) {
    return { isValid: false, error: 'Email is too long' }
  }
  
  // RFC 5322 compliant regex (simplified)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }
  
  return { isValid: true }
}

// Password validation with security requirements
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, error: 'Password is required' }
  }
  
  const minLength = 8
  const maxLength = 128 // Prevent DoS attacks
  
  if (password.length < minLength) {
    return { isValid: false, error: `Password must be at least ${minLength} characters long` }
  }
  
  if (password.length > maxLength) {
    return { isValid: false, error: `Password must be no more than ${maxLength} characters long` }
  }
  
  // Check for required character types
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
  
  if (!hasUppercase) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' }
  }
  
  if (!hasLowercase) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' }
  }
  
  if (!hasNumber) {
    return { isValid: false, error: 'Password must contain at least one number' }
  }
  
  if (!hasSpecialChar) {
    return { isValid: false, error: 'Password must contain at least one special character' }
  }
  
  // Check for common weak patterns
  const commonPatterns = [
    /(.)\1{2,}/, // Three or more repeated characters
    /123456/, // Sequential numbers
    /abcdef/, // Sequential letters
    /password/i, // Contains "password"
    /qwerty/i, // Contains "qwerty"
  ]
  
  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      return { isValid: false, error: 'Password contains common patterns. Please choose a stronger password' }
    }
  }
  
  return { isValid: true }
}

// Name validation
export const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'Name is required' }
  }
  
  const trimmedName = name.trim()
  
  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' }
  }
  
  if (trimmedName.length > 50) {
    return { isValid: false, error: 'Name must be no more than 50 characters long' }
  }
  
  // Allow letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s'-]+$/
  
  if (!nameRegex.test(trimmedName)) {
    return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' }
  }
  
  return { isValid: true, value: trimmedName }
}

// Generic text input validation to prevent XSS
export const validateTextInput = (input, maxLength = 1000) => {
  if (!input || typeof input !== 'string') {
    return { isValid: false, error: 'Input is required' }
  }
  
  const trimmedInput = input.trim()
  
  if (trimmedInput.length === 0) {
    return { isValid: false, error: 'Input cannot be empty' }
  }
  
  if (trimmedInput.length > maxLength) {
    return { isValid: false, error: `Input must be no more than ${maxLength} characters long` }
  }
  
  // Sanitize input
  const sanitizedInput = sanitizeInput(trimmedInput)
  
  return { isValid: true, value: sanitizedInput }
}

// Rate limiting helper (client-side)
export const createRateLimiter = (maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  const attempts = new Map()
  
  return {
    checkLimit: (identifier) => {
      const now = Date.now()
      const userAttempts = attempts.get(identifier) || []
      
      // Remove attempts outside the time window
      const recentAttempts = userAttempts.filter(time => now - time < windowMs)
      
      if (recentAttempts.length >= maxAttempts) {
        return { 
          allowed: false, 
          error: `Too many attempts. Please try again in ${Math.ceil(windowMs / 60000)} minutes.` 
        }
      }
      
      // Add current attempt
      recentAttempts.push(now)
      attempts.set(identifier, recentAttempts)
      
      return { allowed: true }
    },
    
    reset: (identifier) => {
      attempts.delete(identifier)
    }
  }
}

// CSRF protection helper for forms
export const generateCSRFToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}