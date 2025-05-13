import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import i18n from './i18n';

// Import styles
import './style.css';

// 配置 axios 默认值
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

// 注意：不在这里设置认证头部，而是在 App.vue 中的 onMounted 钩子中处理
// 这样可以避免在应用初始化时出现闪烁问题

// 创建 Pinia 存储
const pinia = createPinia();

const app = createApp(App);

// 使用插件
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(i18n);

// 挂载应用
app.mount('#app');
