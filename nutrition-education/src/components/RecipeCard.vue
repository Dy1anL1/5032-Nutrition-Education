<template>
  <article class="card" @click="$router.push(`/recipes/${recipe.id}`)">
    <img v-if="recipe.image" :src="recipe.image" :alt="recipe.title" />
    <h3>{{ recipe.title }}</h3>
    <p class="muted">{{ recipe.short }}</p>
    <ul class="tags">
      <li v-for="t in recipe.tags" :key="t">#{{ t }}</li>
    </ul>
  </article>
</template>

<script setup>
defineProps({ recipe: { type: Object, required: true } })
</script>

<style scoped>
.card{
  background:#7ebd88;
  border:1px solid var(--border);
  border-radius:12px;
  padding:14px;
  cursor:pointer;
  display:flex;
  flex-direction:column;
  gap:8px;
  box-shadow: 0 1px 2px rgba(0,0,0,.04);
  transition: box-shadow .15s ease, transform .15s ease;
}
.card:hover{
  box-shadow: 0 6px 18px rgba(0,0,0,.08);
  transform: translateY(-1px);
}

.card img{
  width:100%;
  height:160px;
  object-fit:cover;
  border-radius:8px;
  background:#f3f4f6;
}

h3{ margin: 2px 0 0; color: var(--text); font-size: 1.05rem; }
.muted{ color: var(--muted); font-size: .92rem; }

.tags{
  display:flex; flex-wrap:wrap; gap:6px; margin:4px 0 0; padding:0; list-style:none;
}
.tags li{
  background:#f3f4f6;
  color:#374151;
  padding:2px 8px;
  border-radius:999px;
  font-size:12px;
}

</style>
