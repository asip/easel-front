<script setup lang="ts">
import type { Frame, User } from '~/interfaces'

const modelValue = defineModel<Frame | User>()

const previewUrl = computed(() => {
  if (modelValue.value && 'file' in modelValue.value) {
    if (!modelValue.value.file) {
      return `${modelValue.value.file_three_url}`
    } else {
      return modelValue.value.preview_url
    }
  } else if (modelValue.value && 'image' in modelValue.value) {
    if (!modelValue.value.image) {
      return `${modelValue.value.image_three_url}`
    } else {
      return modelValue.value.preview_url
    }
  }
})
</script>

<template>
  <div
    v-if="previewUrl"
    class="flex justify-center"
    style="display: block;"
  >
    <img
      :src="previewUrl"
      alt=""
      class="mx-auto"
      style="max-width: 300px; max-height: 300px; display: block;"
    >
  </div>
</template>
