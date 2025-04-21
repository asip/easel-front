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
      <UsersFrameListItem
        v-model="frames[i]"
        :user-id="userId"
        :page="page"
      />
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
