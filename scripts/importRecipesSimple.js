/**
 * Import recipes from local JSON to Firestore (Simple version using firestore emulator or direct SDK)
 * Run with: node scripts/importRecipesSimple.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';
import * as pathModule from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = pathModule.dirname(__filename);

// Firebase configuration (using your project config)
const firebaseConfig = {
  apiKey: "AIzaSyCeUUWTLJJtL-w_eJpuTOwLKnL2oqMIIrM",
  authDomain: "nutritioneducation-jiaze.firebaseapp.com",
  projectId: "nutritioneducation-jiaze",
  storageBucket: "nutritioneducation-jiaze.firebasestorage.app",
  messagingSenderId: "565365513318",
  appId: "1:565365513318:web:9b93f12eb3de8f1cf253f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function importRecipes() {
  try {
    console.log('Starting recipe import...');

    // Read recipes from JSON file
    const recipesPath = pathModule.join(__dirname, '../src/data/recipes.json');
    const recipesData = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));

    console.log(`Found ${recipesData.length} recipes to import`);

    let count = 0;
    const errors = [];

    for (const recipe of recipesData) {
      try {
        // Generate a unique ID for each recipe
        const recipeId = recipe.id || `recipe_${count + 1}`;

        // Prepare recipe data - keep only simple types
        const recipeData = {
          id: String(recipeId),
          title: String(recipe.title || ''),
          category: String(recipe.category || recipe.meal || recipe.mealType || 'general'),
          summary: String(recipe.summary || recipe.description || ''),
          ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.map(i => String(i)) : [],
          steps: Array.isArray(recipe.steps) ? recipe.steps.map(s => String(s)) : [],
          tags: Array.isArray(recipe.tags) ? recipe.tags.map(t => String(t)) : [],
          image: String(recipe.image || ''),
          nutrition: {
            kcal: Number(recipe.nutrition?.kcal || recipe.nutrition?.calories || 0),
            protein: Number(recipe.nutrition?.protein || 0),
            carbs: Number(recipe.nutrition?.carbs || recipe.nutrition?.carbohydrates || 0),
            fat: Number(recipe.nutrition?.fat || 0)
          }
        };

        // Import to Firestore
        const recipeRef = doc(db, 'recipes', String(recipeId));
        await setDoc(recipeRef, recipeData);

        count++;
        if (count % 5 === 0) {
          console.log(`Imported ${count}/${recipesData.length} recipes...`);
        }
      } catch (error) {
        errors.push({ recipe: recipe.title, error: error.message });
        console.error(`Error importing recipe "${recipe.title}":`, error.message);
      }
    }

    console.log(`\n[SUCCESS] Successfully imported ${count} recipes to Firestore!`);
    if (errors.length > 0) {
      console.log(`\n[WARNING] ${errors.length} recipes failed to import:`);
      errors.forEach(e => console.log(`  - ${e.recipe}: ${e.error}`));
    }

    process.exit(0);
  } catch (error) {
    console.error('[ERROR] Error importing recipes:', error);
    process.exit(1);
  }
}

// Run the import
importRecipes();
