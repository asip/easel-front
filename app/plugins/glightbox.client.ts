import GLightbox from 'glightbox';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('gLightbox', GLightbox)
})