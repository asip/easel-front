<script setup lang="ts">
const previewUrl = defineModel<string | null>()
</script>

<template>
  <div
    v-if="previewUrl"
    class="justify-center block"
  >
    <img
      :src="previewUrl"
      alt=""
      class="mx-auto max-w-[300px] max-h-[300px] block"
    >
  </div>
</template>
