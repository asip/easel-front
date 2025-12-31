<script lang="ts" setup>
const { page = undefined } = defineProps<{
  page?: string
}>()

const { initGallery, closeGallery } = useImageGallery()
const { frameQuery, getFrames, frames } = useAccountFrames()

// console.log('getFrames: start')
await getFrames()

const clickCallback = async (pageNum: number): Promise<void> => {
  frameQuery.value.page = pageNum
  await getFrames({ client: true })
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
  <div class="flex justify-center">
    <div class="grid grid-cols-1 sm:grid-cols-4 items-start w-full sm:w-9/10 lb">
      <div
        v-for="(frame, i) in frames"
        :key="frame.id"
        class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mb-2"
      >
        <UserFrameListItem
          v-model="frames[i]"
          :page="page"
        />
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
