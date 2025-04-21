<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" class="text-white">
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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '../i18n'

const { t, locale } = useI18n()

const currentLocale = computed(() => locale.value)

function changeLocale(newLocale: string) {
  setLocale(newLocale)
}
</script>
