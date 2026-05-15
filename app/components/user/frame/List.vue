<script lang="ts" setup>
const { userId, from = undefined } = defineProps<{
  userId: string | undefined
  from?: string
}>()

const { initGallery, closeGallery } = useImageGallery({ selector: '.lb', anchor: 'a.ps' })
const {
  frameQuery,
  frames,
  current,
  prev,
  next,
  pagePrev,
  pageNext,
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

onMounted(() => {
  if (import.meta.client) initGallery()
})

onUpdated(() => {
  if (import.meta.client) initGallery()
})

onUnmounted(() => {
  if (import.meta.client) closeGallery()
})
</script>

<template>
  <FrameListPrev
    v-if="pagePrev"
    :min-page="minPage"
    :pages="frameQuery.pages"
    @click="onPrevClick"
  />

  <div class="flex justify-center">
    <div class="grid grid-cols-1 sm:grid-cols-4 items-start w-full sm:w-9/10 lb mt-2">
      <div
        v-for="(frame, i) in frames"
        :key="frame.id"
        class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mb-2"
      >
        <UserFrameListItem v-model="frames[i]" :from="from" />
      </div>
    </div>
  </div>

  <FrameListNext
    v-if="pageNext"
    :max-page="maxPage"
    :pages="frameQuery.pages"
    @click="onNextClick"
  />
</template>
