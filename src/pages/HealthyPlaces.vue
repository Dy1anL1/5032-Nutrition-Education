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

// Category configurations
const categories = {
  restaurant: {
    name: 'Healthy Restaurants',
    icon: '🍽️',
    types: ['restaurant', 'cafe', 'fast_food'],
    keywords: ['healthy', 'organic', 'vegan', 'vegetarian', 'salad']
  },
  gym: {
    name: 'Gyms & Fitness Centers',
    icon: '💪',
    types: ['gym', 'fitness_centre', 'sports_centre'],
    keywords: ['gym', 'fitness', 'yoga', 'pilates']
  },
  supermarket: {
    name: 'Supermarkets & Organic Stores',
    icon: '🛒',
    types: ['supermarket', 'grocery', 'greengrocer'],
    keywords: ['organic', 'health food', 'whole foods', 'fresh']
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
    const foundPlaces = await searchNearbyPlaces(location, selectedCategory.value)
    places.value = foundPlaces

    // Add markers for each place
    foundPlaces.forEach(place => {
      const marker = L.marker([place.lat, place.lng])
        .addTo(map)
        .bindPopup(`
          <div class="popup-content">
            <h3>${place.name}</h3>
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

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      // Reverse geocode to get address
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
  // Use Nominatim (OpenStreetMap) for geocoding
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  )
  const data = await response.json()

  if (data && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    }
  } else {
    throw new Error('Address not found')
  }
}

async function reverseGeocode(location) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`
  )
  const data = await response.json()
  return data.display_name || 'Unknown location'
}

async function searchNearbyPlaces(location, category) {
  // Use Overpass API to search for places
  const radius = 5000 // 5 km
  const categoryConfig = categories[category]

  // Build Overpass query
  const types = categoryConfig.types.map(type => `node["amenity"="${type}"](around:${radius},${location.lat},${location.lng});`).join('')

  const query = `
    [out:json];
    (
      ${types}
    );
    out body;
  `

  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query
  })

  const data = await response.json()

  // Process results
  const results = data.elements
    .filter(element => element.tags && element.tags.name)
    .map(element => {
      const distance = calculateDistance(
        location.lat, location.lng,
        element.lat, element.lon
      )

      return {
        name: element.tags.name,
        lat: element.lat,
        lng: element.lon,
        address: formatAddress(element.tags),
        category: category,
        distance: distance.toFixed(2),
        tags: element.tags
      }
    })
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    .slice(0, 20) // Limit to 20 results

  return results
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
