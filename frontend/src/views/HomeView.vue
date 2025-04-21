<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto my-12" max-width="800">
            <v-card-title class="text-h4 font-weight-bold">
              {{ t('common.appName') }}
            </v-card-title>
            <v-card-text>
              <p class="text-body-1 mb-4">
                {{ t('home.welcome') }} {{ t('home.templateIncludes') }}
              </p>
              <v-list>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon color="primary" class="mr-2">mdi-server</v-icon>
                    {{ t('home.fastApiBackend') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon color="primary" class="mr-2">mdi-database</v-icon>
                    {{ t('home.sqliteDatabase') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon color="primary" class="mr-2">mdi-vuejs</v-icon>
                    {{ t('home.vueFramework') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon color="primary" class="mr-2">mdi-material-design</v-icon>
                    {{ t('home.vuetifyComponents') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon color="primary" class="mr-2">mdi-language-typescript</v-icon>
                    {{ t('home.typescriptSupport') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon color="primary" class="mr-2">mdi-tailwind</v-icon>
                    {{ t('home.tailwindCss') }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                variant="flat"
                to="/items"
                class="mx-auto"
              >
                {{ t('home.goToItems') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.home {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
