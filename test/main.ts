import { createApp } from 'vue'
import App from './app.vue'
;(window as any).process = { env: {} }

createApp(App).mount('#app')
