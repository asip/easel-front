<script lang="ts" setup>
const { userId, page = undefined } = defineProps<{
  userId: string | undefined
  page?: string
}>()

const { initGallery, closeGallery } = useImageGallery()
const { frameQuery, getFrames, frames } = useUserFrames()

// console.log('userId', userId)

if (userId) {
  if (frameQuery.value.user_id !== userId) {
    frameQuery.value.page = 1
    frameQuery.value.pages = 1
  }
  frameQuery.value.user_id = userId
}

// console.log('searchFrame: start')
await getFrames(userId)

const clickCallback = async (pageNum: number): Promise<void> => {
  frameQuery.value.page = pageNum
  await getFrames(userId, { client: true })
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
</script>

<template>
  <div class="flex justify-center">
    <div class="grid grid-cols-1 sm:grid-cols-4 items-start w-full sm:w-9/10">
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
  <div v-if="frameQuery.pages > 1" class="flex justify-center pb-5">
    <vue-awesome-paginate
      v-model="frameQuery.page"
      :total-items="frameQuery.total"
      :items-per-page="8"
      :max-pages-shown="5"
      @click="clickCallback"
    />
  </div>
</template>
