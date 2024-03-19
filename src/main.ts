import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:uno.css'
import router from './router';
import store from '@/stores';



createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
