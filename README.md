# Healthy Living - Nutrition Education Platform

## Student Info

- Name: Jiaze Li
- Student ID: 30087724
- Unit: FIT5032 - Basic Application Development
- Assessment: Full Featured Application

---

## Project Overview

This project is a **comprehensive Vue 3 single-page web application** developed for the non-profit project _Public Health through Nutrition Education_. The application provides a complete platform for nutrition education, recipe management, meal planning, and user community features.

## 🚀 Key Features Implemented

### **Core Application (A & B Requirements)**
- **A.1** - Vue 3 framework with Vite build tool and Vue Router for navigation
- **A.2** - Fully responsive design with Bootstrap 5 framework
  - Bootstrap responsive grid system (container, row, col-*)
  - Mobile-first approach with breakpoints (sm, md, lg, xl)
  - Responsive navbar with hamburger menu on mobile
  - Responsive layouts across all pages
- **B.1** - Comprehensive form validation across all forms (Login, Register, Contact)
- **B.2** - Dynamic recipe data management with advanced filtering and search

### **Authentication & User Management (C Requirements)**
- **Firebase Authentication** - Complete user registration and login system
- **Role-based Access Control** - User and admin roles with protected routes
- **User Profiles** - Account management with profile updates
- **Route Protection** - Navigation guards for authenticated and admin-only pages

### **Admin Dashboard (D Requirements)**
- **User Management** - View, manage, and moderate user accounts
- **System Statistics** - Real-time metrics for users, recipes, and ratings
- **Content Moderation** - Admin controls for recipe and user management
- **Role Assignment** - Admin can promote users and manage permissions

### **Category D Requirements**
- **D.1** - Firebase Authentication with role-based access
- **D.2** - Email functionality with SendGrid (contact form, welcome emails, attachments)
- **D.3** - Interactive data tables with sort, search, and pagination

### **Advanced Features (E & F Requirements)**
- **E.1** - Firebase Cloud Functions for email automation and calculations
- **E.2** - Geo Location with interactive map for finding healthy places
- **E.3** - WCAG 2.1 Level AA Accessibility compliance
- **E.4** - Export functionality (PDF, Excel, Image) for meal plans and data
- **F.1** - Innovation Features (4 advanced features):
  - Interactive Charts in Admin Dashboard (Chart.js visualization)
  - Bulk Email System for admin communications
  - Public REST API with 2 endpoints for recipes
  - Offline Features with caching and status indicators
- **Meal Planner** - Interactive weekly meal planning calendar
- **Recipe Rating System** - Star-based ratings with statistical analysis
- **Shopping List Generator** - Automatic ingredient compilation from meal plans
- **Educational Content** - Comprehensive nutrition education resources
- **Firestore Integration** - Cloud database for user data and ratings

## 📱 Application Pages & Components

### **Public Pages**
- **Home** - Welcome page with featured content and quick navigation
- **Recipes** - Browse recipes with search, category, and dietary filters
- **Recipe Detail** - Detailed view with ingredients, instructions, and ratings
- **Education** - Nutrition education resources and articles
- **About** - Information about the platform and mission
- **Contact** - Contact form with validation

### **Authentication Pages**
- **Login** - User authentication with Firebase integration
- **Register** - New user registration with profile creation

### **Protected Pages** (Requires Authentication)
- **Account** - User profile management and settings
- **Meal Planner** - Interactive weekly meal planning with drag-and-drop
- **Shopping Lists** - Auto-generated ingredient lists from meal plans

### **Admin Only Pages**
- **Admin Dashboard** - Complete admin interface for system management

### **Shared Components**
- **Navigation Bar** - Responsive navigation with user authentication status
- **Recipe Cards** - Reusable recipe display components with ratings
- **Rating System** - Interactive star rating component
- **Footer** - Site-wide footer with links and information

## 🛠️ Technical Architecture

### **Frontend Stack**
- **Vue 3** with Composition API
- **Vue Router** for client-side routing with navigation guards
- **Pinia** for state management (auth and rating stores)
- **Bootstrap 5** for responsive UI components
- **Vite** for fast development and optimized builds

### **Backend & Database**
- **Firebase Authentication** for user management
- **Firestore Database** for storing user profiles, ratings, and meal plans
- **Environment-based Configuration** for secure API key management

### **State Management**
- **Auth Store** - User authentication state and profile management
- **Rating Store** - Recipe ratings and statistical calculations
- **Route Guards** - Protecting authenticated and admin routes

### **Data Architecture**
- **Static Recipe Data** - JSON-based recipe storage with 11+ recipes
- **Dynamic User Data** - Firestore collections for user profiles and interactions
- **Real-time Updates** - Live synchronization of ratings and user data

## 📦 Dependencies & Setup

### **Core Dependencies**
```json
{
  "vue": "^3.5.20",
  "vue-router": "^4.5.1",
  "pinia": "^2.3.1",
  "firebase": "^12.2.1",
  "bootstrap": "^5.3.8"
}
```

### **Environment Configuration**
Create a `.env.local` file with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🚀 Installation & Running

### **Prerequisites**
- Node.js (^20.19.0 || >=22.12.0)
- npm or yarn package manager

### **Setup Steps**

1. **Clone the repository**:
```bash
git clone <repository-url>
cd 5032-Nutrition-Education
```

2. **Install dependencies**:
```bash
npm install
```

3. **Install Cloud Functions dependencies**:
```bash
cd functions
npm install
cd ..
```

4. **Configure Firebase** (create `.env.local` with your Firebase config as shown above)

5. **Start development server**:
```bash
npm run dev
```

6. **Open application**: Navigate to http://localhost:5173

### **Available Scripts**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code with ESLint
npm run format   # Format code with Prettier
```

## 👤 User Roles & Access

### **Public Access**
- Browse recipes and educational content
- View recipe details and ratings
- Access contact and about pages

### **Registered Users**
- All public features plus:
- Create and manage user profile
- Rate and review recipes
- Use meal planner for weekly planning
- Generate shopping lists from meal plans

### **Admin Users**
- All user features plus:
- Access admin dashboard
- View system statistics and analytics
- Manage user accounts and roles
- Moderate content and ratings

### **Test Accounts (Development)**
Regular user credentials for testing:
```
Email: user@example.com
Password: TestUser123!
```

Admin credentials for testing admin features:
```
Email: admin@example.com
Password: AdminPass123!
```

*Note: These are development-only accounts for testing purposes*

## 📁 Project Structure

```
5032-Nutrition-Education/
├── public/
│   └── recipes/                 # Recipe images
├── src/
│   ├── components/              # Reusable Vue components
│   │   ├── NavBar.vue          # Navigation component
│   │   ├── FooterBar.vue       # Footer component
│   │   ├── RecipeCard.vue      # Recipe display card
│   │   ├── RatingComponent.vue # Star rating system
│   │   └── SectionTitle.vue    # Page title component
│   ├── pages/                   # Route components
│   │   ├── Home.vue            # Landing page
│   │   ├── Recipes.vue         # Recipe browsing
│   │   ├── RecipeDetail.vue    # Individual recipe view
│   │   ├── MealPlanner.vue     # Weekly meal planning
│   │   ├── Education.vue       # Educational content
│   │   ├── Login.vue           # User authentication
│   │   ├── Register.vue        # User registration
│   │   ├── Contact.vue         # Contact form
│   │   ├── About.vue           # About page
│   │   ├── Account.vue         # User profile
│   │   ├── AdminDashboard.vue  # Admin interface
│   │   └── NotFound.vue        # 404 error page
│   ├── stores/                  # Pinia state management
│   │   ├── auth.js             # Authentication store
│   │   └── rating.js           # Rating system store
│   ├── data/
│   │   └── recipes.json        # Static recipe data
│   ├── assets/                  # Static assets and styles
│   ├── utils/                   # Utility functions
│   ├── firebase.js             # Firebase configuration
│   ├── router.js               # Vue Router setup
│   ├── main.js                 # Application entry point
│   └── App.vue                 # Root component
├── .env.local                   # Environment configuration
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                    # Project documentation
```

## 🎯 Learning Outcomes Achieved

This project demonstrates mastery of:

- **Vue 3 Ecosystem** - Composition API, Vue Router, Pinia
- **Modern JavaScript** - ES6+ features, async/await, modules
- **Firebase Integration** - Authentication, Firestore database, Cloud Functions
- **Responsive Design** - Mobile-first approach with Bootstrap
- **State Management** - Centralized stores and reactive data
- **Component Architecture** - Reusable, modular components
- **Form Validation** - Client-side validation with error handling
- **Route Protection** - Authentication guards and role-based access
- **Real-time Features** - Live data updates and synchronization
- **User Experience** - Interactive interfaces and feedback systems
- **Web Accessibility** - WCAG 2.1 AA compliance with ARIA and semantic HTML
- **Geolocation Services** - Interactive maps and location-based features

---

## Email Functionality Setup (D.2)

This application uses SendGrid API for email functionality including contact forms, welcome emails, and attachments.

### Quick Setup

1. **Get SendGrid API Key**:
   - Sign up at https://sendgrid.com (Free: 100 emails/day)
   - Verify your sender email address
   - Create API Key with Full Access
   - Copy the API key

2. **Configure Firebase** (requires Blaze plan):
   ```bash
   firebase login
   firebase use --add
   firebase functions:config:set sendgrid.key="YOUR_API_KEY"
   firebase functions:config:set sendgrid.from_email="your-verified-email@gmail.com"
   firebase functions:config:set sendgrid.admin_email="admin@example.com"
   ```

3. **Deploy Functions**:
   ```bash
   cd functions
   npm install
   cd ..
   firebase deploy --only functions
   ```

### Features

- **Contact Form**: Sends email to admin and confirmation to sender
- **Welcome Email**: Automatic email when users register
- **Test Email with Attachment**: Admin dashboard feature for testing PDF attachments
- **Bulk Email**: Admin can send emails to multiple users (F requirement)

---

## Nutrition Statistics Cloud Function (E.1)

This application includes a Firebase Cloud Function that calculates comprehensive nutrition statistics for meal plans.

### Overview

The `calculateNutritionStats` function is a callable Cloud Function that processes meal plan data and returns detailed nutritional analysis including totals, averages, and percentages of daily recommended values.

### Features

- **Total Nutrition**: Sum of all nutrients across selected meals
- **Average Per Meal**: Calculated average nutrition values
- **Daily Percentages**: Comparison against standard 2000 calorie diet recommendations
- **Real-time Calculation**: Server-side processing for accurate results
- **Authentication Required**: Secure access for logged-in users only

### Implementation Details

**Cloud Function Location**: [functions/index.js:182-246](functions/index.js#L182-L246)

**Frontend Integration**: [src/pages/MealPlanner.vue:252-297](src/pages/MealPlanner.vue#L252-L297)

**Function Parameters**:
```javascript
{
  recipes: [
    {
      nutrition: {
        kcal: 320,      // or calories
        protein: 15,
        carbs: 45,
        fat: 8
      }
    }
  ]
}
```

**Return Data Structure**:
```javascript
{
  success: true,
  data: {
    total: {
      calories: 2840,
      protein: 138,
      carbs: 392,
      fat: 112
    },
    average: {
      calories: 315,
      protein: 15,
      carbs: 43,
      fat: 12
    },
    percentages: {
      calories: 142,  // % of 2000 kcal
      protein: 276,   // % of 50g
      carbs: 131,     // % of 300g
      fat: 160        // % of 70g
    },
    recipesAnalyzed: 9,
    timestamp: "2025-10-19T08:33:38.000Z"
  }
}
```

### Daily Recommended Values (Based on 2000 calorie diet)

- Calories: 2000 kcal
- Protein: 50g
- Carbohydrates: 300g
- Fat: 70g

### Usage in Application

1. **Navigate to Meal Planner**: Add recipes to your 3-day meal plan
2. **Add Multiple Meals**: Select at least 3-5 meals across different days
3. **Click "Calculate Nutrition"**: Purple button in the navigation area
4. **View Results**: Modal displays comprehensive nutrition analysis

### Technical Features

- **Callable Function**: Uses Firebase HTTPS callable pattern with authentication
- **Field Compatibility**: Supports both `calories` and `kcal` field names
- **Error Handling**: Validates input and provides meaningful error messages
- **Performance**: Server-side calculation for consistent results

### Files

- [functions/index.js](functions/index.js) - Cloud Function implementation
- [src/pages/MealPlanner.vue](src/pages/MealPlanner.vue) - UI and frontend integration
- [functions/package.json](functions/package.json) - Dependencies

---

## WCAG 2.1 Level AA Accessibility (E.3)

This application is fully compliant with **WCAG 2.1 Level AA** accessibility standards, ensuring the platform is usable by people with disabilities.

### Accessibility Features Implemented

#### 1. Keyboard Navigation
- **Full keyboard support** - All interactive elements accessible via keyboard
- **Visible focus indicators** - Clear 3px outlines on focused elements
- **Logical tab order** - Natural navigation flow through the page
- **Skip to main content** - Bypass navigation with skip link (press Tab on page load)

#### 2. Screen Reader Support
- **ARIA labels** - Descriptive labels for all interactive elements
- **ARIA landmarks** - Proper role attributes (banner, navigation, main, contentinfo)
- **ARIA live regions** - Dynamic content announcements (form errors, search results)
- **Semantic HTML** - header, nav, main, footer, article elements

#### 3. Visual Accessibility
- **Color contrast** - All text meets 4.5:1 contrast ratio (AA standard)
- **Focus indicators** - Visible outlines on all focusable elements
- **Text alternatives** - Alt text for all images and icons
- **Heading hierarchy** - Proper h1 → h2 → h3 structure (no skipped levels)

#### 4. Form Accessibility
- **Label associations** - All inputs have explicit label elements
- **Required field indicators** - Visual and screen reader announcements
- **Error messages** - Clear, descriptive error text with aria-live regions
- **Input validation** - Real-time feedback with accessible announcements

### Accessibility Audit Results

Tested with **accessibilitychecker.org** (WCAG 2.1 Level AA):

- **Score**: 95%+ (Required: 95%)
- **Critical Issues**: 0 (All resolved)
- **Passed Audits**: 36+ automated checks
- **Manual Audits**: 3 (manually verified as compliant)

### Critical Issues Resolved

1. **Skip Link Contrast** - Enhanced from #22c55e to #16a34a (darker green)
2. **Heading Hierarchy** - Fixed RecipeCard h3 → h2 (proper h1→h2 sequence)
3. **Navigation Links** - Improved contrast from #586174 to #374151
4. **Sign Up Button** - Enhanced from #22c55e to #16a34a for better contrast
5. **Muted Text Colors** - Darkened from #6b7280 to #4b5563 across all components

### Files Modified for Accessibility

- [src/assets/accessibility.css](src/assets/accessibility.css) - Global accessibility styles
- [src/assets/base.css](src/assets/base.css) - CSS variable updates for contrast
- [src/assets/main.css](src/assets/main.css) - Subtitle and global text colors
- [src/App.vue](src/App.vue) - Skip link and main landmark
- [src/components/NavBar.vue](src/components/NavBar.vue) - Navigation ARIA labels and contrast
- [src/components/RecipeCard.vue](src/components/RecipeCard.vue) - Heading hierarchy fix
- [src/components/FooterBar.vue](src/components/FooterBar.vue) - Semantic HTML and ARIA
- [src/pages/Login.vue](src/pages/Login.vue) - Form accessibility
- [src/pages/Recipes.vue](src/pages/Recipes.vue) - Search and filter accessibility

### Testing the Accessibility Features

1. **Keyboard Navigation**: Press Tab to navigate, Enter/Space to activate
2. **Skip Link**: Press Tab on any page to reveal "Skip to main content" link
3. **Screen Reader**: Use NVDA (Windows) or VoiceOver (Mac) to test announcements
4. **Color Contrast**: Use browser DevTools or online contrast checkers

### Documentation

Complete accessibility implementation details are available in [ACCESSIBILITY.md](ACCESSIBILITY.md)

---

## Export Functionality (E.4)

This application provides comprehensive export capabilities for meal plans and data visualization.

### Export Features

#### 1. PDF Export
- **Meal Plan Export**: Export weekly meal plans as formatted PDF documents
- **User Data Export**: Admin can export user lists and statistics
- **Customizable Layout**: Professional formatting with headers and tables

#### 2. Excel Export
- **Shopping Lists**: Export shopping lists as Excel spreadsheets
- **User Reports**: Admin dashboard user data export to Excel
- **Multiple Sheets**: Organized data across multiple worksheets

#### 3. Image Export
- **Visual Data**: Capture charts and visualizations as images
- **Meal Plan Screenshots**: Export meal plan calendar as PNG/JPG
- **High Quality**: Uses html2canvas for pixel-perfect captures

### Implementation

Libraries used:
- **jsPDF**: PDF generation with auto-table plugin
- **xlsx**: Excel file creation and manipulation
- **html2canvas**: DOM to image conversion

Files implementing export functionality:
- [src/pages/MealPlanner.vue](src/pages/MealPlanner.vue) - Meal plan PDF export
- [src/pages/ShoppingLists.vue](src/pages/ShoppingLists.vue) - Shopping list Excel export
- [src/pages/AdminDashboard.vue](src/pages/AdminDashboard.vue) - Chart and data exports

### Usage

1. **Export Meal Plan**: Click "Export as PDF" button in Meal Planner page
2. **Export Shopping List**: Click "Export to Excel" in Shopping Lists page
3. **Export Charts**: Use "Export Chart" buttons in Admin Dashboard

---

## Innovation Features (F.1)

Four advanced features implemented to enhance the application's capabilities:

### 1. Interactive Charts (Chart.js Integration)

**Location**: Admin Dashboard

**Features**:
- Doughnut Chart for user role distribution
- Bar Chart for user registration trends
- Pie Chart for recipe category distribution
- Line Chart for rating trends over time

**Implementation**:
- Uses Chart.js and vue-chartjs libraries
- Real-time data updates from Firestore
- Responsive and interactive visualizations
- Export chart images functionality

**Files**:
- [src/pages/AdminDashboard.vue](src/pages/AdminDashboard.vue) - Chart components and data

### 2. Bulk Email System

**Location**: Admin Dashboard

**Features**:
- Select multiple users with checkboxes
- Compose custom email messages
- Progress tracking during sending
- Error handling and retry logic
- Send to all users or selected subset

**Implementation**:
- Integrated with SendGrid API
- Batch processing with individual tracking
- Modal interface for email composition
- Success/failure reporting

**Files**:
- [src/components/BulkEmailModal.vue](src/components/BulkEmailModal.vue) - Email composition UI
- [src/services/emailService.js](src/services/emailService.js) - Bulk email logic
- [src/pages/AdminDashboard.vue](src/pages/AdminDashboard.vue) - User selection

**Usage**: Select users in admin dashboard, click "Send Bulk Email" button

### 3. Public REST API

**Endpoints**:

1. **GET /getRecipes** - Retrieve all recipes with filtering
   - Query parameters: category, maxCalories, minProtein, limit
   - Returns: Array of recipe objects

2. **GET /getRecipeById/{id}** - Get specific recipe by ID
   - Path parameter: recipe ID
   - Returns: Recipe object with ratings

**Features**:
- CORS enabled for public access
- Query filtering and pagination
- Includes rating data from Firestore
- Rate limiting and error handling

**Implementation**:
- Firebase Cloud Functions (HTTPS triggers)
- Firestore database integration
- RESTful API design principles

**Documentation**:
- API documentation available on About page
- Live endpoints with copy-to-clipboard functionality
- Example requests and responses

**Base URL**: https://us-central1-nutritioneducation-jiaze.cloudfunctions.net

**Files**:
- [functions/index.js](functions/index.js) - Cloud Functions endpoints
- [src/pages/About.vue](src/pages/About.vue) - API documentation UI
- [scripts/importRecipesSimple.js](scripts/importRecipesSimple.js) - Data import script

### 4. Offline Features

**Components**:

1. **Offline Indicator**
   - Visual banner when network is unavailable
   - "Retry" button to check connectivity
   - Toast notification when back online
   - Persistent across all pages

2. **Cache Management**
   - LocalStorage-based caching with expiry (7 days)
   - Automatic cache of recipes and user data
   - Cache status display with age information
   - Manual cache clearing functionality

3. **Cache Status Banner**
   - Shows number of cached recipes
   - Displays last update time (minutes/hours/days ago)
   - "Clear Cache" button for manual management
   - Only visible in offline mode

**Implementation**:
- Network status detection (navigator.onLine)
- Service Worker pattern for offline support
- LocalStorage with timestamp and expiry
- Graceful degradation when offline

**Files**:
- [src/services/offlineService.js](src/services/offlineService.js) - Caching logic
- [src/components/OfflineIndicator.vue](src/components/OfflineIndicator.vue) - Status banner
- [src/pages/Recipes.vue](src/pages/Recipes.vue) - Cache status and management
- [src/App.vue](src/App.vue) - Global offline indicator

**Testing**:
1. Enable offline mode in browser DevTools (Network tab)
2. Observe offline indicator at top of page
3. Navigate to Recipes page to see cache banner
4. Refresh page to verify cached data loads
5. Re-enable network to see "Back online" notification

---

## Bootstrap 5 Responsive Design (A.2)

This application is fully responsive and compatible with various devices using Bootstrap 5 framework.

### Responsive Features Implemented

#### 1. Bootstrap Grid System

**Home Page** ([src/pages/Home.vue](src/pages/Home.vue))
- Container-fluid for full-width layouts
- Responsive columns: `col-12 col-md-6 col-lg-4`
- Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
- Benefits section adapts from 1 to 3 columns

**Recipes Page** ([src/pages/Recipes.vue](src/pages/Recipes.vue))
- Advanced responsive grid: `col-12 col-sm-6 col-lg-4 col-xl-3`
- Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns, Large screens: 4 columns
- Recipe cards automatically reflow based on screen size

**Login Page** ([src/pages/Login.vue](src/pages/Login.vue))
- Centered responsive form: `col-12 col-md-8 col-lg-6 col-xl-5`
- Form width adapts to screen size for optimal readability

#### 2. Responsive Navigation Bar

**NavBar Component** ([src/components/NavBar.vue](src/components/NavBar.vue))
- Bootstrap navbar with collapse functionality
- Hamburger menu icon on screens < 992px (navbar-expand-lg)
- Mobile menu slides down with all navigation links
- User actions remain accessible on all screen sizes
- JavaScript-powered toggle for mobile menu

#### 3. Bootstrap Breakpoints Used

- **Extra Small (xs)**: < 576px - Mobile phones
- **Small (sm)**: >= 576px - Large phones
- **Medium (md)**: >= 768px - Tablets
- **Large (lg)**: >= 992px - Desktops
- **Extra Large (xl)**: >= 1200px - Large desktops

#### 4. Bootstrap Utility Classes

- `d-flex`, `d-none`, `d-lg-flex` - Display utilities for showing/hiding elements
- `gap-3`, `gap-4` - Spacing between flex/grid items
- `mb-2`, `mb-lg-0` - Responsive margins
- `px-4` - Responsive padding
- `align-items-center`, `justify-content-center` - Flexbox alignment
- `container`, `container-fluid` - Responsive containers

#### 5. Mobile-First Approach

All layouts are designed mobile-first, starting with single-column layouts and expanding to multi-column on larger screens. This ensures optimal performance and user experience on all devices.

### Testing Responsiveness

1. **Browser DevTools**: Press F12 and toggle device toolbar
2. **Responsive Design Mode**: Test at different breakpoints (320px, 768px, 1024px, 1440px)
3. **Real Devices**: Test on actual phones, tablets, and desktops
4. **Bootstrap Classes**: All responsive behavior is handled by Bootstrap's proven grid system

### Files with Bootstrap Responsive Implementation

- [src/pages/Home.vue](src/pages/Home.vue) - Responsive grid for cards and benefits
- [src/pages/Recipes.vue](src/pages/Recipes.vue) - Responsive recipe grid (1-4 columns)
- [src/pages/Login.vue](src/pages/Login.vue) - Centered responsive form
- [src/components/NavBar.vue](src/components/NavBar.vue) - Responsive navbar with hamburger menu
- [src/main.js](src/main.js) - Bootstrap CSS and JS imports

---
