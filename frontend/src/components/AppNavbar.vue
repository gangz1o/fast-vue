<template>
  <!-- 在认证页面上使用固定透明导航栏 -->
  <v-app-bar v-if="isAuthPage" color="transparent" app flat class="auth-navbar">
    <v-app-bar-title>
      <div class="d-flex align-center">
        <div class="logo-container">
          <img src="@/assets/images/logo-vector1.svg" alt="Logo" class="mr-1" height="24" />
          <img src="@/assets/images/logo-vector2.svg" alt="Logo" height="24" />
          <span class="ml-2 text-secondary font-weight-bold">Your Logo</span>
        </div>
      </div>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- 语言切换器 -->
    <language-switcher />
  </v-app-bar>

  <!-- 在非认证页面上使用正常导航栏 -->
  <v-app-bar v-else color="primary" app>
    <v-app-bar-title>
      <router-link to="/" class="text-white text-decoration-none">
        {{ t('common.appName') }}
      </router-link>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <template v-if="authStore.isAuthenticated && authStore.user">
      <v-btn to="/" text class="text-white">
        {{ t('common.home') }}
      </v-btn>
      <v-btn to="/items" text class="text-white">
        {{ t('common.items') }}
      </v-btn>
      <v-btn to="/about" text class="text-white">
        {{ t('common.about') }}
      </v-btn>

      <!-- 语言切换器 -->
      <language-switcher />

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" class="text-white">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              {{ authStore.user?.username || 'User' }}
            </v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="authStore.logout">
            <v-list-item-title>
              <v-icon class="mr-2">mdi-logout</v-icon>
              {{ t('common.logout') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <template v-else>
      <v-btn to="/about" text class="text-white">
        {{ t('common.about') }}
      </v-btn>
      <v-btn to="/login" text class="text-white">
        {{ t('common.login') }}
      </v-btn>

      <!-- 语言切换器 -->
      <language-switcher />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n()

// 检查当前路由是否是认证页面
const isAuthPage = computed(() => {
  return ['/login', '/register', '/forgot-password', '/reset-password'].includes(route.path)
})
</script>

<style scoped>
.auth-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.logo-container {
  display: flex;
  align-items: center;
  white-space: nowrap;
}
</style>
