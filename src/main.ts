import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import './assets/main.less';

createApp(App).use(i18n).mount('#app')
