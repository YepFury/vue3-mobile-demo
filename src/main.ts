import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全量引入组件库
import vant from 'vant'
import 'vant/lib/index.css'

createApp(App).use(vant).use(store).use(router).mount('#app')
