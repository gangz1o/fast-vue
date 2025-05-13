<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue';
import { computed, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from './stores/auth';
import axios from 'axios';

const route = useRoute();
const authStore = useAuthStore();
const appReady = ref(false);

// Check if the current route is an auth page
const isAuthPage = computed(() => {
  return ['/login', '/register', '/forgot-password', '/reset-password'].includes(route.path);
});

// 监听认证页面状态变化，添加或移除body的auth-page类
watch(
  isAuthPage,
  (newValue) => {
    if (newValue) {
      document.body.classList.add('auth-page');
    } else {
      document.body.classList.remove('auth-page');
    }
  },
  { immediate: true },
);

// 确保认证状态已加载完成
onMounted(async () => {
  try {
    // 检查本地存储中是否有token
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      // 如果有token，设置axios默认头部
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      // 尝试获取用户信息
      await authStore.fetchUserInfo();
    } else {
      // 如果没有token，确保用户状态为null
      authStore.user = null;
    }
  } catch (error) {
    console.log('User not authenticated or error fetching user info');
    // 确保清除任何可能的认证状态
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    authStore.user = null;
    authStore.token = null;
  } finally {
    // 无论成功或失败，都标记应用程序已准备好
    setTimeout(() => {
      appReady.value = true;
    }, 200); // 增加延迟确保状态已完全更新
  }
});
</script>

<template>
  <v-app>
    <!-- 应用程序加载完成后显示内容 -->
    <template v-if="appReady">
      <!-- Show navbar on all pages -->
      <AppNavbar />

      <v-main>
        <router-view />
      </v-main>

      <!-- Only show footer on non-auth pages -->
      <v-footer app v-if="!isAuthPage">
        <div class="w-full text-center">
          &copy; {{ new Date().getFullYear() }} - FastAPI + Vue Template
        </div>
      </v-footer>
    </template>

    <!-- 加载中状态 -->
    <template v-else>
      <div class="loading-container">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
    </template>
  </v-app>
</template>

<style>
/* Loading styles */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

/* Global styles */
</style>
