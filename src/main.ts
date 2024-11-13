import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import './styles/index.css'

const app = createApp(App)

// 注册全局组件
app.use(naive)
app.use(router)

// 挂载应用
app.mount('#app') 