<script lang="ts" setup>
import { format } from '@formkit/tempo'

const { locale } = useLocale()
const { frameQuery, queryString, searchFrame } = useFrameSearch()

const dateWord = defineModel<Date | null>({
  default: new Date,
  set (value: Date | null) {
    if (value) {
      frameQuery.value.word = format(value, 'YYYY/MM/DD', locale.value)
    } else {
      frameQuery.value.word = ''
    }
  }
})

const masks = {
  input: 'YYYY/MM/DD'
}

const onSearchClick = async () => {
  frameQuery.value.page = 1
  await navigateTo({ path: '/', query: queryString.value })
  await searchFrame({ more: true })
}

const onClearClick = () => {
  frameQuery.value.word = ''
  dateWord.value= null
}
</script>

<template>
  <div class="card bg-base-100 min-h-full w-100 p-4">
    <div class="card-block">
      <div class="flex justify-center mb-2">
        <client-only>
          <v-date-picker
            v-model="dateWord"
            mode="date"
            :masks="masks"
            :locale="locale"
          />
        </client-only>
      </div>
      <div class="flex justify-center">
        <form>
          <div class="flex gap-2">
            <input
              v-model="frameQuery.word"
              type="text"
              :placeholder="$t('component.tag_search.placeholder')"
              class="input w-50"
            >
            <input
              type="button"
              :value="$t('component.tag_search.search')"
              class="btn btn-outline btn-primary"
              @click="onSearchClick"
            >
            <input
              type="button"
              :value="$t('component.tag_search.clear')"
              class="btn btn-outline btn-warning"
              @click="onClearClick"
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
