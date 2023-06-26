<template>
  <div v-if="props.original" id="image" class="d-flex justify-content-sm-center">
    <NuxtLink v-if="props.spotlight" class="mx-auto" :to="`${backendOriginURL}${frame?.file_url}`" data-pswp-width="" data-pswp-height="">
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
// import 'photoswipe/style.css';

const props = defineProps({
  original: Boolean,
  spotlight: Boolean
})

const { frame } = inject('framer') as any

const { backendOriginURL } = useConstants()

let lightbox: any

onMounted(() => {
  if (props.spotlight) {
    const gallery = document.querySelectorAll('#image > a')
    gallery.forEach((el: any) => {
      loadImage(el.href).then((img: any) => {
        el.setAttribute('data-pswp-width', img.naturalWidth)
        el.setAttribute('data-pswp-height', img.naturalHeight)
        el.firstElementChild.removeAttribute('style')
      })
    })

    lightbox = new PhotoSwipeLightbox({
      gallery: '#image',
      children: 'a',
      initialZoomLevel: 'fit',
      pswpModule: () => import('photoswipe')
    })
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

function loadImage (src: any) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = e => reject(e)
    img.src = src
  })
}
</script>
