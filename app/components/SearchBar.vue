<script lang="ts" setup>
import { format, parse } from '@formkit/tempo'

const { locale } = useLocale()
const { frameQuery, queryMap, qItems, clearSearchCriteria } = useFrameSearch()
const { searchRules } = useFrameRules()

const { r$ } = useI18nRegle(frameQuery.value.items, searchRules)

const dateWord = computed<Date | null>({
  get () {
    try{
      return frameQuery.value.items.word ? parse(frameQuery.value.items.word, 'YYYY/MM/DD', locale.value) : null
    } catch {
      return null
    }
  },
  set (value: Date | null) {
    frameQuery.value.items.word = value ? format(value, 'YYYY/MM/DD', locale.value): ''
  }
})

const onSearchClick = async (): Promise<void> => {
  const { valid } = await r$.$validate()

  if (valid) {
    r$.$reset()
    frameQuery.value.page = 1
    await navigateTo({ path: '/', query: queryMap.value })
  }
}

const onClearClick = async (): Promise<void> => {
  r$.$reset()
  if (Object.keys(qItems.value).length) {
    dateWord.value= null
    clearSearchCriteria()
    frameQuery.value.page = 1
    await navigateTo({ path: '/', query: queryMap.value })
  }
}
</script>

<template>
  <div class="card bg-base-100 min-h-full w-100 p-4">
    <div class="card-block">
      <div class="flex justify-center mb-2 mx-auto">
        <client-only>
          <vue-date-picker
            v-model="dateWord"
            :time-config="{ enableTimePicker: false }"
            class="centered-datepicker"
            inline
            position="center"
            auto-apply
          />
        </client-only>
      </div>
      <form>
        <div class="flex justify-center">
          <table class="table table-bordered table-rounded">
            <tbody>
              <tr>
                <td colspan="2">
                  <div class="tooltip tooltip-bottom" :data-tip="$t('component.tag_search.placeholder')">
                    <input
                      v-model="frameQuery.items.word"
                      type="text"
                      placeholder=""
                      class="input w-80"
                    >
                  </div>
                  <div
                    v-for="error of r$.$errors.word"
                    :key="error"
                    class="flex"
                  >
                    <div class="text-red-500">{{ error }}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="w-[9em]">
                  <label for="frame_name" class="">{{ $t('model.frame.name') }}：</label>
                </td>
                <td>
                  <input
                    v-model="frameQuery.items.frame_name"
                    type="text"
                    placeholder=""
                    class="input w-50"
                  >
                  <div
                    v-for="error of r$.$errors.frame_name"
                    :key="error"
                    class="flex"
                  >
                    <div class="text-red-500">{{ error }}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="tag_name" class="">{{ $t('component.tag_search.tag_name') }}：</label>
                </td>
                <td>
                  <input
                    v-model="frameQuery.items.tag_name"
                    type="text"
                    placeholder=""
                    class="input w-50"
                  >
                  <div
                    v-for="error of r$.$errors.tag_name"
                    :key="error"
                    class="flex"
                  >
                    <div class="text-red-500">{{ error }}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="user_name" class="">{{ $t('component.tag_search.user_name') }}：</label>
                </td>
                <td>
                  <input
                    v-model="frameQuery.items.user_name"
                    type="text"
                    placeholder=""
                    class="input w-50"
                  >
                  <div
                    v-for="error of r$.$errors.user_name"
                    :key="error"
                    class="flex"
                  >
                    <div class="text-red-500">{{ error }}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="creator_name" class="">{{ $t('model.frame.creator_name') }}：</label>
                </td>
                <td>
                  <input
                    v-model="frameQuery.items.creator_name"
                    type="text"
                    placeholder=""
                    class="input w-50"
                  >
                  <div
                    v-for="error of r$.$errors.creator_name"
                    :key="error"
                    class="flex"
                  >
                    <div class="text-red-500">{{ error }}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="date" class="">{{ $t('component.tag_search.date') }}：</label>
                </td>
                <td>
                  <div class="tooltip tooltip-bottom" :data-tip="$t('component.tag_search.placeholder_date')">
                      <input
                        v-model="frameQuery.items.date"
                        type="date"
                        class="input w-50"
                      >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-center gap-2 mt-2">
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
</template>

<style scoped>
  .centered-datepicker {
    display: block;
    margin-left: auto;
    margin-right: auto;
    --dp-border-radius: 10px;
  }
</style>