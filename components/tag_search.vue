<template>
  <form class="d-flex">
    <input type="text" v-model="frame_query.word" :placeholder="$t('component.tag_search.placeholder')" class="form-control me-sm-2" >
    <input type="button" :value="$t('component.tag_search.search')" class="btn btn-outline-success me-2 me-sm-0" @click="onSearchClick">
    <div style="padding-left:5px;">
      <a class="btn btn-outline-success me-2 me-sm-0" data-bs-toggle="offcanvas" href="#offcanvas-calendar" role="button" aria-expanded="false" aria-controls="offcanvas-calendar">
        <i class="bi bi-calendar"></i>
      </a>
    </div>
  </form>
</template>

<script lang="ts" setup>
  const route = useRoute()
  const { frame_query, searchFrame } = useFrameSearch();

  const onSearchClick = async () => {
    frame_query.value.page = 1
    await searchFrame()
    if(route.path != '/'){
      navigateTo('/')
    }
  }
</script>