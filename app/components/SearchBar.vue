<script lang="ts" setup>
import { format, parse } from '@formkit/tempo'

const { locale } = useLocale()
const { frameQuery, queryString, searchFrame } = useFrameSearch()

const dateWord = computed({
  get () {
    try{
      return frameQuery.value.word ? parse(frameQuery.value.word, 'YYYY/MM/DD', locale.value) : null
    } catch {
      return null
    }
  },
  set (value: Date | null) {
    frameQuery.value.word = value ? format(value, 'YYYY/MM/DD', locale.value): ''
  }
})

const masks = {
  input: 'YYYY/MM/DD'
}

const onSearchClick = async () => {
  if (frameQuery.value.word?.length && frameQuery.value.word?.length > 1) {
    frameQuery.value.page = 1
    await navigateTo({ path: '/', query: queryString.value })
    await searchFrame({ more: true })
  }
}

const onClearClick = async () => {
  if (frameQuery.value.word?.length && frameQuery.value.word?.length > 1) {
    dateWord.value= null
    frameQuery.value.page = 1
    await navigateTo({ path: '/', query: queryString.value })
    await searchFrame({ more: true })
  }
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
            <div class="tooltip tooltip-bottom" :data-tip="$t('component.tag_search.placeholder')">
              <input
                v-model="frameQuery.word"
                type="text"
                placeholder=""
                class="input w-50"
              >
            </div>
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
