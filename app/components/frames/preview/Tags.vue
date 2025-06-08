<script setup lang="ts">
import type { Frame } from '~/interfaces/frame'

const { list = false } = defineProps<{
  list?: boolean
}>()

const modelValue = defineModel<Frame>()

const { frameQuery, queryString, searchFrame } = useFrameSearch()

const onClick = async (tag: string) => {
  frameQuery.value.word = tag
  frameQuery.value.page = 1
  await navigateTo({ path: '/', query: queryString.value })
  await searchFrame({ more: true })
}
</script>

<template>
  <div v-if="list" class="flex justify-end mb-1 gap-1">
    <span
      v-for="(tag, idx) in modelValue?.tags"
      :key="idx"
    >
      <a href="#" @click="onClick(tag)"><span class="badge badge-outline badge-accent rounded-full">{{ tag }}</span></a>
    </span>
  </div>
  <div v-else class="flex justify-center mb-1 gap-1">
    <div
      v-for="(tag, idx) in modelValue?.tags"
      :key="idx"
    >
      <a href="#" @click="onClick(tag)"><div class="badge badge-outline badge-accent rounded-full">{{ tag }}</div></a>
    </div>
  </div>
</template>
