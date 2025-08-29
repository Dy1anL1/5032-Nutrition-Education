<!--
  FooterBar
  - Static site footer component with brand, contact details and helpful links.
  - Update addresses, contact emails and support links here. No runtime script is required.
-->
<template>
  <footer class="footer">
    <div class="container grid footer-top">
      <!-- Brand / About / Contact -->
      <div class="brand">
        <div class="name-row">
          <strong class="brand-name">Healthy Living</strong>
        </div>
        <p class="tagline">
          Empowering communities in Melbourne with accessible nutrition education to promote
          healthier eating habits and improve public health outcomes.
        </p>

        <ul class="contact">
          <li>
            <svg class="ico" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
              />
            </svg>
            Melbourne, Victoria, Australia
          </li>
          <li>
            <svg class="ico" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 13.2L2 6V18h20V6l-10 7.2zM12 11L2 4h20L12 11z" />
            </svg>
            <a href="mailto:info@HealthyLiving.org.au">info@HealthyLiving.org.au</a>
          </li>
          <li>Healthy Living. All rights reserved. A not-for-profit organization.</li>
          <li>
            <svg class="ico" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.24c1.2.48 2.5.74 3.8.74a1 1 0 011 1V20a1 1 0 01-1 1C11.6 21 3 12.4 3 2a1 1 0 011-1h3.3a1 1 0 011 1c0 1.3.26 2.6.74 3.8a1 1 0 01-.24 1.1l-2.2 2.2z"
              />
            </svg>
            +61 3 9XXX XXXX
          </li>
        </ul>
      </div>

      <!-- Quick Links -->
      <nav class="col">
        <h4>Quick Links</h4>
        <ul class="links">
          <li><RouterLink to="/recipes">Recipes</RouterLink></li>
          <li><RouterLink to="/meal-planner">Meal Planner</RouterLink></li>
          <li><RouterLink to="/education">Education</RouterLink></li>
          <li><RouterLink to="/about">About Us</RouterLink></li>
        </ul>
      </nav>

      <!-- Support -->
      <nav class="col">
        <h4>Support</h4>
        <ul class="links">
          <li><RouterLink to="/contact">Contact Us</RouterLink></li>
          <li><a href="#" aria-label="Privacy Policy">Privacy Policy</a></li>
          <li><a href="#" aria-label="Terms of Service">Terms of Service</a></li>
          <li><a href="#" aria-label="Accessibility statement">Accessibility</a></li>
        </ul>
      </nav>
    </div>

    <hr class="divider" />

    <div class="container footer-bottom">
      <p>
        © 2024 Healthy Living. All rights reserved.
        <span class="muted">A not-for-profit organization.</span>
      </p>
      <p class="made">
        Made with <span class="heart" aria-hidden="true">&#9829;</span> for better health
      </p>
    </div>
  </footer>
</template>

<script setup>
// FooterBar - static footer content. Keep any dynamic behaviour minimal and add scripts
// only when interactive features (e.g. newsletter signup) are required.
</script>

<style scoped>
.footer {
  background: #f3f7fa;
  border-top: 1px solid var(--line);
  padding: 32px 0 20px;
  color: #24323a;
}

.footer-top {
  grid-template-columns: 1fr;
  gap: 28px;
}
@media (min-width: 900px) {
  .footer-top {
    grid-template-columns: 1.3fr 0.7fr 0.7fr;
  }
}

.brand .name-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.brand-name {
  font-size: 22px;
}

.tagline {
  margin: 8px 0 14px;
  color: #4c6270;
}

.contact {
  list-style: none;
  display: grid;
  gap: 8px;
}
.contact .ico {
  width: 18px;
  height: 18px;
  fill: #567482;
  margin-right: 8px;
  flex: 0 0 18px;
}
.contact li {
  display: flex;
  align-items: center;
  color: #3c5663;
}
.contact a {
  text-decoration: underline;
}

.col h4 {
  margin: 0 0 10px;
  font-size: 18px;
}
.links {
  list-style: none;
  display: grid;
  gap: 8px;
}
.links a {
  color: #2c4451;
}
.links a:hover {
  text-decoration: underline;
}

.divider {
  border: none;
  border-top: 1px solid var(--line);
  margin: 18px 0;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 14px;
  color: #415a66;
}
.made {
  display: flex;
  align-items: center;
  gap: 6px;
}
.heart {
  color: #1aaa73;
}
.muted {
  color: #6b7f8a;
}
</style>
