<template>
  <div class="d-flex">
    <div style="padding-left:5px;">
      <a class="btn btn-outline-success me-2 me-sm-0" data-bs-toggle="offcanvas" href="#offcanvas-calendar" role="button" aria-expanded="false" aria-controls="offcanvas-calendar">
        <i class="bi bi-search"></i>
      </a>
    </div>
  </div>
  <teleport to="#sidebar-calendar">
    <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvas-calendar" aria-labelledby="offcanvasCalendarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasLabel"></h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" :aria-label="$t('action.modal.close')"></button>
      </div>
      <div class="offcanvas-body">
        <div class="d-flex justify-content-sm-center">
          <div class="mx-auto">
            <client-only>
              <v-date-picker v-model="date_word" :masks="masks" :locale="locale" />
            </client-only>
          </div>
        </div>
        <br>
        <div class="d-flex justify-content-sm-center">
          <div class="mx-auto">
            <form class="d-flex">
            <input type="text" v-model="frame_query.word" :placeholder="$t('component.tag_search.placeholder')" class="form-control me-sm-2" >
            <input type="button" :value="$t('component.tag_search.search')" class="btn btn-outline-success me-2 me-sm-0" @click="onSearchClick">
            </form>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
  const route = useRoute()
  const { date_word ,frame_query, searchFrame } = useFrameSearch();

  const masks= {
    input: 'YYYY/MM/DD'
  }
  const locale = 'ja-jp'

  const onSearchClick = async () => {
    frame_query.value.page = 1
    await searchFrame()
    if(route.path != '/'){
      navigateTo('/')
    }
  }
</script>