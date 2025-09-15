import PhotoSwipeLightbox from 'photoswipe/lightbox'
// @ts-expect-error
import PhotoSwipeFullscreen from 'photoswipe-fullscreen/photoswipe-fullscreen.esm.min.js'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('psLightbox', PhotoSwipeLightbox)
  nuxtApp.provide('psFullscreen', PhotoSwipeFullscreen)
})
