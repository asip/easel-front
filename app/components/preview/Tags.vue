<script setup lang="ts">
import type { Frame } from '~/interfaces'

const { list = false } = defineProps<{
  list?: boolean
}>()

const modelValue = defineModel<Frame>()

const { frameQuery, queryMap } = useFrameSearch()

const onClick = async (tag: string) => {
  frameQuery.value.items.tag_name = tag
  frameQuery.value.page = 1
  await navigateTo({ path: '/', query: queryMap.value })
}
</script>

<template>
  <div v-if="list" class="flex justify-center flex-wrap gap-1">
    <div
      v-for="(tag, idx) in modelValue?.tag_list"
      :key="idx"
    >
      <a href="#" @click.prevent="onClick(tag)"><span class="badge badge-sm badge-outline badge-accent hover:badge-primary truncate rounded-full">{{ tag }}</span></a>
    </div>
  </div>
  <div v-else class="flex flex-wrap gap-1">
    <div
      v-for="(tag, idx) in modelValue?.tag_list"
      :key="idx"
    >
      <a href="#" @click.prevent="onClick(tag)"><div class="badge badge-outline badge-accent hover:badge-primary truncate rounded-full">{{ tag }}</div></a>
    </div>
  </div>
</template>
