<script lang="ts" setup>
import type { User } from '~/interfaces/user'
import { useAccountFrames } from '~/composables/use-account-frames'

const user = defineModel<User>()

const { page } = defineProps<{
  page?: string
}>()

const { initGallery, closeGallery } = useImageGallery('.lb')
const { frame_query, getFrames, frames } = useAccountFrames()

// console.log('searchFrame: start')
await getFrames(user.value)

const userId = user.value?.id?.toString()

const clickCallback = async (pageNum: number) => {
  frame_query.value.page = pageNum
  await getFrames(user.value)
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
  <div class="row">
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
