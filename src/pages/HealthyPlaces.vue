<template>
  <div class="healthy-places">
    <div class="page-header">
      <h1>Healthy Places Finder</h1>
      <p>Find healthy restaurants, gyms, and organic stores near you</p>
    </div>

    <!-- Category Filters -->
    <div class="filters">
      <button
        :class="['filter-btn', { active: selectedCategory === 'restaurant' }]"
        @click="selectCategory('restaurant')"
      >
        🍽️ Healthy Restaurants
      </button>
      <button
        :class="['filter-btn', { active: selectedCategory === 'gym' }]"
        @click="selectCategory('gym')"
      >
        💪 Gyms & Fitness
      </button>
      <button
        :class="['filter-btn', { active: selectedCategory === 'supermarket' }]"
        @click="selectCategory('supermarket')"
      >
        🛒 Supermarkets & Organic Stores
      </button>
    </div>

    <!-- Search -->
    <div class="search-section">
      <input
        v-model="searchAddress"
        type="text"
        placeholder="Enter your address (e.g., Clayton VIC 3800)"
        class="search-input"
      />
      <button @click="searchPlaces" class="search-btn" :disabled="loading">
        {{ loading ? 'Searching...' : 'Search' }}
      </button>
      <button @click="useCurrentLocation" class="location-btn" :disabled="loading">
        📍 Use My Location
      </button>
    </div>

    <!-- Map Container -->
    <div class="map-container">
      <div id="map" ref="mapElement"></div>

      <!-- Loading Overlay -->
      <div v-if="loading" class="loading-overlay">
        <div class="loading-spinner"></div>
        <p class="loading-text">{{ loadingMessage }}</p>
      </div>
    </div>

    <!-- Results -->
    <div v-if="places.length > 0" class="results">
      <h2>Found {{ places.length }} places nearby</h2>
      <div class="places-grid">
        <div
          v-for="(place, index) in places"
          :key="index"
          class="place-card"
          @click="showPlaceDetails(place)"
        >
          <div class="place-icon">{{ getCategoryIcon(place.category) }}</div>
          <div class="place-info">
            <h3>{{ place.name }}</h3>
            <p class="place-address">{{ place.address }}</p>
            <p class="place-distance">{{ place.distance }} km away</p>
            <button @click.stop="showRoute(place)" class="route-btn">
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-else-if="searched && !loading" class="no-results">
      <p>No {{ getCategoryName() }} found nearby. Try a different location or category.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapElement = ref(null)
let map = null
let markers = []
let routePolyline = null

const searchAddress = ref('Clayton VIC 3800')
const selectedCategory = ref('restaurant')
const places = ref([])
const loading = ref(false)
const searched = ref(false)
const userLocation = ref(null)
const loadingMessage = ref('Searching...')

// Category configurations
const categories = {
  restaurant: {
    name: 'Healthy Restaurants',
    icon: '🍽️',
    color: '#f97316', // orange
    amenityTypes: ['restaurant', 'cafe', 'fast_food'],
    leisureTypes: [],
    shopTypes: [],
    keywords: ['healthy', 'organic', 'vegan', 'vegetarian', 'salad']
  },
  gym: {
    name: 'Gyms & Fitness Centers',
    icon: '💪',
    color: '#8b5cf6', // purple
    amenityTypes: ['gym', 'fitness_centre', 'sports_centre', 'fitness_center', 'sports_center'],
    leisureTypes: ['fitness_centre', 'sports_centre', 'fitness_station', 'sports_center', 'fitness_center'],
    shopTypes: ['sports'],
    keywords: ['gym', 'fitness', 'yoga', 'pilates']
  },
  supermarket: {
    name: 'Supermarkets & Organic Stores',
    icon: '🛒',
    color: '#22c55e', // green
    amenityTypes: ['marketplace'],
    leisureTypes: [],
    shopTypes: ['supermarket', 'convenience', 'greengrocer', 'organic'],
    keywords: ['coles', 'woolworths', 'aldi', 'iga', 'organic']
  }
}

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})

function initMap() {
  // Initialize map centered on Clayton, Monash University
  map = L.map(mapElement.value).setView([-37.9105, 145.1362], 13)

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map)

  // Add a marker for default location
  const defaultMarker = L.marker([-37.9105, 145.1362])
    .addTo(map)
    .bindPopup('Monash University Clayton Campus')
}

function selectCategory(category) {
  selectedCategory.value = category
  if (searched.value) {
    searchPlaces()
  }
}

async function searchPlaces() {
  loading.value = true
  searched.value = true
  clearMarkers()

  try {
    // Geocode the address
    loadingMessage.value = 'Finding your location...'
    const location = await geocodeAddress(searchAddress.value)
    userLocation.value = location

    // Center map on the location
    map.setView([location.lat, location.lng], 14)

    // Add user location marker
    L.marker([location.lat, location.lng], {
      icon: L.divIcon({
        className: 'user-marker',
        html: '📍',
        iconSize: [30, 30]
      })
    }).addTo(map).bindPopup('Your Location')

    // Search for places using Overpass API (OpenStreetMap)
    loadingMessage.value = `Searching for nearby ${getCategoryName().toLowerCase()}...`
    const foundPlaces = await searchNearbyPlaces(location, selectedCategory.value)
    places.value = foundPlaces

    // Add markers for each place
    foundPlaces.forEach(place => {
      const categoryIcon = categories[place.category]?.icon || '📍'
      const categoryColor = categories[place.category]?.color || '#3b82f6'

      const marker = L.marker([place.lat, place.lng], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: `<div class="marker-pin" style="background-color: ${categoryColor}">${categoryIcon}</div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 40]
        })
      })
        .addTo(map)
        .bindPopup(`
          <div class="popup-content">
            <h3>${categoryIcon} ${place.name}</h3>
            <p>${place.address}</p>
            <p><strong>${place.distance} km away</strong></p>
          </div>
        `)
      markers.push(marker)
    })

  } catch (error) {
    console.error('Error searching places:', error)
    alert('Error searching for places. Please try again.')
  } finally {
    loading.value = false
  }
}

async function useCurrentLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser')
    return
  }

  loading.value = true
  loadingMessage.value = 'Getting your current location...'

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      // Reverse geocode to get address
      loadingMessage.value = 'Finding your address...'
      const address = await reverseGeocode(location)
      searchAddress.value = address
      userLocation.value = location

      await searchPlaces()
    },
    (error) => {
      console.error('Error getting location:', error)
      alert('Could not get your location. Please enter an address manually.')
      loading.value = false
    }
  )
}

async function geocodeAddress(address) {
  try {
    // Use Nominatim (OpenStreetMap) for geocoding
    // Add delay to respect rate limiting (max 1 request per second)
    await new Promise(resolve => setTimeout(resolve, 1000))

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          'User-Agent': 'NutritionEducationApp/1.0'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.status}`)
    }

    const data = await response.json()
    console.log('Geocoding result:', data)

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      }
    } else {
      throw new Error(`Could not find location: "${address}". Try "Clayton VIC 3800, Australia"`)
    }
  } catch (error) {
    console.error('Geocoding error:', error)
    throw error
  }
}

async function reverseGeocode(location) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`,
      {
        headers: {
          'User-Agent': 'NutritionEducationApp/1.0'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Reverse geocoding failed: ${response.status}`)
    }

    const data = await response.json()
    return data.display_name || 'Unknown location'
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    return 'Unknown location'
  }
}

async function searchNearbyPlaces(location, category) {
  // Use Overpass API to search for places
  const radius = 5000 // 5 km
  const categoryConfig = categories[category]

  // Build Overpass query - search both nodes AND ways
  const amenityNodeQueries = categoryConfig.amenityTypes.map(type =>
    `node["amenity"="${type}"](around:${radius},${location.lat},${location.lng});`
  ).join('')

  const amenityWayQueries = categoryConfig.amenityTypes.map(type =>
    `way["amenity"="${type}"](around:${radius},${location.lat},${location.lng});`
  ).join('')

  const leisureNodeQueries = categoryConfig.leisureTypes.map(type =>
    `node["leisure"="${type}"](around:${radius},${location.lat},${location.lng});`
  ).join('')

  const leisureWayQueries = categoryConfig.leisureTypes.map(type =>
    `way["leisure"="${type}"](around:${radius},${location.lat},${location.lng});`
  ).join('')

  const shopNodeQueries = categoryConfig.shopTypes.map(type =>
    `node["shop"="${type}"](around:${radius},${location.lat},${location.lng});`
  ).join('')

  const shopWayQueries = categoryConfig.shopTypes.map(type =>
    `way["shop"="${type}"](around:${radius},${location.lat},${location.lng});`
  ).join('')

  const query = `
    [out:json][timeout:25];
    (
      ${amenityNodeQueries}
      ${amenityWayQueries}
      ${leisureNodeQueries}
      ${leisureWayQueries}
      ${shopNodeQueries}
      ${shopWayQueries}
    );
    out center body;
  `

  console.log('Overpass query:', query)

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query
    })

    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Overpass API response:', data)

    if (!data.elements || data.elements.length === 0) {
      console.warn('No results from Overpass API')
      return []
    }

    // Process results
    const results = data.elements
      .filter(element => element.tags && element.tags.name)
      .map(element => {
        // For ways, use center coordinates
        const lat = element.lat || element.center?.lat
        const lon = element.lon || element.center?.lon

        if (!lat || !lon) {
          console.warn('Missing coordinates for element:', element)
          return null
        }

        const distance = calculateDistance(
          location.lat, location.lng,
          lat, lon
        )

        return {
          name: element.tags.name,
          lat: lat,
          lng: lon,
          address: formatAddress(element.tags),
          category: category,
          distance: distance.toFixed(2),
          tags: element.tags
        }
      })
      .filter(result => result !== null) // Remove invalid results
      .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
      .slice(0, 20) // Limit to 20 results

    console.log(`Found ${results.length} places for category: ${category}`)
    return results
  } catch (error) {
    console.error('Error fetching from Overpass API:', error)
    throw new Error(`Failed to search for places: ${error.message}`)
  }
}

function formatAddress(tags) {
  const parts = []
  if (tags['addr:street']) parts.push(tags['addr:street'])
  if (tags['addr:suburb']) parts.push(tags['addr:suburb'])
  if (tags['addr:postcode']) parts.push(tags['addr:postcode'])

  return parts.length > 0 ? parts.join(', ') : 'Address not available'
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  // Haversine formula
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

function showRoute(place) {
  if (!userLocation.value) {
    alert('Please search for a location first')
    return
  }

  // Clear existing route
  if (routePolyline) {
    map.removeLayer(routePolyline)
  }

  // Draw a simple straight line (for demonstration)
  // In production, you'd use a routing API like OSRM
  routePolyline = L.polyline([
    [userLocation.value.lat, userLocation.value.lng],
    [place.lat, place.lng]
  ], {
    color: '#22c55e',
    weight: 4,
    opacity: 0.7
  }).addTo(map)

  // Fit map to show both points
  map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] })

  // Show popup with route info
  const popup = L.popup()
    .setLatLng([place.lat, place.lng])
    .setContent(`
      <div class="popup-content">
        <h3>Route to ${place.name}</h3>
        <p>Distance: ${place.distance} km</p>
        <p><a href="https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}" target="_blank">Open in Google Maps</a></p>
      </div>
    `)
    .openOn(map)
}

function showPlaceDetails(place) {
  map.setView([place.lat, place.lng], 16)

  // Find and open the marker popup
  markers.forEach(marker => {
    const markerPos = marker.getLatLng()
    if (markerPos.lat === place.lat && markerPos.lng === place.lng) {
      marker.openPopup()
    }
  })
}

function clearMarkers() {
  markers.forEach(marker => map.removeLayer(marker))
  markers = []
  if (routePolyline) {
    map.removeLayer(routePolyline)
    routePolyline = null
  }
}

function getCategoryIcon(category) {
  return categories[category]?.icon || '📍'
}

function getCategoryName() {
  return categories[selectedCategory.value]?.name || 'places'
}
</script>

<style scoped>
.healthy-places {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 12px;
}

.page-header p {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
}

.filters {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 12px 24px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: #22c55e;
  background: #f0fdf4;
}

.filter-btn.active {
  border-color: #22c55e;
  background: #22c55e;
  color: white;
}

.search-section {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 300px;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
}

.search-btn,
.location-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.search-btn {
  background: #22c55e;
  color: white;
}

.search-btn:hover:not(:disabled) {
  background: #16a34a;
}

.location-btn {
  background: #3b82f6;
  color: white;
}

.location-btn:hover:not(:disabled) {
  background: #2563eb;
}

.search-btn:disabled,
.location-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.map-container {
  position: relative;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
}

#map {
  height: 100%;
  width: 100%;
}

/* Loading Overlay */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #e5e7eb;
  border-top-color: #22c55e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.results {
  margin-top: 32px;
}

.results h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 16px;
}

.places-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.place-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.place-card:hover {
  border-color: #22c55e;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.place-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.place-info {
  flex: 1;
}

.place-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 8px;
}

.place-address {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0 0 4px;
}

.place-distance {
  font-size: 0.9rem;
  color: #22c55e;
  font-weight: 600;
  margin: 0 0 12px;
}

.route-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #22c55e;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.route-btn:hover {
  background: #16a34a;
}

.no-results {
  text-align: center;
  padding: 48px;
  color: #6b7280;
  font-size: 1.1rem;
}

/* Map popup styles */
:deep(.popup-content) {
  min-width: 200px;
}

:deep(.popup-content h3) {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 8px;
}

:deep(.popup-content p) {
  font-size: 0.9rem;
  margin: 4px 0;
}

:deep(.user-marker) {
  background: transparent;
  border: none;
  font-size: 24px;
}

/* Custom marker styles */
:deep(.custom-marker) {
  background: transparent;
  border: none;
}

:deep(.marker-pin) {
  width: 40px;
  height: 40px;
  border-radius: 50% 50% 50% 0;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 2px solid white;
}

:deep(.marker-pin::after) {
  content: '';
  width: 8px;
  height: 8px;
  margin: 0 0 0 0;
  background: white;
  position: absolute;
  border-radius: 50%;
  transform: rotate(45deg);
}

@media (max-width: 768px) {
  .search-section {
    flex-direction: column;
  }

  .search-input {
    min-width: 100%;
  }

  .places-grid {
    grid-template-columns: 1fr;
  }
}
</style>
