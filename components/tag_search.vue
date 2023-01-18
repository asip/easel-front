<template>
  <form class="d-flex">
    <input type="text" v-model="word" placeholder="タグ or 名前 or 撮影/更新日" class="form-control me-sm-2" >
    <input type="button" value="検索" class="btn btn-outline-success me-2 me-sm-0" @click="onSearchClick">
    <div style="padding-left:5px;">
      <a class="btn btn-outline-success me-2 me-sm-0" data-bs-toggle="offcanvas" href="#offcanvas-calendar" role="button" aria-expanded="false" aria-controls="offcanvas-calendar">
        <i class="bi bi-calendar"></i>
      </a>
    </div>
  </form>
</template>

<script lang="ts" setup>
  const { word, searchFrame } = useFrameSearch();

  const onSearchClick = () => {
    searchFrame()
  }
</script>