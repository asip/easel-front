<template>
  <div v-if="preview_url" class="d-flex justify-content-sm-center" style="display: block;padding-bottom:5px;">
    <img :src="preview_url" alt="" class="mx-auto" style="max-width: 300px; max-height: 300px; display: block;">
    <br>
  </div>
</template>

<script setup lang="ts">
import type { Frame } from '~/interfaces/frame'
import type { User } from '~/interfaces/user'

const modelValue = defineModel<Frame | User>()

const preview_url = computed(() => modelValue.value?.preview_url)

if (modelValue.value && 'file' in modelValue.value) {
  modelValue.value.preview_url = `${modelValue.value.file_three_url}`
} else if (modelValue.value && 'image' in modelValue.value) {
  modelValue.value.preview_url = `${modelValue.value.image_three_url}`
}
</script>
