<template>
  <div class="about">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto my-12" max-width="800">
            <v-card-title class="text-h4 font-weight-bold">
              {{ t('about.title') }}
            </v-card-title>
            <v-card-text>
              <p class="text-body-1 mb-4">
                {{ t('about.description') }}
              </p>

              <h3 class="text-h5 mb-2">{{ t('about.backend') }}</h3>
              <ul class="mb-4">
                <li><strong>FastAPI:</strong> {{ t('about.fastApi') }}</li>
                <li><strong>SQLite:</strong> {{ t('about.sqlite') }}</li>
                <li><strong>SQLAlchemy:</strong> {{ t('about.sqlalchemy') }}</li>
                <li><strong>Pydantic:</strong> {{ t('about.pydantic') }}</li>
              </ul>

              <h3 class="text-h5 mb-2">{{ t('about.frontend') }}</h3>
              <ul class="mb-4">
                <li><strong>Vue 3.5:</strong> {{ t('about.vue') }}</li>
                <li><strong>Vuetify:</strong> {{ t('about.vuetify') }}</li>
                <li><strong>TypeScript:</strong> {{ t('about.typescript') }}</li>
                <li><strong>Tailwind CSS:</strong> {{ t('about.tailwind') }}</li>
                <li><strong>Pinia:</strong> {{ t('about.pinia') }}</li>
                <li><strong>Vue Router:</strong> {{ t('about.vueRouter') }}</li>
              </ul>

              <p class="text-body-1 mt-4">
                {{ t('about.designedFor') }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" variant="flat" to="/" class="mx-auto">
                {{ t('about.backToHome') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.about {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
