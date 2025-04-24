<script setup lang="ts">
const router = useRouter()

const { initGallery, closeGallery } = useImageGallery('.lb')
const { frame_query, queryString, searchFrame, frames } = useFrameSearch()

// console.log('searchFrame: start')
await searchFrame()

const clickCallback = async (pageNum: number) => {
  frame_query.value.page = pageNum
  await searchFrame()
  router.replace({ path: '/', query: queryString.value })
}

onMounted(() => {
  initGallery()
})

onUpdated(() => {
  initGallery()
})

onUnmounted(() => {
  closeGallery()
})
</script>

<template>
  <div class="row col-sm-12 lb">
    <div
      v-for="(frame, i) in frames"
      :key="frame.id"
      class="card col-sm-2 kadomaru"
    >
      <FramesListItem v-model="frames[i]" />
    </div>
  </div>
  <br>
  <div
    v-if="frame_query.pages > 1"
    class="d-flex col-sm-12 justify-content-sm-center"
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
