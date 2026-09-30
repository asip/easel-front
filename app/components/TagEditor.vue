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

const options = { ...settings, autocompleteTags: tagSearch }
</script>

<template>
  <Tagify v-model="model" :options="options" />
</template>
