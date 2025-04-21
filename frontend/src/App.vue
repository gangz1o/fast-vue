<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
</script>

<template>
  <v-app>
    <AppNavbar />

    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <div class="w-full text-center">
        &copy; {{ new Date().getFullYear() }} - FastAPI + Vue Template
      </div>
    </v-footer>
  </v-app>
</template>

<style>
/* Global styles */
</style>
