import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router-index'
import { createPinia } from 'pinia'
import elementPlus from '@/plugins/element-plus'
import '@/styles/index.scss'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(elementPlus)
  .mount('#app')
