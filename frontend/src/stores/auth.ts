import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

interface User {
  id: number
  username: string
  email: string | null
  is_active: boolean
  is_admin: boolean
}

interface LoginCredentials {
  username: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const { t } = useI18n()
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 从本地存储加载令牌
  const storedToken = localStorage.getItem('token')
  if (storedToken) {
    token.value = storedToken
    // 设置 axios 默认头部
    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
  }

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.is_admin || false)

  async function login(credentials: LoginCredentials) {
    loading.value = true
    error.value = null

    try {
      const formData = new FormData()
      formData.append('username', credentials.username)
      formData.append('password', credentials.password)

      const response = await axios.post('/api/token', formData)
      const { access_token } = response.data

      // 保存令牌
      token.value = access_token
      localStorage.setItem('token', access_token)

      // 设置 axios 默认头部
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

      // 获取用户信息
      await fetchUserInfo()

      return true
    } catch (err: any) {
      console.error('Login error:', err)
      error.value = err.response?.data?.detail || t('auth.loginFailed')
      return false
    } finally {
      loading.value = false
    }
  }

  async function fetchUserInfo() {
    if (!token.value) return

    try {
      const response = await axios.get('/api/users/me')
      user.value = response.data
    } catch (err) {
      console.error('Error fetching user info:', err)
      logout()
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    router.push('/login')
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    fetchUserInfo
  }
})
