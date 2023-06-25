import { createApp, h } from 'vue'
import VuePreview from './VuePreview.vue'
;(window as any).process = { env: {} }

const App = {
  setup() {
    return () =>
      h(VuePreview, {
        ssr: true,
      })
  },
}

createApp(App).mount('#app')
