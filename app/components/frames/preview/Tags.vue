<script setup lang="ts">
import type { Frame } from '~/interfaces'

const { list = false } = defineProps<{
  list?: boolean
}>()

const modelValue = defineModel<Frame>()

const { frameQuery, queryString, searchFrame } = useFrameSearch()

const onClick = async (tag: string) => {
  frameQuery.value.items.word = tag
  frameQuery.value.page = 1
  await navigateTo({ path: '/', query: queryString.value })
  await searchFrame({ more: true })
}
</script>

<template>
  <div v-if="list" class="flex justify-end flex-wrap mb-1 gap-1">
    <span
      v-for="(tag, idx) in modelValue?.tags"
      :key="idx"
    >
      <a href="#" @click.prevent="onClick(tag)"><span class="badge badge-sm badge-outline badge-accent hover:badge-primary truncate rounded-full">{{ tag }}</span></a>
    </span>
  </div>
  <div v-else class="flex justify-center flex-wrap mb-1 gap-1">
    <div
      v-for="(tag, idx) in modelValue?.tags"
      :key="idx"
    >
      <a href="#" @click.prevent="onClick(tag)"><div class="badge badge-outline badge-accent hover:badge-primary truncate rounded-full">{{ tag }}</div></a>
    </div>
  </div>
</template>
