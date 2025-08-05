<script setup lang="ts">
import type { Frame } from '~/interfaces'

const modelValue = defineModel<Frame>()

const { original, photoswipe } = defineProps<{
  original: boolean,
  photoswipe: boolean
}>()

const { initPSLightbox, initGLightbox, closeLightbox } = useLightbox('galleryRef')

onMounted(async () => {
  if (original) {
    if (photoswipe) {
      await initPSLightbox()
    } else {
      initGLightbox('#image')
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
    class="flex justify-center mb-1"
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
    class="flex justify-center mb-1"
  >
    <img
      :src="`${modelValue?.file_three_url}`"
      alt=""
      class="mx-auto"
    >
  </div>
</template>
