<template>
  <div v-if="props.original" id="image" ref="imageRef" class="d-flex justify-content-sm-center">
    <NuxtLink v-if="props.photoswipe" class="mx-auto" :to="`${frame?.file_url}`" data-pswp-width="" data-pswp-height="">
      <img :src="`${frame?.file_three_url}`" alt="" class="mx-auto">
    </NuxtLink>
    <NuxtLink v-else ref="luminousRef" class="mx-auto" :to="`${frame?.file_url}`">
      <img :src="`${frame?.file_three_url}`" alt="" class="mx-auto">
    </NuxtLink>
  </div>
  <div v-else class="d-flex justify-content-sm-center">
    <img :src="`${frame?.file_three_url}`" alt="" class="mx-auto">
  </div>
  <br>
</template>

<script setup lang="ts">
// @ts-ignore
import { Luminous } from 'luminous-lightbox'
// @ts-ignore
import PhotoSwipeLightbox from 'photoswipe/lightbox'
// @ts-ignore
import PhotoSwipeFullscreen from 'photoswipe-fullscreen/photoswipe-fullscreen.esm.min.js'
// import 'photoswipe/style.css';

const props = defineProps({
  original: Boolean,
  photoswipe: Boolean
})

const { frame } = inject('framer') as any

let lightbox: any

const imageRef: Ref = ref(null)
const luminousRef: Ref = ref(null)

onMounted(async () => {
  if (props.photoswipe) {
    await assignSize()

    lightbox = new PhotoSwipeLightbox({
      gallery: '#image',
      children: 'a',
      initialZoomLevel: 'fit',
      pswpModule: () => import('photoswipe')
    })
    const fullscreenPlugin = new PhotoSwipeFullscreen(lightbox)
    lightbox.init()
  } else {
    const elm = luminousRef.value
    lightbox = new Luminous(elm, { showCloseButton: true })
  }
})

onUnmounted(() => {
  if (lightbox) {
    lightbox.destroy()
    lightbox = null
  }
})

async function assignSize () {
  const gallery = imageRef.value?.querySelectorAll('a')
  for await (const el of gallery) {
    const img: HTMLImageElement = await loadImage(el.href)
    el.setAttribute('data-pswp-width', img.naturalWidth.toString())
    el.setAttribute('data-pswp-height', img.naturalHeight.toString())
    el.firstElementChild?.removeAttribute('style')
  }
}

function loadImage (src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = e => reject(e)
    img.src = src
  })
}
</script>
