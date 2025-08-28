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

## Recent additions (summary)

What's new

I've added a few things since the first version - short list below so it's easy to see what's changed.

- Recipes: now 11 sample recipes in `src/data/recipes.json`.
- Filters: search, category and diet filters on the Recipes page; controls are aligned and responsive.
- Cards: recipe tiles got a visual refresh (bigger hero area, calorie badge, white info strip, hover effect).
- Detail view: recipe details open in a centered modal with nutrition info, tags, ingredient list and numbered steps.
- Home: the front-page tiles now match the recipe card style.
- Register: added a small client-side table to show registered users (session-only).
- General layout and spacing tweaks across pages for a cleaner look.

## Notes about data and images

Right now the app loads recipe data from `src/data/recipes.json` at build time. That works for local testing and the assignment, but if you plan to add lots of recipes you probably don't want to manually download an image for every item.

Quick options:
- Zero setup: use Unsplash Source or Picsum to generate images from a keyword, e.g. `https://source.unsplash.com/800x600/?pumpkin` or `https://picsum.photos/seed/pumpkin/800/600`. No API key needed, but results are less predictable.
- More control: register for an API (Unsplash or Pexels), search for images server-side and cache the chosen URLs (or download them to your own storage). This avoids rate limits and keeps attribution metadata.

If you want, I can switch the app to fall back to Unsplash/Picsum when a local image is missing, or add a small server example that queries Unsplash and returns a stable image URL.

## Dependencies and optional libraries

This is a Vite + Vue 3 project. Use `package.json` for scripts and deps.

Optional UI helpers:
- PrimeVue: provides components like DataTable. Install with `npm install primevue primeicons`. If you use it, import the theme and core CSS in `src/main.js`:

```js
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
```

- Bootstrap: if you prefer Bootstrap utilities, install `bootstrap` and import its CSS in `src/main.js`:

```js
import 'bootstrap/dist/css/bootstrap.min.css'
```

## Running locally (PowerShell)

1. Install dependencies (only once):
```powershell
npm install
```

2. (Optional) Install PrimeVue if you want the DataTable components to work:
```powershell
npm install primevue primeicons
```

3. Start dev server:
```powershell
npm run dev
```

Open the app in your browser (usually http://localhost:5173). If you add PrimeVue, ensure its CSS imports are added to `src/main.js` as shown above.


## Next steps

Suggestions you can pick from:
- Move `recipes.json` to a runtime endpoint or `public/` so the list can be updated without rebuilding.
- Use a server-side proxy to call Unsplash/Pexels and cache image URLs (keeps rate limits and attribution under control).

If you want, I can make either of these changes for you - tell me which and I'll add the code.


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
