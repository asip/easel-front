<template>
  <div class="col-sm-12">
    <div class="row">
      <div v-for="frame in frames" :key="frame.id" class="card col-sm-3 kadomaru">
        <NuxtLink :to="`${backendOriginURL}${frame.file_url}`" name="lm" class="mx-auto" style="padding-top: 10px;">
          <img :src="frame.file_two_url" :alt="frame.name" class="card-img-top">
        </NuxtLink>
        <br>
        <div class="card-block">
          <div class="d-flex justify-content-sm-center">
            <div class="mx-auto" style="padding-bottom: 10px;">
              <NuxtLink v-if="props.page == 'profile'" :to="{ path: `/frames/${frame.id}`, query: { ref: props.page } }" class="mx-auto">
                {{ frame.name }}
              </NuxtLink>
              <NuxtLink v-else-if="props.page == 'user_profile'" :to="{ path: `/frames/${frame.id}`, query: { ref: props.page, user_id: props.user_id} }" class="mx-auto">
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
// @ts-ignore
import { LuminousGallery } from 'luminous-lightbox'
import { useUserFrames } from '~/composables/use_user_frames'

const props = defineProps<{
  user_id: string | undefined
  page?: string
}>()

const { frame_query, getFrames, frames } = useUserFrames()

const { backendOriginURL } = useConstants()

let gallery: LuminousGallery = null

if (props.user_id) {
  if (frame_query.value.user_id !== props.user_id) {
    frame_query.value.page = 1
    frame_query.value.pages = 1
  }
  frame_query.value.user_id = props.user_id
}

// console.log('searchFrame: start')
getFrames(props.user_id)

const clickCallback = async (pageNum: number) => {
  frame_query.value.page = pageNum
  await getFrames(props.user_id)
}

onUpdated(() => {
  if (gallery) { gallery.destroy() }
  const elements: HTMLCollectionOf<Element> = document.getElementsByClassName('lum-lightbox')
  Array.from(elements).forEach(e => e.remove())

  const elms = document.querySelectorAll('[name="lm"]')
  gallery = new LuminousGallery(elms, { showCloseButton: true })
})

onUnmounted(() => {
  if (gallery) {
    gallery.destroy()
    gallery = null
  }
})
</script>
