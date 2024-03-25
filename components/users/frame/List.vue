<script lang="ts" setup>
import { useImageGallery } from '~/composables/ui/use_image_gallery'
import { useUserFrames } from '~/composables/use_user_frames'

const props = defineProps<{
  userId: string | undefined
  page?: string
}>()

const { initGallery, closeGallery } = useImageGallery()
const { frame_query, getFrames, frames } = useUserFrames()

if (props.userId) {
  if (frame_query.value.user_id !== props.userId) {
    frame_query.value.page = 1
    frame_query.value.pages = 1
  }
  frame_query.value.user_id = props.userId
}

// console.log('searchFrame: start')
await getFrames(props.userId)

const clickCallback = async (pageNum: number) => {
  frame_query.value.page = pageNum
  await getFrames(props.userId)
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
  <div class="row col-sm-12">
    <div
      v-for="(frame, i) in frames"
      :key="frame.id"
      class="card col-sm-3 kadomaru"
    >
      <UsersFrameListItem
        v-model="frames[i]"
        :user-id="props.userId"
        :page="props.page"
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
