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

@media (max-width: 768px) {
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
