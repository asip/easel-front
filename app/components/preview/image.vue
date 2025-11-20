<script setup lang="ts">
import type { Frame, User } from '~/interfaces'

const modelValue = defineModel<Frame | User>()

const { original = false, photoswipe = false, small = false } = defineProps<{
  original?: boolean,
  photoswipe?: boolean,
  small?: boolean
}>()

const { initPSLightbox, initGLightbox, closeLightbox } = useLightbox()

const linkURL = computed<string | undefined>(() => {
  if (modelValue.value && 'file_url' in modelValue.value) return `${modelValue?.value.file_url}`
  if (modelValue.value && 'image_url' in modelValue.value) return `${modelValue?.value.image_url}`
})

const imgURL = computed<string | undefined>(() => {
  if (modelValue.value && 'file_three_url' in modelValue.value) return `${modelValue?.value.file_three_url}`
  if (modelValue.value && 'image_one_url' in modelValue.value) return `${modelValue?.value.image_one_url}`
})

onMounted(async () => {
  if (original) {
    if (photoswipe) {
      await initPSLightbox({ selector: '#gallery' })
    } else {
      initGLightbox({ selector: '#image' })
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
  >
    <NuxtLink
      v-if="photoswipe"
      class="mx-auto"
      :to="linkURL"
      data-pswp-width=""
      data-pswp-height=""
    >
      <img
        v-if="small"
        :src="imgURL"
        alt=""
        class="mx-auto w-[100px] h-[100px]"
      >
      <img
        v-else
        :src="imgURL"
        alt=""
        class="mx-auto"
      >
    </NuxtLink>
    <NuxtLink
      v-else
      id="image"
      class="mx-auto"
      :to="linkURL"
    >
      <img
        v-if="small"
        :src="imgURL"
        alt=""
        class="mx-auto w-[100px] h-[100px]"
      >
      <img
        v-else
        :src="imgURL"
        alt=""
        class="mx-auto"
      >
    </NuxtLink>
  </div>
  <img
    v-else-if="small"
    :src="imgURL"
    alt=""
    class="mx-auto w-[100px] h-[100px]"
  >
  <img
    v-else
    :src="imgURL"
    alt=""
    class="mx-auto"
  >
</template>
