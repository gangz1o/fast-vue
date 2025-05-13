<template>
  <div class="auth-container">
    <v-container fluid class="auth-content d-flex align-center justify-center">
      <v-row justify="center" align="center" class="h-100">
        <v-col cols="12" sm="10" md="8" lg="6" xl="4">
          <v-card class="auth-card" elevation="0">
            <!-- Login Form -->
            <v-card-text class="px-6 pt-6 pb-4">
              <h1 class="auth-title mb-2">{{ t('auth.login') }}</h1>
              <p class="auth-subtitle mb-6">
                {{ t('auth.loginToAccount') || 'Login to access your account' }}
              </p>

              <v-form @submit.prevent="handleLogin" ref="form">
                <!-- Email Field -->
                <v-text-field
                  v-model="credentials.username"
                  :label="t('auth.email')"
                  variant="outlined"
                  density="comfortable"
                  class="mb-4"
                  hide-details="auto"
                  :rules="[(v) => !!v || t('auth.emailRequired')]"
                ></v-text-field>

                <!-- Password Field -->
                <v-text-field
                  v-model="credentials.password"
                  :label="t('auth.password')"
                  variant="outlined"
                  density="comfortable"
                  class="mb-2"
                  hide-details="auto"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[(v) => !!v || t('auth.passwordRequired')]"
                >
                  <template v-slot:append-inner>
                    <v-icon
                      @click="showPassword = !showPassword"
                      :icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      color="secondary"
                      size="small"
                    ></v-icon>
                  </template>
                </v-text-field>

                <!-- Remember Me and Forgot Password -->
                <div class="d-flex justify-space-between align-center mb-6">
                  <div class="d-flex align-center">
                    <v-checkbox
                      v-model="rememberMe"
                      :label="t('auth.rememberMe')"
                      color="primary"
                      hide-details
                      density="compact"
                    ></v-checkbox>
                  </div>
                  <router-link
                    to="/forgot-password"
                    class="forgot-password-link text-decoration-none"
                  >
                    {{ t('auth.forgotPassword') }}
                  </router-link>
                </div>

                <!-- Login Button -->
                <v-btn
                  color="primary"
                  type="submit"
                  block
                  :loading="authStore.loading"
                  :disabled="authStore.loading"
                  class="mb-4"
                  size="large"
                >
                  {{ t('auth.login') }}
                </v-btn>

                <!-- Sign Up Link -->
                <div class="text-center mb-6">
                  <span class="text-secondary">{{ t('auth.dontHaveAccount') }}</span>
                  <router-link to="/register" class="signup-link text-decoration-none ml-1">
                    {{ t('auth.signUp') }}
                  </router-link>
                </div>

                <!-- Or Login With Divider -->
                <div class="auth-divider mb-6">
                  <div class="auth-divider-line"></div>
                  <div class="auth-divider-text">{{ t('auth.orLoginWith') }}</div>
                  <div class="auth-divider-line"></div>
                </div>

                <!-- Social Login Buttons -->
                <div class="d-flex justify-space-between mb-4">
                  <v-btn variant="outlined" class="social-login-btn" width="30%" height="48">
                    <img
                      src="@/assets/images/facebook-icon.svg"
                      alt="Facebook"
                      width="32"
                      height="32"
                    />
                  </v-btn>
                  <v-btn variant="outlined" class="social-login-btn" width="30%" height="48">
                    <img
                      src="@/assets/images/google-icon.svg"
                      alt="Google"
                      width="32"
                      height="32"
                    />
                  </v-btn>
                  <v-btn variant="outlined" class="social-login-btn" width="30%" height="48">
                    <img src="@/assets/images/apple-icon.svg" alt="Apple" width="32" height="32" />
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Error Toast -->
    <v-snackbar v-model="showErrorToast" :timeout="3000" color="error" location="top">
      {{ errorMessage }}
      <template v-slot:actions>
        <v-btn variant="text" @click="showErrorToast = false">
          {{ t('common.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();
const form = ref<any>(null);
const showPassword = ref(false);
const showErrorToast = ref(false);
const errorMessage = ref('');
const rememberMe = ref(false);

const credentials = ref({
  username: '',
  password: '',
});

// Watch for auth store errors
watch(
  () => authStore.error,
  (newError) => {
    if (newError) {
      errorMessage.value = newError;
      showErrorToast.value = true;
    }
  },
);

async function handleLogin() {
  // Validate form
  const { valid } = await form.value.validate();
  if (!valid) {
    // Show error message if validation fails
    errorMessage.value = t('auth.fillAllFields');
    showErrorToast.value = true;
    return;
  }

  // Attempt login
  const success = await authStore.login(credentials.value);
  if (success) {
    router.push('/');
  }
}
</script>

<style scoped>
.auth-content {
  height: 100%;
  max-height: 100vh;
  padding: 0;
  margin: 0;
}

.h-100 {
  height: 100%;
}

/* 确保卡片内容不会溢出 */
.auth-card {
  max-height: 90vh;
  overflow-y: auto;
}
</style>
