import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  install (app: App) {
    app.use(ElementPlus, {
      local: zhCn
    })
    for (let [key, component] of Object.entries(ElementPlusIconsVue)) {
      if (key === 'Menu') {
        key = 'icon-menu'
      }
      app.component(key, component)
    }
  }
}
