<script setup lang="ts">
const previewUrl = defineModel<string | null>()
</script>

<template>
  <img v-if="previewUrl" :src="previewUrl" alt="" class="mx-auto max-w-80 max-h-80 block" >
</template>
