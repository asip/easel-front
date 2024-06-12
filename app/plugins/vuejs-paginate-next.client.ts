// @ts-expect-error
import Paginate from 'vuejs-paginate-next'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Paginate', Paginate)
})
