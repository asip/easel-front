<script setup lang="ts">
import type { Frame, User } from '~/types'

const model = defineModel<Frame | User>()

const {
  original = false,
  photoswipe = false,
  small = false,
} = defineProps<{
  original?: boolean
  photoswipe?: boolean
  small?: boolean
}>()

const linkURL = computed<string | undefined>(() => {
  if (!original) return undefined

  if (model.value && 'file_url' in model.value) {
    return `${model?.value.file_url}`
  } else if (model.value && 'image_url' in model.value) {
    return `${model?.value.image_url}`
  } else {
    return undefined
  }
})

const imgURL = computed<string | undefined>(() => {
  if (model.value && 'file_three_url' in model.value) {
    return `${model?.value.file_three_url}`
  } else if (model.value && 'image_one_url' in model.value) {
    return `${model?.value.image_one_url}`
  } else {
    return undefined
  }
})
</script>

<template>
  <PhotoSwipe v-if="photoswipe" :img-url="imgURL" :link-url="linkURL" :small />
  <GLightbox v-else :img-url="imgURL" :link-url="linkURL" :small />
</template>
