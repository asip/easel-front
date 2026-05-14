<script setup lang="ts">
const {
  tag,
  list = false,
  onClick,
} = defineProps<{
  tag: string
  list?: boolean
  onClick: (tag: string) => void
}>()
</script>

<template>
  <a href="#" @click.prevent="onClick(tag)">
    <DisplayTagsListItem :tag="tag" :list="list" />
  </a>
</template>
