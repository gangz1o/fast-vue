<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" :class="isAuthPage ? 'text-secondary' : 'text-white'">
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="changeLocale('en')">
        <v-list-item-title>
          <v-icon v-if="currentLocale === 'en'" class="mr-2">mdi-check</v-icon>
          {{ t('common.english') }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="changeLocale('zh')">
        <v-list-item-title>
          <v-icon v-if="currentLocale === 'zh'" class="mr-2">mdi-check</v-icon>
          {{ t('common.chinese') }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { setLocale } from '../i18n';
import { useRoute } from 'vue-router';

const route = useRoute();
const { t, locale } = useI18n();

const currentLocale = computed(() => locale.value);

// 检查当前路由是否是认证页面
const isAuthPage = computed(() => {
  return ['/login', '/register', '/forgot-password', '/reset-password'].includes(route.path);
});

function changeLocale(newLocale: string) {
  setLocale(newLocale);
}
</script>
