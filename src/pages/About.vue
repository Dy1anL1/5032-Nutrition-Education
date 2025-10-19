<!--
  About page - Our story, mission, and team
-->
<template>
  <section class="title-bar">
    <div class="title-inner">
      <h1 class="title">About Healthy Living</h1>
      <p class="subtitle">Empowering communities through nutrition education and practical wellness tools.</p>
    </div>
  </section>

  <div class="about-content">
    <!-- Mission Section -->
    <section class="section">
      <div class="section-header">
        <h2>Our Mission</h2>
        <p class="section-subtitle">Making healthy living accessible to everyone</p>
      </div>
      <div class="text-content">
        <p>
          We believe that good nutrition shouldn't be complicated or expensive. Our mission is to 
          provide practical, evidence-based nutrition education that empowers individuals and 
          families to make healthier food choices.
        </p>
        <p>
          Through our curated recipes, meal planning tools, and educational resources, we're 
          building a community where healthy living is achievable for everyone, regardless of 
          their background or budget.
        </p>
      </div>
    </section>


    <!-- Values Section -->
    <section class="section">
      <div class="section-header">
        <h2>Our Values</h2>
        <p class="section-subtitle">What drives everything we do</p>
      </div>
      <div class="values-grid">
        <div class="value-card">
          <div class="value-icon">🎯</div>
          <h3>Evidence-Based</h3>
          <p>All our recommendations are grounded in peer-reviewed nutrition science and current dietary guidelines.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🤝</div>
          <h3>Inclusive</h3>
          <p>We create content that works for diverse dietary needs, cultural preferences, and budget constraints.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">💡</div>
          <h3>Practical</h3>
          <p>Our tools and advice are designed for real kitchens, real schedules, and real life challenges.</p>
        </div>
        <div class="value-card">
          <div class="value-icon">🌱</div>
          <h3>Sustainable</h3>
          <p>We promote eating patterns that are good for both personal health and environmental wellbeing.</p>
        </div>
      </div>
    </section>


    <!-- Public API Section -->
    <section class="section api-section">
      <div class="section-header">
        <h2>Public API</h2>
        <p class="section-subtitle">Access our recipe database programmatically</p>
      </div>
      <div class="api-content">
        <p class="api-intro">
          We provide free, open REST API endpoints for developers to integrate our recipe data into their applications.
          No authentication required - perfect for research, education, or building nutrition tools.
        </p>

        <div class="api-endpoints">
          <!-- Endpoint 1: Get All Recipes -->
          <div class="endpoint-card">
            <div class="endpoint-header">
              <span class="http-method get">GET</span>
              <h3>Get All Recipes</h3>
            </div>
            <div class="endpoint-url">
              <code>https://us-central1-nutritioneducation-jiaze.cloudfunctions.net/getRecipes</code>
              <button @click="copyToClipboard('https://us-central1-nutritioneducation-jiaze.cloudfunctions.net/getRecipes')" class="copy-btn" title="Copy URL">
                📋
              </button>
            </div>
            <p class="endpoint-description">
              Retrieve a list of recipes with optional filters for category, calories, and protein content.
            </p>
            <div class="endpoint-params">
              <h4>Query Parameters (Optional)</h4>
              <ul>
                <li><code>category</code> - Filter by meal type (breakfast, lunch, dinner)</li>
                <li><code>maxCalories</code> - Maximum calories (e.g., 300)</li>
                <li><code>minProtein</code> - Minimum protein in grams (e.g., 20)</li>
                <li><code>limit</code> - Number of results (default: 100)</li>
              </ul>
            </div>
            <div class="endpoint-examples">
              <h4>Example Requests</h4>
              <div class="example-item">
                <code>?category=breakfast</code>
                <span class="example-desc">Get all breakfast recipes</span>
              </div>
              <div class="example-item">
                <code>?maxCalories=300</code>
                <span class="example-desc">Get low-calorie recipes (≤300 kcal)</span>
              </div>
              <div class="example-item">
                <code>?minProtein=20</code>
                <span class="example-desc">Get high-protein recipes (≥20g)</span>
              </div>
            </div>
          </div>

          <!-- Endpoint 2: Get Recipe by ID -->
          <div class="endpoint-card">
            <div class="endpoint-header">
              <span class="http-method get">GET</span>
              <h3>Get Recipe by ID</h3>
            </div>
            <div class="endpoint-url">
              <code>https://us-central1-nutritioneducation-jiaze.cloudfunctions.net/getRecipeById/{id}</code>
              <button @click="copyToClipboard('https://us-central1-nutritioneducation-jiaze.cloudfunctions.net/getRecipeById/')" class="copy-btn" title="Copy URL">
                📋
              </button>
            </div>
            <p class="endpoint-description">
              Get detailed information about a specific recipe, including nutrition facts, ingredients, instructions, and user ratings.
            </p>
            <div class="endpoint-params">
              <h4>Path Parameters</h4>
              <ul>
                <li><code>id</code> - Recipe ID (required)</li>
              </ul>
            </div>
            <div class="response-sample">
              <h4>Sample Response</h4>
              <pre><code>{
  "success": true,
  "data": {
    "id": "recipe123",
    "title": "Green Smoothie Bowl",
    "category": "breakfast",
    "nutrition": {
      "kcal": 280,
      "protein": 12,
      "carbs": 45,
      "fat": 8
    },
    "ratings": {
      "average": 4.5,
      "count": 24
    }
  }
}</code></pre>
            </div>
          </div>
        </div>

        <div class="api-use-cases">
          <h3>Use Cases</h3>
          <div class="use-cases-grid">
            <div class="use-case-card">
              <div class="use-case-icon">📱</div>
              <h4>Mobile Apps</h4>
              <p>Build nutrition tracking apps with our recipe database</p>
            </div>
            <div class="use-case-card">
              <div class="use-case-icon">🔬</div>
              <h4>Research</h4>
              <p>Analyze nutrition data for academic studies</p>
            </div>
            <div class="use-case-card">
              <div class="use-case-icon">💪</div>
              <h4>Fitness Tools</h4>
              <p>Integrate meal planning into workout apps</p>
            </div>
            <div class="use-case-card">
              <div class="use-case-icon">🎓</div>
              <h4>Education</h4>
              <p>Create learning materials about nutrition</p>
            </div>
          </div>
        </div>

        <div class="api-note">
          <strong>Note:</strong> This API is free to use for non-commercial purposes.
          Please respect our servers - implement caching and rate limiting in your applications.
          For commercial use or high-volume requests, please contact us.
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section">
      <div class="section-header">
        <h2>Get In Touch</h2>
        <p class="section-subtitle">We'd love to hear from you</p>
      </div>
      <div class="contact-content">
        <p>
          Have questions about nutrition? Want to suggest a recipe? Or perhaps you'd like to
          partner with us? We're always excited to connect with our community.
        </p>
        <div class="contact-actions">
          <router-link to="/contact" class="btn primary">Contact Us</router-link>
          <a href="mailto:hello@healthyliving.edu" class="btn secondary">Email Us</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// About page with comprehensive content about our mission, story, and team

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('API URL copied to clipboard!')
  }).catch(err => {
    console.error('Failed to copy:', err)
  })
}
</script>

<style scoped>
.about-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section {
  margin-bottom: 80px;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 12px;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #6b7280;
  margin: 0;
}


.text-content p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 20px;
}


.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.value-card {
  text-align: center;
  padding: 32px 24px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.value-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 12px;
}

.value-card p {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}


.contact-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.contact-content p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 32px;
}

.contact-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn.primary {
  background: #22c55e;
  color: white;
  border: 2px solid #22c55e;
}

.btn.primary:hover {
  background: #16a34a;
  border-color: #16a34a;
}

.btn.secondary {
  background: transparent;
  color: #22c55e;
  border: 2px solid #22c55e;
}

.btn.secondary:hover {
  background: #22c55e;
  color: white;
}

/* API Section Styles */
.api-section {
  background: #f9fafb;
  padding: 48px 24px;
  margin-left: -24px;
  margin-right: -24px;
  border-radius: 16px;
}

.api-content {
  max-width: 900px;
  margin: 0 auto;
}

.api-intro {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #374151;
  text-align: center;
  margin-bottom: 48px;
}

.api-endpoints {
  margin-bottom: 48px;
}

.endpoint-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 32px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.endpoint-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.http-method {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.875rem;
  font-family: monospace;
}

.http-method.get {
  background: #dbeafe;
  color: #1e40af;
}

.endpoint-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #1a202c;
}

.endpoint-url {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f3f4f6;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
}

.endpoint-url code {
  flex: 1;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #1f2937;
  word-break: break-all;
}

.copy-btn {
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
  flex-shrink: 0;
}

.copy-btn:hover {
  background: #f3f4f6;
  transform: scale(1.1);
}

.endpoint-description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 24px;
}

.endpoint-params h4,
.endpoint-examples h4,
.response-sample h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 24px 0 12px;
}

.endpoint-params ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.endpoint-params li {
  padding: 8px 0;
  color: #6b7280;
  line-height: 1.6;
}

.endpoint-params code {
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #1f2937;
  font-weight: 600;
}

.example-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
  margin-bottom: 8px;
}

.example-item code {
  font-family: 'Courier New', monospace;
  color: #059669;
  font-weight: 600;
  min-width: 200px;
}

.example-desc {
  color: #6b7280;
  font-size: 0.9rem;
}

.response-sample pre {
  background: #1f2937;
  color: #f3f4f6;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 0;
}

.response-sample code {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

.api-use-cases {
  margin-bottom: 32px;
}

.api-use-cases h3 {
  text-align: center;
  font-size: 1.8rem;
  color: #1a202c;
  margin-bottom: 32px;
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.use-case-card {
  text-align: center;
  padding: 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.use-case-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.use-case-card h4 {
  font-size: 1.1rem;
  color: #1a202c;
  margin: 0 0 8px;
}

.use-case-card p {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

.api-note {
  background: #fef3c7;
  border: 1px solid #fbbf24;
  border-radius: 8px;
  padding: 16px 20px;
  color: #92400e;
  line-height: 1.6;
}

.api-note strong {
  color: #78350f;
}

@media (max-width: 768px) {
  .values-grid {
    grid-template-columns: 1fr;
  }

  .contact-actions {
    flex-direction: column;
    align-items: center;
  }

  .api-section {
    padding: 32px 16px;
    margin-left: -24px;
    margin-right: -24px;
  }

  .endpoint-card {
    padding: 20px;
  }

  .endpoint-url {
    flex-direction: column;
    align-items: stretch;
  }

  .example-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .example-item code {
    min-width: auto;
  }

  .use-cases-grid {
    grid-template-columns: 1fr;
  }
}
</style>
