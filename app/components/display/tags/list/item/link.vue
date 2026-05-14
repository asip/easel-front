<script setup lang="ts">
const { tag, list = false } = defineProps<{
  tag: string
  list?: boolean
}>()

const emit = defineEmits<{ click: [string] }>()

const onClick = (tag: string): void => {
  emit('click', tag)
}
</script>

<template>
  <a href="#" @click.prevent="onClick(tag)">
    <DisplayTagsListItem :tag="tag" :list="list" />
  </a>
</template>
