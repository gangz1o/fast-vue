<template>
  <div class="language-switcher">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          variant="text"
          v-bind="props"
          size="small"
          class="language-btn"
        >
          <v-icon class="mr-1">mdi-translate</v-icon>
          {{ currentLanguage }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(lang, i) in languages"
          :key="i"
          @click="changeLanguage(lang.code)"
        >
          <v-list-item-title>{{ lang.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '../i18n'

const { locale, t } = useI18n()

const languages = [
  { code: 'en', name: t('common.english') },
  { code: 'zh', name: t('common.chinese') }
]

const currentLanguage = computed(() => {
  return locale.value === 'en' ? t('common.english') : t('common.chinese')
})

function changeLanguage(lang: string) {
  setLocale(lang)
}
</script>

<style scoped>
.language-switcher {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

.language-btn {
  color: #313131;
  opacity: 0.7;
}

.language-btn:hover {
  opacity: 1;
}
</style>
