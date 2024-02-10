<template>
  <div v-if="props.original" id="gallery" ref="galleryRef" class="d-flex justify-content-sm-center">
    <NuxtLink v-if="props.photoswipe" class="mx-auto" :to="`${frame?.file_url}`" data-pswp-width="" data-pswp-height="">
      <img :src="`${frame?.file_three_url}`" alt="" class="mx-auto">
    </NuxtLink>
    <NuxtLink v-else id="image" class="mx-auto" :to="`${frame?.file_url}`">
      <img :src="`${frame?.file_three_url}`" alt="" class="mx-auto">
    </NuxtLink>
  </div>
  <div v-else class="d-flex justify-content-sm-center">
    <img :src="`${frame?.file_three_url}`" alt="" class="mx-auto">
  </div>
  <br>
</template>

<script setup lang="ts">
import { useLightbox } from '~/composables/ui/use_lightbox'
import type { Frame } from '~/interfaces/frame'

const props = defineProps<{
  original: boolean,
  photoswipe: boolean
  frame: Frame
}>()

const { galleryRef, initPSLightbox, initLMLightbox, closeLightbox } = useLightbox()

onMounted(async () => {
  if (props.original) {
    if (props.photoswipe) {
      await initPSLightbox()
    } else {
      initLMLightbox()
    }
  }
})

onUnmounted(() => {
  closeLightbox()
})
</script>
