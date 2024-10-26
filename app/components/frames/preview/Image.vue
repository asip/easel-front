<script setup lang="ts">
import { useLightbox } from '~/composables/ui/use-lightbox'
import type { Frame } from '~/interfaces/frame'

const modelValue = defineModel<Frame>()

const { original, photoswipe } = defineProps<{
  original: boolean,
  photoswipe: boolean
}>()

const { galleryRef, initPSLightbox, initLMLightbox, closeLightbox } = useLightbox('galleryRef')

onMounted(async () => {
  if (original) {
    if (photoswipe) {
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

<template>
  <div
    v-if="original"
    id="gallery"
    ref="galleryRef"
    class="d-flex justify-content-sm-center"
  >
    <NuxtLink
      v-if="photoswipe"
      class="mx-auto"
      :to="`${modelValue?.file_url}`"
      data-pswp-width=""
      data-pswp-height=""
    >
      <img
        :src="`${modelValue?.file_three_url}`"
        alt=""
        class="mx-auto"
      >
    </NuxtLink>
    <NuxtLink
      v-else
      id="image"
      class="mx-auto"
      :to="`${modelValue?.file_url}`"
    >
      <img
        :src="`${modelValue?.file_three_url}`"
        alt=""
        class="mx-auto"
      >
    </NuxtLink>
  </div>
  <div
    v-else
    class="d-flex justify-content-sm-center"
  >
    <img
      :src="`${modelValue?.file_three_url}`"
      alt=""
      class="mx-auto"
    >
  </div>
  <br>
</template>
