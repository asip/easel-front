<script setup lang="ts">
import type { Frame } from '~/types'

const model = defineModel<Frame>()

const { list = false } = defineProps<{
  list?: boolean
}>()

const { frameQuery, queryMap, current, currentPage, clearSearchCriteria } = useFrameSearch()

const onClick = async (tag: string): Promise<void> => {
  clearSearchCriteria()
  frameQuery.value.items.tag_name = tag
  frameQuery.value.page = 1
  currentPage.value = 1
  await current({ cache: false })
  await navigateTo({ path: '/', query: queryMap.value })
}
</script>

<template>
  <div v-for="(tag, idx) in model?.tag_list" :key="idx">
    <a href="#" @click.prevent="onClick(tag)">
      <DisplayTagsListItem :tag="tag" :list="list" />
    </a>
  </div>
</template>
