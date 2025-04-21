<template>
  <v-app-bar color="primary" app>
    <v-app-bar-title>
      <router-link to="/" class="text-white text-decoration-none">
        {{ t('common.appName') }}
      </router-link>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <template v-if="authStore.isAuthenticated">
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

const authStore = useAuthStore()
const { t } = useI18n()
</script>
