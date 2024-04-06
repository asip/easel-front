import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VueQuill', QuillEditor)
})