<template>
  <div class="login-view">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="mx-auto my-12">
            <v-card-title class="text-h4 font-weight-bold text-center py-6">
              {{ t('auth.login') }}
            </v-card-title>

            <v-card-text>

              <v-form @submit.prevent="handleLogin" ref="form">
                <v-text-field
                  v-model="credentials.username"
                  :label="t('auth.username')"
                  prepend-icon="mdi-account"
                  required
                  :rules="[v => !!v || t('auth.usernameRequired')]"
                ></v-text-field>

                <v-text-field
                  v-model="credentials.password"
                  :label="t('auth.password')"
                  prepend-icon="mdi-lock"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  :rules="[v => !!v || t('auth.passwordRequired')]"
                >
                  <template v-slot:append-inner>
                    <v-icon
                      @click="showPassword = !showPassword"
                      :icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    ></v-icon>
                  </template>
                </v-text-field>

                <div class="text-center mt-6">
                  <v-btn
                    color="primary"
                    type="submit"
                    block
                    :loading="authStore.loading"
                    :disabled="authStore.loading"
                  >
                    {{ t('auth.login') }}
                  </v-btn>
                </div>
              </v-form>

              <div class="text-center mt-4">
                <p class="text-body-2">
                  {{ t('auth.defaultCredentials') }}
                </p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- 错误消息提示 -->
    <v-snackbar
      v-model="showErrorToast"
      :timeout="3000"
      color="error"
      location="top"
    >
      {{ errorMessage }}
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="showErrorToast = false"
        >
          {{ t('common.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()
const form = ref<any>(null)
const showPassword = ref(false)
const showErrorToast = ref(false)
const errorMessage = ref('')

const credentials = ref({
  username: '',
  password: ''
})

// 监听认证存储中的错误
watch(() => authStore.error, (newError) => {
  if (newError) {
    errorMessage.value = newError
    showErrorToast.value = true
  }
})

async function handleLogin() {
  // 验证表单
  const { valid } = await form.value.validate()
  if (!valid) {
    // 如果表单验证失败，显示错误消息
    errorMessage.value = t('auth.fillAllFields')
    showErrorToast.value = true
    return
  }

  // 尝试登录
  const success = await authStore.login(credentials.value)
  if (success) {
    router.push('/')
  }
}
</script>

<style scoped>
.login-view {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
