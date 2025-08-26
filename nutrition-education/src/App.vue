<template>
  <div>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/recipes">Recipes</router-link></li>
        <li><router-link to="/meal-planner">Meal Planner</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li><router-link to="/about">About Us</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav ul {
  display: flex;
  gap: 1rem;
  list-style: none;
}
</style>
