<script lang="ts" setup>
import { useUserFrames } from '~/composables/use-user-frames'

const { userId, page } = defineProps<{
  userId: string | undefined
  page?: string
}>()

const { initGallery, closeGallery } = useImageGallery('.lb')
const { frame_query, getFrames, frames } = useUserFrames()

if (userId) {
  if (frame_query.value.user_id !== userId) {
    frame_query.value.page = 1
    frame_query.value.pages = 1
  }
  frame_query.value.user_id = userId
}

// console.log('searchFrame: start')
await getFrames(userId)

const clickCallback = async (pageNum: number) => {
  frame_query.value.page = pageNum
  await getFrames(userId)
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
  <div class="row col-sm-12">
    <div
      v-for="(frame, i) in frames"
      :key="frame.id"
      class="col-12 col-sm-3"
    >
      <div class="card kadomaru margin-bottom-10">
        <UsersFrameListItem
          v-model="frames[i]"
          :user-id="userId"
          :page="page"
        />
      </div>
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
