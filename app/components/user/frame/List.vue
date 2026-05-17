<script lang="ts" setup>
const { userId, from = undefined } = defineProps<{
  userId: string | undefined
  from?: string
}>()

const {
  frameQuery,
  frames,
  current,
  prev,
  next,
  prevPage,
  nextPage,
  minPage,
  maxPage,
  initFrameQuery,
} = useUserFrames()

// console.log('userId', userId)

initFrameQuery({ userId })

// console.log('getFrames: start')
await current(userId)

const onPrevClick = async (): Promise<void> => {
  await prev(userId)
}

const onNextClick = async (): Promise<void> => {
  await next(userId)
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
