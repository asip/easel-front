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
  <div class="flex justify-center">
    <div class="grid grid-cols-1 sm:grid-cols-4 items-start w-full sm:w-9/10">
      <div
        v-for="(frame, i) in frames"
        :key="frame.id"
        class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mb-2"
      >
        <FramesListItem v-model="frames[i]" />
      </div>
    </div>
  </div>
  <div
    v-if="frameQuery.pages > 1"
    class="flex justify-center pb-5"
  >
    <vue-awesome-paginate
      v-model="frameQuery.page"
      :total-items="frameQuery.items"
      :items-per-page="8"
      :max-pages-shown="5"
      @click="clickCallback"
    />
  </div>
</template>
