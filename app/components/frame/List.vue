<script setup lang="ts">
const { $i18n } = useNuxtApp()
const router = useRouter()

const { initGallery, closeGallery } = useImageGallery()
// const { loginUser } = useAccount()
const { frameQuery, queryMap, frames, current, prev, next, pagePrev, pageNext, minPage, maxPage } = useFrameSearch()

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
  if (import.meta.client) initGallery({ selector: '.lb', anchor: 'a.ps' })
})

onUpdated(() => {
  if (import.meta.client) initGallery({ selector: '.lb', anchor: 'a.ps' })
})

onUnmounted(() => {
  if (import.meta.client) closeGallery()
})
</script>

<template>
  <ClientOnly>
    <div v-if="pagePrev" class="flex justify-center">
      <a class="btn btn-outline btn-primary rounded-full bg-white mb-2" @click="onPrevClick">{{ $i18n.t('action.search.more') }} {{ minPage }}/{{ frameQuery.pages }}</a>
    </div>
  </ClientOnly>

  <div class="flex justify-center">
    <div class="grid grid-cols-1 sm:grid-cols-4 items-start w-full sm:w-9/10 lb">
      <div
        v-for="(frame, i) in frames"
        :key="frame.id"
        class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mb-2"
      >
        <FrameListItem v-model="frames[i]" />
      </div>
    </div>
  </div>

  <ClientOnly>
    <div v-if="pageNext" class="flex justify-center">
      <a class="btn btn-outline btn-primary rounded-full bg-white" @click="onNextClick">{{ $i18n.t('action.search.more') }} {{ maxPage }}/{{ frameQuery.pages }}</a>
    </div>
  </ClientOnly>
</template>
