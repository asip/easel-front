<template>
  <br>
  <div class="row col-sm-12">
    <div v-for="frame in (frames as any[])" class="card col-sm-3 kadomaru">
      <NuxtLink :to="`${baseURL}${frame.attributes.file_url}`" name="lm" class="mx-auto" style="padding-top: 10px;"><img :src="frame.attributes.file_two_url" class="card-img-top"></NuxtLink>
      <br>
      <div class="card-block">
        <div class="d-flex justify-content-sm-center">
          <div class="mx-auto" style="padding-bottom: 10px;">
            <NuxtLink :to="`/frames/${frame.id}`" class="mx-auto">{{frame.attributes.name}}</NuxtLink>
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

<script lang="ts">
  // @ts-ignore
  import { LuminousGallery } from 'luminous-lightbox'

  export default {
    setup(){
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

      return {
        frames, searchFrame, clickCallback, baseURL, frame_query
      }
    }
  }
</script>