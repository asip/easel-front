<script setup lang="ts">
import type { Frame } from '~/types'

const model = defineModel<Frame>()

const { list = false } = defineProps<{
  list?: boolean
}>()
</script>

<template>
  <div v-if="list" class="flex justify-center flex-wrap gap-1">
    <DisplayTagsList v-model="model" :list="list" />
  </div>
  <div v-else class="flex flex-wrap gap-1">
    <DisplayTagsList v-model="model" :list="list" />
  </div>
</template>
