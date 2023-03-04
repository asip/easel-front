<template>
  <br>
  <div class="row col-sm-12">
    <div v-for="frame in frames" class="card col-sm-3 kadomaru">
      <NuxtLink :to="`${baseURL}${frame.file_url}`" name="lm" class="mx-auto" style="padding-top: 10px;"><img :src="frame.file_two_url" alt="" class="card-img-top"></NuxtLink>
      <br>
      <div class="card-block">
        <div class="d-flex justify-content-sm-center">
          <div class="mx-auto" style="padding-bottom: 10px;">
            <NuxtLink :to="`/frames/${frame.id}`" class="mx-auto">{{frame.name}}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br>
  <div class="d-flex col-sm-12 justify-content-sm-center">
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
      >
      </Paginate>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  // @ts-ignore
  import { LuminousGallery } from 'luminous-lightbox'

  const route = useRoute()
  const q = route.query.q

  const { frame_query, searchFrame, frames } = useFrameSearch()

  const { baseURL } = useConstants()

  let gallery: LuminousGallery = null;

  if(q){
    frame_query.value.word = q as string
  }

  //console.log('searchFrame: start')
  searchFrame()

  const clickCallback = async (pageNum: number) => {
    frame_query.value.page = pageNum
    await searchFrame()
  }

  onUpdated(()=> {
    if(gallery){ gallery.destroy() }
    const elements: HTMLCollectionOf<Element> = document.getElementsByClassName('lum-lightbox');
    Array.from(elements).forEach(e => e.remove());

    const elms = document.querySelectorAll('[name="lm"]')
    gallery = new LuminousGallery(elms, { showCloseButton: true })
  })

</script>