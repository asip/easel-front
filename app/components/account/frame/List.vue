<script lang="ts" setup>
import type { User } from '~/interfaces/user'
import { useAccountFrames } from '~/composables/use-account-frames'

const user = defineModel<User>()

const { page = undefined } = defineProps<{
  page?: string
}>()

const { initGallery, closeGallery } = useImageGallery()
const { frameQuery, getFrames, frames } = useAccountFrames()

// console.log('searchFrame: start')
await getFrames(user.value)

const userId = user.value?.id?.toString()

const clickCallback = async (pageNum: number) => {
  frameQuery.value.page = pageNum
  await getFrames(user.value, { more: true })
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
      <div class="card kadomaru-20 m-bottom-10">
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
