<script lang="ts" setup>
const { messages } = defineProps<{ messages: string[] | undefined }>()
</script>

<template>
  <div v-for="message of messages" :key="message" class="flex mt-0.5">
    <div class="text-red-500 text-xs">{{ message }}</div>
  </div>
</template>
