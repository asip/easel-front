<template>
  <br>
  <div class="row col-sm-12">
      <div v-for="frame in frames" class="card col-sm-3 kadomaru">
        <NuxtLink :to="`/`" class="mx-auto" style="padding-top: 10px;"><img :src="frame.attributes.file_two_url" class="card-img-top" /></NuxtLink>
        <br>
        <div class="card-block">
          <div class="d-flex justify-content-sm-center">
            <div class="mx-auto" style="padding-bottom: 10px;">
              <NuxtLink :to="`/`" class="mx-auto">{{frame.attributes.name}}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
  </div>
  <br>
  <div class="d-flex col-sm-12 justify-content-sm-center">
    <ClientOnly>
      <Paginate
        :page-count="pages"
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
  export default {
    setup(){
      const { page, pages, searchFrame, frames } = useFrameSearch()

      //console.log('searchFrame: start')
      searchFrame()

      const clickCallback = (pageNum) => {
        page.value = pageNum
        searchFrame()
      }

      onMounted(() => {
      })

      return {
        frames, searchFrame, clickCallback
      }
    }
  }
</script>