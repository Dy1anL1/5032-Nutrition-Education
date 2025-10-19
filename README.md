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
- **A.2** - Fully responsive design with Bootstrap integration
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
- **E.1** - Firebase Cloud Functions for email automation
- **E.2** - Geo Location with interactive map for finding healthy places
- **E.3** - WCAG 2.1 Level AA Accessibility compliance
- **Meal Planner** - Interactive weekly meal planning calendar
- **Recipe Rating System** - Star-based ratings with statistical analysis
- **Shopping List Generator** - Automatic ingredient compilation from meal plans
- **Educational Content** - Comprehensive nutrition education resources
- **Firestore Integration** - Cloud database for user data and ratings
- **Offline Support** - Graceful handling of network connectivity issues

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

3. **Configure Firebase** (create `.env.local` with your Firebase config as shown above)

4. **Start development server**:
```bash
npm run dev
```

5. **Open application**: Navigate to http://localhost:5173

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
