<template>
  <section class="title-bar">
    <div class="title-inner">
      <h1 class="title">Nutrition Education</h1>
      <p class="subtitle">Evidence-based guidance to help you make informed food choices and build lasting healthy habits.</p>
    </div>
  </section>

  <div class="education-content">

    <!-- Topics Grid with Bootstrap Responsive Layout -->
    <section class="topics-section">
      <div class="section-header">
        <h2>Explore by Topic</h2>
        <p>Choose what interests you most</p>
      </div>

      <!-- Bootstrap responsive grid: col-12 (mobile), col-md-6 (tablet), col-lg-4 (desktop) -->
      <div class="container-fluid">
        <div class="row g-4">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="topic-card">
              <div class="topic-icon">&#127813;</div>
              <h3>Balanced Nutrition</h3>
              <p>Understanding macronutrients, micronutrients, and how to create balanced meals that fuel your body.</p>
              <div class="topic-stats">
                <span>12 articles</span>
                <span>&bull;</span>
                <span>Beginner</span>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <div class="topic-card">
              <div class="topic-icon">&#127822;</div>
              <h3>Weight Management</h3>
              <p>Sustainable approaches to achieving and maintaining a healthy weight through nutrition and lifestyle.</p>
              <div class="topic-stats">
                <span>8 articles</span>
                <span>&bull;</span>
                <span>Intermediate</span>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <div class="topic-card">
              <div class="topic-icon">&#128170;</div>
              <h3>Sports Nutrition</h3>
              <p>Optimize your performance with targeted nutrition strategies for athletes and active individuals.</p>
              <div class="topic-stats">
                <span>6 articles</span>
                <span>&bull;</span>
                <span>Advanced</span>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <div class="topic-card">
              <div class="topic-icon">&#127793;</div>
              <h3>Plant-Based Eating</h3>
              <p>Complete guide to plant-based nutrition, including protein sources and essential nutrients.</p>
              <div class="topic-stats">
                <span>10 articles</span>
                <span>&bull;</span>
                <span>All levels</span>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <div class="topic-card">
              <div class="topic-icon">&#128722;</div>
              <h3>Smart Shopping</h3>
              <p>Learn to read labels, compare products, and make budget-friendly healthy choices at the store.</p>
              <div class="topic-stats">
                <span>7 articles</span>
                <span>&bull;</span>
                <span>Beginner</span>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <div class="topic-card">
              <div class="topic-icon">&#128118;</div>
              <h3>Family Nutrition</h3>
              <p>Practical advice for feeding families, including kid-friendly healthy recipes and meal planning.</p>
              <div class="topic-stats">
                <span>9 articles</span>
                <span>&bull;</span>
                <span>All levels</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Tips -->
    <section class="tips-section">
      <div class="section-header">
        <h2>Quick Tips</h2>
        <p>Simple changes, big impact</p>
      </div>
      
      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-number">01</div>
          <h3>Hydration First</h3>
          <p>Start your day with a glass of water before coffee. Proper hydration supports metabolism and energy levels.</p>
        </div>

        <div class="tip-card">
          <div class="tip-number">02</div>
          <h3>Colorful Plates</h3>
          <p>Aim for at least 3 different colors on your plate. More colors usually mean more nutrients and antioxidants.</p>
        </div>

        <div class="tip-card">
          <div class="tip-number">03</div>
          <h3>Mindful Eating</h3>
          <p>Eat slowly and without distractions. This helps with digestion and helps you recognize fullness cues.</p>
        </div>

        <div class="tip-card">
          <div class="tip-number">04</div>
          <h3>Prep Smart</h3>
          <p>Wash and chop vegetables when you get home from shopping. You're more likely to eat what's ready to go.</p>
        </div>
      </div>
    </section>

    <!-- Latest Articles -->
    <section class="articles-section">
      <div class="section-header">
        <h2>Latest Articles</h2>
        <p>Stay updated with our newest content</p>
      </div>
      
      <div class="articles-grid">
        <article class="article-card">
          <div class="article-icon">📊</div>
          <div class="article-content">
            <h3>Understanding Glycemic Index</h3>
            <p>Learn how different foods affect your blood sugar and energy levels throughout the day.</p>
            <div class="article-meta">
              <span>3 days ago</span>
              <span>•</span>
              <span>4 min read</span>
            </div>
          </div>
        </article>

        <article class="article-card">
          <div class="article-icon">🥜</div>
          <div class="article-content">
            <h3>Complete Guide to Healthy Fats</h3>
            <p>Discover which fats to embrace, which to limit, and how they support brain and heart health.</p>
            <div class="article-meta">
              <span>1 week ago</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </div>
        </article>

        <article class="article-card">
          <div class="article-icon">⏰</div>
          <div class="article-content">
            <h3>Meal Timing for Better Health</h3>
            <p>The science behind when you eat and how it affects metabolism, sleep, and overall wellbeing.</p>
            <div class="article-meta">
              <span>2 weeks ago</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
          </div>
        </article>

        <article class="article-card">
          <div class="article-icon">🌾</div>
          <div class="article-content">
            <h3>Whole Grains Decoded</h3>
            <p>Navigate the world of grains with confidence. Learn to identify truly whole grain products.</p>
            <div class="article-meta">
              <span>3 weeks ago</span>
              <span>•</span>
              <span>7 min read</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>Ready to Start Your Nutrition Journey?</h2>
        <p>
          Join thousands of others who are making positive changes to their health. 
          Get personalized meal recommendations and track your progress.
        </p>
        <div class="cta-actions">
          <router-link to="/register" class="btn primary large">Get Started Free</router-link>
          <router-link to="/recipes" class="btn secondary large">Browse Recipes</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Nutrition Education page with comprehensive learning resources
</script>

<style scoped>
.education-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
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

.section-header p {
  font-size: 1.2rem;
  color: #6b7280;
  margin: 0;
}


/* Topics Grid */
.topics-section {
  margin-bottom: 80px;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
}

.topic-card {
  padding: 32px;
  border-radius: 16px;
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.topic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.topic-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.topic-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 12px;
}

.topic-card p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 16px;
}

.topic-stats {
  font-size: 0.875rem;
  color: #9ca3af;
  display: flex;
  gap: 8px;
  align-items: center;
}

/* Tips Section */
.tips-section {
  margin-bottom: 80px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.tip-card {
  padding: 24px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.tip-number {
  background: #22c55e;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 16px;
}

.tip-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 8px;
}

.tip-card p {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

/* Articles Section */
.articles-section {
  margin-bottom: 80px;
}

.articles-grid {
  display: grid;
  gap: 24px;
}

.article-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  border-radius: 12px;
  background: white;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease;
}

.article-card:hover {
  transform: translateX(8px);
}

.article-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.article-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 8px;
}

.article-content p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 12px;
}

.article-meta {
  font-size: 0.875rem;
  color: #9ca3af;
  display: flex;
  gap: 8px;
  align-items: center;
}

/* CTA Section */
.cta-section {
  margin-bottom: 40px;
}

.cta-content {
  text-align: center;
  padding: 64px 32px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  border-radius: 20px;
  color: white;
}

.cta-content h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0 0 16px;
}

.cta-content p {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 32px;
  opacity: 0.9;
}

.cta-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.btn.large {
  padding: 16px 32px;
  font-size: 1.1rem;
}

.btn.primary {
  background: #22c55e;
  color: white;
  border-color: #22c55e;
}

.btn.primary:hover {
  background: #16a34a;
  border-color: #16a34a;
}

.btn.secondary {
  background: transparent;
  color: white;
  border-color: white;
}

.btn.secondary:hover {
  background: white;
  color: #1e40af;
}

/* Responsive Design */
@media (max-width: 768px) {
  
  .topics-grid {
    grid-template-columns: 1fr;
  }
  
  .tips-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
}
</style>
