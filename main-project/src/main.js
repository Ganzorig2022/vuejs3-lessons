import { createApp } from 'vue';
import { createPinia } from 'pinia'

import router from './router.js'
import App from './App.vue'
import BaseCard from './components/UI/BaseCard.vue'
import BaseButton from './components/UI/BaseButton.vue'
import BaseBadge from './components/UI/BaseBadge.vue'
import BaseSpinner from './components/UI/BaseSpinner.vue'
import BaseDialog from './components/UI/BaseDialog.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(router) // router
app.use(pinia) // global state management, store

// Global components which can be used anywhere
app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-badge', BaseBadge)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)

app.mount('#app');
