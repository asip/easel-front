<script setup lang="ts">
const router = useRouter()

const { initGallery, closeGallery } = useImageGallery()
const { frameQuery, queryString, searchFrame, frames } = useFrameSearch()

// console.log('searchFrame: start')
await searchFrame()
router.push({ path: '/', query: queryString.value })

const clickCallback = async (pageNum: number) => {
  frameQuery.value.page = pageNum
  await navigateTo({ path: '/', query: queryString.value })
  await searchFrame({ more: true })
}

onMounted(() => {
  if (import.meta.client) {
    initGallery('.lb')
  }
})

onUpdated(() => {
  if (import.meta.client) {
    initGallery('.lb')
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
      <div class="card kadomaru m-bottom-10">
        <FramesListItem v-model="frames[i]" />
      </div>
    </div>
  </div>
  <div
    v-if="frameQuery.pages > 1"
    class="d-flex col-12 col-sm-12 mx-auto justify-content-sm-center justify-content-center"
  >
    <ClientOnly>
      <Paginate
        v-model="frameQuery.page"
        :page-count="frameQuery.pages"
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
