<script lang="ts" setup>
const model = defineModel<string[]>()

const settings = {
  maxTags: 5,
  dropdown: {
    classname: 'color-blue',
    enabled: 0,
    maxItems: 30,
    closeOnSelect: false,
    highlightFirst: true,
  },
}

const tagSearch = useTagSearch()
</script>

<template>
  <TagEditor v-model="model" :settings="settings" :tag-search="tagSearch" />
</template>
