import Tagify from '@yaireo/tagify'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('tagify', Tagify)
})
