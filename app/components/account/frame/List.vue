<script lang="ts" setup>
const { from = undefined } = defineProps<{
  from?: string
}>()
const { frameQuery, frames, current, prev, next, prevPage, nextPage, minPage, maxPage } =
  useAccountFrames()

// console.log('getFrames: start')
await current()

const onPrevClick = async (): Promise<void> => {
  await prev()
}

const onNextClick = async (): Promise<void> => {
  await next()
}
</script>

<template>
  <FrameListPrev
    v-if="prevPage"
    :min-page="minPage"
    :pages="frameQuery.pages"
    @click="onPrevClick"
  />

  <UserFrameListCurrent v-model="frames" :from="from" />

  <FrameListNext
    v-if="nextPage"
    :max-page="maxPage"
    :pages="frameQuery.pages"
    @click="onNextClick"
  />
</template>
