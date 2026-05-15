<script setup lang="ts">
const router = useRouter()

const { initGallery, closeGallery } = useImageGallery({ selector: '.lb', anchor: 'a.ps' })
// const { account } = useAccount()
const { frameQuery, queryMap, frames, current, prev, next, pagePrev, pageNext, minPage, maxPage } =
  useFrameSearch()

// console.log('searchFrame: start')
await current()
router.push({ path: '/', query: queryMap.value })

const onPrevClick = async (): Promise<void> => {
  await prev()
}

const onNextClick = async (): Promise<void> => {
  await next()
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
        <FrameListItem v-model="frames[i]" />
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
