<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useLightbox } from '~/composables/ui/use-lightbox'
import type { User } from '~/interfaces/user'

const modelValue = defineModel<User>()

const { original } = defineProps<{
  original: boolean
}>()

const { initLMLightbox, closeLightbox } = useLightbox('galleryRef')

// console.log(login_user?.value.image_three_url)

onMounted(() => {
  if (original) {
    initLMLightbox()
  }
})

onUnmounted(() => {
  closeLightbox()
})
</script>

<template>
  <div
    v-if="original"
    class="d-flex justify-content-sm-center"
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
    class="d-flex justify-content-sm-center"
  >
    <img
      :src="`${modelValue?.image_three_url}`"
      alt=""
      class="mx-auto"
      style="width:100px;height:100px;"
    >
  </div>
  <br>
</template>
