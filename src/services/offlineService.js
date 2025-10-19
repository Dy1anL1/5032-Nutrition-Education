/**
 * Offline Service - Handles offline detection and data caching
 */

const CACHE_VERSION = 'v1'
const CACHE_KEYS = {
  RECIPES: `recipes_${CACHE_VERSION}`,
  USER_DATA: `user_data_${CACHE_VERSION}`,
  MEAL_PLANS: `meal_plans_${CACHE_VERSION}`
}

/**
 * Check if the browser is online
 */
export function isOnline() {
  return navigator.onLine
}

/**
 * Save data to localStorage with expiry
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 * @param {number} expiryHours - Hours until cache expires (default: 24)
 */
export function saveToCache(key, data, expiryHours = 24) {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + (expiryHours * 60 * 60 * 1000)
    }
    localStorage.setItem(key, JSON.stringify(cacheData))
    console.log(`[Offline] Data cached: ${key}`)
    return true
  } catch (error) {
    console.error('[Offline] Failed to cache data:', error)
    return false
  }
}

/**
 * Load data from localStorage
 * @param {string} key - Cache key
 * @returns {any} Cached data or null if not found/expired
 */
export function loadFromCache(key) {
  try {
    const cached = localStorage.getItem(key)
    if (!cached) {
      return null
    }

    const cacheData = JSON.parse(cached)

    // Check if cache has expired
    if (Date.now() > cacheData.expiry) {
      console.log(`[Offline] Cache expired: ${key}`)
      localStorage.removeItem(key)
      return null
    }

    console.log(`[Offline] Data loaded from cache: ${key}`)
    return cacheData.data
  } catch (error) {
    console.error('[Offline] Failed to load cached data:', error)
    return null
  }
}

/**
 * Clear specific cache or all caches
 * @param {string} key - Optional cache key, clears all if not provided
 */
export function clearCache(key = null) {
  try {
    if (key) {
      localStorage.removeItem(key)
      console.log(`[Offline] Cache cleared: ${key}`)
    } else {
      // Clear all app caches
      Object.values(CACHE_KEYS).forEach(cacheKey => {
        localStorage.removeItem(cacheKey)
      })
      console.log('[Offline] All caches cleared')
    }
    return true
  } catch (error) {
    console.error('[Offline] Failed to clear cache:', error)
    return false
  }
}

/**
 * Get cache info (size, age, etc.)
 * @param {string} key - Cache key
 */
export function getCacheInfo(key) {
  try {
    const cached = localStorage.getItem(key)
    if (!cached) {
      return null
    }

    const cacheData = JSON.parse(cached)
    const ageInMinutes = Math.floor((Date.now() - cacheData.timestamp) / (1000 * 60))
    const expiresInMinutes = Math.floor((cacheData.expiry - Date.now()) / (1000 * 60))

    return {
      key,
      size: new Blob([cached]).size,
      ageMinutes: ageInMinutes,
      expiresInMinutes: expiresInMinutes,
      isExpired: Date.now() > cacheData.expiry
    }
  } catch (error) {
    console.error('[Offline] Failed to get cache info:', error)
    return null
  }
}

/**
 * Listen for online/offline events
 * @param {Function} onOnline - Callback when going online
 * @param {Function} onOffline - Callback when going offline
 */
export function listenToNetworkStatus(onOnline, onOffline) {
  const handleOnline = () => {
    console.log('[Offline] Network: ONLINE')
    if (onOnline) onOnline()
  }

  const handleOffline = () => {
    console.log('[Offline] Network: OFFLINE')
    if (onOffline) onOffline()
  }

  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}

export { CACHE_KEYS }
