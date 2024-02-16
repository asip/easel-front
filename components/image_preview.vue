<template>
  <div v-if="model?.preview_url" class="d-flex justify-content-sm-center" style="display: block;padding-bottom:5px;">
    <img :src="model.preview_url" alt="" class="mx-auto" style="max-width: 300px; max-height: 300px; display: block;">
    <br>
  </div>
</template>

<script setup lang="ts">
import type { Frame } from '~/interfaces/frame'
import type { User } from '~/interfaces/user'

const props = defineProps<{
  model: Frame | User
}>()

const model = computed(() => {
  return props.model
})

if ('file' in model.value) {
  model.value.preview_url = `${model.value.file_three_url}`
} else if ('image' in model.value) {
  model.value.preview_url = `${model.value.image_three_url}`
}
</script>
