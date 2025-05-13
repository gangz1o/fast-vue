<template>
  <div class="auth-container">
    <v-container fluid class="auth-content d-flex align-center justify-center">
      <v-row justify="center" align="center" class="h-100">
        <v-col cols="12" sm="10" md="8" lg="6" xl="4">
          <v-card class="auth-card" elevation="0">
            <!-- Verify Code Form -->
            <v-card-text v-if="!codeVerified" class="px-6 pt-6 pb-4">
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

              <h1 class="auth-title mb-2">{{ t('auth.verifyCode') }}</h1>
              <p class="auth-subtitle mb-6">{{ t('auth.verifyCodeSubtitle') }}</p>

              <v-form @submit.prevent="handleVerifyCode" ref="verifyForm">
                <!-- Code Field -->
                <v-text-field
                  v-model="verificationCode"
                  :label="t('auth.enterCode')"
                  variant="outlined"
                  density="comfortable"
                  class="mb-2"
                  hide-details="auto"
                  :rules="[(v) => !!v || 'Verification code is required']"
                >
                  <template v-slot:append-inner>
                    <v-icon icon="mdi-eye" color="secondary" size="small"></v-icon>
                  </template>
                </v-text-field>

                <!-- Didn't receive code -->
                <div class="text-center mb-6">
                  <span class="text-secondary">{{ t('auth.didntReceiveCode') }}</span>
                  <a
                    href="#"
                    @click.prevent="resendCode"
                    class="forgot-password-link text-decoration-none ml-1"
                  >
                    {{ t('auth.resend') }}
                  </a>
                </div>

                <!-- Verify Button -->
                <v-btn
                  color="primary"
                  type="submit"
                  block
                  :loading="loading"
                  :disabled="loading"
                  class="mb-6"
                  size="large"
                >
                  {{ t('auth.submit') }}
                </v-btn>
              </v-form>
            </v-card-text>

            <!-- Reset Password Form -->
            <v-card-text v-else class="px-6 pt-6 pb-4">
              <h1 class="auth-title mb-2">{{ t('auth.resetPassword') }}</h1>
              <p class="auth-subtitle mb-6">{{ t('auth.resetPasswordSubtitle') }}</p>

              <v-form @submit.prevent="handleResetPassword" ref="resetForm">
                <!-- New Password Field -->
                <v-text-field
                  v-model="newPassword"
                  :label="t('auth.newPassword')"
                  variant="outlined"
                  density="comfortable"
                  class="mb-4"
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

                <!-- Confirm New Password Field -->
                <v-text-field
                  v-model="confirmNewPassword"
                  :label="t('auth.confirmNewPassword')"
                  variant="outlined"
                  density="comfortable"
                  class="mb-6"
                  hide-details="auto"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :rules="[
                    (v) => !!v || t('auth.confirmPasswordRequired'),
                    (v) => v === newPassword || t('auth.passwordsDoNotMatch'),
                  ]"
                >
                  <template v-slot:append-inner>
                    <v-icon
                      @click="showConfirmPassword = !showConfirmPassword"
                      :icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      color="secondary"
                      size="small"
                    ></v-icon>
                  </template>
                </v-text-field>

                <!-- Reset Button -->
                <v-btn
                  color="primary"
                  type="submit"
                  block
                  :loading="loading"
                  :disabled="loading"
                  class="mb-6"
                  size="large"
                >
                  {{ t('auth.resetPassword') }}
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Toast Messages -->
    <v-snackbar v-model="showToast" :timeout="3000" :color="toastColor" location="top">
      {{ toastMessage }}
      <template v-slot:actions>
        <v-btn variant="text" @click="showToast = false">
          {{ t('common.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();
const verifyForm = ref<any>(null);
const resetForm = ref<any>(null);
const loading = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const toastColor = ref('info');
const codeVerified = ref(false);

// Verification code step
const verificationCode = ref('');

// Reset password step
const newPassword = ref('');
const confirmNewPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Mock function to verify code
async function handleVerifyCode() {
  // Validate form
  const { valid } = await verifyForm.value.validate();
  if (!valid) {
    showToast.value = true;
    toastMessage.value = t('auth.fillAllFields');
    toastColor.value = 'error';
    return;
  }

  loading.value = true;

  // Simulate API call
  setTimeout(() => {
    loading.value = false;

    // For demo purposes, any code is accepted
    codeVerified.value = true;

    showToast.value = true;
    toastMessage.value = 'Code verified successfully';
    toastColor.value = 'success';
  }, 1500);
}

// Mock function to resend code
function resendCode() {
  showToast.value = true;
  toastMessage.value = 'A new verification code has been sent to your email';
  toastColor.value = 'info';
}

// Mock function to reset password
async function handleResetPassword() {
  // Validate form
  const { valid } = await resetForm.value.validate();
  if (!valid) {
    showToast.value = true;
    toastMessage.value = t('auth.fillAllFields');
    toastColor.value = 'error';
    return;
  }

  loading.value = true;

  // Simulate API call
  setTimeout(() => {
    loading.value = false;

    showToast.value = true;
    toastMessage.value = 'Password has been reset successfully';
    toastColor.value = 'success';

    // Redirect to login after successful password reset
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  }, 1500);
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
