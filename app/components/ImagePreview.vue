<script setup lang="ts">
const previewUrl = defineModel<string | null>()
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
