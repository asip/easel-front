<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useLightbox } from '~/composables/ui/use-lightbox'
import type { User } from '~/interfaces/user'

const modelValue = defineModel<User>()

const { original } = defineProps<{
  original: boolean
}>()

const { initGLightbox, closeLightbox } = useLightbox()

// console.log(loginUser?.value.image_three_url)

onMounted(() => {
  if (original) {
    initGLightbox('#image')
  }
})

onUnmounted(() => {
  closeLightbox()
})
</script>

<template>
  <div
    v-if="original"
    class="flex justify-center pb-2"
  >
    <NuxtLink
      id="image"
      class="mx-auto"
      :to="`${modelValue?.image_three_url}`"
    >
      <img
        :src="`${modelValue?.image_three_url}`"
        alt=""
        class="mx-auto"
        style="width:100px;height:100px;"
      >
    </NuxtLink>
  </div>
  <div
    v-else
    class="flex justify-center pb-2"
  >
    <img
      :src="`${modelValue?.image_three_url}`"
      alt=""
      class="mx-auto"
      style="width:100px;height:100px;"
    >
  </div>
</template>
