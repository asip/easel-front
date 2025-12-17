<script setup lang="ts">
const router = useRouter()

const { initGallery, closeGallery } = useImageGallery()
const { loginUser } = useAccount()
const { frameQuery, queryMap, searchFrame, frames } = useFrameSearch()

// console.log('searchFrame: start')
await searchFrame()
router.push({ path: '/', query: queryMap.value })

const clickCallback = async (pageNum: number): Promise<void> => {
  frameQuery.value.page = pageNum
  await navigateTo({ path: '/', query: queryMap.value })
}

onMounted(() => {
  if (import.meta.client) initGallery({ selector: '.lb' })
})

onUpdated(() => {
  if (import.meta.client) initGallery({ selector: '.lb' })
})

onUnmounted(() => {
  if (import.meta.client) closeGallery()
})

watch(
  loginUser.value,
  async () => {
    await searchFrame()
  }
)
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
      :total-items="frameQuery.total"
      :items-per-page="8"
      :max-pages-shown="5"
      @click="clickCallback"
    />
  </div>
</template>
