<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvas-calendar" aria-labelledby="offcanvasCalendarLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasLabel"></h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="閉じる"></button>
    </div>
    <div class="offcanvas-body">
      <div class="d-flex justify-content-sm-center">
        <div class="mx-auto">
          <client-only>
            <v-calendar v-model="word" />
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { word } = useWordSearch()
</script>