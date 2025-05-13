<template>
  <div class="auth-container">
    <v-container fluid class="auth-content d-flex align-center justify-center">
      <v-row justify="center" align="center" class="h-100">
        <v-col cols="12" sm="10" md="8" lg="6" xl="4">
          <v-card class="auth-card" elevation="0">
            <!-- Forgot Password Form -->
            <v-card-text class="px-6 pt-6 pb-4">
              <!-- Back to Login Link -->
              <div class="d-flex align-center mb-4">
                <v-btn
                  icon
                  variant="text"
                  density="comfortable"
                  class="mr-2"
                  @click="router.push('/login')"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <span class="text-secondary">{{ t('auth.backToLogin') }}</span>
              </div>

              <h1 class="auth-title mb-2">{{ t('auth.forgotPasswordTitle') }}</h1>
              <p class="auth-subtitle mb-6">{{ t('auth.forgotPasswordSubtitle') }}</p>

              <v-form @submit.prevent="handleForgotPassword" ref="form">
                <!-- Email Field -->
                <v-text-field
                  v-model="email"
                  :label="t('auth.email')"
                  variant="outlined"
                  density="comfortable"
                  class="mb-6"
                  hide-details="auto"
                  :rules="[(v) => !!v || t('auth.emailRequired')]"
                ></v-text-field>

                <!-- Submit Button -->
                <v-btn
                  color="primary"
                  type="submit"
                  block
                  :loading="authStore.loading"
                  :disabled="authStore.loading"
                  class="mb-6"
                  size="large"
                >
                  {{ t('auth.submit') }}
                </v-btn>

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

    <!-- Success Toast -->
    <v-snackbar v-model="showSuccessToast" :timeout="3000" color="success" location="top">
      {{ successMessage }}
      <template v-slot:actions>
        <v-btn variant="text" @click="showSuccessToast = false">
          {{ t('common.close') }}
        </v-btn>
      </template>
    </v-snackbar>

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
const showErrorToast = ref(false);
const errorMessage = ref('');
const showSuccessToast = ref(false);
const successMessage = ref('');
const email = ref('');

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

async function handleForgotPassword() {
  // Validate form
  const { valid } = await form.value.validate();
  if (!valid) {
    // Show error message if validation fails
    errorMessage.value = t('auth.fillAllFields');
    showErrorToast.value = true;
    return;
  }

  // Attempt to request password reset
  const success = await authStore.requestPasswordReset(email.value);
  if (success) {
    // Show success message
    successMessage.value = 'Password reset link has been sent to your email';
    showSuccessToast.value = true;

    // In a real application, you might redirect to a verification page
    // For now, we'll just redirect back to login after a delay
    setTimeout(() => {
      router.push('/login');
    }, 3000);
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
