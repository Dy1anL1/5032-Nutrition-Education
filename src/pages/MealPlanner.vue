<template>
  <section class="title-bar">
    <div class="title-inner">
      <h1 class="title">Meal Planner</h1>
      <p class="subtitle">Plan your weekly meals and generate shopping lists</p>
    </div>
  </section>

  <div class="meal-planner-wrapper">
    <div class="meal-planner-container">
      <!-- Weekly Calendar View -->
      <div class="planner-section">
        <div class="week-navigation">
          <button @click="previousWeek" class="nav-btn">&lt;</button>
          <h2>{{ weekDisplay }}</h2>
          <button @click="nextWeek" class="nav-btn">&gt;</button>
        </div>

        <div class="meal-grid">
          <div class="meal-grid-header">
            <div class="time-slot"></div>
            <div v-for="day in weekdays" :key="day" class="day-header">{{ day }}</div>
          </div>

          <div v-for="meal in meals" :key="meal" class="meal-row">
            <div class="meal-label">{{ meal }}</div>
            <div
              v-for="day in weekdays"
              :key="`${day}-${meal}`"
              class="meal-slot"
              @click="openRecipeSelector(day, meal)"
              :class="{ 'has-recipe': getMealForDay(day, meal) }"
            >
              <div v-if="getMealForDay(day, meal)" class="assigned-meal">
                <img
                  :src="getMealForDay(day, meal).image"
                  :alt="getMealForDay(day, meal).title"
                  class="meal-image"
                />
                <div class="meal-info">
                  <h4>{{ getMealForDay(day, meal).title }}</h4>
                  <span class="meal-calories"
                    >{{ getMealForDay(day, meal).nutrition.kcal }} kcal</span
                  >
                </div>
                <button @click.stop="removeMeal(day, meal)" class="remove-btn">×</button>
              </div>
              <div v-else class="empty-slot">
                <span>+ Add meal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recipe Selection Modal -->
      <div v-if="showRecipeSelector" class="modal-overlay" @click="closeRecipeSelector">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Choose a Recipe for {{ selectedDay }} {{ selectedMeal }}</h3>
            <button @click="closeRecipeSelector" class="close-btn">×</button>
          </div>

          <div class="recipe-filters">
            <select v-model="selectedTag" class="filter-select">
              <option value="">All recipes</option>
              <option v-for="tag in uniqueTags" :key="tag" :value="tag">
                {{ formatTag(tag) }}
              </option>
            </select>
          </div>

          <div class="recipe-grid">
            <div
              v-for="recipe in filteredRecipes"
              :key="recipe.id"
              class="recipe-option"
              @click="assignRecipe(recipe)"
            >
              <img :src="recipe.image" :alt="recipe.title" class="recipe-image" />
              <div class="recipe-details">
                <h4>{{ recipe.title }}</h4>
                <p>{{ recipe.summary }}</p>
                <div class="recipe-tags">
                  <span v-for="tag in recipe.tags" :key="tag" class="tag">{{
                    formatTag(tag)
                  }}</span>
                </div>
                <div class="nutrition-info">
                  <span>{{ recipe.nutrition.kcal }} kcal</span>
                  <span>{{ recipe.nutrition.protein }}g protein</span>
                  <span>{{ recipe.nutrition.carbs }}g carbs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Shopping List Section -->
      <div class="shopping-section">
        <h2>Shopping List</h2>
        <div class="shopping-controls">
          <button @click="generateShoppingList" class="generate-btn">Generate Shopping List</button>
          <button v-if="shoppingList.length > 0" @click="clearShoppingList" class="clear-btn">
            Clear List
          </button>
        </div>

        <div v-if="shoppingList.length > 0" class="shopping-list">
          <h3>Ingredients needed:</h3>
          <ul class="ingredient-list">
            <li v-for="ingredient in shoppingList" :key="ingredient" class="ingredient-item">
              <input type="checkbox" :id="ingredient" class="ingredient-checkbox" />
              <label :for="ingredient">{{ ingredient }}</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import recipes from '../data/recipes.json'

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const meals = ['Breakfast', 'Lunch', 'Dinner']

// State
const currentWeekStart = ref(new Date())
const weekPlan = ref({})
const showRecipeSelector = ref(false)
const selectedDay = ref('')
const selectedMeal = ref('')
const selectedTag = ref('')
const shoppingList = ref([])

// Initialize current week to Monday
onMounted(() => {
  const today = new Date()
  const mondayOffset = (today.getDay() + 6) % 7
  currentWeekStart.value = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - mondayOffset,
  )
})

// Computed properties
const weekDisplay = computed(() => {
  const start = new Date(currentWeekStart.value)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  const options = { month: 'short', day: 'numeric' }
  return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`
})

const uniqueTags = computed(() => {
  const tags = new Set()
  recipes.forEach((recipe) => {
    recipe.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const filteredRecipes = computed(() => {
  if (!selectedTag.value) return recipes
  return recipes.filter((recipe) => recipe.tags.includes(selectedTag.value))
})

// Methods
const previousWeek = () => {
  currentWeekStart.value = new Date(currentWeekStart.value.getTime() - 7 * 24 * 60 * 60 * 1000)
}

const nextWeek = () => {
  currentWeekStart.value = new Date(currentWeekStart.value.getTime() + 7 * 24 * 60 * 60 * 1000)
}

const getMealForDay = (day, meal) => {
  const weekKey = currentWeekStart.value.toISOString().split('T')[0]
  return weekPlan.value[weekKey]?.[day]?.[meal]
}

const openRecipeSelector = (day, meal) => {
  selectedDay.value = day
  selectedMeal.value = meal
  showRecipeSelector.value = true
  selectedTag.value = ''
}

const closeRecipeSelector = () => {
  showRecipeSelector.value = false
  selectedDay.value = ''
  selectedMeal.value = ''
}

const assignRecipe = (recipe) => {
  const weekKey = currentWeekStart.value.toISOString().split('T')[0]
  if (!weekPlan.value[weekKey]) weekPlan.value[weekKey] = {}
  if (!weekPlan.value[weekKey][selectedDay.value]) weekPlan.value[weekKey][selectedDay.value] = {}

  weekPlan.value[weekKey][selectedDay.value][selectedMeal.value] = recipe
  closeRecipeSelector()
}

const removeMeal = (day, meal) => {
  const weekKey = currentWeekStart.value.toISOString().split('T')[0]
  if (weekPlan.value[weekKey]?.[day]?.[meal]) {
    delete weekPlan.value[weekKey][day][meal]
    if (Object.keys(weekPlan.value[weekKey][day]).length === 0) {
      delete weekPlan.value[weekKey][day]
    }
  }
}

const generateShoppingList = () => {
  const weekKey = currentWeekStart.value.toISOString().split('T')[0]
  const ingredients = new Set()

  if (weekPlan.value[weekKey]) {
    Object.values(weekPlan.value[weekKey]).forEach((dayPlan) => {
      Object.values(dayPlan).forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => ingredients.add(ingredient))
      })
    })
  }

  shoppingList.value = Array.from(ingredients).sort()
}

const clearShoppingList = () => {
  shoppingList.value = []
}

const formatTag = (tag) => {
  return tag.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
</script>

<style scoped>
.meal-planner-wrapper {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  background: #fafafa;
  padding: 0 24px;
}

.meal-planner-container {
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 0;
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;
}

.planner-section {
  flex: 1;
  max-width: 1200px;
  min-width: 800px;
}

.week-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  gap: 16px;
}

.nav-btn {
  background: #22c55e;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
}

.nav-btn:hover {
  background: #16a34a;
}

.meal-grid {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.meal-grid-header {
  display: grid;
  grid-template-columns: 120px repeat(7, 1fr);
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
}

.time-slot {
  padding: 16px;
  font-weight: 600;
  border-right: 1px solid #e2e8f0;
}

.day-header {
  padding: 16px 8px;
  text-align: center;
  font-weight: 600;
  border-right: 1px solid #e2e8f0;
}

.meal-row {
  display: grid;
  grid-template-columns: 120px repeat(7, 1fr);
  border-bottom: 1px solid #e2e8f0;
}

.meal-label {
  padding: 16px;
  font-weight: 600;
  background: #f8fafc;
  border-right: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
}

.meal-slot {
  min-height: 120px;
  border-right: 1px solid #e2e8f0;
  cursor: pointer;
  position: relative;
}

.meal-slot:hover {
  background: #f1f5f9;
}

.empty-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #64748b;
  border: 2px dashed #cbd5e1;
  margin: 8px;
  border-radius: 6px;
}

.empty-slot:hover {
  border-color: #22c55e;
  color: #22c55e;
}

.assigned-meal {
  padding: 8px;
  height: 100%;
  position: relative;
}

.meal-image {
  width: 100%;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 4px;
}

.meal-info h4 {
  margin: 0;
  font-size: 12px;
  line-height: 1.2;
  margin-bottom: 2px;
}

.meal-calories {
  font-size: 10px;
  color: #64748b;
}

.remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

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
  padding: 24px;
  max-width: 900px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #64748b;
}

.recipe-filters {
  margin-bottom: 20px;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: white;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.recipe-option {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.recipe-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.recipe-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.recipe-details {
  padding: 12px;
}

.recipe-details h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.recipe-details p {
  margin: 0 0 12px 0;
  color: #64748b;
  font-size: 14px;
}

.recipe-tags {
  margin-bottom: 8px;
}

.tag {
  background: #e2e8f0;
  color: #475569;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-right: 4px;
}

.nutrition-info {
  font-size: 12px;
  color: #64748b;
}

.nutrition-info span {
  margin-right: 12px;
}

.shopping-section {
  flex: 0 0 350px;
  min-width: 300px;
  max-width: 400px;
}

.shopping-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.generate-btn,
.clear-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.generate-btn {
  background: #22c55e;
  color: white;
}

.generate-btn:hover {
  background: #16a34a;
}

.clear-btn {
  background: #ef4444;
  color: white;
}

.clear-btn:hover {
  background: #dc2626;
}

.shopping-list {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.ingredient-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ingredient-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
}

.ingredient-checkbox {
  margin-right: 8px;
}

.ingredient-item label {
  cursor: pointer;
  flex: 1;
}

.ingredient-item:has(.ingredient-checkbox:checked) label {
  text-decoration: line-through;
  color: #64748b;
}

@media (max-width: 1200px) {
  .meal-planner-container {
    flex-direction: column;
    align-items: center;
  }

  .planner-section {
    min-width: auto;
    max-width: 100%;
  }

  .shopping-section {
    flex: none;
    width: 100%;
    max-width: 600px;
  }

  .meal-grid-header,
  .meal-row {
    grid-template-columns: 100px repeat(7, 1fr);
  }
}

@media (max-width: 768px) {
  .meal-grid-header,
  .meal-row {
    grid-template-columns: 80px repeat(7, minmax(80px, 1fr));
  }

  .meal-slot {
    min-height: 100px;
  }

  .modal-content {
    width: 95%;
    padding: 16px;
  }

  .recipe-grid {
    grid-template-columns: 1fr;
  }
}
</style>
