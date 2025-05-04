<script setup lang="ts">
const router = useRouter()

const { initGallery, closeGallery } = useImageGallery('.lb')
const { frame_query, queryString, searchFrame, frames } = useFrameSearch()

// console.log('searchFrame: start')
await searchFrame()
router.push({ path: '/', query: queryString.value })

const clickCallback = async (pageNum: number) => {
  frame_query.value.page = pageNum
  await searchFrame({ more: true })
  await navigateTo({ path: '/', query: queryString.value })
}

onMounted(() => {
  if (import.meta.client) {
    initGallery()
  }
})

onUpdated(() => {
  if (import.meta.client) {
    initGallery()
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    closeGallery()
  }
})
</script>

<template>
  <div class="row mx-auto">
    <div
      v-for="(frame, i) in frames"
      :key="frame.id"
      class="col-12 col-sm-3"
    >
      <div class="card kadomaru margin-bottom-10">
        <FramesListItem v-model="frames[i]" />
      </div>
    </div>
  </div>
  <div
    v-if="frame_query.pages > 1"
    class="d-flex col-12 col-sm-12 mx-auto justify-content-sm-center justify-content-center"
  >
    <ClientOnly>
      <Paginate
        v-model="frame_query.page"
        :page-count="frame_query.pages"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      />
    </ClientOnly>
  </div>
</template>
