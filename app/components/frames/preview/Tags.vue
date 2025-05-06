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
  <div v-if="list" class="float-end p-right-5 p-top-5">
      <span
        v-for="(tag, idx) in modelValue?.tags"
        :key="idx"
      >
        <a @click="onClick(tag)"><span class="badge rounded-pill bg-light text-info">{{ tag }}</span></a>
      </span>
    </div>
  <div v-else class="d-flex justify-content-sm-center">
    <div class="col-sm-10">
      <div
        v-for="(tag, idx) in modelValue?.tags"
        :key="idx"
      >
        <a @click="onClick(tag)"><div class="badge rounded-pill bg-light text-info">{{ tag }}</div></a>
    </div>
    </div>
  </div>
</template>
