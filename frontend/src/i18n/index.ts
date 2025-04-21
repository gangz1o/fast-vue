import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'

// 从本地存储中获取语言设置，如果没有则默认为英文
const storedLocale = localStorage.getItem('locale') || 'en'

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: storedLocale, // 设置默认语言
  fallbackLocale: 'en', // 设置回退语言
  messages: {
    en,
    zh
  }
})

export default i18n

// 导出一个切换语言的函数
export function setLocale(locale: string) {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.querySelector('html')?.setAttribute('lang', locale)
}
