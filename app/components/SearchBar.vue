<script lang="ts" setup>
import { format } from '@formkit/tempo'

const route = useRoute()
const { locale } = useLocale()
const { frame_query, searchFrame } = useFrameSearch()

const dateWord = defineModel<Date | null>({
  default: new Date,
  set (value: any) {
    if (value) {
      frame_query.value.word = format(value, 'YYYY/MM/DD', locale.value)
    } else {
      frame_query.value.word = ''
    }
  }
})

const masks = {
  input: 'YYYY/MM/DD'
}

const onSearchClick = async () => {
  frame_query.value.page = 1
  await searchFrame()
  if (route.path !== '/') {
    await navigateTo('/')
  }
}

const onClearClick = () => {
  frame_query.value.word = ''
  dateWord.value= null
}
</script>

<template>
  <div style="padding-left:5px;">
    <a
      class="btn btn-outline-success me-2 me-sm-0"
      data-bs-toggle="offcanvas"
      href="#offcanvas-calendar"
      role="button"
      aria-expanded="false"
      aria-controls="offcanvas-calendar"
    >
      <i class="bi bi-search" />
    </a>
  </div>
  <teleport to="#sidebar-calendar">
    <div
      id="offcanvas-calendar"
      class="offcanvas offcanvas-end"
      data-bs-scroll="true"
      tabindex="-1"
    >
      <div class="offcanvas-header">
        <!-- <h5 id="offcanvasLabel" class="offcanvas-title" /> -->
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          :aria-label="$t('action.modal.close')"
        />
      </div>
      <div class="offcanvas-body">
        <div class="d-flex justify-content-sm-center">
          <client-only>
            <v-date-picker
              v-model="dateWord"
              mode="date"
              :masks="masks"
              :locale="locale"
            />
          </client-only>
        </div>
        <br>
        <div class="d-flex justify-content-sm-center">
          <form class="d-flex">
            <input
              v-model="frame_query.word"
              type="text"
              :placeholder="$t('component.tag_search.placeholder')"
              class="form-control me-sm-2"
            >
            <input
              type="button"
              :value="$t('component.tag_search.search')"
              class="btn btn-outline-success me-2 me-sm-0"
              @click="onSearchClick"
            >
            &nbsp;
            <input
              type="button"
              :value="$t('component.tag_search.clear')"
              class="btn btn-outline-success me-2 me-sm-0"
              @click="onClearClick"
            >
          </form>
        </div>
      </div>
    </div>
  </teleport>
</template>
