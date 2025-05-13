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

interface RegisterCredentials {
  username: string
  email: string
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
    // 如果没有token，清除用户状态并返回Promise.reject
    if (!token.value) {
      user.value = null
      return Promise.reject(new Error('No authentication token'))
    }

    try {
      const response = await axios.get('/api/users/me')
      user.value = response.data
      return user.value
    } catch (err) {
      console.error('Error fetching user info:', err)
      // 静默处理错误，不自动登出，让调用者决定如何处理
      user.value = null
      token.value = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      return Promise.reject(err)
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    router.push('/login')
  }

  async function register(credentials: RegisterCredentials) {
    loading.value = true
    error.value = null

    try {
      // Register the user
      await axios.post('/api/register', credentials)

      // After successful registration, login with the new credentials
      const loginSuccess = await login({
        username: credentials.username,
        password: credentials.password
      })

      return loginSuccess
    } catch (err: any) {
      console.error('Registration error:', err)
      error.value = err.response?.data?.detail || t('auth.registerFailed')
      return false
    } finally {
      loading.value = false
    }
  }

  async function requestPasswordReset(email: string) {
    loading.value = true
    error.value = null

    try {
      // This is a mock function since we don't have a real backend endpoint for this
      // In a real application, you would call an API endpoint
      console.log('Password reset requested for:', email)

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      return true
    } catch (err: any) {
      console.error('Password reset request error:', err)
      error.value = err.response?.data?.detail || 'Failed to request password reset'
      return false
    } finally {
      loading.value = false
    }
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
    register,
    requestPasswordReset,
    fetchUserInfo
  }
})
