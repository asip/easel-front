<template>
  <div v-if="model?.preview_url" class="d-flex justify-content-sm-center" style="display: block;padding-bottom:5px;">
    <img :src="model.preview_url" alt="" class="mx-auto" style="max-width: 300px; max-height: 300px; display: block;">
    <br>
  </div>
</template>

<script setup lang="ts">
import type { Frame } from '~/interfaces/frame'
import type { User } from '~/interfaces/user'

const model = inject('model') as Frame | User

if (model) {
  if ('file' in model) {
    model.preview_url = `${model?.file_three_url}`
  } else if ('image' in model) {
    model.preview_url = `${model?.image_three_url}`
  }
}
</script>
