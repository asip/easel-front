<script setup lang="ts">
const { tag, list = false } = defineProps<{
  tag: string
  list?: boolean
}>()
</script>

<template>
  <span
    v-if="list"
    class="badge badge-sm badge-outline badge-accent hover:badge-primary truncate rounded-full"
  >
    {{ tag }}
  </span>
  <div v-else class="badge badge-outline badge-accent hover:badge-primary truncate rounded-full">
    {{ tag }}
  </div>
</template>
