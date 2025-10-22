import { QuillyEditor } from 'vue-quilly'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('QuillyEditor', QuillyEditor)
})
