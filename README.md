# Healthy Living - Version 1

## Student Info

- Name: Jiaze Li
- Student ID: 30087724
- Unit: FIT5032 - Basic Application Development
- Assessment: A1.2 Version 1

---

## Project Overview

This project is a **Vue 3 single-page web application** developed for the non-profit project _Public Health through Nutrition Education_.

Version 1 implements the **basic requirements (A & B)**:

- **A.1** - Application built with Vue 3 framework (Vite + Vue Router).
- **A.2** - Responsive design: navigation adapts to mobile view; cards/grid layout adjusts across breakpoints.
- **B.1** - Form validation: Login, Register and Contact forms demonstrate required/format/length checks and both success & failure states.
- **B.2** - Dynamic data: Recipe list is loaded from `src/data/recipes.json` with search and tag filters; detail view shows full recipe information.

Future versions will extend to cover requirements C-F, including authentication, admin dashboard, cloud functions and innovation features.

---

fit5032-v1/

- index.html
- package.json
- vite.config.js
- src/
  - main.js
  - App.vue
  - router.js
  - assets/
  - base.css
  - main.css
  - data/
  - recipes.json
  - components/
  - NavBar.vue
  - FooterBar.vue
  - SectionTitle.vue
  - RecipeCard.vue
  - pages/
  - Home.vue
  - Recipes.vue
  - RecipeDetail.vue
  - MealPlanner.vue
  - Education.vue
  - Login.vue
  - Register.vue
  - Contact.vue
  - About.vue
  - Account.vue
- README.md

---

## Installation & Running

1. Clone the repo or unzip the submission:
   ```bash
   git clone <repo-url>
   cd fit5032-v1
   ```
2. Install dependencies:
   npm install
3. Run the dev server:
   npm run dev
