import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createI18n } from 'vue-i18n'
import en from './localization/en.json'
import sr from './localization/sr.json'

const app = createApp(App)

const i18n = createI18n({
  locale: 'sr',
  fallbackLocale: 'sr',
  messages: {
    en: en,
    sr: sr,
  },
})

app.use(router)
app.use(i18n)

app.mount('#app')
