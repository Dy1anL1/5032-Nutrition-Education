/**
 * Import recipes from local JSON to Firestore
 * Run with: node scripts/importRecipes.js
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function importRecipes() {
  try {
    console.log('Starting recipe import...');

    // Read recipes from JSON file
    const recipesPath = path.join(__dirname, '../src/data/recipes.json');
    const recipesData = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));

    console.log(`Found ${recipesData.length} recipes to import`);

    // Import recipes to Firestore
    const batch = db.batch();
    let count = 0;

    for (const recipe of recipesData) {
      // Generate a unique ID for each recipe (or use existing id if available)
      const recipeId = recipe.id || `recipe_${Date.now()}_${count}`;
      const recipeRef = db.collection('recipes').doc(recipeId);

      // Prepare recipe data
      const recipeData = {
        id: recipeId,
        title: recipe.title || '',
        category: recipe.category || recipe.meal || recipe.mealType || '',
        description: recipe.description || '',
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        prepTime: recipe.prepTime || recipe.prep_time || '',
        cookTime: recipe.cookTime || recipe.cook_time || '',
        servings: recipe.servings || 1,
        difficulty: recipe.difficulty || 'medium',
        tags: recipe.tags || [],
        image: recipe.image || '',
        nutrition: {
          kcal: recipe.nutrition?.kcal || recipe.nutrition?.calories || 0,
          protein: recipe.nutrition?.protein || 0,
          carbs: recipe.nutrition?.carbs || recipe.nutrition?.carbohydrates || 0,
          fat: recipe.nutrition?.fat || 0,
          fiber: recipe.nutrition?.fiber || 0,
          sugar: recipe.nutrition?.sugar || 0,
          sodium: recipe.nutrition?.sodium || 0
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      batch.set(recipeRef, recipeData);
      count++;

      // Firestore batch write limit is 500, commit in batches
      if (count % 500 === 0) {
        await batch.commit();
        console.log(`Imported ${count} recipes...`);
      }
    }

    // Commit remaining recipes
    if (count % 500 !== 0) {
      await batch.commit();
    }

    console.log(`✅ Successfully imported ${count} recipes to Firestore!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing recipes:', error);
    process.exit(1);
  }
}

// Run the import
importRecipes();
