import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router_index'

createApp(App)
  .use(router)
  .mount('#app')
