import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import i18n from './i18n'

// Import styles
import './style.css'

// 配置 axios 默认值
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5173'

// 创建 Pinia 存储
const pinia = createPinia()

const app = createApp(App)

// 使用插件
app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(i18n)

// 挂载应用
app.mount('#app')

// 导入认证存储以在应用启动时初始化
import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()

// 如果有令牌，尝试获取用户信息
if (authStore.token) {
  authStore.fetchUserInfo()
}
