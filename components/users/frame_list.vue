<template>
  <div class="col-sm-12">
    <div class="row">
      <div v-for="frame in frames" :key="frame.id" class="card col-sm-3 kadomaru">
        <NuxtLink :to="`${frame.file_url}`" name="lm" class="mx-auto" style="padding-top: 10px;">
          <img :src="frame.file_two_url" :alt="frame.name" class="card-img-top">
        </NuxtLink>
        <br>
        <div class="card-block">
          <div class="d-flex justify-content-sm-center">
            <div class="mx-auto" style="padding-bottom: 10px;">
              <NuxtLink v-if="props.page == 'profile'" :to="{ path: `/frames/${frame.id}`, query: { ref: props.page } }" class="mx-auto">
                {{ frame.name }}
              </NuxtLink>
              <NuxtLink v-else-if="props.page == 'user_profile'" :to="{ path: `/frames/${frame.id}`, query: { ref: props.page, ref_id: props.userId} }" class="mx-auto">
                {{ frame.name }}
              </NuxtLink>
              <NuxtLink v-else :to="`/frames/${frame.id}`" class="mx-auto">
                {{ frame.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br>
  <div v-if="frame_query.pages > 1" class="d-flex col-sm-12 justify-content-sm-center">
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

<script lang="ts" setup>
import { useImageGallery } from '~/composables/ui/use_image_gallery';
import { useUserFrames } from '~/composables/use_user_frames'

const props = defineProps<{
  userId: string | undefined
  page?: string
}>()

const { initGallery, destroyGallery } = useImageGallery()
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
  destroyGallery()
})
</script>
