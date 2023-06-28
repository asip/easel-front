<template>
  <div v-if="props.original" id="image" ref="root" class="d-flex justify-content-sm-center">
    <NuxtLink v-if="props.photoswipe" class="mx-auto" :to="`${backendOriginURL}${frame?.file_url}`" data-pswp-width="" data-pswp-height="">
      <img :src="`${backendOriginURL}${frame?.file_three_url}`" alt="" class="mx-auto">
    </NuxtLink>
    <NuxtLink v-else class="mx-auto" name="lm" :to="`${backendOriginURL}${frame?.file_url}`">
      <img :src="`${backendOriginURL}${frame?.file_three_url}`" alt="" class="mx-auto">
    </NuxtLink>
  </div>
  <div v-else class="d-flex justify-content-sm-center">
    <img :src="`${backendOriginURL}${frame?.file_three_url}`" alt="" class="mx-auto">
  </div>
  <br>
</template>

<script setup lang="ts">
// @ts-ignore
import { Luminous } from 'luminous-lightbox'
// @ts-ignore
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import PhotoSwipeFullscreen from 'photoswipe-fullscreen/photoswipe-fullscreen.esm.min.js'
// import 'photoswipe/style.css';

const props = defineProps({
  original: Boolean,
  photoswipe: Boolean
})

const { frame } = inject('framer') as any

const { backendOriginURL } = useConstants()

let lightbox: any

const root: Ref = ref(null)

onMounted(() => {
  if (props.photoswipe) {
    assignSize()

    lightbox = new PhotoSwipeLightbox({
      gallery: '#image',
      children: 'a',
      initialZoomLevel: 'fit',
      pswpModule: () => import('photoswipe')
    })
    const fullscreenPlugin = new PhotoSwipeFullscreen(lightbox) // eslint-disable-line @typescript-eslint/no-unused-vars
    lightbox.init()
  } else {
    const elm = document.querySelector('[name="lm"]')
    lightbox = new Luminous(elm, { showCloseButton: true })
  }
})

onUnmounted(() => {
  if (lightbox) {
    lightbox.destroy()
    lightbox = null
  }
})

function assignSize () {
  const gallery = root.value?.querySelectorAll('a')
  gallery?.forEach(async (el: any) => {
    const img: any = await loadImage(el.href)
    el.setAttribute('data-pswp-width', img.naturalWidth)
    el.setAttribute('data-pswp-height', img.naturalHeight)
    el.firstElementChild.removeAttribute('style')
  })
}

function loadImage (src: any) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = e => reject(e)
    img.src = src
  })
}
</script>
