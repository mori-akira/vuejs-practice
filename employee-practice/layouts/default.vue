<template>
  <div class="layout">
    <AppHeader />
    <Navigation />
    <div class="content">
      <main>
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppHeader from "~/components/common/AppHeader.vue";
import Navigation from "~/components/common/AppNavigation.vue";
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
}

main {
  padding: 1rem;
}
</style>
