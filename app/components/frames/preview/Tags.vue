<script setup lang="ts">
import type { Frame } from '~/interfaces/frame'

const { list = false } = defineProps<{
  list?: boolean
}>()

const modelValue = defineModel<Frame>()

const { frame_query, queryString, searchFrame } = useFrameSearch()

const onClick = async (tag: string) => {
  frame_query.value.word = tag
  frame_query.value.page = 1
  await searchFrame()
  await navigateTo({ path: '/', query: queryString.value })
}
</script>

<template>
  <div v-if="list" class="float-end">
      <span
        v-for="(tag, idx) in modelValue?.tags"
        :key="idx"
      >
        <a @click="onClick(tag)"><span class="badge rounded-pill bg-light text-info">{{ tag }}</span></a>
      </span>
    </div>
  <div v-else class="d-flex justify-content-sm-center">
    <div class="col-sm-10">
      <span
        v-for="(tag, idx) in modelValue?.tags"
        :key="idx"
      >
        <NuxtLink :to="{ path: '/', query: {q: tag} }"><div class="badge rounded-pill bg-light text-info">{{ tag }}</div></NuxtLink>
      </span>
    </div>
  </div>
</template>
