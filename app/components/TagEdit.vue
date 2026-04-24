<script lang="ts" setup>
const model = defineModel<string[]>()

const tagSearch = useTagSearch()
</script>

<template>
  <TagEditor v-model="model" :tag-search="tagSearch" />
</template>
