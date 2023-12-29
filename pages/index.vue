<template>
  <div>
    <br>
    <div class="row col-sm-12">
      <div v-for="frame in frames" :key="frame.id" class="card col-sm-3 kadomaru">
        <NuxtLink :to="`${frame.file_url}`" name="lm" class="mx-auto" style="padding-top: 10px;">
          <img :src="`${frame.file_two_url}`" :alt="frame.name" class="card-img-top">
        </NuxtLink>
        <br>
        <div class="card-block">
          <div class="d-flex justify-content-sm-center">
            <div class="mx-auto" style="padding-bottom: 10px;">
              <NuxtLink :to="`/frames/${frame.id}`" class="mx-auto">
                {{ frame.name }}
              </NuxtLink>
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
  </div>
</template>

<script setup lang="ts">
import { useImageGallery } from '~/composables/ui/use_image_gallery';

const route = useRoute()
const q = route.query.q

const { initGallery, closeGallery } = useImageGallery()

const { frame_query, searchFrame, frames } = useFrameSearch()

if (q) {
  frame_query.value.word = q as string
}

// console.log('searchFrame: start')
await searchFrame()

const clickCallback = async (pageNum: number) => {
  frame_query.value.page = pageNum
  await searchFrame()
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
