<script lang="ts" setup>
import { useUserFrames } from '~/composables/use-user-frames'

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

const clickCallback = async (pageNum: number) => {
  frameQuery.value.page = pageNum
  await getFrames(userId, { more: true })
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
  <div class="row">
    <div
      v-for="(frame, i) in frames"
      :key="frame.id"
      class="col-12 col-sm-3"
    >
      <div class="card kadomaru m-bottom-10">
        <UsersFrameListItem
          v-model="frames[i]"
          :user-id="userId"
          :page="page"
        />
      </div>
    </div>
  </div>
  <div
    v-if="frameQuery.pages > 1"
    class="d-flex col-sm-12 justify-content-sm-center"
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
